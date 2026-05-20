---
title: "Lesson 33: Accessibility in HTML — Building for Every Human"
date: 2026-05-19
author: LokiSoft Team
excerpt: Learn to write HTML that works for everyone — semantic structure, ARIA patterns, keyboard navigation, focus management, color contrast, and how to test with a real screen reader.
categories: shadcn-nextjs, HTML, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 33: Accessibility in HTML — Building for Every Human

> *"There are different kinds of gifts, but the same Spirit distributes them. There are different kinds of service, but the same Lord."*
> — 1 Corinthians 12:4–5 (NIV)

---

## Quest Briefing

You have learned the language of HTML. Now learn its conscience.

Web accessibility (often abbreviated **a11y** — the 11 letters between "a" and "y") is the practice of building websites that work for *every* human being — including people who are blind, have low vision, are deaf, have motor disabilities, cognitive differences, or use assistive technologies like screen readers, switch controls, or voice navigation.

In many countries (the US, EU, UK, Canada, and more), accessibility is not optional — it is the law. But beyond legal compliance, it is a matter of craftsmanship and care. Every person who visits a site you build deserves to use it.

This lesson is the culmination of everything you've learned in Section 2. Semantic HTML, ARIA attributes, form labels, alt text — it all comes together here.

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 29 | Semantic HTML |
| Lesson 30 | HTML Attributes Deep Dive (ARIA) |
| Lesson 27 | Forms Part 1 |
| Lesson 28 | Forms Part 2 |
| Lesson 23 | Images and Media |

---

## The Four Principles of Accessibility (POUR)

The Web Content Accessibility Guidelines (WCAG) organize all accessibility requirements around four principles — **POUR**:

**Perceivable** — Information must be presentable in ways all users can perceive. A blind user cannot perceive a visual image — so it needs a text alternative.

**Operable** — Users must be able to operate the interface. A user who cannot use a mouse must be able to reach every interactive element via keyboard.

**Understandable** — Content and UI must be understandable. Clear labels, consistent navigation, plain language.

**Robust** — Content must work across browsers and assistive technologies — now and as technology evolves.

---

## Layer 1: Semantic HTML is Your Foundation

The single highest-impact accessibility technique is writing correct semantic HTML. When you use the right elements, browsers and assistive technologies get enormous amounts of information for free:

```html
<!-- A button that does button things -->
<button type="button">Open Menu</button>
<!-- Screen reader: "Open Menu, button" -->
<!-- Keyboard: focusable, activatable with Enter or Space -->
<!-- No extra ARIA needed -->

<!-- A div trying to be a button — terrible -->
<div onclick="openMenu()">Open Menu</div>
<!-- Screen reader: reads text only, no role, no keyboard access -->
<!-- Keyboard: not focusable at all -->
```

### The Semantic HTML Accessibility Cheat Sheet

| Element | What it gives you for free |
|---------|--------------------------|
| `<button>` | Focusable, keyboard-activatable (Enter/Space), role="button" announced |
| `<a href>` | Focusable, keyboard-activatable (Enter), role="link" announced |
| `<input>` | Focusable, role announced by type (textbox, checkbox, radio, etc.) |
| `<label>` | Associates text to input; click target expanded; announced on focus |
| `<h1>`–`<h6>` | Creates navigation landmarks; screen readers list headings |
| `<nav>` | Landmark: screen readers can jump to "navigation" |
| `<main>` | Landmark: screen readers can skip to "main content" |
| `<header>` / `<footer>` | Landmarks: "banner" and "contentinfo" in accessibility tree |
| `<aside>` | Landmark: "complementary" |
| `<table>` + `<th scope>` | Table structure announced; headers associated to cells |
| `<fieldset>` + `<legend>` | Legend announced before each field within the group |

---

## Layer 2: Images — Every Alt Text Matters

You learned this in Lesson 23, but let's cement it:

### Rules for `alt` Text

```html
<!-- Informative image — describe the content and/or purpose -->
<img src="git-workflow.png" alt="Diagram showing the three stages: working directory, staging area, and repository">

<!-- Decorative image — empty alt, never omit the attribute -->
<img src="decorative-wave.svg" alt="">

<!-- Image used as a link — describe the destination, not the image -->
<a href="/courses">
    <img src="courses-icon.png" alt="Browse all courses">
</a>

<!-- Icon button — aria-label on the button, empty alt on the icon -->
<button type="button" aria-label="Close dialog">
    <img src="x-icon.svg" alt="">
</button>

<!-- Chart / graph — describe what the data shows -->
<img src="enrollment-chart.png" alt="Bar chart showing course enrollment grew from 200 students in January to 1,200 in May 2026">
```

