---
title: "Lesson 36: Section 2 Review Quiz — HTML Fundamentals"
date: 2026-05-19
author: LokiSoft Team
excerpt: Comprehensive 28-question review of all HTML fundamentals from Section 2 — document structure, text, links, images, lists, tables, forms, semantic elements, attributes, ARIA, entities, and accessibility.
categories: shadcn-nextjs, HTML, Quiz
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 36: Section 2 Review Quiz — HTML Fundamentals

> *"Let us consider how we may spur one another on toward love and good deeds."*
> — Hebrews 10:24 (NIV)

---

## The Final Gate, Adventurer

You've completed the entire second section of your quest. Eighteen lessons of HTML — from the `<!DOCTYPE>` declaration to deployed portfolio projects. You've learned to speak the language of the web with precision, accessibility, and intentionality.

This is the section review: 28 questions covering every concept in Section 2. It's comprehensive by design. The goal isn't to make you feel bad — it's to give you a complete map of your knowledge so you enter Section 3 (CSS) on solid ground.

**28 questions. No time limit. Read every explanation — even for questions you get right.**

---

## HTML Section 2 — Comprehensive Review

<div data-quiz-group data-title="Document Structure and the Head">

<div data-quiz-question="What does the &lt;!DOCTYPE html&gt; declaration at the top of an HTML file do?" data-correct="1" data-explanation="&lt;!DOCTYPE html&gt; is a declaration (not a tag) that tells the browser to render the page in standards mode using the HTML5 specification. Without it, browsers fall into 'quirks mode' — a legacy compatibility mode that emulates old browser bugs. Quirks mode causes inconsistent rendering, broken box model behavior, and CSS that doesn't work as expected. It doesn't declare the HTML version or link a DTD — it's simply a trigger for standards-compliant rendering.">
<div data-quiz-option>It declares the HTML version number so browsers know which parser to use (HTML4, XHTML, or HTML5)</div>
<div data-quiz-option>It triggers standards mode rendering, preventing browsers from falling into quirks mode</div>
<div data-quiz-option>It links the document to the W3C Document Type Definition (DTD) for validation</div>
<div data-quiz-option>It sets the page encoding to UTF-8 so international characters display correctly</div>
</div>

<div data-quiz-question="Why must &lt;meta charset='UTF-8'&gt; be the first element inside &lt;head&gt;?" data-correct="2" data-explanation="The browser begins parsing characters before it has processed the full &lt;head&gt;. If the charset declaration appears late in the &lt;head&gt;, the browser may have already misinterpreted multi-byte characters in the title or other early metadata. Placing it first guarantees the encoding is established before any text is parsed. The HTML5 specification requires it within the first 1024 bytes of the document.">
<div data-quiz-option>Because CSS stylesheets must know the encoding before they can process font-face declarations</div>
<div data-quiz-option>Because the HTTP server overrides encoding if the meta tag isn't first in the document</div>
<div data-quiz-option>Because the browser begins parsing characters before completing the head — a late charset declaration can cause early characters to be misinterpreted</div>
<div data-quiz-option>Because UTF-8 is required to be declared before the &lt;title&gt; to prevent title bar encoding errors</div>
</div>

<div data-quiz-question="What is the correct &lt;meta&gt; tag for making a page mobile-responsive?" data-correct="3" data-explanation="&lt;meta name='viewport' content='width=device-width, initial-scale=1.0'&gt; tells the browser to set the viewport width equal to the device's screen width and to start at 100% zoom. Without this, mobile browsers apply a 'virtual viewport' (typically 980px wide) and scale the page down, making it look like a shrunken desktop page. This one meta tag is required for responsive CSS to work correctly on mobile devices.">
<div data-quiz-option>&lt;meta name='mobile' content='responsive'&gt;</div>
<div data-quiz-option>&lt;meta http-equiv='X-UA-Compatible' content='IE=edge'&gt;</div>
<div data-quiz-option>&lt;meta name='responsive' content='width=device-width'&gt;</div>
<div data-quiz-option>&lt;meta name='viewport' content='width=device-width, initial-scale=1.0'&gt;</div>
</div>

