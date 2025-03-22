+++
title = 'Building a basic text editor in Rust'
summary = 'Apparently, the gateway drug to kernel development'
description = 'Implementing Kilo in Rust'
date = '2024-12-28'
tags = ['Rust', 'project', 'intermediate']
keywords = ['rust', 'project', 'kilo', 'text editor']
showReadingTime = false
showComments = true
+++
{{< lead >}}
Apparently, the gateway drug to kernel development
{{< /lead >}}

Two years ago, I came across [this excellent tutorial](https://viewsourcecode.org/snaptoken/kilo/) written by snaptoken. 
It walks through the process of building [a small text editor](https://antirez.com/news/108) in C. 
I don't really enjoy following along with code tutorials verbatim, so I thought it would be a fun challenge to use snaptoken's tutorial as a general reference and implement the text editor in Rust instead. 
I effectively treated the tutorial like a product manager and came away from each chapter with a new list of features to implement:

### [Chapter 2](https://viewsourcecode.org/snaptoken/kilo/02.enteringRawMode.html)
- Enable [raw mode](https://en.wikipedia.org/wiki/Terminal_mode). 
Write each `stdin` char to `stdout`. 
`Ctrl` indicates a carriage return. 
`q` indicates that the user wants to quit. 
`Ctrl-#` combinations (e.g., `Ctrl-Z`) should be ignored.

### [Chapter 3](https://viewsourcecode.org/snaptoken/kilo/03.rawInputAndOutput.html)
- Clear the screen on startup, shutdown, and on tick. 
- Draw a tilde border on the left-hand side of the screen. 
- Render a cursor in the first position of the first line.
- Replace `println!()` with `write!()`s to a `BufWriter`.
- Display a welcome message at the bottom of the screen.
- Allow the user to move their cursor using arrow keys. 
Cursor info should be stored in global state. 
Don't allow the cursor to move offscreen.
- `Page Up` and `Page Down` can snap the cursor to the top and bottom of the screen.
- `Home` and `End` can snap the cursor to the beginning and end of the current line.

### [Chapter 4](https://viewsourcecode.org/snaptoken/kilo/04.aTextViewer.html)
- If run with a filename argument, read the file into memory.
- Enable vertical scrolling through a long text file. 
Enable horizontal scrolling on long lines. 
*(Basically, allow users to scroll offscreen if the text allows it.)*
- Snap to the next line if the user scrolls past the end of a line. 
Snap to the previous line if the user scrolls left at the beginning of a line.
- Update `Page Up` and `Page Down` to scroll up and down the entire page.
- Display a status bar that includes the filename, # of lines in the file, and current line number. 
If the file has no name, display `[No Name]`.
- Render key binding hints in the status bar (e.g., `Ctrl-Q = quit`). 
Display on startup and hide 5 seconds after the user presses a key.

### [Chapter 5](https://viewsourcecode.org/snaptoken/kilo/05.aTextEditor.html)
- Allow saving to disk via `Ctrl-S`.
- Track "dirtiness" in global state. 
The buffer is "dirty" if it has been modified since opening or saving the file. 
- Require `Ctrl-Q` 3x to confirm quitting with unsaved changes.
- Implement `Backspace`. 
Backspacing at the beginning of a line should wrap the line onto the previous line. 
If there is no previous line, do nothing.
- Implement `Delete`.
Deleting at the end of a line should wrap onto the next line.
If there is no next line, do nothing.
- Implement `Enter`. 
This can insert new lines or split a line into two lines.
- Prompt the user to input a filename when saving a new file.
- Allow `Backspace` in prompt input.

### [Chapter 6](https://viewsourcecode.org/snaptoken/kilo/06.search.html)
- Implement search with `Ctrl-F`.
	- The user inputs their query into the prompt bar. 
    On each keypress, the cursor snaps to a string that contains their query substring.
	- When search is cancelled with `Escape`, restore the cursor to its original position.
	- Users can browse through substring matches using arrow keys. 
    `Left`/`Up` to move to the previous match, `Right`/`Down` to move to the next match.

### [Chapter 7](https://viewsourcecode.org/snaptoken/kilo/07.syntaxHighlighting.html)
- Implement basic C syntax highlighting.
	- Digits are red. 
    Search results are blue. 
    Strings are magenta. 
    Single-line and multi-line comments are cyan. 
    Types are green. 
    Keywords are yellow. 
	- Syntax highlighting should only appear if the open filename ends with `.c`.
	- Search result highlighting should overwrite other highlighting. 
    Original highlighting should be restored when search is cancelled.

## Crates I used
- [termion]((https://docs.rs/termion/latest/termion/)): This looked like the simplest way to enable raw mode without C interop. (Avoiding C interop was my only self-imposed rule for this project; after all, I wanted to have fun :yum:) Cursor rendering and text rendering also met all my requirements and was simple enough to use.
- [termsize]((https://docs.rs/termsize/latest/termsize/)): I used this to get terminal window size on startup. (I never actually updated my implementation to handle mid-session window resizes...)
- [unicode_segmentation]((https://unicode-rs.github.io/unicode-segmentation/unicode_segmentation/index.html)): I used this to split strings on [grapheme cluster boundaries](https://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries) instead of character boundaries. 
This ensures that a character with a diacritic like `ä` is kept together as a single element instead of split apart (also allows the text editor to support other exotic Unicode input like emoji, Cyrillic, etc.)

## My experience

I had a heck of a time with this project overall. 
I dropped it twice: once in 2022 because I was intimidated by Chapter 6, and another time in mid 2023 because I was intimidated by Chapter 7 and sick of looking at my years old over-engineered code. 

It didn't take long for my code to diverge *significantly* from snaptoken's code. 
It started with, "oh, well I can't really do that in Rust, so I have to do it this other way instead," and ended with, "yeahhh, my design is nothing like that, I have to do this differently". 

The final structure that I ended up with is mind-boggling, to be honest:

```
📂src
 ┣ 📂backend
 ┃ ┣ cursor.rs
 ┃ ┣ mod.rs
 ┃ ┣ operations.rs
 ┃ ┗ prompt.rs
 ┣ 📂data
 ┃ ┣ enums.rs
 ┃ ┣ mod.rs
 ┃ ┣ payload.rs
 ┃ ┗ textrow.rs
 ┣ 📂gfx
 ┃ ┣ controller.rs
 ┃ ┣ mod.rs
 ┃ ┗ render.rs
 ┣ input.rs
 ┣ main.rs
 ┗ utils.rs
 ```

The `RenderController` owns a `CursorHandler` and an `OperationsHandler`. 
The `OperationsHandler` is a middle layer between the `RenderController`, `RenderDriver`, and `PromptProcessor`. Lol? 

This object-oriented approach must have been veryyy satisfying for me to build out in 2022, but it quickly became a [rat king](https://en.wikipedia.org/wiki/Rat_king) as I had to wrestle with issues like: "how do I pass data from the PromptProcessor to its parent's parent RenderController!?!?" 
If implementing a text editor is truly a gateway drug into kernel development, then I overdosed.

Kilo is considered a simple project because it can be implemented with ~1000 lines of code. 
Running [tokei](https://github.com/XAMPPRocky/tokei) on my repo tells a grim tale:

```
===================================================================
 Language            Files        Lines         Code     Comments
===================================================================
 C                       1           28           18            4
 Markdown                1           13            0           10
 Rust                   14         1897         1410          299
 TOML                    1           12            9            1
===================================================================
 Total                  17         1950         1437          314
===================================================================
```

You're invited to gawk at my repo for yourself:

{{< github repo="gibbyfree/gram" >}}

Over-abstraction aside, I had a lot of fun implementing all of these features. 
It's easy to dream up a bunch of potential extensions to Kilo. 
I've had enough of text editor development for the time being :slightly_smiling_face: but I *was* tempted to implement automated testing.
It was tedious to get through Chapter 6 + 7 when large code changes required me to manually check for regressions in all previously implemented features. 
Someday, I might try compiling my code to WASM or rebuilding with [xterm-js-rs](https://github.com/segeljakt/xterm-js-rs) so I can get the app web-embeddable. 