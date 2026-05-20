---
title: "Lesson 21: Text Formatting Elements — Making Words Mean More"
date: 2026-05-19
author: LokiSoft Team
excerpt: Master every HTML inline text element — strong vs b, em vs i, mark, sub, sup, abbr, cite, blockquote, code, pre, kbd, and more — and learn why semantic choice matters.
categories: shadcn-nextjs, HTML, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 21: Text Formatting Elements — Making Words Mean More

> *"The tongue has the power of life and death, and those who love it will eat its fruit."*
> — Proverbs 18:21 (NIV)

---

## Quest Briefing

HTML has a rich library of inline elements for marking up text — but many beginners use only `<b>` and `<i>`, missing the nuance of what the other elements communicate. There is a meaningful difference between `<strong>` (this content is critically important) and `<b>` (this text is styled bold for typographic reasons, without importance).

This lesson covers every significant text formatting element. By the end you'll use each one for its actual semantic purpose, producing HTML that communicates meaning to browsers, search engines, and assistive technologies — not just to human eyes.

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 18 | What is HTML? |
| Lesson 20 | Headings and Paragraphs |

---

## The Semantic vs. Presentational Distinction

Before the elements, understand this principle:

- **Semantic elements** communicate meaning: "this text is important," "this text is a technical term," "this is a quotation"
- **Presentational elements** communicate appearance: "make this bold," "make this italic"

HTML5 prefers semantic elements. When the meaning and the visual result happen to match (both `<strong>` and `<b>` make text bold), choose the semantic one. Screen readers announce `<strong>` with emphasis; they do nothing special with `<b>`. Search engines weight `<strong>` content more heavily.

---

## Importance and Emphasis

### `<strong>` — Strong Importance

```html
<p>Before opening the electrical panel, <strong>turn off the main breaker</strong>.</p>
```

`<strong>` marks content as **critically important** — something the reader must not miss. Screen readers typically announce this with increased emphasis. Browsers render it bold by default.

Use for: warnings, critical instructions, key terms being defined, genuinely important information.

### `<b>` — Typographic Bold (No Importance)

```html
<p>The recipe calls for <b>unsalted butter</b>, <b>all-purpose flour</b>, and <b>granulated sugar</b>.</p>
```

`<b>` makes text visually bold **without implying importance**. Use it for text that is bold for purely stylistic/typographic reasons — like keywords in a document summary, product names in a list, or lead sentences in a paragraph.

**Quick rule:** If removing the emphasis would make the content less important → `<strong>`. If it would just look less visually distinct → `<b>`.

### `<em>` — Stress Emphasis

```html
<p>I never said she <em>stole</em> the money. (She did something else with it.)</p>
<p>I never said <em>she</em> stole the money. (Someone else did.)</p>
```

`<em>` marks text with **stress emphasis** — the way you'd stress a word when speaking aloud to change meaning. Screen readers change their tone for `<em>` content. Browsers render it italic.

Notice how `<em>` on different words completely changes the meaning of the sentence above.

### `<i>` — Typographic Italic (No Stress)

```html
<p>The scientific name of the domestic cat is <i>Felis catus</i>.</p>
<p>She woke with a sudden feeling of <i>déjà vu</i>.</p>
<p>The word <i>serendipity</i> comes from a Persian fairy tale.</p>
```

`<i>` renders text italic **without stress emphasis**. Use it for:
- Scientific names (*Homo sapiens*)
- Foreign language words and phrases (*schadenfreude*)
- Technical terms being introduced
- Titles of works (though `<cite>` is more semantically appropriate)
- Thoughts in fiction ("She thought, *this can't be happening*")

---

## Marking Up Text

### `<mark>` — Highlighted / Relevant

```html
<p>The search returned: "...the <mark>HTML</mark> specification defines over 100 elements..."</p>
```

`<mark>` represents text that is **highlighted for relevance** in the current context. It's semantically perfect for search result highlighting. Browsers render it with a yellow background by default.

Don't confuse with `<strong>` — `<mark>` means "this is relevant right now" (context-dependent), not "this is always important."

### `<u>` — Unarticulated Annotation

