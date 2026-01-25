+++
title = 'tf is tf-idf?'
summary = "idk! (jk)"
description = "idk! (jk)"
date = '2026-01-14'
tags = ['Python', 'NLP', 'beginner']
math = true
showReadingTime = false
showComments = true
+++

Last year (before I vanished off the face of the planet), I took a Natural Language Processing course that had us working out of Jurafsky and Martin's brilliant [*Speech and Language Processing*](https://web.stanford.edu/~jurafsky/slp3/) textbook. 

I love NLP, but NLP instruction can be (imo) opaque and unnecessarily math heavy.
This textbook is a happy medium, but I wanted to work through the exercises in code instead of equations, which I hate 😄

This post is based on material from [chapter 6 of the 2019 edition](https://web.stanford.edu/~jurafsky/slp3/old_oct19/6.pdf).

# So, tf is `tf-idf`?

- **`tf`**: Term frequency
- **`idf`**: Inverse document frequency

That's the acronym, but `tf-idf` is also used to describe **a model** for representing text - more specifically, documents.

`tf-idf` is best known for its role in information retrieval.

Early search engines used the `tf-idf` model to support user queries: given a query like "Ginger Spice", which documents are relevant? 
Once we've found relevant documents, how do we rank them? (Is the user looking for information about the Spice Girls, or information about the root?)

Here's how we create a `tf-idf` model, in two simple steps:
- **Index all documents.** For each document, count how often each word appears.
    - A document like `I really, really like cake.` is broken up into a map like:
      `{'I': 1, 'really': 2, 'like': 1, 'cake': 1}`
- **Calculate `tf`, `idf`, and `tf-idf` for all documents.** This is the creepy part o_o

In other words, this is how we create a **term-document matrix**. 
Let's walk through it.

# Creating the term-document matrix
## Indexing all documents
Given a list of document file paths:

```python
def get_cnt_string(str):
    """Count up word occurrences for a single string."""
    counter = Counter()
    # remove punctuation
    regex = re.compile(r"[,\.!?]")
    words = regex.sub("", str.lower()).split()
    return Counter(words)

def get_per_doc_cnt(documents):
    """
    Count up word occurrences for each document.
    """
    doc_counters = {}

    for document in documents:
        with open(document, "r", encoding="utf-8") as f:
            text = f.read()
            counter = get_cnt_string(text)

        # Clean document name 
        # (I put my documents under a sibling 'input' dir)
        doc_name = document \
            .replace("input/", "") \
            .replace(".txt", "")

        doc_counters[doc_name] = counter

    return doc_counters
```

We store each document's counter alongside its name.

## Calculating `tf` and `tf-idf` for all documents
### Calculating `tf`
**Term frequency** refers to the frequency of a word in the document. 
This is different from the word counts that we calculated a second ago.

For a single document, given a single word and its count, we calculate the word's `tf` with:
`tf = 1 + np.log10(count)`

Put simply, we compute `tf` by taking the **common logarithm** of the word count.
Since the common logarithm of 0 is undefined, we add 1 to our count to be safe.
(It's also valid to set `tf = 0` if `count == 0`).

{{< notice note >}}
`log10` appears in many "magical formulas" of natural language processing / machine learning / etc. Why?

`log10` lets us translate **counts** into **orders of magnitude**. 
If the word 'the' appears in my document 5000 times and 'dog' appears 5 times, then:

\[
\text{tf}(5) = 1 + \log_{10}(5) \approx 1 + 0.699 = 1.699
\]

\[
\text{tf}(5000) = 1 + \log_{10}(5000) \approx 1 + 3.699 = 4.699
\]

So, the raw count of “the” is **three orders of magnitude** larger than “dog”, which `log10` encodes as a difference of about 3 in term frequency.

You can think of `log10` as a convenient way to compress large numbers and make radically different counts easier to compare across a dataset.
{{< /notice >}}

### Calculating `idf`
**Document frequency** of a term refers to the number of documents that contain a term.
**Inverse document frequency**, then, refers to the rarity of a term across all documents, or across the **corpus**. If a term appears in many documents, then its inverse document frequency should be lower.

Putting it all together, `idf` is calculated as:
\[
\log_{10}\!\left(\frac{\text{number of documents}}{\text{number of documents containing the term}}\right)
\]

(Again, we're using `log10` to compress the scale.)

Given a list of per-document word counts, this function computes `tf`, `idf`, and `tf-idf` for each term in each document:

```python
def calculate_tf_idf_for_docs(doc_counters)
    """
    Calculate tf, idf, and tf-idf for each term in each document.
    """
    data = []
    N = len(doc_counters)

    for doc_name, counter in doc_counters.items():
        for word, count in counter.items():
            # Calculate tf using log scaling
            tf = 1 + np.log10(count)

            # Calculate document frequency
            df = sum(1 for c in doc_counters.values() if word in c)

            # Avoid division by zero if the word doesn't appear in any document
            idf = np.log10(N / df) if df > 0 else 0
            tf_idf = tf * idf

            # Pandas dataframes will make it easier to query this data later
            data.append(
                {
                    "document": doc_name,
                    "word": word,
                    "count": count,
                    "tf": round(tf, 3),
                    "tf_idf": round(tf_idf, 3),
                }
            )

    return pd.DataFrame(data)
```

### `tf-idf` explained
The above code snippet calculates `tf-idf`, and it's almost laughably simple: `tf_idf = tf * idf`

What is this value actually supposed to represent?

If we think about how multiplication works:
- **A term with high `tf` and high `idf` will have a high `tf-idf`.** The term appears frequently in this document, but rarely appears in other documents. (e.g., the term `film` in the Wikipedia page for [Hollywood, Los Angeles](https://en.wikipedia.org/wiki/Hollywood%2C_Los_Angeles))
- **A term with high `tf` and low `idf` will have a medium `tf-idf`.** The term appears frequently in this document, but also appears frequently in other documents.  (e.g., the term `the` in any random Wikipedia page)
- **A term with low `tf` and high `idf` will have a medium `tf-idf`.** The term appears infrequently in this document, and appears infrequently in other documents too. (e.g., the term `googolplex` in the Wikipedia page for [Live at the Googolplex](https://en.wikipedia.org/wiki/Live_at_the_Googolplex)).
- **A term with low `tf` and low `idf` will have a low `tf-idf`.** The term appears infrequently in this document, and appears frequently in other documents. (e.g., the term `also` appearing once in any random Wikipedia page)

Remember, `tf-idf` is used in information retrieval. 
If a term has a high `tf-idf` score in a document, then we can assume that the term is especially relevant to that document.
If a user's query contains this term, then the document is probably relevant, and we should consider including it in results.

# Preparing the query
After creating the term-document matrix, we'll effectively repeat our work for our query.
The query is expected to be a string, something like: `school supplies`.

First, we get counts for the query. We can use the `get_cnt_string` helper directly:

```python
def get_cnt_string(str):
    """Count up word occurrences for a single string."""
    counter = Counter()
    # remove punctuation
    regex = re.compile(r"[,\.!?]")
    words = regex.sub("", str.lower()).split()
    return Counter(words)
```

Then, calculate `tf`, `idf`, and `tf-idf` for the query:

```python
def calculate_tf_idf_for_query(query, doc_counters):
    """
    Calculate tf, idf, and tf-idf for each term in the query, referencing corpus counts.
    """
    data = []

    # Wrap the query counter in a dict with 'query' as the key
    query = {"query": query}
    corpus_counters = doc_counters
    N = len(doc_counters)

    for doc_name, counter in query.items():
        for word, count in counter.items():
            # Calculate tf using log scaling
            tf = 1 + np.log10(count)
            # Calculate idf based on the document corpus
            df = sum(1 for c in corpus_counters.values() if word in c)
            # Avoid division by zero if the word doesn't appear in any document
            idf = np.log10(N / df) if df > 0 else 0
            tf_idf = tf * idf

            data.append(
                {
                    "document": doc_name,
                    "word": word,
                    "count": count,
                    "tf": round(tf, 3),
                    "tf_idf": round(tf_idf, 3),
                }
            )

    return pd.DataFrame(data)
```

This is very similar to the `calculate_tf_idf` function that we defined earlier.
(You can collapse both `tf_idf` calculations into a single function, but I split it out for the sake of clarity.)

Hopefully this helps to demystify the intuitions behind `tf`, `idf`, and `tf-idf`!

If we wanted to extend this script to support actual information retrieval and document ranking, we'd need to delve into word vectors, vector math, cosine similarity, and other lunacy.
I'll cover these topics in a follow-up post, since I think they deserve a focused explanation.

---

## Demo: Interactive Svelte Widget

Here's a proof-of-concept custom element built with Svelte:

<drag-drop-box prompt="Try dragging these items around!"></drag-drop-box>