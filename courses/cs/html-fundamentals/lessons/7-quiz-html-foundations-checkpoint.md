---
title: "Lesson 24: Checkpoint Quiz — HTML Foundations"
date: 2026-05-19
author: LokiSoft Team
excerpt: Test your HTML foundations knowledge — 18 questions on DOCTYPE, head elements, heading hierarchy, text formatting, links, images, and media.
categories: shadcn-nextjs, HTML, Quiz
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 24: Checkpoint Quiz — HTML Foundations

> *"Examine yourselves to see whether you are in the faith; test yourselves."*
> — 2 Corinthians 13:5 (NIV)

---

## Prove Your Worth, Adventurer

You've covered the first major wave of HTML knowledge: document structure, the head element, headings and paragraphs, text formatting, links, images, and media. Now it's time to test your recall.

This checkpoint quiz covers **Lessons 18–23**. Eighteen questions — no new content, just proof that the foundation is solid. Read each question carefully before answering.

Don't skip the explanations after each answer — they often contain nuance worth absorbing even when you got the question right.

---

## HTML Foundations Checkpoint

<div data-quiz-group data-title="Document Structure">

<div data-quiz-question="Which of the following is the correct DOCTYPE declaration for an HTML5 document?" data-correct="0" data-explanation="&lt;!DOCTYPE html&gt; is the HTML5 DOCTYPE — short, simple, and case-insensitive. Older HTML versions required lengthy, complex DOCTYPE strings referencing DTD files. HTML5 simplified this to just '!DOCTYPE html'. It must be the very first line of every HTML file and tells the browser to use standards mode rather than quirks mode.">
<div data-quiz-option>&lt;!DOCTYPE html&gt;</div>
<div data-quiz-option>&lt;DOCTYPE type="html5"&gt;</div>
<div data-quiz-option>&lt;html doctype="5"&gt;</div>
<div data-quiz-option>&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.0//EN"&gt;</div>
</div>

<div data-quiz-question="What is the correct structure order inside an HTML document?" data-correct="2" data-explanation="The correct structure is: DOCTYPE (first line) → html (root element) → head (metadata section) → body (visible content). All of these are required for a valid HTML5 document. The head must come before the body so the browser can process metadata (especially stylesheets and character encoding) before rendering visible content.">
<div data-quiz-option>html → DOCTYPE → head → body</div>
<div data-quiz-option>DOCTYPE → head → html → body</div>
<div data-quiz-option>DOCTYPE → html → head → body</div>
<div data-quiz-option>DOCTYPE → body → head → html</div>
</div>

<div data-quiz-question="What does the meta viewport tag prevent on mobile devices?" data-correct="1" data-explanation="Without the viewport meta tag, mobile browsers assume your page is 980px wide (typical desktop width) and scale it down to fit the small screen — making text tiny and requiring pinch-to-zoom to read anything. The viewport tag with 'width=device-width, initial-scale=1.0' tells the browser to make the page exactly as wide as the device screen and start at 1x zoom.">
<div data-quiz-option>It prevents images from scaling down on small screens</div>
<div data-quiz-option>It prevents mobile browsers from zooming out to fit a 980px-wide page on a small screen</div>
<div data-quiz-option>It prevents JavaScript from running on mobile browsers</div>
<div data-quiz-option>It prevents the browser from caching the page on mobile networks</div>
</div>

<div data-quiz-question="Where should &lt;link rel='stylesheet'&gt; go, and why?" data-correct="3" data-explanation="Stylesheets must go in &lt;head&gt; because browsers render HTML progressively as they read it top-to-bottom. If CSS loaded at the bottom, the browser would render unstyled HTML first (a 'Flash of Unstyled Content' or FOUC) and then re-render once styles loaded. Putting CSS in &lt;head&gt; ensures styles are applied from the very first paint.">
<div data-quiz-option>At the end of &lt;body&gt;, to prevent render-blocking</div>
<div data-quiz-option>Anywhere in the document — order doesn't matter for stylesheets</div>
<div data-quiz-option>In a &lt;style&gt; tag inside &lt;body&gt;</div>
<div data-quiz-option>In &lt;head&gt; — so styles load before the browser renders any content, preventing a Flash of Unstyled Content</div>
</div>