```html
<p>The report contained several <u>mispelled</u> words that damaged credibility.</p>
```

In HTML5, `<u>` represents text with a **non-textual annotation** — typically rendered as an underline. Its primary use case is marking misspellings or proper names in Chinese text. Avoid using it for links (users expect underlines to be clickable) or general emphasis.

### `<s>` — Strikethrough / No Longer Accurate

```html
<p>Regular price: <s>$99.99</s> Sale price: $49.99</p>
```

`<s>` marks text as **no longer accurate or relevant**. Browsers render it with a line through the middle. It's semantically different from `<del>` (which marks deleted text in an edit).

---

## Small, Sub, and Sup

### `<small>` — Fine Print

```html
<p>One-year warranty included. <small>Extended warranty available for additional cost. Void where prohibited by law.</small></p>
```

`<small>` represents **fine print, legal disclaimers, copyright notices, and secondary information**. Browsers render it at a smaller font size.

### `<sub>` — Subscript

```html
<p>Water is composed of two hydrogen atoms and one oxygen atom: H<sub>2</sub>O</p>
<p>The formula for carbon dioxide is CO<sub>2</sub>.</p>
```

`<sub>` renders text below the baseline in a smaller size. Used for chemical formulas, footnote references, and mathematical expressions.

### `<sup>` — Superscript

```html
<p>Einstein's famous equation is E = mc<sup>2</sup>.</p>
<p>The area of a circle is πr<sup>2</sup>.</p>
<p>This claim requires a citation.<sup>1</sup></p>
```

`<sup>` renders text above the baseline in a smaller size. Used for exponents, ordinals (1<sup>st</sup>, 2<sup>nd</sup>), footnote numbers, and trademark symbols (though `&trade;` is better for that).

---

## Quotations

### `<blockquote>` — Block Quotation

```html
<blockquote cite="https://www.biblegateway.com/passage/?search=John+3%3A16">
    <p>For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.</p>
    <footer>— John 3:16 (NIV)</footer>
</blockquote>
```

`<blockquote>` marks a **long quotation** from another source, displayed as an indented block. The optional `cite` attribute holds the URL of the source (not displayed, but useful for tools and accessibility).

Browsers indent blockquotes by default; CSS will style them properly.

### `<q>` — Inline Quotation

```html
<p>According to the HTML specification, <q>the q element represents some phrasing content quoted from another source.</q></p>
```

`<q>` marks a **short, inline quotation**. Browsers automatically add quotation marks around it (locale-appropriate marks — curly quotes in English, guillemets in French, etc.). Don't add your own quotation mark characters when using `<q>`.

### `<cite>` — Citation / Title of Work

```html
<p>I just finished reading <cite>The Pragmatic Programmer</cite> — highly recommended for any developer.</p>
<p>The painting <cite>Starry Night</cite> was created by Vincent van Gogh in 1889.</p>
```

`<cite>` marks the title of a creative work — book, article, film, song, painting, software. Browsers render it italic. It's more semantically precise than `<i>` for titles.

<div data-info-box="info" data-title="cite vs blockquote's cite Attribute">
`<cite>` (element) marks a title of a work. The `cite` attribute on `<blockquote>` holds a URL pointing to the source. They're related in name but different in purpose — don't confuse them.
</div>

---

## Abbreviations and Definitions

### `<abbr>` — Abbreviation

```html
<p>The <abbr title="World Wide Web Consortium">W3C</abbr> maintains the HTML specification.</p>
<p>Make sure you add the <abbr title="Document Object Model">DOM</abbr> manipulation after the page loads.</p>
```

`<abbr>` marks an abbreviation or acronym. The `title` attribute provides the full expansion — shown as a tooltip on hover in most browsers. Screen readers can announce the expansion.

Best practice: use `<abbr>` the first time an abbreviation appears on a page; subsequent uses can be plain text.

### `<dfn>` — Definition

```html
<p>A <dfn>semantic element</dfn> is an HTML tag that describes its content's meaning, not just its appearance.</p>
```

`<dfn>` marks the term being defined in a definition or explanation. Typically rendered italic. Useful for glossary entries and technical documentation.

---

## Code and Technical Content

### `<code>` — Inline Code

