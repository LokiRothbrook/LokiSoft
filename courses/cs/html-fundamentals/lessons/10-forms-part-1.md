---
title: "Lesson 27: Forms Part 1 — Collecting User Input"
date: 2026-05-19
author: LokiSoft Team
excerpt: Build HTML forms from the ground up — form action and method, label and input pairing for accessibility, and all essential input types from text to color, range, and file.
categories: shadcn-nextjs, HTML, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 27: Forms Part 1 — Collecting User Input

> *"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you."*
> — Matthew 7:7 (NIV)

---

## Quest Briefing

Forms are how the web becomes a conversation. Without forms, websites can only speak — you can read content, but you can't reply. Forms let users search, sign up, log in, submit orders, send messages, upload files, and interact with applications.

Every contact form, login page, search bar, and e-commerce checkout you've ever used is built on HTML `<form>` elements. This lesson covers the foundation: the form element itself, label-input pairing, and the complete library of input types.

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 18 | What is HTML? |
| Lesson 22 | Links and Navigation |

---

## The `<form>` Element

```html
<form action="/submit" method="post">
    <!-- form fields go here -->
    <button type="submit">Submit</button>
</form>
```

Two critical attributes:

**`action`** — where the form data is sent when submitted. This can be:
- A URL on your own server: `action="/contact"`
- An external endpoint: `action="https://formspree.io/f/your-id"`
- Empty (`action=""`) or omitted — submits to the current page URL

**`method`** — how data is sent:
- `method="get"` — data is appended to the URL as query parameters (`?name=John&email=john@example.com`). Used for search forms, filtering, any operation that doesn't change server data. Bookmarkable and shareable.
- `method="post"` — data is sent in the request body, not visible in the URL. Used for login forms, contact forms, file uploads, any operation that changes server data. Not bookmarkable.

<div data-info-box="info" data-title="GET vs POST — When to Use Each">
Use GET when the form is a query — searching, filtering, sorting. The URL can be bookmarked and shared with the search results intact.

Use POST when the form submits data that changes something — creating an account, sending a message, placing an order. You don't want these actions to repeat if someone bookmarks the URL.
</div>

---

## The Critical Rule: Always Pair `<label>` with `<input>`

This is the single most important accessibility rule in forms. Every input must have an associated label.

### Method 1: `for` / `id` Pairing (Recommended)

```html
<label for="email">Email Address</label>
<input type="email" id="email" name="email">
```

The `for` attribute on `<label>` must match the `id` attribute on the `<input>`. This creates a programmatic association:
- Screen readers announce the label text when the input is focused
- Clicking the label focuses the input (larger click target — a usability win)
- Browsers use the association for autocomplete

### Method 2: Wrapping (Implicit Association)

```html
<label>
    Email Address
    <input type="email" name="email">
</label>
```

Wrapping the input inside the label creates the same association implicitly. No `for`/`id` needed. Some developers prefer this — fewer attributes to manage.

### What NOT to Do

```html
<!-- Wrong: placeholder is NOT a label substitute -->
<input type="email" placeholder="Enter your email">

<!-- Wrong: adjacent text with no association -->
Email Address: <input type="email" name="email">

<!-- Wrong: aria-label is acceptable but less ideal than a visible label -->
<input type="email" aria-label="Email Address">
```

Placeholder text disappears when the user starts typing — they can no longer see what the field is for. Never use placeholder as the only label.

<div data-info-box="warning" data-title="Placeholder Text Is Not a Label">
Using placeholder as a label is one of the most common form accessibility errors. When a user is filling out a long form and needs to check what they typed in a field, the placeholder is gone — replaced by their input. Always provide a visible, persistent label.
</div>

---

## `<input>` — The Shape-Shifting Element

The `<input>` element is a void element that becomes completely different things based on its `type` attribute. Let's go through every important type.

### `type="text"` — Single-Line Text

```html
<label for="username">Username</label>
<input
    type="text"
    id="username"
    name="username"
    placeholder="e.g. john_developer"
    maxlength="30"
    autocomplete="username"
>
```

The default type. Useful attributes:
- `placeholder` — hint text (not a label substitute)
- `maxlength` — maximum character count
- `minlength` — minimum character count
- `pattern` — a regex the value must match
- `autocomplete` — hints to the browser what autocomplete data to offer

### `type="email"` — Email Address

```html
<label for="email">Email</label>
<input type="email" id="email" name="email" autocomplete="email" required>
```

The browser validates that the value looks like an email address (contains `@` and a domain). On mobile, this shows an email-optimized keyboard with `@` easily accessible.