</div>

<div data-quiz-group data-title="Headings and Text">

<div data-quiz-question="A page has a main heading and three major sections. Which heading structure is correct?" data-correct="2" data-explanation="One h1 for the page title, then h2 for each major section — this is the correct semantic hierarchy. Multiple h1s confuse search engines and screen readers. Using h3 for top-level sections skips a level. All major sections at the same hierarchy level should use the same heading level (h2).">
<div data-quiz-option>h1 for the page title, then three more h1s for the sections</div>
<div data-quiz-option>h1 for the page title, then h3 for each section (h2 reserved for future use)</div>
<div data-quiz-option>h1 for the page title, then h2 for each of the three major sections</div>
<div data-quiz-option>h2 for the page title, then h3 for each section (h1 is only for site-wide use)</div>
</div>

<div data-quiz-question="What is the semantic difference between &lt;strong&gt; and &lt;b&gt;?" data-correct="0" data-explanation="Both render bold text, but &lt;strong&gt; communicates that the content is critically important — screen readers emphasize it, search engines weight it. &lt;b&gt; is purely typographic bold with no implied importance, for when you want something visually distinct without implying critical importance (like product names in a list). Choose based on meaning, not appearance.">
<div data-quiz-option>&lt;strong&gt; means critically important (affects screen readers and SEO); &lt;b&gt; is typographic bold with no semantic importance</div>
<div data-quiz-option>&lt;strong&gt; is deprecated; always use &lt;b&gt; for bold text in HTML5</div>
<div data-quiz-option>&lt;strong&gt; applies heavier bold than &lt;b&gt;</div>
<div data-quiz-option>&lt;b&gt; means critically important; &lt;strong&gt; is typographic bold</div>
</div>

<div data-quiz-question="Which element is correct for marking the scientific name Homo sapiens?" data-correct="3" data-explanation="Scientific names are italicized by convention — but not because they're stressed or emphasized in the em sense. They're typographic italic, used for a specific category of technical terms. The &lt;i&gt; element is correct for text that would be italicized in typography without implying stress (like scientific names, foreign words, or technical terms). &lt;em&gt; would imply stress emphasis, which changes meaning — incorrect here.">
<div data-quiz-option>&lt;em&gt;Homo sapiens&lt;/em&gt;</div>
<div data-quiz-option>&lt;cite&gt;Homo sapiens&lt;/cite&gt;</div>
<div data-quiz-option>&lt;strong&gt;Homo sapiens&lt;/strong&gt;</div>
<div data-quiz-option>&lt;i&gt;Homo sapiens&lt;/i&gt;</div>
</div>

<div data-quiz-question="When is it appropriate to use &lt;br&gt;?" data-correct="1" data-explanation="&lt;br&gt; should be used only when line breaks are meaningful to the content — poetry, verse, and addresses are the canonical examples. It should never be used to create visual spacing between paragraphs or sections (use CSS margin) or to force layout (use CSS flexbox/grid). &lt;br&gt; is for content-meaningful line breaks, not presentational spacing.">
<div data-quiz-option>To create vertical spacing between any two elements on a page</div>
<div data-quiz-option>In poetry, verse, or addresses where specific line breaks are part of the content's meaning</div>
<div data-quiz-option>At the end of every paragraph to ensure proper spacing</div>
<div data-quiz-option>Before every heading element to add breathing room</div>
</div>