```html
<p>Use the <code>git commit</code> command to save your changes to history.</p>
<p>Set <code>display: flex</code> on the container to use flexbox.</p>
```

`<code>` represents a fragment of code, a command, a filename, or any computer-related text. Browsers render it in a monospace font. Always use `<code>` for any technical term that is literally typed on a keyboard.

### `<pre>` — Preformatted Text

```html
<pre>
function greet(name) {
    const message = `Hello, ${name}!`;
    console.log(message);
    return message;
}
</pre>
```

`<pre>` preserves **whitespace, line breaks, and indentation** exactly as typed. It's the exception to HTML's normal whitespace collapsing. Used for displaying code blocks, ASCII art, or any content where formatting is significant.

Typically `<pre>` and `<code>` are combined for code blocks:

```html
<pre><code>
function hello() {
    console.log("Hello, World!");
}
</code></pre>
```

### `<kbd>` — Keyboard Input

```html
<p>Press <kbd>Ctrl</kbd>+<kbd>C</kbd> to copy on Windows and Linux.</p>
<p>Press <kbd>Cmd</kbd>+<kbd>C</kbd> to copy on macOS.</p>
<p>To save in VS Code, press <kbd>Ctrl</kbd>+<kbd>S</kbd>.</p>
```

`<kbd>` represents **keyboard input** — specific keys the user should press. Usually rendered in a monospace font, sometimes styled to look like physical keys with CSS.

### `<samp>` — Sample Output

```html
<p>After running the command, you should see:</p>
<samp>Initialized empty Git repository in /home/user/project/.git/</samp>
```

`<samp>` marks **sample output from a computer program**. Less commonly used than `<code>` and `<kbd>`, but semantically correct for terminal output examples.

### `<var>` — Variable

```html
<p>The formula is: <var>a</var><sup>2</sup> + <var>b</var><sup>2</sup> = <var>c</var><sup>2</sup></p>
```

`<var>` represents a **variable** in a mathematical expression or programming context. Rendered italic.

---

## Quick Reference Table

| Element | Renders As | Semantic Meaning |
|---------|-----------|-----------------|
| `<strong>` | **Bold** | Critically important |
| `<b>` | **Bold** | Typographic bold, no importance |
| `<em>` | *Italic* | Stress emphasis (changes meaning) |
| `<i>` | *Italic* | Typographic italic, no stress |
| `<mark>` | ==Highlight== | Relevant/highlighted text |
| `<u>` | Underline | Non-textual annotation |
| `<s>` | ~~Strikethrough~~ | No longer accurate |
| `<small>` | smaller | Fine print / secondary |
| `<sub>` | H₂O | Subscript |
| `<sup>` | E=mc² | Superscript |
| `<blockquote>` | Indented block | Long quotation |
| `<q>` | "Inline quote" | Short inline quotation |
| `<cite>` | *Italic* | Title of a creative work |
| `<abbr>` | Abbreviation | Abbreviation with full form in title |
| `<code>` | `monospace` | Code fragment, command, filename |
| `<pre>` | preserves whitespace | Preformatted text block |
| `<kbd>` | `Ctrl` | Keyboard key or input |

---

## Knowledge Check

<div data-quiz-group data-title="Text Formatting Elements">

<div data-quiz-question="What is the difference between &lt;strong&gt; and &lt;b&gt;?" data-correct="2" data-explanation="Both render as bold text visually, but they have different semantic meanings. &lt;strong&gt; communicates that the content is critically important — screen readers emphasize it, and search engines weight it more heavily. &lt;b&gt; is purely typographic bold with no implied importance — for keywords in summaries, product names in lists, etc. Always choose based on meaning, not appearance.">
<div data-quiz-option>&lt;strong&gt; is for bold text; &lt;b&gt; is deprecated and should not be used</div>
<div data-quiz-option>&lt;strong&gt; makes text bigger and bold; &lt;b&gt; only makes it bold</div>
<div data-quiz-option>&lt;strong&gt; indicates critical importance (affects screen readers and SEO); &lt;b&gt; is typographic bold with no semantic importance</div>
<div data-quiz-option>They are identical — just two names for the same element</div>
</div>

