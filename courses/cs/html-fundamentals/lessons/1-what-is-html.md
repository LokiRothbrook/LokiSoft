---
title: "Lesson 18: What is HTML? — Writing Your First Web Page"
date: 2026-05-19
author: LokiSoft Team
excerpt: Discover what HTML really is, how browsers parse it, and write your very first web page from scratch — DOCTYPE, html, head, body, and Live Server.
categories: shadcn-nextjs, HTML, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 18: What is HTML? — Writing Your First Web Page

> *"In the beginning God created the heavens and the earth."*
> — Genesis 1:1 (NIV)

---

## Quest Briefing: The Skeleton Awaits

Welcome to Section 2 — **The Skeleton of the Web**. You've set up your environment, you know how to track your work with Git. Now you write your first real thing: a web page.

HTML is where every web developer begins. Every website you have ever visited — from Google to Netflix to the simplest blog — is built on an HTML foundation. Before any fancy JavaScript, before any beautiful CSS, there is HTML giving the page its structure and meaning.

By the end of this lesson you will:
- Understand what HTML actually is and what it does
- Know how a browser parses an HTML document
- Create a proper `index.html` file from scratch
- Understand the DOCTYPE declaration, and the `html`, `head`, and `body` elements
- View your page live in a browser using Live Server

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 2 | Installing VS Code |
| Lesson 3 | VS Code Extensions (Live Server) |
| Lesson 5 | The Terminal |

You should have VS Code (or Cursor) and the **Live Server** extension installed.

---

## What Is HTML?

**HTML** stands for **HyperText Markup Language**. Let's unpack that:

- **HyperText** — Text that links to other text. The "hyper" links that connect web pages together are what make the web a *web* rather than just a collection of isolated documents.
- **Markup** — A system of annotations added to text to define its structure and meaning. HTML wraps text in **tags** that tell the browser: "this is a heading," "this is a paragraph," "this is an image."
- **Language** — A formal system of rules and syntax.

HTML is **not** a programming language. It has no variables, no logic, no loops. It is a description language — you describe the structure of a document, and the browser renders it. This is an important distinction and one that trips up beginners who wonder why their HTML "doesn't do anything" — you need CSS to style it and JavaScript to make it interactive.

### What HTML Describes

HTML gives every element on a web page its:
- **Type**: Is this a heading? A paragraph? An image? A link? A button?
- **Content**: What text, image, or nested elements does it contain?
- **Relationship**: Is this element inside another element? Before or after another?
- **Meaning (semantics)**: Is this navigation? An article? A footer? An aside?

<div data-info-box="info" data-title="HTML Describes Structure, Not Appearance">
HTML answers "what is this?" not "what does it look like?" A heading is a heading whether it's red or blue, big or small. CSS (covered in Section 3) handles appearance. Keeping this separation of concerns is a core principle of professional web development.
</div>

---

## How Browsers Parse HTML

When you type a URL and press Enter, here's what happens:

1. Your browser sends a request to a server
2. The server responds with an HTML file (and references to CSS, JS, images)
3. The browser reads the HTML **top to bottom**, character by character
4. As it reads, it builds a tree structure called the **DOM** (Document Object Model)
5. CSS is applied to the DOM nodes to determine visual appearance
6. JavaScript can then read and modify the DOM dynamically
7. The browser paints the final result to your screen

```
HTML File
    ↓
Browser Parser
    ↓
DOM Tree (the structured representation)
    ↓
+ CSS Rules applied
    ↓
+ JavaScript executed
    ↓
Visual Page on Screen
```

The DOM is a live, in-memory representation of your HTML as a tree of nodes. Each element becomes a node. Each node has parent nodes, child nodes, and sibling nodes. This tree is what JavaScript and CSS interact with.

<div data-toggle-box data-title="Deep Dive: The DOM as a Family Tree">

Think of the DOM like a family tree:

```
document
└── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── h1
        ├── p
        └── ul
            ├── li
            ├── li
            └── li
```