<div data-quiz-question="What is the recommended maximum length for a &lt;meta name='description'&gt; to display correctly in Google search results?" data-correct="1" data-explanation="Google typically displays 150–160 characters of a meta description in search results before truncating with an ellipsis. Going significantly over this limit means your key selling text is cut off. Going significantly under wastes the opportunity. The description doesn't affect ranking directly, but it affects click-through rate — a compelling, complete description increases clicks from search results.">
<div data-quiz-option>80–100 characters</div>
<div data-quiz-option>150–160 characters</div>
<div data-quiz-option>200–250 characters</div>
<div data-quiz-option>There is no recommended length — search engines use the full description</div>
</div>

</div>

<div data-quiz-group data-title="Headings, Text, and Inline Elements">

<div data-quiz-question="Why should a page have only one &lt;h1&gt; element?" data-correct="0" data-explanation="The &lt;h1&gt; represents the primary topic of the entire page — its main heading. It is the entry point of the document's heading hierarchy. Having multiple &lt;h1&gt; elements dilutes this signal and confuses both users (who expect one primary heading) and search engines (which weight the &lt;h1&gt; heavily when determining what the page is about). Screen reader users also use headings to navigate — if every section has an &lt;h1&gt;, all sections appear equal in importance.">
<div data-quiz-option>It represents the primary topic of the page — multiple h1s dilute the SEO signal and confuse the document hierarchy</div>
<div data-quiz-option>HTML5 specification strictly forbids more than one h1 per document — browsers reject the second</div>
<div data-quiz-option>Browsers apply font-size styling to the first h1 only — subsequent h1s render as h2</div>
<div data-quiz-option>CSS can only style one h1 per page — a second h1 can't be targeted with CSS selectors</div>
</div>

<div data-quiz-question="What is the semantic difference between &lt;strong&gt; and &lt;b&gt;?" data-correct="2" data-explanation="&lt;strong&gt; indicates that the content is of strong importance, seriousness, or urgency — screen readers may emphasize it in tone. &lt;b&gt; is a typographic element: it makes text visually bold without implying any added importance. Use &lt;strong&gt; for 'Warning: this is dangerous.' Use &lt;b&gt; for a product name or keyword in a list where bold is stylistic, not semantic. The same distinction applies to &lt;em&gt; (semantic emphasis) vs &lt;i&gt; (typographic italic).">
<div data-quiz-option>They are identical — both make text bold and both carry semantic weight</div>
<div data-quiz-option>&lt;strong&gt; applies bold to the entire block; &lt;b&gt; applies bold to a single word only</div>
<div data-quiz-option>&lt;strong&gt; signals important content (screen readers may stress it); &lt;b&gt; is typographic bold with no semantic importance</div>
<div data-quiz-option>&lt;b&gt; is deprecated in HTML5 — only &lt;strong&gt; should be used for bold text</div>
</div>

<div data-quiz-question="When should you use a &lt;br&gt; element?" data-correct="3" data-explanation="&lt;br&gt; should be used only when a line break is semantically meaningful — not for creating visual spacing. The correct uses are: poetry (where line breaks are part of the poem's meaning), postal addresses (where each line has meaning), and similar cases. For visual spacing between paragraphs or sections, use CSS margin. Never use multiple &lt;br&gt;&lt;br&gt;&lt;br&gt; to create spacing — that is a CSS problem, not an HTML problem.">
<div data-quiz-option>To create vertical spacing between any two elements — equivalent to margin-bottom in CSS</div>
<div data-quiz-option>To end a paragraph — it's the self-closing alternative to &lt;/p&gt;</div>
<div data-quiz-option>To separate items in a list without using the &lt;li&gt; element</div>
<div data-quiz-option>Only when a line break is semantically meaningful — poetry, postal addresses, and similar content where the line itself carries meaning</div>
</div>

</div>

<div data-quiz-group data-title="Links and Images">

<div data-quiz-question="A link opens in a new tab (target='_blank'). What security attribute(s) must be added and why?" data-correct="1" data-explanation="rel='noopener noreferrer' is required on all target='_blank' links. Without it, the new tab can access the opening page's window object via window.opener, enabling a phishing technique called 'tabnapping' where the original page is silently replaced. noopener blocks window.opener access. noreferrer additionally prevents the Referer header from being sent, protecting privacy. Modern browsers have added noopener behavior by default for target='_blank', but explicitly adding rel='noopener noreferrer' is still best practice for cross-browser safety.">
<div data-quiz-option>rel='external' — tells browsers this is an external site so they apply extra sandboxing</div>
<div data-quiz-option>rel='noopener noreferrer' — blocks the new tab from accessing window.opener, preventing tabnapping attacks</div>
<div data-quiz-option>target='_blank_safe' — the secure variant of _blank that sandboxes the new tab</div>
<div data-quiz-option>sandbox='allow-scripts' — restricts what the new tab can do with JavaScript</div>
</div>

