---
title: "Lesson 22: Links and Navigation — Connecting the World"
date: 2026-05-19
author: LokiSoft Team
excerpt: Master HTML anchor tags — absolute vs relative paths, opening links safely in new tabs, mailto and tel links, linking to page sections with IDs, and the download attribute.
categories: shadcn-nextjs, HTML, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 22: Links and Navigation — Connecting the World

> *"A cord of three strands is not quickly broken."*
> — Ecclesiastes 4:12 (NIV)

---

## Quest Briefing

The humble `<a>` tag is the most important element in all of HTML. It is literally the element that makes the World Wide Web a *web* — the thing that connects page to page, site to site, idea to idea. Before the hyperlink, digital documents were isolated islands. The anchor tag bridges them all.

This lesson covers everything about links: how they work, how to build them correctly, and the security and accessibility practices that separate amateurs from professionals.

By the end of this lesson you will:
- Create links to external pages, internal pages, and files
- Understand the critical difference between absolute and relative URLs
- Open links in new tabs safely (with `rel="noopener"`)
- Link to email addresses and phone numbers
- Create smooth same-page navigation with IDs
- Use the download attribute

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 18 | What is HTML? |
| Lesson 20 | Headings and Paragraphs |

---

## The Anchor Element

```html
<a href="https://example.com">Visit Example</a>
```

- `<a>` — the anchor element
- `href` — **hypertext reference** — the URL this link points to
- The content between the tags — the **link text** (what the user clicks)

The anchor element is **inline** — it flows within text:

```html
<p>Learn more about HTML at <a href="https://developer.mozilla.org">MDN Web Docs</a>, the best reference for web developers.</p>
```

---

## Absolute vs. Relative URLs

Understanding this distinction is fundamental to web development.

### Absolute URLs

An **absolute URL** is a complete address including the protocol and domain:

```html
<a href="https://github.com/your-username/my-repo">My GitHub Repo</a>
<a href="https://example.com/about">About Page (on another site)</a>
```

Use absolute URLs when linking to **external websites** — sites with a different domain than yours.

### Relative URLs

A **relative URL** is a path relative to the current file's location:

```html
<!-- Assuming current file is: /pages/about.html -->

<!-- Link to a file in the same folder -->
<a href="contact.html">Contact</a>

<!-- Link to a file in a subfolder -->
<a href="projects/portfolio.html">My Portfolio</a>

<!-- Link to a file one level up -->
<a href="../index.html">Home</a>

<!-- Link to a file from the root of the site -->
<a href="/blog/post-1.html">Blog Post 1</a>
```

Use relative URLs when linking **within your own site**. They're shorter, portable (work even if you move your site to a different domain), and faster for the browser to resolve.

### Path Reference Chart

Given this file structure:
```
site/
├── index.html
├── about.html
├── blog/
│   ├── post-1.html
│   └── post-2.html
└── assets/
    └── image.jpg
```

| From | To | Relative URL |
|------|----|-------------|
| `index.html` | `about.html` | `about.html` |
| `index.html` | `blog/post-1.html` | `blog/post-1.html` |
| `blog/post-1.html` | `index.html` | `../index.html` |
| `blog/post-1.html` | `about.html` | `../about.html` |
| `blog/post-1.html` | `blog/post-2.html` | `post-2.html` |
| Any file | From site root | `/about.html` |

The leading `/` means "start from the site root." This is extremely convenient — you can use root-relative paths from any file without worrying about how many `../` to prepend.

---

## Opening Links in a New Tab

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Open in new tab</a>
```

The `target="_blank"` attribute tells the browser to open the link in a new tab (or window). This is common for external links — keeping the user on your site while they explore the linked resource.

### The Security Issue: `rel="noopener noreferrer"`

This is critical and often skipped by beginners. Without `rel="noopener"`, the new tab can access your page via `window.opener` — a JavaScript property. A malicious external site could use this to redirect your original tab to a phishing page after the user clicks away.

```html
<!-- VULNERABLE: opener access not blocked -->
<a href="https://evil-site.com" target="_blank">Click me</a>

<!-- SAFE: opener access blocked -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Safe link</a>
```

- `rel="noopener"` — prevents the new tab from accessing `window.opener`
- `rel="noreferrer"` — additionally prevents sending the Referer header (hides which page the user came from)

**Always include `rel="noopener noreferrer"` whenever you use `target="_blank"`.**

<div data-info-box="hint" data-title="Modern Browsers Add noopener Automatically">
Modern browsers (Chrome 88+, Firefox 79+, Safari 12.1+) automatically apply `noopener` behavior when `target="_blank"` is present — even without the `rel` attribute. But you should still write it explicitly for:
1. Older browser support
2. Code clarity — making your intent obvious
3. `noreferrer` (which still needs to be explicit)
</div>

---

## Link Text — Accessibility Matters

The link text (what appears between `<a>` and `</a>`) should clearly describe where the link goes. Screen reader users often hear a list of all links on a page — "click here, click here, read more, click here" is useless.

**Bad link text:**
```html
<p>To learn about accessibility, <a href="/a11y">click here</a>.</p>
<p><a href="/blog">Read more</a> about our latest posts.</p>
```

**Good link text:**
```html
<p>Learn about <a href="/a11y">web accessibility best practices</a>.</p>
<p>Read our <a href="/blog">latest blog posts</a>.</p>
```

The good versions make sense out of context. A screen reader user who hears "web accessibility best practices" knows exactly what they'll get if they follow that link.

---

## Linking to Page Sections with IDs

You can link to any element on a page by giving it an `id` attribute and using `#id` in the `href`:

