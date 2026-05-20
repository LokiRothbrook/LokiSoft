---
title: "Lesson 31: Checkpoint Quiz — HTML Structure & Forms"
date: 2026-05-19
author: LokiSoft Team
excerpt: Checkpoint quiz covering lists, tables, forms, semantic HTML, and global attributes — 18 questions to confirm your HTML knowledge before the final stretch.
categories: shadcn-nextjs, HTML, Quiz
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 31: Checkpoint Quiz — HTML Structure & Forms

> *"Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."*
> — Galatians 6:9 (NIV)

---

## Hold the Line, Adventurer

You've covered the second wave of HTML: lists, tables, forms (both parts), semantic landmarks, and the full attribute library. This checkpoint separates you from the final stretch — entities, accessibility, and your first two real projects.

**18 questions. No time limit. Every explanation is worth reading.**

---

## HTML Structure & Forms Checkpoint

<div data-quiz-group data-title="Lists and Tables">

<div data-quiz-question="Which HTML list type is most appropriate for a step-by-step installation guide?" data-correct="2" data-explanation="An installation guide has sequential steps — step 2 requires step 1 to be complete first. This makes it inherently ordered content, perfect for &lt;ol&gt; (ordered list). The numbers communicate the required sequence. An unordered list (&lt;ul&gt;) would incorrectly imply the steps can be done in any order.">
<div data-quiz-option>&lt;ul&gt; — steps are better without numbers to avoid implying rigidity</div>
<div data-quiz-option>&lt;dl&gt; — each step has a description that follows it</div>
<div data-quiz-option>&lt;ol&gt; — the steps must be followed in sequence, and numbers communicate that</div>
<div data-quiz-option>&lt;menu&gt; — installation guides are a type of menu interaction</div>
</div>

<div data-quiz-question="What is the correct element pair for a glossary of HTML terms?" data-correct="1" data-explanation="A glossary is a classic description list use case — each term (dt = description term) paired with its definition (dd = description detail). The &lt;dl&gt; element is specifically designed for name-value pairs. This is semantically superior to a table (which would work visually) or paragraphs, because &lt;dl&gt; communicates the label-value relationship programmatically.">
<div data-quiz-option>&lt;table&gt; with two columns: term | definition</div>
<div data-quiz-option>&lt;dl&gt; with terms in &lt;dt&gt; and definitions in &lt;dd&gt;</div>
<div data-quiz-option>&lt;ul&gt; with one &lt;li&gt; per term containing both term and definition</div>
<div data-quiz-option>&lt;ol&gt; with the terms in alphabetical order</div>
</div>

<div data-quiz-question="A table cell needs to merge across 3 rows vertically. Which attribute and value achieves this?" data-correct="3" data-explanation="rowspan='3' makes a cell span vertically across 3 rows. When rowspan is used, the cells that would normally occupy those row positions are omitted — the spanning cell fills them. This is the vertical equivalent of colspan (which spans horizontally across columns).">
<div data-quiz-option>colspan='3'</div>
<div data-quiz-option>span='rows:3'</div>
<div data-quiz-option>merge='3'</div>
<div data-quiz-option>rowspan='3'</div>
</div>

<div data-quiz-question="Why should navigation menus be marked up as lists?" data-correct="0" data-explanation="Navigation items are a group of related links — semantically, they're a list. Using &lt;ul&gt;&lt;li&gt;&lt;a&gt; structure is correct because: (1) screen readers announce 'navigation, list of 5 items', orienting the user; (2) the list structure communicates the grouping relationship semantically; (3) CSS can visually transform it into any style while the semantic structure remains clean.">
<div data-quiz-option>Because nav items are a semantic group of related links; screen readers announce the list count, orienting users immediately</div>
<div data-quiz-option>Because browsers apply special styling to &lt;li&gt; elements inside &lt;nav&gt;</div>
<div data-quiz-option>Because it's required by the HTML specification — &lt;nav&gt; can only contain &lt;ul&gt;</div>
<div data-quiz-option>Because list items get automatic bullet points that serve as visual nav indicators</div>
</div>

</div>

<div data-quiz-group data-title="Forms Part 1 and 2">

<div data-quiz-question="A contact form should NOT use method='get'. Why?" data-correct="2" data-explanation="method='get' appends form data to the URL as query parameters (e.g., ?name=John&message=Hello). This means the user's name, email, and message would appear in the browser address bar, in server access logs, browser history, and potentially in search engine results. For any form that handles personal or sensitive data, method='post' sends data in the request body — not in the URL.">
<div data-quiz-option>GET forms don't work when the form has a file upload field</div>
<div data-quiz-option>GET is only valid for forms with fewer than 3 fields</div>
<div data-quiz-option>GET appends data to the URL — the user's message would appear in the address bar, history, and logs</div>
<div data-quiz-option>GET doesn't trigger the form's onsubmit event handler</div>
</div>