<div data-quiz-question="An image is the only content inside a link. What alt text is correct?" data-correct="0" data-explanation="When an image is the only content inside a link, its alt text must describe the link destination — not the image itself. The screen reader will announce 'link: [alt text]' — so the alt text must tell users where they're going, not what the image looks like. 'LokiSoft home page' makes sense as a link destination. 'LokiSoft logo' describes the image but tells users nothing about where the link goes.">
<div data-quiz-option>alt='LokiSoft home page' — describes the link destination, which is what the user needs to know</div>
<div data-quiz-option>alt='LokiSoft logo' — describes the image content, which is always correct for alt text</div>
<div data-quiz-option>alt='' — decorative images inside links should always have empty alt text</div>
<div data-quiz-option>alt='Click here' — generic text that communicates the action</div>
</div>

<div data-quiz-question="What is the purpose of the width and height attributes on &lt;img&gt; elements?" data-correct="2" data-explanation="When browsers load a page, they render the layout before images finish downloading. Without explicit width and height on &lt;img&gt;, the browser allocates zero space for the image initially, then shifts the layout when the image loads — causing Cumulative Layout Shift (CLS), a Core Web Vital metric that Google measures. Setting width and height on every image allows the browser to reserve the correct space before the image loads, preventing layout shift. This has nothing to do with forcing the image to display at those exact dimensions — CSS controls the actual rendered size.">
<div data-quiz-option>They force the image to display at exactly those pixel dimensions, overriding the natural image size</div>
<div data-quiz-option>They tell the server what resolution to send — smaller values request smaller file sizes</div>
<div data-quiz-option>They allow the browser to reserve layout space before the image loads, preventing Cumulative Layout Shift (CLS)</div>
<div data-quiz-option>They are required by the HTML specification — images without these attributes fail validation</div>
</div>

</div>

<div data-quiz-group data-title="Lists and Tables">

<div data-quiz-question="A navigation menu is marked up as a &lt;ul&gt; with &lt;li&gt;&lt;a&gt; inside. Why is this correct?" data-correct="3" data-explanation="Navigation items are a group of related links — semantically, a list. Using &lt;ul&gt;&lt;li&gt;&lt;a&gt; gives screen readers two critical pieces of information: (1) 'navigation landmark' from the surrounding &lt;nav&gt;, and (2) 'list of N items' from the &lt;ul&gt; — users know exactly how many links are in the nav before starting. CSS can transform this into any visual layout (horizontal bar, dropdown, hamburger menu) while the semantic structure remains clean and correct.">
<div data-quiz-option>Because the HTML specification requires all &lt;nav&gt; elements to contain exactly one &lt;ul&gt;</div>
<div data-quiz-option>Because browsers apply special default styling to links inside &lt;li&gt; elements within &lt;nav&gt;</div>
<div data-quiz-option>Because list items automatically get bullet points which serve as visual separators between nav links</div>
<div data-quiz-option>Because nav items are a semantic group of related links — screen readers announce the list count, giving users immediate orientation</div>
</div>

<div data-quiz-question="What does the scope attribute on a &lt;th&gt; element do?" data-correct="1" data-explanation="scope tells screen readers which cells a header applies to. scope='col' means the header applies to all cells below it in that column. scope='row' means the header applies to all cells to the right in that row. Without scope, screen readers may not correctly associate header text with data cells, making table data confusing to navigate. For complex tables with both column and row headers, scope is essential for accessibility.">
<div data-quiz-option>It locks the column width so the table doesn't reflow when content changes</div>
<div data-quiz-option>It tells screen readers which cells the header applies to — either the column below it or the row beside it</div>
<div data-quiz-option>It prevents CSS from restyling the header cell to match the data cells below it</div>
<div data-quiz-option>It specifies the column's data type (text, number, date) for sorting</div>
</div>