<div data-info-box="warning" data-title="Never Omit the alt Attribute">
Omitting `alt` entirely is different from writing `alt=""`. An omitted `alt` tells screen readers the image exists but has no description — some screen readers will read the file name ("git-workflow-diagram-v2-final.png" — unpleasant). An empty `alt=""` says "this image is decorative, skip it." Always include `alt`.
</div>

---

## Layer 3: Keyboard Navigation

Every interactive element on your page must be reachable and operable with a keyboard alone. This serves blind users (who use keyboards), motor-impaired users (who may use keyboard alternatives), and power users who prefer keyboards.

### Tab Order

The tab key moves focus forward through interactive elements. The shift+tab moves backward. The default focus order follows the DOM order — another reason to write semantic HTML in a logical reading order.

```html
<!-- Good: DOM order matches visual order -->
<nav>
    <a href="/">Home</a>
    <a href="/courses">Courses</a>
    <a href="/about">About</a>
</nav>
<main>
    <h1>Welcome</h1>
    <p>...</p>
    <a href="/start">Get Started</a>
</main>
```

### Focus Indicators

Every browser shows a visual focus ring (outline) around focused elements. **Never remove it without providing an alternative:**

```css
/* WRONG — kills keyboard usability entirely */
*:focus { outline: none; }

/* RIGHT — remove browser default, provide a better custom one */
*:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}
```

<div data-info-box="danger" data-title="outline: none Kills Accessibility">
Removing the focus indicator is one of the most common accessibility mistakes developers make, usually because "the outline looks ugly." The answer is to design a better focus indicator — not to remove it. A keyboard user with no visible focus indicator has no idea where they are on the page.
</div>

### `tabindex` for Keyboard Control

You learned `tabindex` in Lesson 30. Here's how it applies to accessibility:

```html
<!-- tabindex="0" — adds an element to the natural tab order -->
<!-- Use this ONLY when you've built a custom interactive widget -->
<div role="button" tabindex="0" onclick="doThing()">Click me</div>
<!-- Better option: just use <button> -->

<!-- tabindex="-1" — focusable by JavaScript, not by tab -->
<!-- Use this for programmatic focus management -->
<div id="dialog" tabindex="-1" role="dialog" aria-labelledby="dialog-title">
    <h2 id="dialog-title">Confirm Delete</h2>
    <!-- ... -->
</div>
```

### Focus Management in Dynamic UI

When your JavaScript shows a modal dialog or expands a panel, move focus to the new content:

```html
<button type="button" id="open-btn" onclick="openDialog()">Delete Item</button>

<div id="confirm-dialog" tabindex="-1" role="dialog" aria-modal="true"
     aria-labelledby="dialog-heading" hidden>
    <h2 id="dialog-heading">Confirm Delete</h2>
    <p>Are you sure you want to delete this item? This cannot be undone.</p>
    <button type="button" onclick="confirmDelete()">Yes, Delete</button>
    <button type="button" onclick="closeDialog()">Cancel</button>
</div>
```

```javascript
function openDialog() {
    const dialog = document.getElementById('confirm-dialog');
    dialog.hidden = false;
    dialog.focus(); // moves keyboard focus into the dialog
}
```

<div data-info-box="hint" data-title="The Native &lt;dialog&gt; Element">
HTML now has a native `<dialog>` element that handles focus management, Escape key, and accessibility automatically. You'll use it extensively when you get to JavaScript. For now, understand the pattern — focus must follow the UI.
</div>

---

## Layer 4: ARIA — Filling the Gaps

ARIA (Accessible Rich Internet Applications) fills accessibility gaps that native HTML can't cover alone. You learned the attributes in Lesson 30; here's the practical pattern library.

### Rule 1: Don't Use ARIA When HTML Will Do

```html
<!-- Don't do this -->
<div role="button" tabindex="0">Submit</div>

<!-- Do this -->
<button type="submit">Submit</button>
```

### Labeling Interactive Elements Without Visible Text

```html
<!-- Icon-only button -->
<button type="button" aria-label="Search">
    <svg aria-hidden="true" focusable="false">...</svg>
</button>

<!-- Icon button with tooltip -->
<button type="button" aria-label="Close dialog">
    ×
</button>
```

### Labeling Form Sections