<div data-quiz-question="What input type shows a calendar date picker and submits the value as YYYY-MM-DD?" data-correct="1" data-explanation="type='date' shows the browser's built-in date picker UI. Regardless of how the picker displays the date to the user (which varies by browser and OS locale), the submitted value is always in ISO 8601 format: YYYY-MM-DD. This makes server-side date parsing consistent and reliable.">
<div data-quiz-option>type='calendar'</div>
<div data-quiz-option>type='date'</div>
<div data-quiz-option>type='datetime'</div>
<div data-quiz-option>type='datepicker'</div>
</div>

<div data-quiz-question="What does a form with file inputs require beyond method='post'?" data-correct="3" data-explanation="File uploads require the form to have enctype='multipart/form-data' — this encoding type tells the browser to package the form data and file contents together in a way the server can parse. Without this attribute, file data is not sent correctly. Regular text forms use the default application/x-www-form-urlencoded encoding, which can't handle binary file data.">
<div data-quiz-option>action='/upload' must be set explicitly</div>
<div data-quiz-option>accept='*/*' must be on the form element</div>
<div data-quiz-option>type='multipart' on the form element</div>
<div data-quiz-option>enctype='multipart/form-data' on the form element</div>
</div>

<div data-quiz-question="When should you use radio buttons instead of a select dropdown?" data-correct="0" data-explanation="Radio buttons work best for small, mutually exclusive option sets (3-7 options) where seeing all options at a glance aids decision-making. A dropdown hides options behind a click — less cognitive effort to see what's available with radio buttons. For large option sets (countries, states, anything with 8+ options), a dropdown is better — radio buttons would require too much scroll.">
<div data-quiz-option>When there are 3-7 mutually exclusive options and seeing all choices at once helps the user decide</div>
<div data-quiz-option>When options have long descriptions that won't fit in a dropdown</div>
<div data-quiz-option>When multiple options can be selected simultaneously</div>
<div data-quiz-option>When the form is displayed on a mobile device</div>
</div>

<div data-quiz-question="What is the purpose of the &lt;fieldset&gt; and &lt;legend&gt; combination in forms?" data-correct="2" data-explanation="fieldset groups related form fields visually (with a border) and semantically. legend provides the visible label for the group. This is especially important for radio and checkbox groups — screen readers announce the legend text when users enter the fieldset, providing context for each option. Without it, hearing 'Yes / No / Maybe' gives no indication of what question is being answered.">
<div data-quiz-option>To apply a dark background to a section of the form for visual separation</div>
<div data-quiz-option>To make all fields within the group required simultaneously</div>
<div data-quiz-option>To group related fields semantically and provide a visual + screen-reader-announced label for the group</div>
<div data-quiz-option>To prevent CSS from styling the fields inside the group</div>
</div>

</div>

<div data-quiz-group data-title="Semantic HTML">

<div data-quiz-question="A page has a site header and two &lt;article&gt; elements each with their own header. How many &lt;header&gt; elements are valid on this page?" data-correct="3" data-explanation="There is no rule limiting the number of &lt;header&gt; elements per page. The &lt;header&gt; element applies to its nearest ancestor — one for the &lt;body&gt; (the page header), and one inside each &lt;article&gt; (article headers). Three headers on this page is correct and valid. The same applies to &lt;footer&gt;.">
<div data-quiz-option>One — only one &lt;header&gt; is allowed per page</div>
<div data-quiz-option>Two — one for the page and one for the first article only</div>
<div data-quiz-option>Zero — only &lt;div class='header'&gt; is valid for sub-sections</div>
<div data-quiz-option>Three — one page header, one per article — &lt;header&gt; applies to its nearest ancestor</div>
</div>

<div data-quiz-question="What is the semantic purpose of &lt;aside&gt;?" data-correct="1" data-explanation="&lt;aside&gt; represents content that is tangentially related to its surrounding content — useful but not essential to understanding the main content. At the page level, it's typically a sidebar. Nested inside an &lt;article&gt;, it's a related callout, pull quote, or supplementary note. The key word is 'tangentially' — if removing the aside wouldn't break the flow of the main content, it belongs in &lt;aside&gt;.">
<div data-quiz-option>A section that displays on the right side of the page in all browsers by default</div>
<div data-quiz-option>Content tangentially related to its surroundings — a sidebar, pull quote, or related callout that could be removed without breaking the main content flow</div>
<div data-quiz-option>A secondary navigation menu that supplements the main &lt;nav&gt;</div>
<div data-quiz-option>A block of text that appears alongside an image in a figure</div>
</div>

<div data-quiz-question="What is the &lt;time&gt; element's datetime attribute for?" data-correct="0" data-explanation="The datetime attribute provides the machine-readable ISO 8601 representation of the date or time, regardless of how the human-readable text is written. '19th of May' or 'yesterday' might mean the same thing to a human, but software needs '2026-05-19'. Search engines use datetime to understand publication dates; calendar apps and screen readers use it for date/time processing.">
<div data-quiz-option>Provides the ISO 8601 machine-readable date/time so software can parse it regardless of the human-readable text format</div>
<div data-quiz-option>Sets the time zone for displaying the date to international users</div>
<div data-quiz-option>Controls how the browser formats the displayed date according to the user's locale</div>
<div data-quiz-option>Links the time element to a real-time clock API</div>
</div>