<div data-quiz-question="What is the correct element combination for a glossary of terms?" data-correct="0" data-explanation="A glossary is a classic description list use case: &lt;dl&gt; (description list) containing &lt;dt&gt; (description term) for each term and &lt;dd&gt; (description detail) for each definition. This is semantically superior to a table (which would work visually but doesn't communicate the label-value relationship programmatically), paragraphs (no semantic relationship), or ordered list (glossaries aren't sequential). The &lt;dl&gt; element was specifically designed for name-value pair content.">
<div data-quiz-option>&lt;dl&gt; with terms in &lt;dt&gt; and definitions in &lt;dd&gt;</div>
<div data-quiz-option>&lt;table&gt; with two columns: term | definition — semantic and visual</div>
<div data-quiz-option>&lt;ul&gt; with one &lt;li&gt; per term containing both the term and definition</div>
<div data-quiz-option>&lt;ol&gt; ordered alphabetically with the term as the list marker</div>
</div>

</div>

<div data-quiz-group data-title="Forms — Structure and Input Types">

<div data-quiz-question="Why is placeholder text not an acceptable substitute for a &lt;label&gt; element?" data-correct="2" data-explanation="Placeholder text disappears the instant a user begins typing. On a long form, once a user has filled in several fields and needs to check what they entered in an earlier field, the placeholder is gone — replaced by their input. Labels are persistent and always visible. This problem compounds for users with memory difficulties, users going back to edit, and users filling forms over multiple sessions. Additionally, placeholder text often has insufficient color contrast and is not read consistently by all screen readers.">
<div data-quiz-option>Because placeholder text doesn't work in Internet Explorer 11 and older browsers</div>
<div data-quiz-option>Because placeholder text can't be translated by browser localization features</div>
<div data-quiz-option>Because placeholder text disappears when the user starts typing — they lose the field description while they're filling it in</div>
<div data-quiz-option>Because the HTML specification deprecated placeholder in HTML5.2</div>
</div>

<div data-quiz-question="A form collects user search queries that should be bookmarkable and shareable with results. Which method attribute is correct?" data-correct="1" data-explanation="method='get' appends form data to the URL as query parameters (?q=html+tutorial). This makes the resulting URL bookmarkable, shareable, and navigable with the browser's Back and Forward buttons. method='post' sends data in the request body — the URL doesn't change, so results can't be bookmarked or shared. The GET/POST distinction is: GET for queries that read data (search, filter, sort), POST for actions that change data (create account, submit order, send message).">
<div data-quiz-option>method='post' — search results must be sent securely in the request body</div>
<div data-quiz-option>method='get' — the query becomes part of the URL, making it bookmarkable and shareable</div>
<div data-quiz-option>method='query' — the semantic method type for search forms</div>
<div data-quiz-option>method='get' only works for forms with a single text field — not for multi-field search</div>
</div>

<div data-quiz-question="What does the enctype='multipart/form-data' attribute on a form element do?" data-correct="3" data-explanation="By default, forms use application/x-www-form-urlencoded encoding — which serializes field values as key=value pairs joined by &amp;. This encoding cannot represent binary data. enctype='multipart/form-data' switches to a multipart encoding that packages each form field and file as a separate 'part' in the request body, preserving binary data. This is required for any form that includes file inputs. Without it, file uploads fail silently or send only the filename instead of the actual file contents.">
<div data-quiz-option>It enables CSRF protection by splitting the form data into multiple encrypted parts</div>
<div data-quiz-option>It sets the form to submit data as JSON instead of URL-encoded key-value pairs</div>
<div data-quiz-option>It allows forms to submit to multiple action URLs simultaneously</div>
<div data-quiz-option>It switches form encoding to multipart format — required for file uploads, which cannot be encoded as URL-encoded key-value pairs</div>
</div>

<div data-quiz-question="What is the purpose of grouping radio buttons inside a &lt;fieldset&gt; with a &lt;legend&gt;?" data-correct="0" data-explanation="Radio buttons are inherently related — they share a name attribute and represent mutually exclusive choices for a single question. Without fieldset/legend, screen readers announce each option independently ('Yes, radio button'; 'No, radio button') with no context for what question is being answered. With fieldset/legend, the legend is announced before each option ('Would you like to subscribe? Yes, radio button'). This is critical for usability — hearing 'Yes, No, Maybe' without context is meaningless.">
<div data-quiz-option>Because screen readers announce the legend before each radio option — giving users the question context for each choice they encounter</div>
<div data-quiz-option>Because radio buttons cannot share the same name attribute without being in a fieldset</div>
<div data-quiz-option>Because fieldset applies the browser's default grouping border, which is required for radio groups to render correctly</div>
<div data-quiz-option>Because fieldset prevents radio buttons from being submitted individually — they must submit as a group</div>
</div>