```html
<!-- Single form on the page -->
<form>
    <!-- fields -->
</form>

<!-- Multiple forms — label each -->
<form aria-label="Login form">
    <!-- login fields -->
</form>
<form aria-label="Search form">
    <!-- search fields -->
</form>
```

### Describing Elements

```html
<!-- Password field with requirements -->
<label for="pwd">Password</label>
<input type="password" id="pwd" aria-describedby="pwd-hint" required>
<p id="pwd-hint">Minimum 8 characters, at least one number.</p>
<!-- Screen reader: "Password, required, edit text. Minimum 8 characters, at least one number." -->
```

### Live Regions — Announcing Dynamic Changes

When JavaScript updates content dynamically, screen readers don't automatically announce it. Live regions fix this:

```html
<!-- Status messages that appear after form submission -->
<div aria-live="polite" aria-atomic="true" id="status-msg"></div>

<!-- An error alert -->
<div role="alert" id="error-msg"></div>
```

```javascript
// After form submission:
document.getElementById('status-msg').textContent = 'Message sent successfully!';
// Screen reader announces "Message sent successfully!" automatically

// For errors (more urgent):
document.getElementById('error-msg').textContent = 'Please fill in all required fields.';
```

`aria-live="polite"` waits for the user to finish what they're doing, then announces. `role="alert"` (implies `aria-live="assertive"`) interrupts immediately — reserve for errors.

---

## Layer 5: Forms — The Accessibility Battleground

Forms are where accessibility most often breaks down. You covered the rules in Lessons 27 and 28 — here's the complete accessibility-first pattern:

```html
<form action="/contact" method="post" novalidate aria-label="Contact form">

    <!-- Every field has a visible label -->
    <div>
        <label for="full-name">Full Name <span aria-hidden="true">*</span></label>
        <!-- "Required" is announced via the required attribute, not the asterisk -->
        <input
            type="text"
            id="full-name"
            name="full_name"
            required
            autocomplete="name"
            aria-describedby="name-error"
        >
        <!-- Error message — hidden until validation fails -->
        <p id="name-error" role="alert" hidden>Please enter your full name.</p>
    </div>

    <!-- Radio group with fieldset/legend -->
    <fieldset>
        <legend>Preferred contact method <span aria-hidden="true">*</span></legend>
        <label>
            <input type="radio" name="contact-pref" value="email" required> Email
        </label>
        <label>
            <input type="radio" name="contact-pref" value="phone"> Phone
        </label>
    </fieldset>

    <button type="submit">Send Message</button>

</form>
```

### Field Error Patterns

When validation fails, do three things:

1. Move focus to the first field with an error (or to a summary at the top)
2. Associate the error message to the field via `aria-describedby`
3. Add `aria-invalid="true"` to the invalid field

```html
<input
    type="email"
    id="email"
    aria-invalid="true"
    aria-describedby="email-error"
>
<p id="email-error" role="alert">Please enter a valid email address.</p>
```

---

## Layer 6: Color and Contrast

Screen readers aren't the only concern. Users with low vision or color blindness need sufficient contrast between text and background.

**WCAG 2.1 minimum requirements:**
- Normal text (below 18pt / 14pt bold): **4.5:1 contrast ratio**
- Large text (18pt+ / 14pt+ bold): **3:1 contrast ratio**
- Non-text elements (icons, borders): **3:1 contrast ratio**

**Never rely on color alone** to convey information:

```html
<!-- WRONG: only color distinguishes required fields -->
<label style="color: red">Email *</label>

<!-- RIGHT: color + symbol + text + required attribute -->
<label for="email">
    Email
    <span aria-hidden="true" style="color: red">*</span>
    <span class="sr-only">(required)</span>
</label>
<input type="email" id="email" required>
```

