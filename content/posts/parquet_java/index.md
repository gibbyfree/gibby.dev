+++
title = "Reading and writing Parquet files with Apache Parquet Java"
summary = "File format folly"
description = "Reading and writing Parquet files with Apache Parquet's Java API"
date = "2025-03-22"
tags = ['Java', 'Parquet', 'Intermediate']
showReadingTime = false
showComments = true
showTableOfContents = true
+++
For a recent assignment, I had to [reproduce some experiments](https://www.vldb.org/pvldb/vol17/p148-zeng.pdf) that involved writing Parquet files using [Apache Parquet Java 1.9.0](https://mvnrepository.com/artifact/org.apache.parquet/parquet/1.9.0).
I was trying to convert delimiter-separated data into .parquet files.
I'm sure this is really easy to do [with Apache Spark](https://spark.apache.org/) or [pyarrow](https://arrow.apache.org/docs/python/parquet.html), but I had to use the Java API for this assignment.

This ended up being a massive pain because Apache Parquet Java is poorly documented.
After a few hours spent digging through Javadocs and Stack Overflow threads, I finally got something working.

## Dependencies
My Maven project used these dependencies:

```xml
<dependency>
    <groupId>org.apache.parquet</groupId>
    <artifactId>parquet</artifactId>
    <version>1.9.0</version>
    <type>pom</type>
</dependency>
<dependency>
    <groupId>org.apache.parquet</groupId>
    <artifactId>parquet-hadoop</artifactId>
    <version>1.9.0</version>
</dependency>
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-common</artifactId>
    <version>3.4.1</version>
</dependency>
```

I found a bunch of examples that use [parquet-avro](https://mvnrepository.com/artifact/org.apache.parquet/parquet-avro), but I chose not to go this route. Again, I *had* to use the vanilla `parquet` library; interop between `parquet` and `parquet-avro` looked messy.

## Writing
It's necessary to define a schema for each .parquet file that you'd like to write.

I used this `TpcDsTableInfoUtil.java` file to represent the [TPC-DS dataset](https://www.tpc.org/tpcds/) that I was trying to convert:

```java
package com.ParquetConverter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.apache.parquet.schema.MessageType;
import org.apache.parquet.schema.PrimitiveType;
import org.apache.parquet.schema.Types;

public class TpcDsTableInfoUtil {

    static class TableInfo {
        private final MessageType schema;
        private final List<Integer> pkIndices;

        public TableInfo(MessageType schema, List<Integer> pkIndices) {
            this.schema = schema;
            this.pkIndices = pkIndices;
        }

        public MessageType getSchema() {
            return schema;
        }

        public List<Integer> getPkIndices() {
            return pkIndices;
        }
    }

    public static TableInfo getTableInfo(String tableName) {
        switch (tableName) {
             case "customer_demographics":
                return new TableInfo(Types.buildMessage()
                        .optional(PrimitiveType.PrimitiveTypeName.INT64)
                        .named("cd_demo_sk")
                        .optional(PrimitiveType.PrimitiveTypeName.BINARY)
                        .named("cd_gender")
                        .optional(PrimitiveType.PrimitiveTypeName.BINARY)
                        .named("cd_marital_status")
                        .optional(PrimitiveType.PrimitiveTypeName.BINARY)
                        .named("cd_education_status")
                        .optional(PrimitiveType.PrimitiveTypeName.INT32)
                        .named("cd_purchase_estimate")
                        .optional(PrimitiveType.PrimitiveTypeName.BINARY)
                        .named("cd_credit_rating")
                        .optional(PrimitiveType.PrimitiveTypeName.INT32)
                        .named("cd_dep_count")
                        .optional(PrimitiveType.PrimitiveTypeName.INT32)
                        .named("cd_dep_employed_count")
                        .optional(PrimitiveType.PrimitiveTypeName.INT32)
                        .named("cd_dep_college_count")
                        .named("customer_demographics_schema"), 
                        Collections.singletonList(0));
            // repeat for all other tables
        }
    }
}
```

I use `Types.buildMessage()` to append each column with its type to the schema. 
The final argument `Collections.singletonList(0)` corresponds to `pkIndices`. 
`cd_demo_sk` is the only primary key in my table, and its index is 0.
If my table has multiple primary keys, I'd set the final argument to something like `Arrays.asList(0, 1)`.

I set all of these columns to `optional()` because the TPC-DS dataset has 24 tables and I was too lazy to 
accurately mark nullable columns in all tables.
You can use `required()` to distinguish non-nullable columns from nullable columns.

Given an input directory of files-to-convert, I loop through them like this:

```java
for (File inputFile : inputFiles) {
    String tableName = inputFile.getName().replace(".dat", "");
    TableInfo tableInfo = TpcDsTableInfoUtil.getTableInfo(tableName);

    String outputPath = new File(outputDir, tableName + ".parquet").getPath();
    convertFile(inputFile.getPath(), outputPath, tableInfo, codec);
}
```

`convertFile()` is where all the action takes place. 
Most of the method is wrapped in this `try-catch`:

```java
try (ParquetWriter<Group> writer = ExampleParquetWriter.builder(new Path(outputPath))
                                .withConf(conf)
                                .withWriteMode(ParquetFileWriter.Mode.OVERWRITE)
                                .withCompressionCodec(codec)
                                .withRowGroupSize(128 * 1024 * 1024)
                                .withPageSize(512 * 1024)
                                .withValidation(true)
                                .build()) {
        // Converting code goes here
        } catch (IOException e) {
                        e.printStackTrace();
        }
```

Apache Parquet Java doesn't come with a built-in Parquet file writer. 
This [ExampleParquetWriter](https://www.javadoc.io/doc/org.apache.parquet/parquet-hadoop/latest/org/apache/parquet/hadoop/example/ExampleParquetWriter.html) is an example writer and isn't officially intended for use, but it worked just fine for my case.

`withConf(conf)` is how we pass in the schema. I created the `Configuration` from a `TableInfo` like this:

```java
MessageType schema = tableInfo.getSchema();
List<Integer> pkIndices = tableInfo.getPkIndices();

Configuration conf = new Configuration();
GroupWriteSupport.setSchema(schema, conf);
```

Here's what the actual converting code inside the try-catch looks like:

```java
SimpleGroupFactory groupFactory = new SimpleGroupFactory(schema);
try (BufferedReader br = new BufferedReader(new FileReader(inputPath))) {
        String line;
        while ((line = br.readLine()) != null) {
                String[] fields = line.split(Pattern.quote("|"), -1);

                // Check primary key fields
                boolean pkValid = true;
                for (int pkIndex : pkIndices) {
                        if (pkIndex >= fields.length || fields[pkIndex].isEmpty()) {
                                pkValid = false;
                                break;
                        }
                }

                Group group = groupFactory.newGroup();
                boolean valid = true;

                for (int i = 0; i < schema.getFields().size(); i++) {
                        String fieldName = schema.getFieldName(i);
                        String fieldValue = i < fields.length ? fields[i] : "";
                        PrimitiveType type = schema.getType(fieldName).asPrimitiveType();

                        if (fieldValue.isEmpty()) {
                                continue; // Skip optional fields
                        }

                        try {
                                switch (type.getPrimitiveTypeName()) {
                                        case INT32:
                                                group.append(fieldName,
                                                                Integer.parseInt(fieldValue));
                                                break;
                                        case INT64:
                                                group.append(fieldName,
                                                                Long.parseLong(fieldValue));
                                                break;
                                        case BINARY:
                                                group.append(fieldName, fieldValue);
                                                break;
                                        case DOUBLE:
                                                group.append(fieldName,
                                                                Double.parseDouble(fieldValue));
                                                break;
                                        default:
                                                System.err.println("Unhandled type: "
                                                                + type.getPrimitiveTypeName()
                                                                + " for field " + fieldName);
                                                valid = false;
                                }
                        } catch (NumberFormatException e) {
                                System.err.println("Error parsing field " + fieldName
                                                + " with fieldvalue : " + fieldValue
                                                + " from line: " + line);
                                valid = false;
                        }
                        if (!valid)
                                break;
                }

                if (valid) {
                        writer.write(group);
                }
        }
}
```

Yep, I'm basically parsing the input file field-by-field, validating its type and contents, and appending each validated value to the column's [Group](https://javadoc.io/doc/org.apache.parquet/parquet-column/1.10.1/org/apache/parquet/example/data/Group.html).

This code is *reasonably* performant; my final program can compress a ~2.9GB .dat file in ~28 seconds.

## Reading
Luckily, Apache Parquet Java *does* come with a built-in Parquet file reader, so this part is much simpler:

```java
private static void readFile(String parquetPath) throws IOException {
        Configuration conf = new Configuration();
        Path path = new Path(parquetPath);

        int rowCount = 0;
        try (ParquetReader<Group> reader = ParquetReader.builder(new GroupReadSupport(), path).withConf(conf)
                        .build()) {
                Group group;
                while ((group = reader.read()) != null) {
                        rowCount++; // just count rows to prevent heap overload
                }
        }
}
```

I didn't bother to read each `group` into an in-memory representation of my table, but it would probably mirror my writing code. 
I'd define a class for each table, match files to table classes based on file name, then append rows onto each class instance as I read through the .parquet file.

(I wasn't able to find a way to load an entire .parquet file into memory at once; reading row-by-row was the only method that worked for me.)

Anyway, I'm not a data engineer by any means, but this was a fun jaunt out of my comfort zone. 
Parquet is a pretty cool format and I'd like to mess around with them more in the future.

My complete Parquet reader/writer implementation is available here:

{{< github repo="gibbyfree/parquet-writer" >}}

This implementation supports the TPC-DS dataset and the IMDB dataset - extending support to other datasets should be straight-forward.