</div>

<div data-quiz-group data-title="Semantic HTML Elements">

<div data-quiz-question="What distinguishes an &lt;article&gt; from a &lt;section&gt;?" data-correct="1" data-explanation="The test for &lt;article&gt;: 'Could this content stand alone and still make sense removed from its page context?' A blog post, news article, forum reply, or product review qualifies — each is independently distributable. &lt;section&gt; groups thematically related content that only makes sense as part of the larger document — like chapters in a book. If you removed a section from the page, it would be incomplete or confusing without the surrounding context. Use &lt;div&gt; when there's no semantic meaning — just visual grouping.">
<div data-quiz-option>article is for content written by external authors; section is for content written by the site's own team</div>
<div data-quiz-option>article contains self-contained content that makes sense independently (blog post, review, news story); section groups thematically related content that needs its surrounding document context</div>
<div data-quiz-option>article is block-level and creates a new stacking context; section is inline and flows within the document</div>
<div data-quiz-option>article can only appear once per page; section can appear multiple times</div>
</div>

<div data-quiz-question="How many &lt;main&gt; elements are allowed per page, and why?" data-correct="2" data-explanation="Exactly one &lt;main&gt; per page is allowed. &lt;main&gt; represents the primary, unique content of the page — the content that changes on every page. Having multiple &lt;main&gt; elements would mean multiple 'primary' content areas, which is contradictory. Screen readers expose a 'jump to main content' shortcut — this only works reliably with a single &lt;main&gt;. Additionally, the HTML specification explicitly states that &lt;main&gt; must not appear as a descendant of &lt;article&gt;, &lt;aside&gt;, &lt;footer&gt;, &lt;header&gt;, or &lt;nav&gt;.">
<div data-quiz-option>Two — one for the desktop layout and one for the mobile layout, hidden via CSS</div>
<div data-quiz-option>Unlimited — main can appear in each article and section as needed</div>
<div data-quiz-option>Exactly one — it represents the singular primary content of the page, and multiple would contradict that role</div>
<div data-quiz-option>Three — one for header content, one for body, one for footer equivalent content</div>
</div>

<div data-quiz-question="What is the &lt;aside&gt; element's semantic definition?" data-correct="3" data-explanation="&lt;aside&gt; represents content that is tangentially related to the content around it — useful supplementary information that could be removed without breaking the main content flow. At the page level (sibling of &lt;main&gt;), it's a sidebar. Inside an &lt;article&gt;, it's a related callout, pull quote, or supplementary note. The word 'tangentially' is key — if the content is essential to understanding the main content, it should be in the main content, not in &lt;aside&gt;. If it's interesting but removable, it belongs in &lt;aside&gt;.">
<div data-quiz-option>A block of content that is visually offset to the right side of the page using the browser's default float styling</div>
<div data-quiz-option>A container for secondary navigation that supplements the primary &lt;nav&gt; element</div>
<div data-quiz-option>Any content that is not the primary heading or paragraph of a section</div>
<div data-quiz-option>Tangentially related content — a sidebar, pull quote, or related callout — that could be removed without breaking the main content flow</div>
</div>

</div>

<div data-quiz-group data-title="Global Attributes and ARIA">

<div data-quiz-question="What is the purpose of the id attribute and what rule must it follow?" data-correct="0" data-explanation="The id attribute provides a unique identifier for an element. It must be unique within the entire document — no two elements on the same page can share the same id. This is required because: (1) CSS id selectors (#myId) target a single element; (2) JavaScript getElementById() returns one element; (3) anchor links (#myId) must point to one unique destination; (4) ARIA associations (aria-labelledby, aria-describedby) must reference one specific element. Duplicate ids break all of these. Unlike class (which can be reused), id is a one-per-page identifier.">
<div data-quiz-option>It uniquely identifies an element — must be unique across the entire page; used for CSS targeting, JavaScript selection, anchor links, and ARIA associations</div>
<div data-quiz-option>It applies a reusable style group to an element — can be shared among multiple elements that need the same styling</div>
<div data-quiz-option>It provides a way to group related elements together — similar to class but only for elements that are adjacent in the DOM</div>
<div data-quiz-option>It marks the element as an interactive target — used by JavaScript event handlers to know which element was clicked</div>
</div>