```html
<!-- The target element on the same page -->
<h2 id="installation">Installation</h2>

<!-- A link that jumps to that element -->
<a href="#installation">Jump to Installation</a>

<!-- A link from another page to that section -->
<a href="/docs/getting-started#installation">Installation Instructions</a>
```

When clicked, the browser scrolls the page so the target element is visible at the top of the viewport.

### Building a Table of Contents

```html
<nav>
    <h2>Contents</h2>
    <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#configuration">Configuration</a></li>
        <li><a href="#usage">Usage</a></li>
    </ul>
</nav>

<h2 id="introduction">Introduction</h2>
<p>...</p>

<h2 id="prerequisites">Prerequisites</h2>
<p>...</p>

<h2 id="installation">Installation</h2>
<p>...</p>
```

### ID Rules

- IDs must be **unique** per page — no two elements can share the same ID
- IDs should not contain spaces (use hyphens: `id="my-section"`)
- IDs are case-sensitive: `#Introduction` ≠ `#introduction`

<div data-info-box="warning" data-title="Smooth Scrolling">
By default, clicking an anchor link jumps immediately to the target. For a smooth scroll animation, add this to your CSS:

```css
html {
    scroll-behavior: smooth;
}
```

This is a single CSS property that works across all modern browsers and transforms abrupt jumps into elegant scrolling.
</div>

---

## mailto: and tel: Links

### Email Links

```html
<a href="mailto:hello@example.com">Email Us</a>

<!-- With subject line and body (URL-encoded) -->
<a href="mailto:support@example.com?subject=Help%20Request&body=Hi%2C%20I%20need%20help%20with...">Contact Support</a>
```

`mailto:` links open the user's default email client with the address pre-filled. The `?subject=` and `&body=` parameters pre-fill those fields.

<div data-info-box="hint" data-title="Spam Bots and mailto Links">
Plain `mailto:` links are scraped by spam bots that harvest email addresses from web pages. If spam is a concern, consider:
- Using a contact form instead
- JavaScript-obfuscating the email (though determined bots can still find it)
- Displaying the address as an image (bad for accessibility)
- Using a third-party form service like Formspree

For personal projects and learning, plain `mailto:` links are fine.
</div>

### Phone Number Links

```html
<a href="tel:+15555551234">Call Us: (555) 555-1234</a>

<!-- Mobile users can tap to call; desktop users see the number -->
<a href="tel:+442071234567">+44 20 7123 4567</a>
```

`tel:` links open the phone dialer on mobile devices. Always use the international format starting with `+` and the country code.

---

## The `download` Attribute

```html
<a href="/files/annual-report.pdf" download>Download Annual Report (PDF)</a>

<!-- Specify a custom filename -->
<a href="/files/report-2026.pdf" download="LokiSoft-Annual-Report-2026.pdf">
    Download Annual Report
</a>
```

The `download` attribute tells the browser to download the file instead of navigating to it. Without `download`, clicking a PDF link opens it in the browser; with `download`, it saves to the user's Downloads folder.

The optional value of `download` sets the filename the user's browser saves it as.

<div data-info-box="warning" data-title="download Only Works for Same-Origin Files">
The `download` attribute only works for files on the same domain as your page, or for files the server sends with the correct `Content-Disposition: attachment` header. Cross-origin files (from a different domain) will navigate to the file instead of downloading it, even with the `download` attribute.
</div>

---

## Linking to Phone and App Protocols

Beyond `http://`, `https://`, `mailto:`, and `tel:`, there are other protocols you may encounter:

```html
<!-- SMS link (mobile) -->
<a href="sms:+15555551234">Send us a text</a>

<!-- WhatsApp deep link -->
<a href="https://wa.me/15555551234">Chat on WhatsApp</a>

<!-- FTP (rarely used in modern web) -->
<a href="ftp://files.example.com/document.pdf">Download via FTP</a>
```

---

## Complete Navigation Example

Here's a realistic navigation structure using everything from this lesson:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
</head>
<body>

    <header>
        <nav aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/about.html">About</a>
            <a href="/projects.html">Projects</a>
            <a href="/blog/">Blog</a>
            <a href="mailto:hello@myportfolio.com">Contact</a>
        </nav>
    </header>

    <main>
        <h1 id="top">Welcome to My Portfolio</h1>
        
        <nav aria-label="Page contents">
            <h2>Quick Links</h2>
            <ul>
                <li><a href="#about">About Me</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>

        <section id="about">
            <h2>About Me</h2>
            <p>I'm a developer learning HTML through the LokiSoft course. Check out my work on 
            <a href="https://github.com/my-username" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        </section>

        <section id="projects">
            <h2>Projects</h2>
            <p>Download my <a href="/resume.pdf" download="My-Developer-Resume.pdf">resume (PDF)</a>.</p>
        </section>

        <section id="contact">
            <h2>Contact</h2>
            <p>Email: <a href="mailto:hello@example.com">hello@example.com</a></p>
            <p>Phone: <a href="tel:+15555551234">(555) 555-1234</a></p>
        </section>

        <p><a href="#top">Back to top</a></p>
    </main>