### `type="password"` — Hidden Text

```html
<label for="password">Password</label>
<input
    type="password"
    id="password"
    name="password"
    minlength="8"
    autocomplete="new-password"
>
```

Characters are hidden as the user types. The `autocomplete="new-password"` hint tells password managers this is a new password field (vs. `autocomplete="current-password"` for login).

### `type="number"` — Numeric Input

```html
<label for="quantity">Quantity</label>
<input type="number" id="quantity" name="quantity" min="1" max="99" step="1" value="1">
```

Attributes: `min`, `max`, `step` (increment amount). Mobile shows a numeric keyboard.

### `type="tel"` — Phone Number

```html
<label for="phone">Phone Number</label>
<input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" autocomplete="tel">
```

Note: `type="tel"` does NOT validate phone number format (phone formats vary wildly by country). It just shows a telephone-optimized keyboard on mobile (large number pad). Use `pattern` if you need format validation.

### `type="url"` — URL Input

```html
<label for="website">Website</label>
<input type="url" id="website" name="website" placeholder="https://yoursite.com">
```

Browser validates that the value is a valid URL format.

### `type="search"` — Search Field

```html
<label for="search">Search</label>
<input type="search" id="search" name="q" placeholder="Search courses...">
```

Semantically marks this as a search field. Some browsers add a clear (×) button inside the field. Screen readers announce "search" when focused.

### `type="date"` — Date Picker

```html
<label for="birthday">Date of Birth</label>
<input type="date" id="birthday" name="birthday" min="1900-01-01" max="2026-12-31">
```

Shows a date picker UI. The value is always in `YYYY-MM-DD` format regardless of how the picker displays it. `min` and `max` restrict the selectable range.

### `type="time"` — Time Input

```html
<label for="appointment">Appointment Time</label>
<input type="time" id="appointment" name="appointment" min="09:00" max="17:00" step="1800">
```

Shows a time picker. Value format: `HH:MM`. `step` is in seconds (1800 = 30 minutes).

### `type="datetime-local"` — Date and Time Combined

```html
<label for="event-start">Event Start</label>
<input type="datetime-local" id="event-start" name="event-start">
```

Combines date and time in one input. Value format: `YYYY-MM-DDTHH:MM`.

### `type="color"` — Color Picker

```html
<label for="brand-color">Brand Color</label>
<input type="color" id="brand-color" name="brand-color" value="#3b82f6">
```

Shows a color picker. Value is always a 6-digit hex color (`#rrggbb`). The `value` sets the default color.

### `type="range"` — Slider

```html
<label for="volume">Volume: <output for="volume" id="volume-display">50</output>%</label>
<input
    type="range"
    id="volume"
    name="volume"
    min="0"
    max="100"
    step="5"
    value="50"
>
```

Renders as a draggable slider. Use `<output>` to display the current value (updated via JavaScript). Without JavaScript, the value isn't visible to the user.

### `type="file"` — File Upload

```html
<label for="avatar">Profile Photo</label>
<input
    type="file"
    id="avatar"
    name="avatar"
    accept="image/jpeg,image/png,image/webp"
    multiple
>
```

Shows a file picker dialog. Important attributes:
- `accept` — restricts file types (MIME types or extensions like `.pdf,.doc`)
- `multiple` — allows selecting multiple files at once

<div data-info-box="warning" data-title="File Uploads Require method='post' and enctype">
For forms with file uploads, you MUST use `method="post"` and add `enctype="multipart/form-data"` to the `<form>` element. Without this, file data won't be sent:

```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="photo">
    <button type="submit">Upload</button>
</form>
```
</div>

---

## Essential Input Attributes

| Attribute | Works With | Description |
|-----------|-----------|-------------|
| `name` | All | Key used in form data (required for submission) |
| `id` | All | Links to `<label for="">` |
| `value` | All | Default value |
| `required` | Most | Field must be filled before submission |
| `disabled` | All | Field is shown but not editable or submitted |
| `readonly` | Text inputs | Field is shown and readable but not editable |
| `placeholder` | Text inputs | Hint text (not a label) |
| `autocomplete` | Text inputs | Hint to browser for autofill |
| `autofocus` | All | Focus this input when the page loads |
| `min` / `max` | number, range, date, time | Value constraints |
| `step` | number, range, time | Increment amount |
| `minlength` / `maxlength` | text, email, password | Character length constraints |
| `pattern` | text, email, url, tel | Regex validation pattern |
| `accept` | file | Restrict file types |
| `multiple` | email, file | Allow multiple values |

---

## A Complete Contact Form