<div data-quiz-question="An HTML element has data-product-id='742' and data-is-available='true'. How do you access data-is-available in JavaScript using the dataset API?" data-correct="2" data-explanation="The dataset API converts data attribute names from kebab-case (hyphen-separated) to camelCase. data-is-available becomes dataset.isAvailable (the hyphen and 'a' in 'available' become capital 'A'). Similarly, data-product-id becomes dataset.productId. The conversion is automatic and consistent: each hyphen-preceded letter becomes uppercase. Note: dataset.isAvailable returns a string ('true'), not a boolean — you'd need to compare with === 'true' or use JSON.parse() if you need the actual boolean value.">
<div data-quiz-option>dataset['data-is-available']</div>
<div data-quiz-option>dataset['is-available']</div>
<div data-quiz-option>dataset.isAvailable</div>
<div data-quiz-option>dataset.is_available</div>
</div>

<div data-quiz-question="What does aria-expanded='false' communicate, and on what type of element is it used?" data-correct="1" data-explanation="aria-expanded communicates the current state of a toggle control — whether the content it controls is expanded (visible) or collapsed (hidden). It's used on the control that does the toggling (a button, link, or other interactive element), not on the content being shown/hidden. When the disclosure opens, JavaScript updates it to aria-expanded='true'. Screen readers announce 'Open Menu, collapsed, button' or 'Open Menu, expanded, button' so users always know the state. Without this, a user who navigated to an 'Open Menu' button after it was already opened would have no idea the menu was now visible.">
<div data-quiz-option>It prevents the element from being expanded by CSS animations — locking it in the collapsed state until JavaScript changes it</div>
<div data-quiz-option>It communicates that a toggle control's associated content is currently collapsed/hidden — used on the button or control that triggers the expand/collapse action</div>
<div data-quiz-option>It marks the element as expandable in the document outline, creating a collapsible section similar to &lt;details&gt;</div>
<div data-quiz-option>It signals to search engines that the hidden content should not be indexed since it's not visible by default</div>
</div>

<div data-quiz-question="When is it appropriate to use a positive tabindex (e.g., tabindex='3')?" data-correct="3" data-explanation="A positive tabindex value forces an element to appear earlier in the tab order than its DOM position would naturally place it. This is almost never the right approach — it overrides the natural DOM-order tab sequence and creates a confusing, unpredictable navigation experience for keyboard users. The correct solution is always to fix the DOM order so it matches the visual order. The only appropriate tabindex values are: 0 (adds to natural tab order) and -1 (removes from tab order but allows programmatic focus). If you find yourself reaching for tabindex='3', refactor the HTML structure instead.">
<div data-quiz-option>When you need a non-interactive element like a &lt;div&gt; to receive focus on click</div>
<div data-quiz-option>When a link at the bottom of the page needs to be reached before links at the top</div>
<div data-quiz-option>When the natural tab order creates accessibility issues for screen reader users</div>
<div data-quiz-option>Almost never — positive tabindex overrides DOM-order focus sequence, creating unpredictable navigation. Fix the HTML structure instead.</div>
</div>

</div>

<div data-quiz-group data-title="HTML Entities and Special Characters">

<div data-quiz-question="Which three characters must always be HTML-encoded when used as content in an HTML document?" data-correct="0" data-explanation="&lt; (use &amp;lt;), &gt; (use &amp;gt;), and &amp; (use &amp;amp;) must always be encoded in HTML content because they are the characters the HTML parser uses as syntax delimiters. &lt; starts a tag, &gt; ends one, and &amp; starts an entity reference. Any of these appearing as raw characters in content may be misinterpreted by the parser. All other characters — including ©, €, em dashes, curly quotes, and emoji — can be typed directly in a UTF-8 HTML document without escaping.">
<div data-quiz-option>&lt; (&amp;lt;), &gt; (&amp;gt;), and &amp; (&amp;amp;) — the three HTML syntax delimiters</div>
<div data-quiz-option>All non-ASCII characters — characters outside the basic Latin alphabet cannot appear directly in HTML</div>
<div data-quiz-option>&copy; (&amp;copy;), &reg; (&amp;reg;), and &trade; (&amp;trade;) — trademark symbols require entity encoding</div>
<div data-quiz-option>Space ( ), tab, and newline — whitespace is significant in HTML and must be encoded</div>
</div>