</div>

<div data-quiz-group data-title="Attributes and ARIA">

<div data-quiz-question="What does data-user-id='42' on an element become when accessed via JavaScript's dataset API?" data-correct="2" data-explanation="The dataset API converts HTML data attribute names from kebab-case to camelCase. data-user-id becomes dataset.userId (the hyphen and the 'i' in 'id' become capital 'I', giving 'userId'). data-first-name becomes dataset.firstName. This conversion is automatic and consistent.">
<div data-quiz-option>dataset['data-user-id']</div>
<div data-quiz-option>dataset.data-user-id</div>
<div data-quiz-option>dataset.userId</div>
<div data-quiz-option>dataset['user-id']</div>
</div>

<div data-quiz-question="An icon-only button has no visible text. What ARIA attribute provides its accessible name?" data-correct="3" data-explanation="aria-label provides a text string as the accessible name for an element when no visible text is present. For icon buttons (where the only content is a decorative SVG or image with alt=''), aria-label='Close dialog' or aria-label='Search' gives screen readers the information they need to announce the button's purpose. aria-labelledby references another element's text; aria-describedby adds supplementary description; role changes the element type.">
<div data-quiz-option>aria-describedby</div>
<div data-quiz-option>aria-role</div>
<div data-quiz-option>aria-labelledby</div>
<div data-quiz-option>aria-label</div>
</div>

<div data-quiz-question="What does aria-hidden='true' do?" data-correct="1" data-explanation="aria-hidden='true' removes the element from the accessibility tree — screen readers will not announce it. The element remains visually visible. Use this for decorative elements (icons, flourishes, dividers) that would create noise for screen reader users. Never use aria-hidden on interactive elements or content that carries meaning.">
<div data-quiz-option>Hides the element visually (same as display:none) while keeping it in the accessibility tree</div>
<div data-quiz-option>Removes the element from the accessibility tree while keeping it visible on screen</div>
<div data-quiz-option>Makes the element invisible to search engines but visible to users</div>
<div data-quiz-option>Temporarily hides the element until the user interacts with the page</div>
</div>

<div data-quiz-question="Why should you prefer &lt;select&gt; over &lt;datalist&gt; when the user must choose from a fixed list of options?" data-correct="0" data-explanation="select restricts input to the predefined options — the user cannot type an arbitrary value. datalist only suggests options but allows any input. If your backend validation requires the value to be from a specific set (like a country code, a currency, a valid category), use select. If suggestions are helpful but custom input is acceptable, use datalist with a text input.">
<div data-quiz-option>select restricts input to the predefined options; datalist only suggests — users can still type anything</div>
<div data-quiz-option>datalist doesn't work on mobile browsers; select works everywhere</div>
<div data-quiz-option>select is faster to render; datalist introduces a performance overhead</div>
<div data-quiz-option>datalist is deprecated in HTML5; select is the modern standard</div>
</div>

</div>

<div data-quiz-score-anchor=""></div>

---

## How Did You Do?

**16–18 correct** — Outstanding. Your HTML knowledge is solid and comprehensive. The final stretch is yours.

**12–15 correct** — Good foundation. Review any missed questions, then move forward — the knowledge gaps are small.

**8–11 correct** — Important gaps to fill before moving on. Revisit the lessons below.

**Under 8** — Spend time with the lessons below before continuing — the next lessons build directly on this knowledge.

### Lessons to Review

| Struggled With | Lesson |
|----------------|--------|
| List types and nesting | [Lesson 25](/blog/25-lists) |
| Table structure and colspan/rowspan | [Lesson 26](/blog/26-tables) |
| Form method, input types, label pairing | [Lesson 27](/blog/27-forms-part-1) |
| Checkbox vs radio, fieldset, validation | [Lesson 28](/blog/28-forms-part-2) |
| Semantic landmark elements | [Lesson 29](/blog/29-semantic-html) |
| Global attributes and ARIA | [Lesson 30](/blog/30-html-attributes-deep-dive) |

---

## What's Next

Checkpoint cleared! Three lessons remain before your first real project build:
- **Lesson 32** — HTML Entities and Special Characters
- **Lesson 33** — Accessibility in HTML
- **Lesson 34** — HTML Mini-Project: Build a Static Profile Page

Then **Lesson 35** is your first portfolio project — a full Freelancer Landing Page deployed to GitHub Pages. The endgame of Section 2 is in sight.

---

## A Prayer for the Final Stretch

*Lord, these students are in the home stretch of Section 2. They've covered a tremendous amount of material — more than many developers who claim to know HTML. May they approach the final lessons with energy, not exhaustion.*

*Remind them that the mini-project and portfolio project ahead are not tests — they are opportunities. Opportunities to synthesize everything into something real, something they can point to with pride.*

*Give them the courage to build, to show their work, and to begin the long journey of being people who make things.*

*In Jesus' name, Amen.*

---

> *"I can do all this through him who gives me strength."*
> — Philippians 4:13 (NIV)