</body>
</html>
```

---

## Knowledge Check

<div data-quiz-group data-title="Links and Navigation">

<div data-quiz-question="A page is at /blog/post.html. Which relative URL correctly links to /about.html?" data-correct="2" data-explanation="To go from /blog/post.html to /about.html, you need to go up one level (out of /blog/) and then to about.html. The ../ means 'go up one directory'. So ../about.html means 'go up from /blog/ to /, then to about.html'. Alternatively, /about.html (root-relative) also works from any file on the site.">
<div data-quiz-option>about.html</div>
<div data-quiz-option>blog/about.html</div>
<div data-quiz-option>../about.html</div>
<div data-quiz-option>../../about.html</div>
</div>

<div data-quiz-question="Why should you ALWAYS include rel='noopener noreferrer' with target='_blank'?" data-correct="1" data-explanation="Without rel='noopener', the page opened in the new tab can access your original page via window.opener — a potential security vulnerability where a malicious external site could redirect your tab to a phishing page while the user is distracted looking at the new tab. rel='noopener' blocks this access. rel='noreferrer' additionally hides which page the user came from. Always combine both with target='_blank'.">
<div data-quiz-option>Because target='_blank' without rel='noopener' causes the link to open in the same tab instead</div>
<div data-quiz-option>Without it, the new tab can access window.opener and potentially redirect your original page — a security vulnerability</div>
<div data-quiz-option>Because search engines penalize pages that use target='_blank' without the rel attribute</div>
<div data-quiz-option>It's required by the HTML5 specification — the validator will flag it otherwise</div>
</div>

<div data-quiz-question="What is the correct way to link to an email address?" data-correct="3" data-explanation="The mailto: protocol prefix opens the user's default email client with the specified address pre-filled. Just using the email as an href doesn't work — browsers wouldn't know it's an email address. The mailto: prefix is the standard, universally supported way to create email links.">
<div data-quiz-option>&lt;a href='email:user@example.com'&gt;</div>
<div data-quiz-option>&lt;a href='user@example.com'&gt;</div>
<div data-quiz-option>&lt;a type='email' href='user@example.com'&gt;</div>
<div data-quiz-option>&lt;a href='mailto:user@example.com'&gt;</div>
</div>

<div data-quiz-question="Which link correctly targets the element with id='services' on the current page?" data-correct="0" data-explanation="Same-page anchor links use the # character followed by the target element's id. href='#services' tells the browser to scroll to the element with id='services' on the current page. The # is what distinguishes it from a relative URL to a different page. From another page, you'd use href='/page.html#services'.">
<div data-quiz-option>&lt;a href='#services'&gt;Our Services&lt;/a&gt;</div>
<div data-quiz-option>&lt;a href='services'&gt;Our Services&lt;/a&gt;</div>
<div data-quiz-option>&lt;a href='id:services'&gt;Our Services&lt;/a&gt;</div>
<div data-quiz-option>&lt;a target='services'&gt;Our Services&lt;/a&gt;</div>
</div>

<div data-quiz-question="What does the download attribute do on an anchor tag?" data-correct="2" data-explanation="The download attribute tells the browser to download the linked file to the user's computer (saving to Downloads folder) instead of navigating to it in the browser. An optional value sets the filename. Without download, clicking a PDF link opens it in the browser; with download, it saves the file. Note: download only works for same-origin files or when the server sends the correct Content-Disposition header.">
<div data-quiz-option>It marks the link as requiring authentication before access</div>
<div data-quiz-option>It causes the browser to download the entire current page before following the link</div>
<div data-quiz-option>It tells the browser to save the linked file to the user's computer instead of opening it</div>
<div data-quiz-option>It enables downloading the link's content even without an internet connection</div>
</div>

</div>

---

## What's Next

The web is connected. In **Lesson 23**, you'll add visual content — images, responsive images with `srcset`, audio, and video. You'll learn how to use `<img>` correctly (including the crucial `alt` attribute), how the `<picture>` element serves different images for different screen sizes, and how to embed media without sacrificing accessibility or performance.

---

## A Prayer for Connection

*Lord, You designed us for connection — not isolation. The hyperlink, the thing that makes the web a web, is at its heart a tool for connection. It's a bridge between ideas, between people, between communities.*

*As these students use links in their pages, may they build things that genuinely connect people to useful information, to community, to each other. May their work be bridges, not walls.*

*And as they grow as developers, may they stay connected to You — the source of all wisdom.*

*In Jesus' name, Amen.*

---

> *"How beautiful on the mountains are the feet of those who bring good news, who proclaim peace, who bring good tidings, who proclaim salvation."*
> — Isaiah 52:7 (NIV)