<div data-quiz-question="You are displaying a temperature reading: '98.6°F'. Why might you write '98.6&amp;deg;F' instead of '98.6°F'?" data-correct="2" data-explanation="Both are technically correct in modern HTML5 with UTF-8 encoding. The direct UTF-8 character (°) works fine in any editor that saves UTF-8. The entity (&amp;deg;) is a named entity that resolves to the same character. The reasons to prefer entities in some situations: (1) older text editors or systems may corrupt non-ASCII characters if not saved in UTF-8; (2) in template strings generated by code, entities are more portable; (3) in XML (which is stricter), entities are safer. The choice is a style preference in modern HTML — either works correctly.">
<div data-quiz-option>Because the degree symbol (°) is not part of the UTF-8 character set and cannot appear directly in HTML files</div>
<div data-quiz-option>Because browsers require degree signs to be encoded so they know to render the symbol at the correct size</div>
<div data-quiz-option>Both forms work — entities are more portable in environments where file encoding might be inconsistent, but direct UTF-8 is also correct in modern HTML5</div>
<div data-quiz-option>Because &amp;deg; triggers a special rendering mode that displays the symbol at the correct typographic height</div>
</div>

</div>

<div data-quiz-group data-title="Accessibility in HTML">

<div data-quiz-question="An image conveys important data (a sales chart showing 300% growth). What is the correct approach?" data-correct="1" data-explanation="For a complex image like a data chart, a short alt attribute is insufficient — it can only convey a few words. The correct approach is to provide a meaningful summary in the alt text AND provide the full data in accessible text nearby. Options include: writing the key insight in alt='Bar chart: enrollment grew from 200 to 1,200 students, a 500% increase', adding a data table below the chart, or providing a &lt;figcaption&gt; with the key takeaway. A blank alt (alt='') would hide all the information from screen reader users.">
<div data-quiz-option>alt='' — complex images are too difficult to describe, so leaving alt empty is safest</div>
<div data-quiz-option>Write a meaningful summary in alt text describing the key insight the chart conveys, and consider providing the underlying data in a table or figcaption</div>
<div data-quiz-option>alt='chart' — short, generic descriptions are all that WCAG requires for complex images</div>
<div data-quiz-option>role='presentation' on the img — this tells screen readers to skip the image entirely</div>
</div>

<div data-quiz-question="A modal dialog opens when the user clicks a button. What must happen to keyboard focus?" data-correct="3" data-explanation="When a modal dialog opens, keyboard focus must move into the dialog. Without this, keyboard users are in a broken state — they pressed a button, the dialog appeared visually, but their keyboard focus is still on the button behind the overlay. They can't interact with the dialog at all. The standard pattern: open the dialog, call dialog.focus() (possible because the dialog has tabindex='-1'), and ideally trap focus within the dialog so Tab cycles only through dialog elements. When the dialog closes, return focus to the button that triggered it.">
<div data-quiz-option>Focus should stay on the button that opened the dialog — moving focus surprises users</div>
<div data-quiz-option>Focus should move to the first link on the page — dialogs reset the tab order from the beginning</div>
<div data-quiz-option>Focus should move to the page's &lt;main&gt; element — dialogs are presented over the main content</div>
<div data-quiz-option>Focus must move into the dialog — keyboard users cannot interact with dialog content if focus stays outside it</div>
</div>

<div data-quiz-question="Which WCAG contrast ratio is required for normal body text to meet minimum (AA) compliance?" data-correct="2" data-explanation="WCAG 2.1 Level AA requires a minimum 4.5:1 contrast ratio between text color and background color for normal text (below 18pt or 14pt bold). Large text (18pt+ regular or 14pt+ bold) has a lower minimum of 3:1. Non-text elements like icons and form borders require 3:1. A white (#FFFFFF) text on a medium gray background typically fails. A dark navy on white easily passes. Tools like the WebAIM Contrast Checker or browser DevTools can calculate ratios automatically.">
<div data-quiz-option>2:1 — a slightly visible distinction between text and background is sufficient</div>
<div data-quiz-option>3:1 — the same ratio required for large text and UI components</div>
<div data-quiz-option>4.5:1 — the minimum ratio for normal text (below 18pt / 14pt bold) at WCAG AA level</div>
<div data-quiz-option>7:1 — all text on all backgrounds must meet the enhanced AAA level</div>
</div>