```html
<form action="/contact" method="post">
    <div>
        <label for="full-name">Full Name *</label>
        <input
            type="text"
            id="full-name"
            name="full_name"
            required
            autocomplete="name"
            placeholder="Jane Smith"
        >
    </div>

    <div>
        <label for="contact-email">Email Address *</label>
        <input
            type="email"
            id="contact-email"
            name="email"
            required
            autocomplete="email"
            placeholder="jane@example.com"
        >
    </div>

    <div>
        <label for="phone-number">Phone Number</label>
        <input
            type="tel"
            id="phone-number"
            name="phone"
            autocomplete="tel"
            placeholder="+1 (555) 000-0000"
        >
    </div>

    <div>
        <label for="contact-date">Preferred Contact Date</label>
        <input
            type="date"
            id="contact-date"
            name="contact_date"
            min="2026-05-20"
        >
    </div>

    <button type="submit">Send Message</button>
</form>
```

---

## Knowledge Check

<div data-quiz-group data-title="HTML Forms Part 1">

<div data-quiz-question="When should you use method='post' instead of method='get' on a form?" data-correct="2" data-explanation="Use GET for forms that query data (search, filter, sort) — the query parameters in the URL can be bookmarked and shared. Use POST for forms that change data (create an account, submit a message, place an order) — the data goes in the request body, not the URL, and the action can't be accidentally repeated by refreshing or bookmarking the URL.">
<div data-quiz-option>When the form has more than 5 fields — GET can't handle that many parameters</div>
<div data-quiz-option>When the form contains a select dropdown element</div>
<div data-quiz-option>When the form submits data that changes something on the server (login, contact form, order)</div>
<div data-quiz-option>When the form is inside a &lt;section&gt; element rather than &lt;div&gt;</div>
</div>

<div data-quiz-question="Why is placeholder text NOT a replacement for a visible label?" data-correct="1" data-explanation="Placeholder text disappears the moment the user starts typing. Once they've typed something in the field and moved on to the next, they can no longer see what that field was for. This is especially problematic for users checking their work before submitting. Labels are persistent — they stay visible at all times. Always provide a real, visible label in addition to any placeholder.">
<div data-quiz-option>Because placeholder text doesn't work in Internet Explorer</div>
<div data-quiz-option>Because placeholder disappears when the user starts typing — they can no longer see what the field is for</div>
<div data-quiz-option>Because placeholder text can't be translated to other languages</div>
<div data-quiz-option>Because screen readers ignore placeholder text entirely</div>
</div>

<div data-quiz-question="What does the 'for' attribute on &lt;label&gt; do?" data-correct="3" data-explanation="The 'for' attribute on &lt;label&gt; must match the 'id' of the associated input. This creates a programmatic association: clicking the label focuses the input (larger click target), and screen readers announce the label text when the input receives focus. Without this association, there's no programmatic link between label and input — even if they appear visually adjacent.">
<div data-quiz-option>It sets the CSS class name of the label element</div>
<div data-quiz-option>It specifies the form field's data format for server validation</div>
<div data-quiz-option>It links the label to a specific &lt;form&gt; element by ID</div>
<div data-quiz-option>It links the label to an input with a matching 'id' — clicking the label focuses the input</div>
</div>

<div data-quiz-question="What type attribute makes a file upload input only accept image files?" data-correct="0" data-explanation="The accept attribute restricts the file types the picker shows. accept='image/*' accepts any image type. You can also be specific: accept='image/jpeg,image/png,image/webp'. The type='file' attribute makes it a file picker; accept filters which files are selectable. Note: server-side validation is still required — accept is a hint, not security.">
<div data-quiz-option>accept='image/*'</div>
<div data-quiz-option>filter='image'</div>
<div data-quiz-option>type='image'</div>
<div data-quiz-option>restrict='images-only'</div>
</div>

</div>

---

## What's Next

Forms part 1 is done — you know all the input types. In **Lesson 28**, you'll complete the form toolkit: `<textarea>`, `<select>`, `<checkbox>`, `<radio>`, `<fieldset>`, and validation attributes. After that, you'll be able to build any form you can imagine.

---

## A Prayer for Listening

*Lord, forms are fundamentally about listening — creating a space for others to speak and be heard. As these students build forms that collect user input, may they approach every interaction with their future users as an act of genuine interest and care.*

*May the forms they build be accessible, clear, and respectful of the user's time. And in their own lives, may they be people who ask good questions and actually listen to the answers.*

*In Jesus' name, Amen.*

---

> *"My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry."*
> — James 1:19 (NIV)