<div data-quiz-question="What does &lt;pre&gt; do that other HTML elements don't?" data-correct="2" data-explanation="HTML normally collapses all whitespace — multiple spaces become one space, line breaks are ignored. &lt;pre&gt; (preformatted text) is the exception: it preserves all whitespace exactly as written, including indentation and newlines. This is why code blocks use &lt;pre&gt;&lt;code&gt; — the combination displays code with its original indentation intact.">
<div data-quiz-option>It preloads its content before the rest of the page renders for faster display</div>
<div data-quiz-option>It prevents search engines from indexing its content</div>
<div data-quiz-option>It preserves whitespace, line breaks, and indentation exactly as written in the source</div>
<div data-quiz-option>It creates a pre-styled container with a dark background for code display</div>
</div>

</div>

<div data-quiz-group data-title="Links">

<div data-quiz-question="A file at /products/shoes.html needs to link to /about.html. Which relative URL is correct?" data-correct="1" data-explanation="From /products/shoes.html, you need to go up one directory level (out of /products/) and then to about.html. The ../ sequence means 'go up one directory'. So ../about.html goes from /products/ up to / and then to about.html. Alternatively, /about.html (root-relative) would also work from any file.">
<div data-quiz-option>about.html</div>
<div data-quiz-option>../about.html</div>
<div data-quiz-option>../../about.html</div>
<div data-quiz-option>products/about.html</div>
</div>

<div data-quiz-question="What security risk does target='_blank' create without rel='noopener'?" data-correct="3" data-explanation="Without rel='noopener', the page opened in the new tab can access the original tab via the window.opener JavaScript property. A malicious external site could use this to redirect your original tab to a phishing page while the user's attention is on the new tab. Adding rel='noopener' sets window.opener to null in the new tab, blocking this attack vector. rel='noreferrer' additionally hides the referring page URL.">
<div data-quiz-option>The new tab can steal cookies from the original page's domain</div>
<div data-quiz-option>The link fails to open in a new tab on some mobile browsers</div>
<div data-quiz-option>Search engines penalize links with target='_blank' without the rel attribute</div>
<div data-quiz-option>The new tab can access window.opener and redirect the original tab — a potential phishing attack vector</div>
</div>

<div data-quiz-question="What does href='#contact' do when clicked?" data-correct="0" data-explanation="href='#contact' is a fragment link — it scrolls the page to the element with id='contact'. The # character indicates a reference to a specific element on the page by its ID. This is used for same-page navigation like tables of contents and 'back to top' links. From another page, you'd use href='/page.html#contact'.">
<div data-quiz-option>Scrolls the current page to the element with id='contact'</div>
<div data-quiz-option>Opens a contact form in a modal dialog</div>
<div data-quiz-option>Navigates to a file named 'contact' in the current directory</div>
<div data-quiz-option>Sends a contact request to the server</div>
</div>

</div>

<div data-quiz-group data-title="Images and Media">

<div data-quiz-question="An image is purely decorative (an abstract background texture). What should the alt attribute be?" data-correct="2" data-explanation="Decorative images that convey no information should have alt='' (an empty string). This tells screen readers to completely skip the image. A missing alt attribute is worse — screen readers often fall back to reading the filename, which is useless noise. An empty alt explicitly signals 'this image has no information value; skip it.'">
<div data-quiz-option>alt='decorative'</div>
<div data-quiz-option>alt='image' (generic fallback)</div>
<div data-quiz-option>alt='' (empty string)</div>
<div data-quiz-option>Omit the alt attribute entirely</div>
</div>

<div data-quiz-question="What does the srcset attribute on &lt;img&gt; enable?" data-correct="1" data-explanation="srcset lets you provide multiple image files at different sizes. The browser selects the most appropriate version based on the viewport size and screen pixel density. A phone might load a 400px image; a Retina desktop might load a 1600px image. This saves bandwidth (phones don't download desktop-sized images) and ensures sharp rendering on high-density displays.">
<div data-quiz-option>It allows the browser to cache the image set across sessions for offline use</div>
<div data-quiz-option>It provides multiple image sizes so the browser can choose the most appropriate one based on viewport and display density</div>
<div data-quiz-option>It enables the browser to switch between images based on user preference settings</div>
<div data-quiz-option>It adds fallback images that display if the primary source fails to load</div>
</div>