<div data-quiz-question="Why is &lt;button type='button'&gt; preferred over &lt;div role='button' tabindex='0'&gt; for an interactive control?" data-correct="0" data-explanation="The native &lt;button&gt; element gives you keyboard access (Tab focus, Enter/Space activation), correct role announcement ('button'), and browser/OS accessibility support — for free. A &lt;div&gt; with role and tabindex requires you to manually: add tabindex='0' for Tab focus, add JavaScript keydown handlers for Enter and Space key activation, add the role attribute, and handle focus-visible styles. Any one of these you forget makes the control partially broken. This is the First Rule of ARIA: never use an ARIA role to make a non-semantic element interactive when a native element already does the job.">
<div data-quiz-option>Because &lt;button&gt; is natively keyboard-accessible, activatable with Enter/Space, and announces as 'button' — a div requires manual implementation of all these behaviors</div>
<div data-quiz-option>Because &lt;button&gt; has built-in form validation that &lt;div&gt; cannot replicate even with ARIA</div>
<div data-quiz-option>Because ARIA role='button' is deprecated in ARIA 1.2 — native elements are the only supported option</div>
<div data-quiz-option>Because divs cannot receive focus in any browser, even with tabindex='0' applied</div>
</div>

</div>

<div data-quiz-score-anchor=""></div>

---

## How Did You Do?

**25–28 correct** — Exceptional. Your HTML knowledge is comprehensive and production-ready. Section 3 awaits.

**20–24 correct** — Strong foundation with minor gaps. Review any topics where you were unsure, then advance to CSS with confidence.

**15–19 correct** — Solid core knowledge with real gaps. Before starting Section 3, revisit the specific lessons below.

**Under 15** — HTML fundamentals need reinforcement. Section 3 builds directly on everything here — spend focused time on the lessons below before continuing.

---

### Lessons to Review

| Topic | Lesson |
|-------|--------|
| Document structure, head, charset, viewport | [Lesson 18–19](/blog/18-what-is-html) |
| Headings, text, inline elements | [Lesson 20–21](/blog/20-headings-and-paragraphs) |
| Links and image alt text | [Lesson 22–23](/blog/22-links-and-navigation) |
| Lists: ul, ol, dl, nesting | [Lesson 25](/blog/25-lists) |
| Tables: scope, colspan, rowspan | [Lesson 26](/blog/26-tables) |
| Forms: method, label, input types | [Lesson 27](/blog/27-forms-part-1) |
| Forms: textarea, radio, fieldset, validation | [Lesson 28](/blog/28-forms-part-2) |
| Semantic elements: article, section, aside, main | [Lesson 29](/blog/29-semantic-html) |
| id, class, data-*, tabindex, ARIA | [Lesson 30](/blog/30-html-attributes-deep-dive) |
| HTML entities, &amp;lt; &amp;amp; &amp;nbsp; | [Lesson 32](/blog/32-html-entities-and-special-characters) |
| Accessibility: alt text, keyboard, focus, ARIA | [Lesson 33](/blog/33-accessibility-in-html) |

---

## What's Next — Section 3 Begins

Section 2 is complete. You've earned it.

Here's what you've built and learned:
- A complete understanding of HTML document structure
- Mastery of every landmark semantic element
- Accessible form construction from scratch
- HTML entities for every situation
- Accessibility principles that apply to every project you'll ever build
- Two portfolio projects: a profile page and a freelancer landing page — both live on GitHub

**Section 3: CSS** starts in Lesson 37. You'll take the plain, unstyled HTML you've built and transform it — first with CSS fundamentals, then layout, then animation and responsive design. By the end of Section 3, your profile page and landing page will look professional enough to show to employers.

The foundation is solid. Time to build.

---

## A Prayer for Those Who Completed This Section

*Lord, completing something is hard. Showing up lesson after lesson, question after question, project after project — that takes discipline that most people don't have.*

*These students have it. They've proven it by getting here.*

*May they carry this momentum into Section 3. May the foundation they've built in HTML hold firm under everything they pile on top of it. May they never forget that the structure matters — that before anything is beautiful, it must be correct.*

*Thank You for their diligence. Thank You for the gift of curiosity and the drive to learn. May they use what they're building here to serve others well.*

*In Jesus' name, Amen.*

---

> *"Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things."*
> — Matthew 25:23 (NIV)