Every element has:
- **Parent**: The element directly containing it (`body` is the parent of `h1`)
- **Children**: Elements directly inside it (`ul` has three `li` children)
- **Siblings**: Elements with the same parent (`h1`, `p`, and `ul` are siblings)

Understanding this tree structure is fundamental to CSS (selecting elements) and JavaScript (traversing and manipulating the DOM).

</div>

---

## HTML Tags and Elements

HTML uses **tags** to mark up content. A tag is a keyword surrounded by angle brackets:

```html
<tagname>
```

Most elements have an **opening tag** and a **closing tag**, with content in between:

```html
<p>This is a paragraph.</p>
```

- `<p>` — opening tag
- `This is a paragraph.` — content
- `</p>` — closing tag (note the forward slash)
- The whole thing together — an **element**

Some elements are **void elements** (also called self-closing or empty elements). They have no content and no closing tag:

```html
<img src="photo.jpg" alt="A photo">
<br>
<hr>
<input type="text">
<meta charset="UTF-8">
<link rel="stylesheet" href="style.css">
```

<div data-info-box="hint" data-title="Self-Closing Slashes Are Optional in HTML5">
You may see void elements written as `<br />` or `<img />` with a trailing slash. This was required in XHTML (an older stricter format) and is still valid in HTML5 — but it's optional. Plain `<br>` and `<img>` are correct and preferred in modern HTML5. Both forms work; just be consistent.
</div>

### Attributes

Tags can have **attributes** that provide additional information:

```html
<a href="https://example.com" target="_blank">Click here</a>
```

- `href` — the attribute name
- `"https://example.com"` — the attribute value (always in quotes)
- `target="_blank"` — a second attribute

Attributes always go in the **opening tag**, never the closing tag.

---

## Your First HTML File

Let's build one. Create a new folder called `html-practice` and open it in VS Code:

**Linux / macOS:**
```bash
mkdir html-practice
cd html-practice
code .
```

**Windows (Command Prompt):**
```cmd
mkdir html-practice
cd html-practice
code .
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Name html-practice
cd html-practice
code .
```

Create a new file: **File → New File**, name it `index.html`.

<div data-info-box="info" data-title="Why index.html?">
Web servers, by convention, look for a file named `index.html` when a directory is requested. If you visit `https://example.com/about/`, the server looks for `about/index.html`. This convention has existed since the early web and is still universal today.
</div>

---

## The Anatomy of a Valid HTML Document

Type this exactly into `index.html` (or use the VS Code snippet `!` + Tab to auto-generate):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to my first web page. I built this with HTML.</p>
</body>
</html>
```

Let's go through every single line.

---

### Line 1: `<!DOCTYPE html>`

```html
<!DOCTYPE html>
```

This is the **Document Type Declaration**. It is not an HTML tag — it's an instruction to the browser. It tells the browser: "Parse this document as HTML5."

Without it, browsers enter **quirks mode** — a backwards-compatibility mode that mimics old browser bugs. With it, browsers use **standards mode** — rendering according to the modern HTML specification.

Always put it on the very first line of every HTML file. It's easy to forget and important to include.

<div data-info-box="warning" data-title="Always Include DOCTYPE">
Forgetting DOCTYPE is one of the most common beginner mistakes. Without it, your page may render differently across browsers, and CSS layouts can behave unexpectedly. Make it a reflex: every HTML file starts with `<!DOCTYPE html>`.
</div>

---

### Line 2: `<html lang="en">`

```html
<html lang="en">
```

The `<html>` element is the **root element** — every other element in the document is a descendant of this one. There is exactly one `<html>` element per page.

The `lang="en"` attribute declares the primary language of the page. This is:
- Used by screen readers to use the correct pronunciation
- Used by browsers to offer translation features
- Used by search engines to serve results to appropriate audiences
- Required for accessibility compliance

Use `lang="es"` for Spanish, `lang="fr"` for French, `lang="pt"` for Portuguese, etc.

---

### Lines 3–7: `<head>`

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
```

The `<head>` element contains **metadata** — information about the document that is not displayed on the page itself. Think of it as the document's file cabinet: settings, references, and descriptions that tell browsers and search engines how to handle the page.