The `.sr-only` class is a CSS pattern that hides text visually while keeping it in the accessibility tree:

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
```

---

## Layer 7: Testing Your Accessibility

### 1. Keyboard Test (Do This First)

Tab through your page using only the keyboard. Verify:
- Every interactive element is reachable
- Focus is always visible
- You can activate buttons with Enter/Space and links with Enter
- Dialogs trap focus while open
- Escape closes dialogs

### 2. Screen Reader Test

Built-in screen readers you can use right now for free:

**Windows — NVDA (free download):**
- Arrow keys to read content
- H to jump by headings
- F to jump to form fields
- B to jump to buttons

**macOS / iOS — VoiceOver (built in):**
- Activate: **Command + F5** (Mac) or triple-click Home (iOS)
- Control + Option + Arrow to read
- Control + Option + U to open rotor (headings, links, landmarks)

**Linux — Orca (usually pre-installed):**
- Activate: **Super + Alt + S**
- Arrow keys to read, H for headings

**Android — TalkBack (built in):**
- Settings → Accessibility → TalkBack

### 3. Automated Checkers

Automated tools catch about 30-40% of accessibility issues:

- **axe DevTools** — Chrome/Firefox extension (free, excellent)
- **WAVE** — wave.webaim.org, browser extension
- **Lighthouse** — built into Chrome DevTools (Audits tab)

<div data-info-box="hint" data-title="Automated Tools Find 30% of Issues">
No automated tool can catch everything. A form with every field correctly labeled still fails if the labels are misleading. Automated tools confirm technical compliance; human testing (including testing with a real screen reader) catches the rest.
</div>

### 4. The Quick Mental Checklist

Before you ship any HTML page, ask yourself:

- [ ] Does every image have appropriate alt text?
- [ ] Does every form field have a visible, persistent label?
- [ ] Can I tab through the entire page in a logical order?
- [ ] Is focus always visible?
- [ ] Are semantic landmark elements used correctly?
- [ ] Does every icon-only button have `aria-label`?
- [ ] Are error messages programmatically associated with their fields?
- [ ] Is color contrast sufficient? Is color the only differentiator anywhere?
- [ ] Do dynamic content changes get announced to screen readers?

---

## A Complete Accessible Page Skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title — Site Name</title>
</head>
<body>

    <!-- Skip link: allows keyboard users to jump past repeated nav -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header>
        <a href="/" aria-label="LokiSoft home">
            <img src="/logo.svg" alt="LokiSoft">
        </a>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/courses">Courses</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact" aria-current="page">Contact</a></li>
            </ul>
        </nav>
        <button type="button" aria-label="Search" aria-expanded="false">
            <svg aria-hidden="true" focusable="false"><!-- icon --></svg>
        </button>
    </header>

    <main id="main-content">

        <!-- Live region for status messages -->
        <div aria-live="polite" aria-atomic="true" class="sr-only" id="status"></div>

        <h1>Contact Us</h1>

        <form action="/contact" method="post" aria-label="Contact form" novalidate>

            <div>
                <label for="name">Full Name <span aria-hidden="true">*</span></label>
                <input type="text" id="name" name="name" required autocomplete="name"
                       aria-describedby="name-error">
                <p id="name-error" role="alert" hidden>Please enter your name.</p>
            </div>

            <div>
                <label for="email">Email <span aria-hidden="true">*</span></label>
                <input type="email" id="email" name="email" required autocomplete="email"
                       aria-describedby="email-error">
                <p id="email-error" role="alert" hidden>Please enter a valid email.</p>
            </div>

            <fieldset>
                <legend>Subject <span aria-hidden="true">*</span></legend>
                <label><input type="radio" name="subject" value="general" required> General Inquiry</label>
                <label><input type="radio" name="subject" value="support"> Technical Support</label>
                <label><input type="radio" name="subject" value="billing"> Billing</label>
            </fieldset>

            <div>
                <label for="message">Message <span aria-hidden="true">*</span></label>
                <textarea id="message" name="message" required rows="6"
                          aria-describedby="message-hint"></textarea>
                <p id="message-hint">Minimum 20 characters. Be as specific as possible.</p>
            </div>

            <button type="submit">Send Message</button>
        </form>

    </main>

    <footer>
        <nav aria-label="Footer navigation">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/accessibility">Accessibility Statement</a>
        </nav>
        <p><small>&copy; 2026 LokiSoft. All rights reserved.</small></p>
    </footer>

</body>
</html>
```

Notice the **skip link** at the top: `<a href="#main-content">Skip to main content</a>`. This is typically hidden until focused (via CSS), and lets screen reader and keyboard users jump straight to the main content without tabbing through the entire header and navigation. It targets the `id="main-content"` on `<main>`.

---

## Knowledge Check

<div data-quiz-group data-title="Accessibility in HTML">