<div data-quiz-question="What does loading='lazy' do, and on which images should you NOT use it?" data-correct="3" data-explanation="loading='lazy' defers loading an image until it's near the viewport, reducing initial page load time. You should NOT use it on above-the-fold images — those visible when the page first loads. Lazy loading above-the-fold images causes a visible blank space as the user waits for the image to load. Use lazy only for images below the fold.">
<div data-quiz-option>It applies a lazy CSS fade-in animation; avoid it on images with important alt text</div>
<div data-quiz-option>It loads the image at half resolution first; avoid on hero images where quality matters</div>
<div data-quiz-option>It defers loading to after all scripts run; avoid on images that need JavaScript to display</div>
<div data-quiz-option>It defers loading until the image is near the viewport; avoid on above-the-fold images that should load immediately</div>
</div>

<div data-quiz-question="What is the purpose of the &lt;picture&gt; element compared to using srcset on &lt;img&gt;?" data-correct="0" data-explanation="srcset on &lt;img&gt; is great for providing the same image at different resolutions/sizes. &lt;picture&gt; enables art direction (serving completely different images based on screen size — a tight crop on mobile, wide shot on desktop) and format switching (serving WebP to supporting browsers, JPEG as fallback). Both can use srcset internally, but &lt;picture&gt; gives you the full media query and format-selection power.">
<div data-quiz-option>&lt;picture&gt; enables art direction (different image crops per screen size) and format switching (WebP vs JPEG); img srcset only handles size variations of the same image</div>
<div data-quiz-option>&lt;picture&gt; is the modern replacement for &lt;img&gt; — srcset on img is deprecated</div>
<div data-quiz-option>&lt;picture&gt; loads images faster by using a parallel download strategy</div>
<div data-quiz-option>They are identical; &lt;picture&gt; is just a semantic wrapper with no functional difference</div>
</div>

</div>

<div data-quiz-score-anchor=""></div>

---

## How Did You Do?

**16–18 correct** — Exceptional. Your HTML foundations are rock-solid. Move forward with confidence.

**12–15 correct** — Strong work. A few concepts need reinforcement. Review the questions you missed, re-read the relevant lesson section, and move forward.

**8–11 correct** — The foundations are shaky. Revisit the lessons below before continuing — upcoming lessons build directly on this knowledge.

**Under 8** — Don't be discouraged, but do go back. The lessons in this range are short and focused — spending an hour revisiting them will pay off for every lesson that follows.

### Lessons to Review

| Struggled With | Lesson to Re-Read |
|----------------|------------------|
| Document structure, DOCTYPE | [Lesson 18](/blog/18-what-is-html) |
| Head element, viewport, meta description | [Lesson 19](/blog/19-the-head-element) |
| Heading hierarchy, paragraph rules | [Lesson 20](/blog/20-headings-and-paragraphs) |
| Text formatting elements | [Lesson 21](/blog/21-text-formatting-elements) |
| Absolute vs relative paths, link security | [Lesson 22](/blog/22-links-and-navigation) |
| alt text, srcset, picture, lazy loading | [Lesson 23](/blog/23-images-and-media) |

---

## What's Next

The first checkpoint is cleared. The next stretch covers the structural and organizational powerhouses of HTML: **lists, tables, forms, and semantic elements**. These are the building blocks of real, functional web pages.

Onward, adventurer — Lesson 25 awaits.

---

## A Prayer for Testing and Growth

*Lord, checkpoints exist for a reason — not to discourage, but to reveal. What we don't know can't hurt us only if we discover the gaps before they cause problems in the real world.*

*For students who passed with flying colors: keep them humble. There is always more to learn. For those who discovered gaps: give them the resolve to go back and fill them. Remind them that perseverance is a virtue, and that every master was once a struggling beginner.*

*May each quiz be not a judgment, but a gift: a clear map of where to grow.*

*In Jesus' name, Amen.*

---

> *"Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance."*
> — James 1:2-3 (NIV)