<div data-quiz-question="Which element should you use to mark a keyboard shortcut like Ctrl+S?" data-correct="3" data-explanation="The &lt;kbd&gt; element represents keyboard input — specific keys or key combinations the user should press. It's semantically correct for documenting keyboard shortcuts and is rendered in a monospace font by default. &lt;code&gt; is for code fragments and commands; &lt;samp&gt; is for computer output; &lt;var&gt; is for variables.">
<div data-quiz-option>&lt;code&gt;Ctrl+S&lt;/code&gt;</div>
<div data-quiz-option>&lt;samp&gt;Ctrl+S&lt;/samp&gt;</div>
<div data-quiz-option>&lt;var&gt;Ctrl+S&lt;/var&gt;</div>
<div data-quiz-option>&lt;kbd&gt;Ctrl&lt;/kbd&gt;+&lt;kbd&gt;S&lt;/kbd&gt;</div>
</div>

<div data-quiz-question="What is the correct HTML for the chemical formula H₂O?" data-correct="1" data-explanation="Subscript text (below the baseline, smaller) is marked with the &lt;sub&gt; element. The 2 in H₂O appears below the baseline, so it's H&lt;sub&gt;2&lt;/sub&gt;O. Superscript (&lt;sup&gt;) is for text above the baseline, like exponents. Never use special Unicode subscript characters (₂) in code — &lt;sub&gt; is semantic and accessible.">
<div data-quiz-option>H&lt;sup&gt;2&lt;/sup&gt;O</div>
<div data-quiz-option>H&lt;sub&gt;2&lt;/sub&gt;O</div>
<div data-quiz-option>H&lt;small&gt;2&lt;/small&gt;O</div>
<div data-quiz-option>H₂O (just type the Unicode character)</div>
</div>

<div data-quiz-question="Which element marks a title of a creative work like a book, film, or song?" data-correct="0" data-explanation="&lt;cite&gt; is the semantic element for titles of creative works — books, articles, films, songs, paintings, software. It renders italic by default. While &lt;i&gt; also renders italic, &lt;cite&gt; is more semantically precise for this purpose, allowing tools and screen readers to understand you're referencing a title, not just stylizing text.">
<div data-quiz-option>&lt;cite&gt;</div>
<div data-quiz-option>&lt;title&gt;</div>
<div data-quiz-option>&lt;q&gt;</div>
<div data-quiz-option>&lt;ref&gt;</div>
</div>

<div data-quiz-question="What does &lt;pre&gt; do that regular HTML doesn't?" data-correct="3" data-explanation="HTML normally collapses all whitespace (multiple spaces become one, newlines are ignored). The &lt;pre&gt; element preserves whitespace exactly as written — including multiple spaces, tabs, and newlines. This makes it essential for displaying code blocks, ASCII art, or any content where the exact formatting is part of the meaning. It's typically combined with &lt;code&gt; for code blocks.">
<div data-quiz-option>It prevents the enclosed text from being indexed by search engines</div>
<div data-quiz-option>It preloads the text content before the rest of the page renders</div>
<div data-quiz-option>It applies browser-default monospace font styling without preserving whitespace</div>
<div data-quiz-option>It preserves whitespace, line breaks, and indentation exactly as written in the HTML source</div>
</div>

</div>

---

## What's Next

You now know how to add meaning to every word on your page. In **Lesson 22**, you'll connect pages together with the most important element in the entire web: the anchor tag `<a>`. You'll learn absolute vs. relative paths, how to open links in new tabs safely, how to link to email addresses and phone numbers, and how to create within-page navigation with IDs.

---

## A Prayer for Meaningful Words

*Lord, words matter. The things we say — and how we say them — shape the world around us. As these students learn to mark up text with precision and intention, may they carry that same care into how they speak and write in life.*

*Give them the wisdom to choose their words well: to emphasize what truly matters, to quote accurately, to cite their sources, and to communicate with both clarity and kindness.*

*May everything they build reflect the care of craftspeople who know that details matter.*

*In Jesus' name, Amen.*

---

> *"Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs, that it may benefit those who listen."*
> — Ephesians 4:29 (NIV)