<div data-quiz-question="What is the primary purpose of a 'skip to main content' link at the top of a page?" data-correct="1" data-explanation="A skip link allows keyboard and screen reader users to bypass the site header and navigation — which are identical on every page — and jump directly to the unique main content. Without it, keyboard users must tab through every navigation item on every page load. The link targets the id on the &lt;main&gt; element. It's typically hidden visually until focused, but it must be real, functional HTML — not a fake element.">
<div data-quiz-option>It provides a button for mobile users to jump to the footer without scrolling</div>
<div data-quiz-option>It lets keyboard and screen reader users bypass the repeated header/nav and jump directly to the unique page content</div>
<div data-quiz-option>It creates an anchor bookmark that search engines use to index the main content separately</div>
<div data-quiz-option>It provides an alternative navigation for users who have JavaScript disabled</div>
</div>

<div data-quiz-question="An icon-only close button contains an SVG icon with no visible text. What is the correct accessibility pattern?" data-correct="2" data-explanation="For icon-only buttons: add aria-label to the button element (describing its action, like 'Close dialog'), and add aria-hidden='true' to the SVG so it's removed from the accessibility tree (preventing the screen reader from announcing both the icon description and the aria-label). The focusable='false' attribute on SVG prevents Internet Explorer from focusing the SVG separately from the button.">
<div data-quiz-option>Add title='Close dialog' to the SVG — screen readers will read the SVG title attribute</div>
<div data-quiz-option>Add a hidden &lt;span&gt; with the text 'Close' inside the button — screen readers read all text content</div>
<div data-quiz-option>Add aria-label='Close dialog' to the button and aria-hidden='true' to the SVG</div>
<div data-quiz-option>Add role='button' and tabindex='0' to the SVG directly so it can receive focus</div>
</div>

<div data-quiz-question="When JavaScript dynamically shows a success message after form submission, what is the correct way to ensure screen readers announce it?" data-correct="3" data-explanation="Screen readers do not automatically announce DOM changes. To make dynamic content announcements work, you need an aria-live region. Setting aria-live='polite' on a container means screen readers will announce any text changes to that container after the user finishes their current activity. role='alert' (aria-live='assertive') interrupts the user immediately — reserve that for errors, not successes. Simply appending to the DOM with JavaScript does nothing without an aria-live region.">
<div data-quiz-option>Append the message with JavaScript's innerHTML — screen readers monitor all DOM changes</div>
<div data-quiz-option>Add the message in a &lt;dialog&gt; element and call .showModal() — dialogs are always announced</div>
<div data-quiz-option>Set the document title to include the success message after submission</div>
<div data-quiz-option>Put the message inside a container with aria-live='polite' and update its text content with JavaScript</div>
</div>

<div data-quiz-question="Why should you never write *:focus { outline: none; } in your CSS without replacement?" data-correct="0" data-explanation="The focus outline is the keyboard user's cursor — it shows exactly where they are on the page. Removing it without a replacement leaves keyboard users completely blind to their current position. They have no way to tell which link they've focused, which button they're about to press, or where they are in the form. The correct approach: use *:focus-visible { outline: 2px solid &lt;your-brand-color&gt;; outline-offset: 2px; } to provide a clear, branded focus indicator instead of removing the default one.">
<div data-quiz-option>Because it removes the visual indicator keyboard users need to see where focus is — they cannot navigate without it</div>
<div data-quiz-option>Because the outline CSS property is deprecated in CSS3 and browsers ignore it</div>
<div data-quiz-option>Because screen readers rely on the outline to determine tab order</div>
<div data-quiz-option>Because removing outlines breaks the :focus-within pseudo-class in CSS</div>
</div>

</div>

<div data-quiz-score-anchor=""></div>

---

## How Did You Do?

**4/4** — Accessibility champion. You're building for everyone.

**3/4** — Great foundation. Revisit any explanations you found surprising.

**2/4 or below** — Spend more time with this lesson. Accessibility is non-negotiable in professional web development.

---

## What's Next

Accessibility: complete. In **Lesson 34**, you'll put Section 2's entire HTML knowledge base to work — building your first real project: **a static profile page**. This is where the theory becomes portfolio work.

---

## A Prayer for Building for Every Human

*Lord, You made every person — every ability, every limitation, every way of experiencing the world — and called it good. As these students write code that will be used by real people, may they remember that behind every screen reader is a person. Behind every keyboard-only interaction is a person. Behind every request for captions and alt text is a person who deserves access.*

*May they build with the same generosity You have shown — not the minimum required by law, but the maximum their craft allows. May accessibility be not an afterthought but a first thought.*

*In Jesus' name, Amen.*

---

> *"Speak up for those who cannot speak for themselves, for the rights of all who are destitute."*
> — Proverbs 31:8 (NIV)