We'll cover the head element thoroughly in Lesson 19. For now:

- `<meta charset="UTF-8">` — tells the browser to use UTF-8 character encoding (supports every language, emoji, and special character)
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` — tells mobile browsers not to zoom out by default (essential for responsive design)
- `<title>My First Web Page</title>` — the text shown in the browser tab and in search engine results

---

### Lines 8–12: `<body>`

```html
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to my first web page. I built this with HTML.</p>
</body>
```

The `<body>` element contains everything that is **visible on the page** — all the text, images, links, buttons, forms, and everything else the user sees and interacts with. There is exactly one `<body>` per page.

- `<h1>` — a level 1 heading (the most important, largest heading on the page)
- `<p>` — a paragraph of text

---

### Line 13: `</html>`

```html
</html>
```

The closing tag for the root element. The document is complete.

---

## Viewing Your Page with Live Server

Right-click anywhere inside `index.html` in VS Code and select **"Open with Live Server"** (or click the **Go Live** button in the bottom-right status bar).

Your browser opens automatically and shows your page. Notice:
- The `<h1>` text is large and bold
- The `<p>` text is smaller, with space above and below
- The tab title shows "My First Web Page"

Now make a change — update the `<h1>` text to something else and save the file. The browser refreshes automatically. That's Live Server's magic.

<div data-info-box="success" data-title="You Just Built a Web Page">
That page in your browser? That's real HTML being parsed and rendered by a real browser. The same fundamental process that renders every website in the world just ran for your file. Every professional web developer started exactly here.
</div>

---

## Indentation and Formatting

HTML doesn't care about whitespace — extra spaces, tabs, and newlines between elements are ignored when rendering. This makes indentation purely for humans.

**Good indentation:**
```html
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h1>Welcome</h1>
    </main>
</body>
```

Indent nested elements by 4 spaces (or 2 — pick one and be consistent). Your editor's Prettier extension handles this automatically when you save.

**Bad indentation (valid HTML, terrible readability):**
```html
<body><header><nav><ul><li><a href="/">Home</a></li></ul></nav></header><main><h1>Welcome</h1></main></body>
```

---

## VS Code Shortcuts for HTML

These will save you significant time:

| Shortcut | What It Does |
|----------|-------------|
| `!` then Tab | Generate a full HTML boilerplate |
| `html:5` then Tab | Same — full boilerplate |
| `tagname` then Tab | Create an opening and closing tag |
| `Ctrl+/` (Win/Linux) `Cmd+/` (Mac) | Toggle comment on selected lines |
| `Alt+Shift+F` (Win/Linux) `Shift+Option+F` (Mac) | Format/auto-indent the whole file |
| `Ctrl+Space` | Trigger autocomplete / suggestions |

The `!` + Tab shortcut generates the full boilerplate automatically so you never need to type it from scratch.

<div data-toggle-box data-title="HTML Comments — The Silent Notes">

You can add comments to HTML that are visible in the source code but never rendered on the page:

```html
<!-- This is a comment. The browser ignores this. -->

<p>This paragraph is visible.</p>

<!-- 
    Multi-line comments work too.
    Useful for temporarily disabling a section of HTML during development.
-->
```

Use comments to:
- Explain complex sections of HTML
- Mark the closing tags of large structures: `<!-- end header -->`
- Temporarily disable HTML for testing

Be careful: HTML comments are visible to anyone who views the page source. Never put passwords, internal notes about security flaws, or anything sensitive in comments.

</div>

---

## Build It Out: Flesh Out Your First Page

Before moving to Lesson 19, expand your `index.html` to practice what you've learned. Add more content inside the `<body>`:

```html
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to my first web page. I built this with HTML.</p>
    
    <h2>About This Page</h2>
    <p>This page was created during the LokiSoft Full-Stack Developer course. I am learning HTML from the ground up.</p>
    
    <h2>What I'm Learning</h2>
    <p>In this section of the course I am covering:</p>
    
    <h3>Section 2 — HTML</h3>
    <p>The foundation of every web page.</p>
    
    <h3>Section 3 — CSS</h3>
    <p>Making web pages look beautiful.</p>
