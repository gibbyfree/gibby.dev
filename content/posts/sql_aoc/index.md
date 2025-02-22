+++
title = 'Solving Advent of Code with SQL'
summary = "Anything can be a general purpose language if you believe in yourself"
description = "Anything can be a general purpose language if you believe in yourself"
date = '2025-02-18'
tags = ['SQL', 'intermediate']
showReadingTime = false
showComments = true
+++
I recently completed a homework assignment (inspired by blog posts like [this one](https://databasearchitects.blogspot.com/2024/12/advent-of-code-2024-in-pure-sql.html)) that had us solving Advent of Code puzzles using SQL. 
This may sound like medieval torture, but once I worked through a few problems I found myself having... fun?
SQL is deceptively expressive, and adapting its semantics to Advent of Code problems feels like a brain teaser within a brain teaser.

# [2024 Day 1](https://adventofcode.com/2024/day/1)
This is [a simple puzzle](https://adventofcode.com/2024/day/1), so it’s a useful example for understanding how these SQL scripts can be structured.
The problem asks us to read numbers into two ordered lists and return the absolute difference between `list_1[x]` and `list_2[x]` for all `x`.

Here's how I [originally solved](https://github.com/gibbyfree/aoc24/blob/main/day1.py) this problem using Python:

```py
def solve(left: list[str], right: list[str]) -> int:
    lows, highs = sorted(left), sorted(right)
    return sum([abs(int(high) - int(low)) for low, high in zip(lows, highs)])

if __name__ == "__main__":
    with open("input/day1.txt") as f:
        lines = [x.rstrip() for x in f]
        left, right = map(list, zip(*(s.split() for s in lines)))

    print(solve(left, right))
```

To start, I manually created a .csv of my puzzle input:

```
0,3   4
1,4   3
2,2   5
3,1   3
4,3   9
5,3   3
```

I'm including an index with each row - not totally necessary for this problem, but useful for others.
I wrote a small Python script to set this index on my actual 1000 line puzzle input.

To read input, each of my SQL scripts start like this:

```sql
-- I use 'drop table if exists' everywhere to keep scripts idempotent
drop table if exists input_lines;
create table input_lines (row int, line text);
\set filename :filepath '/' :filename 

copy input_lines
from :'filename' 
delimiter ',';
```

There are probably other ways to do this (like [COPY commands](https://www.postgresql.org/docs/current/sql-copy.html) or manual `INSERT INTO` calls), but this works for me.

At this point, `input_lines` consists of rows of `line` and their `row` index. 
We've basically done the work of my Python code's `lines = [x.rstrip() for x in f]`.
Now we need to get these lines into a representation that's actually useful for solving this puzzle.
In Python, I split each line into `left, right` pairs. 
I can do something similar in SQL:

```sql
drop table if exists pairs;
create table pairs (
    row int,
    x int,
    y int
);

insert into pairs (row, x, y)
select row,
    split_part(line, '   ', 1)::int as x, -- split line, take first element
    split_part(line, '   ', 2)::int as y -- split line, take second element
from input_lines;
```

`select * from pairs;` returns:

```
 row | x | y 
-----+---+---
   0 | 3 | 4
   1 | 4 | 3
   2 | 2 | 5
   3 | 1 | 3
   4 | 3 | 9
   5 | 3 | 3
```

In Python, I sorted `left` and `right`, [zipped](https://docs.python.org/3.3/library/functions.html#zip) them together, and summed the absolute difference between all pairs.
This is doable in SQL too:

```sql
with sorted_x as (
    SELECT row_number() over (order by x) AS rn, x from pairs
),
sorted_y as (
    select row_number() over (order by y) AS rn, y from pairs
),
diffs as (
    select sx.x, sy.y, abs(sx.x - sy.y) as diff
    from sorted_x sx, sorted_y sy
    where sx.rn = sy.rn
)
select sum(diff) as answer
from diffs;
```

For the example puzzle input, this correctly returns:
```
 answer 
--------
     11
(1 row)
```

{{< notice note >}}
I set up my Postgres database using: `createdb aoc`

Then I ran my script using: `psql -q -U postgres -f aoc01.sql -v filepath='/data' -v filename='aoc01_input.csv' aoc`
{{< /notice >}}

I was curious about performance, so I ran with `/timing` on my actual puzzle input and found that my SQL script runs in `2.3ms`. 
Not as bad as I expected, but my Python implementation is still much faster at `0.9ms`.

As a language designed for handling relational data, SQL isn't well-suited for array problems like these.
SQL's true puzzle solving power becomes more obvious when we start looking at graph + grid problems. 

# [2022 Day 8](https://adventofcode.com/2022/day/8)
[This puzzle]((https://adventofcode.com/2022/day/8)) is your typical Advent of Code grid problem. 
We're asked to count visible trees in a grid of tree heights. 
All trees along grid edges are visible.
Interior trees are visible if all neighbors have lower values.
Count up the visible trees.

{{< notice info >}}
I originally solved this problem in Rust using a brute force approach. 
My code is a [150 line mess](https://github.com/gibbyfree/aoc-2022/blob/master/rust/src/days/day08.rs), so I won't paste it in its entirety here. 

I had the foresight to document my high-level approach at the top:
```
/// this one took me the longest so far. it was a nightmare
/// 2d vec was a mistake.
/// using iter was a mistake. should've just used slices and indices
/// this is accomplished in a psychotic way
/// using the 'die' vars as semaphore-like things to keep my sums clean
/// anyway i hated every second of it.
```

So much to unpack. A tormented soul that unwittingly yearns for SQL.
{{< /notice >}}

We read puzzle input into `input_lines` just as we did for the previous problem.
Here's how we read `input_lines` into a `grid[x][y]`:

```sql
drop table if exists grid;
create table grid (
    row int,
    col int,
    val text
);

with unsplit as (
    select row, generate_series(1, length(line)) as col, line
    from input_lines
)
insert into grid (row, col, val)
select row, col, substring (line from col for 1)
from unsplit;
-- If you want to exclude cells from the grid (because they contain obstructions or something)
-- you can do that with a WHERE clause here.
```

We use [substring](https://www.postgresql.org/docs/9.1/functions-string.html) to split each line into characters and we use [generate_series](https://www.postgresql.org/docs/current/functions-srf.html) to set column indices on each character.

It's easy enough to write a query that counts visible trees along the edge of our grid:

```sql
with max_row as (
    select max(row) as max_row from grid
),
max_col as (
    select max(col) as max_col from grid
),
edges as (
    select row, col, val
    from grid, max_row as mr, max_col as mc
    where row = 1 or row = mr.max_row or col = 1 or col = mc.max_col
)
```

But how are we supposed to count visible trees in the grid's interior? 
To proceed further, we need to learn more about recursive queries.

## Aside: recursive queries
In SQL, a recursive query is generally shaped like this:

```sql
with recursive result as (
    -- base case
    select x
    from product
    where price > 0

    -- can also be UNION ALL
    union

    -- recursive case
    select r.x, s.y
    from result r, supply y
    where condition
)
```

The base query forms our initial result set. 
The recursive query defines how we want to grow our initial result set.
Each set is combined via `union`.
The recursive query will execute **until we stop generating new rows in the overall result set.**
This implicit termination condition is subtle - I found it difficult to understand at first, but it's core to the design of recursive queries in SQL.

{{< notice note >}}
The recursive query's termination condition means that the choice between `union` and `union all` can have massive implications for your query's correctness.

Remember:
- `union` removes duplicate records.
- `union all` does not remove duplicate records.

If you're using a recursive query to solve a path finding problem, `union` will eliminate duplicate visits from your result set.
`union all` will keep them, potentially allowing your path finding query to run forever.

This is easily solvable if we update our base case to contain some counter variable, iterate it in the recursive case, and include `where count < {limit}` in the recursive condition. 
I think it's simpler to select the best union from the outset.
{{< /notice >}}

Recursive queries can become even more expressive if we use forms like this:

```sql
with recursive result as (
    select row as curr_row
    from grid
    where row = 0

    union

    select 
        case 
            when g.curr_row = (select max(row) from grid) 
                then g.curr_row - 1 -- If at max row, move down
                else g.curr_row + 1 -- else, move down
        end as curr_row,
    from result r, grid g
    where r.curr_row = g.row
)
```

With `select case when`, we warp the powers of recursive queries such that we end up with something... vaguely iterative?
We don't need to use this technique for 2022 Day 8, but I wanted to mention this technique because I really feel like it's the key to unlocking SQL's Advent of Code potential.
It’s messy, but it helped me conceptualize SQL solutions I wouldn’t have considered possible before.

## Back to 2022 Day 8
Here's the recursive query that I used to solve 2022 Day 8:

```sql
with recursive trees as (
    -- edge trees are always visible
    select row, col, val
    from grid
    where row = 1 or col = 1 or row = (select max(row) from grid) or col = (select max(col) from grid)

    union

    -- check interior trees against their neighbors
    select g.row, g.col, g.val
    from grid g
    join trees t
        on (
            (g.row = t.row + 1 and g.col = t.col)
            or (g.row = t.row - 1 and g.col = t.col)
            or (g.row = t.row and g.col = t.col + 1)
            or (g.row = t.row and g.col = t.col - 1)
        )
    where g.val > t.val
)
select count(*) as answer
from trees;
```

It's almost magical, isn't it? Our initial set consists of all edges, and in the recursive case we check trees adjacent to known-visible trees. 
The output set will contain the edges and all interior cells that passed the recursive condition.

Although my SQL solution is obviously slower than my Rust solution, I find it amusing that my SQL solution is 1/3 the length of my Rust code.
SQL is also easier to debug in some cases.
If your result is too large or too small, it's easy to `select *` pretty print the output of each intermediate query + subquery. 

I've always hated solving grid problems with normal programming languages; there are so many indices and conditions to track, and mistakes are difficult to debug.
This might not be practical knowledge for everyone, but next time I’m struggling with a flood fill problem during Advent of Code, I’ll consider reaching for SQL.