</body>
```

Notice how headings create visual hierarchy automatically (h1 is biggest, h2 is smaller, h3 smaller still) — all from the browser's default styles, before any CSS is applied.

---

## Knowledge Check

<div data-quiz-group data-title="HTML Foundations">

<div data-quiz-question="What does DOCTYPE do at the top of an HTML file?" data-correct="1" data-explanation="The DOCTYPE declaration tells the browser to parse the document in standards mode (HTML5 mode). Without it, browsers enter 'quirks mode' — a backwards-compatibility mode that mimics old browser rendering bugs. This can cause CSS layouts to behave unexpectedly. DOCTYPE is not an HTML tag; it's a processing instruction that must be the very first thing in the file.">
<div data-quiz-option>It defines the document's title for browser tabs</div>
<div data-quiz-option>It tells the browser to use standards mode (HTML5) rather than quirks mode</div>
<div data-quiz-option>It links the HTML file to a CSS stylesheet</div>
<div data-quiz-option>It declares which programming language the page uses</div>
</div>

<div data-quiz-question="What is the DOM?" data-correct="2" data-explanation="The DOM (Document Object Model) is the browser's in-memory, tree-structured representation of the HTML document. When a browser parses HTML, it builds this tree of nodes — each element, attribute, and text node becomes a node in the tree. CSS uses the DOM to apply styles, and JavaScript uses the DOM to read and modify page content dynamically. The DOM is not the HTML file itself — it's a live, structured representation of it.">
<div data-quiz-option>A deprecated version of HTML used before HTML5</div>
<div data-quiz-option>The file system directory where HTML files are stored</div>
<div data-quiz-option>The browser's tree-structured, in-memory representation of the HTML document</div>
<div data-quiz-option>A database that stores web page content on the server</div>
</div>

<div data-quiz-question="Where does content that is VISIBLE to the user go in an HTML document?" data-correct="3" data-explanation="The <body> element contains everything visible on the page — text, images, links, buttons, forms, everything the user sees and interacts with. The <head> element contains metadata (document settings, external file references, SEO information) that is not visible but is important for how the page works and is discovered.">
<div data-quiz-option>Inside the &lt;head&gt; element</div>
<div data-quiz-option>Inside the &lt;html&gt; element but outside both &lt;head&gt; and &lt;body&gt;</div>
<div data-quiz-option>Inside the &lt;meta&gt; elements</div>
<div data-quiz-option>Inside the &lt;body&gt; element</div>
</div>

<div data-quiz-question="Why is the lang attribute on the &lt;html&gt; element important?" data-correct="0" data-explanation="The lang attribute declares the primary language of the page. Screen readers use it to select the correct language for text-to-speech pronunciation. Browsers use it to offer translation. Search engines use it to serve the page to appropriate audiences. It's also required for accessibility compliance (WCAG guidelines). Always include lang='en' (or your page's language) on the root html element.">
<div data-quiz-option>It helps screen readers use correct pronunciation, enables browser translation, and improves SEO and accessibility</div>
<div data-quiz-option>It changes the language of error messages shown in the browser console</div>
<div data-quiz-option>It sets the language of the CSS stylesheet linked to the page</div>
<div data-quiz-option>It controls which keyboard layout is available to users on the page</div>
</div>

</div>

---

## What's Next

You've written your first real HTML document. In **Lesson 19**, you'll go deep inside the `<head>` element — the powerful hidden layer that controls your page's metadata, character encoding, responsive behavior, SEO description, stylesheet linking, and script loading. It's one of the most important and underappreciated parts of HTML.

---

## A Prayer for Beginnings

*Lord, every great thing starts with a first step — and these students have just taken theirs. A blank file became a real, browser-rendered web page. That is not small.*

*As they continue building, may they never lose the wonder of that first moment — when code becomes something visible, something real. Keep their curiosity alive through the harder lessons ahead.*

*May the foundations they build here be strong, so everything they create on top of them stands firm.*

*In Jesus' name, Amen.*

---

> *"For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."*
> — Ephesians 2:10 (NIV)
