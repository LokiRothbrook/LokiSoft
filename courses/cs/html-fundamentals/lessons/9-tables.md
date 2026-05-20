---
title: "Lesson 26: Tables — Displaying Data in Rows and Columns"
date: 2026-05-19
author: LokiSoft Team
excerpt: Master HTML tables — thead, tbody, tfoot, tr, th, td, colspan, rowspan, caption, and when tables are appropriate vs when CSS layout is the right tool.
categories: shadcn-nextjs, HTML, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 26: Tables — Displaying Data in Rows and Columns

> *"She considers a field and buys it; out of her earnings she plants a vineyard."*
> — Proverbs 31:16 (NIV)

---

## Quest Briefing

Tables have a complicated history in web development. In the early web, developers used `<table>` for everything — entire page layouts were built with invisible tables because CSS didn't exist yet. That era produced terrible HTML, and a backlash emerged that led some developers to avoid tables entirely.

The truth is simpler: **use tables for tabular data**. Anything that makes sense in a spreadsheet — rows of items with multiple attributes, comparison charts, schedules, financial data — is tabular data. Use CSS flexbox and grid for layout.

This lesson covers the complete table element set and how to use it correctly.

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 18 | What is HTML? |
| Lesson 25 | Lists |

---

## The Basic Table Structure

```html
<table>
    <caption>Course Completion Schedule</caption>
    <thead>
        <tr>
            <th scope="col">Section</th>
            <th scope="col">Topic</th>
            <th scope="col">Lessons</th>
            <th scope="col">Est. Time</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0</td>
            <td>Dev Environment</td>
            <td>9</td>
            <td>3 hours</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Git & GitHub</td>
            <td>8</td>
            <td>4 hours</td>
        </tr>
        <tr>
            <td>2</td>
            <td>HTML</td>
            <td>19</td>
            <td>8 hours</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Total</td>
            <td>36</td>
            <td>15 hours</td>
        </tr>
    </tfoot>
</table>
```

Let's go through each element.

---

## Table Elements Explained

### `<table>` — The Container

Every table starts with `<table>`. It contains all other table elements.

### `<caption>` — Table Title

```html
<table>
    <caption>Monthly Revenue by Region — Q1 2026</caption>
    ...
</table>
```

The `<caption>` element provides a title for the table. It must be the **first child** of `<table>`. It's the table equivalent of a heading — screen readers announce it when entering the table, giving context before reading any data. It also improves SEO.

Many developers use a heading (`<h2>`) above the table instead. Both approaches work; `<caption>` is semantically tighter because it's programmatically associated with the specific table.

### `<thead>` — Table Head

```html
<thead>
    <tr>
        <th scope="col">Product</th>
        <th scope="col">Price</th>
        <th scope="col">In Stock</th>
    </tr>
</thead>
```

`<thead>` groups the header row(s) of the table. It's not strictly required, but it:
- Enables browsers to repeat the header on each printed page if the table spans multiple pages
- Allows CSS to style header rows separately from data rows
- Helps screen readers identify which cells are headers vs. data

### `<tbody>` — Table Body

```html
<tbody>
    <tr>
        <td>Widget A</td>
        <td>$19.99</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>Widget B</td>
        <td>$34.99</td>
        <td>No</td>
    </tr>
</tbody>
```

`<tbody>` groups the data rows. If you don't include `<tbody>`, browsers add it implicitly — but it's good practice to write it explicitly.

### `<tfoot>` — Table Footer

```html
<tfoot>
    <tr>
        <td>Total</td>
        <td>$54.98</td>
        <td>—</td>
    </tr>
</tfoot>
```

`<tfoot>` groups footer rows — often totals, summaries, or footnotes. Like `<thead>`, browsers can render it at the bottom of every printed page if the table spans multiple pages.

Interestingly, `<tfoot>` should appear in the HTML source **after `<thead>` but before or after `<tbody>`** — historically it was specified to come before `<tbody>`, though modern browsers handle either order.

### `<tr>` — Table Row

```html
<tr>
    <td>Cell 1</td>
    <td>Cell 2</td>
    <td>Cell 3</td>
</tr>
```

`<tr>` (table row) contains one row of cells. Every `<tr>` must be inside `<thead>`, `<tbody>`, or `<tfoot>`.

### `<th>` — Table Header Cell

```html
<th scope="col">Price</th>  <!-- Column header -->
<th scope="row">January</th>  <!-- Row header -->
```

`<th>` marks a **header cell** — a cell that describes the data in its row or column. Browsers render it bold and centered by default. The `scope` attribute is critical for accessibility:

- `scope="col"` — this header applies to the entire column below it
- `scope="row"` — this header applies to the entire row to its right
- `scope="colgroup"` — applies to multiple columns (for complex tables)
- `scope="rowgroup"` — applies to multiple rows

Screen readers use `scope` to announce which header applies to each data cell as they navigate.

### `<td>` — Table Data Cell

```html
<td>$19.99</td>
```

`<td>` marks a regular data cell. It can contain any HTML — text, images, links, lists, even other tables (nested tables are valid though usually a design smell).

---

## `colspan` and `rowspan` — Spanning Cells

Cells can span multiple columns or rows:

```html
<table>
    <thead>
        <tr>
            <th scope="col">Product</th>
            <!-- This header spans 2 columns -->
            <th scope="colgroup" colspan="2">Sales Q1 2026</th>
        </tr>
        <tr>
            <th scope="col"></th>
            <th scope="col">Units</th>
            <th scope="col">Revenue</th>
        </tr>
    </thead>
    <tbody>
        <!-- This cell spans 2 rows -->
        <tr>
            <td rowspan="2">Widget A</td>
            <td>Online</td>
            <td>500</td>
        </tr>
        <tr>
            <!-- No first cell — the rowspan from above covers it -->
            <td>In-Store</td>
            <td>200</td>
        </tr>
    </tbody>
</table>
```

- `colspan="2"` — this cell occupies 2 column slots
- `rowspan="2"` — this cell occupies 2 row slots

When a cell spans multiple rows or columns, the subsequent cells in those positions are omitted — the spanning cell takes their place.

<div data-toggle-box data-title="Visualizing colspan and rowspan">

Here's how the table above renders visually:

```
┌─────────────────────────────────────────┐
│ Product │     Sales Q1 2026             │
│         │──────────────────────────────-│
│         │  Units    │  Revenue           │
├─────────────────────────────────────────┤
│         │  Online   │  500               │
│ Widget A│──────────────────────────────-│
│         │  In-Store │  200               │
└─────────────────────────────────────────┘
```

"Sales Q1 2026" spans 2 columns (colspan=2).
"Widget A" spans 2 rows (rowspan=2).

When you use rowspan, make sure the total number of cells in each row still adds up to the number of columns — the spanning cell "reserves" a slot in the spanned rows.

</div>

---

## A Complete, Accessible Table

Here's a fully accessible table with all elements used correctly:

```html
<table>
    <caption>LokiSoft Course Pricing Plans</caption>
    <thead>
        <tr>
            <th scope="col">Plan</th>
            <th scope="col">Price</th>
            <th scope="col">Courses</th>
            <th scope="col">Support</th>
            <th scope="col">Certificate</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Free</th>
            <td>$0/month</td>
            <td>3 free courses</td>
            <td>Community forum</td>
            <td>No</td>
        </tr>
        <tr>
            <th scope="row">Student</th>
            <td>$9/month</td>
            <td>All courses</td>
            <td>Email support</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th scope="row">Pro</th>
            <td>$19/month</td>
            <td>All courses + early access</td>
            <td>Priority support</td>
            <td>Yes + LinkedIn badge</td>
        </tr>
    </tbody>
</table>
```

Notice: the first cell of each body row uses `<th scope="row">` instead of `<td>` — these are row headers (plan names), not data cells. This tells screen readers: "The row containing this cell is about 'Student'."

---

## Responsive Tables

Wide tables overflow their containers on narrow screens. The most common fix is wrapping the table in a scrollable container:

```html
<div style="overflow-x: auto;">
    <table>
        ...
    </table>
</div>
```

This lets the table scroll horizontally on small screens while keeping the page layout intact. CSS handles this; we'll build proper responsive table styles in Section 3.

---

## When to Use Tables vs. CSS Layout

This distinction is fundamental:

| Situation | Use |
|-----------|-----|
| Data with rows and columns (spreadsheet-like) | `<table>` |
| Comparison charts, price tables, schedules | `<table>` |
| Financial reports, statistics | `<table>` |
| Laying out a web page | CSS Grid or Flexbox |
| Placing columns of content side-by-side | CSS Grid or Flexbox |
| Centering or positioning elements | CSS |

**Never use tables for page layout.** Using tables for layout:
- Is semantically wrong (content isn't tabular)
- Destroys accessibility (screen readers navigate tables as data)
- Makes responsive design nearly impossible
- Is a practice from 1998 that has no place in modern HTML

---

## Knowledge Check

<div data-quiz-group data-title="HTML Tables">

<div data-quiz-question="What is the purpose of the scope attribute on a &lt;th&gt; element?" data-correct="2" data-explanation="The scope attribute on &lt;th&gt; tells screen readers which cells this header applies to. scope='col' means this header applies to all cells in its column. scope='row' means it applies to all cells in its row. Without scope, screen readers may not be able to correctly announce which header corresponds to a given data cell, especially in complex tables.">
<div data-quiz-option>It determines the visual width of the header cell in the rendered table</div>
<div data-quiz-option>It links the header to a specific CSS style scope</div>
<div data-quiz-option>It tells screen readers which cells this header applies to (column or row), enabling correct cell-header association</div>
<div data-quiz-option>It restricts the header's content from being copied or selected</div>
</div>

<div data-quiz-question="A table cell needs to span across 3 columns. Which attribute achieves this?" data-correct="3" data-explanation="colspan='3' makes a cell occupy 3 column positions in a row. When you do this, the following cells in that row are offset accordingly — you write 3 fewer td cells in that row. colspan applies to both td and th elements. rowspan does the same thing but for vertical spanning across multiple rows.">
<div data-quiz-option>span='3'</div>
<div data-quiz-option>width='3'</div>
<div data-quiz-option>rowspan='3'</div>
<div data-quiz-option>colspan='3'</div>
</div>

<div data-quiz-question="Which element provides an accessible title that is programmatically associated with a specific table?" data-correct="1" data-explanation="The &lt;caption&gt; element is placed as the first child of &lt;table&gt; and provides a title that is programmatically associated with that specific table. Screen readers announce the caption when the user enters the table, providing immediate context. While you could use an &lt;h2&gt; above the table, it's only visually associated — &lt;caption&gt; creates a semantic relationship.">
<div data-quiz-option>&lt;title&gt; inside the table</div>
<div data-quiz-option>&lt;caption&gt; as the first child of &lt;table&gt;</div>
<div data-quiz-option>&lt;th scope='table'&gt; in the first row</div>
<div data-quiz-option>An aria-label attribute on the &lt;table&gt; element</div>
</div>

<div data-quiz-question="When should you NOT use an HTML table?" data-correct="0" data-explanation="HTML tables should only be used for genuinely tabular data — information that makes sense in rows and columns, like a spreadsheet. Using tables for page layout (placing columns of text side-by-side, centering a form, etc.) is semantically wrong, breaks accessibility, and makes responsive design extremely difficult. CSS Grid and Flexbox are the correct tools for layout.">
<div data-quiz-option>To create page layouts with columns and rows — use CSS Grid or Flexbox instead</div>
<div data-quiz-option>For displaying a comparison chart of product features</div>
<div data-quiz-option>For financial reports and statistics</div>
<div data-quiz-option>For a class schedule showing days and time slots</div>
</div>

</div>

---

## What's Next

Data organized. In **Lesson 27**, you'll build forms — the mechanism by which users send information back to your server. You'll learn the `<form>` element, all the `<input>` types, how to pair labels correctly, and the foundational form structure that every web application uses.

---

## A Prayer for Structure

*Lord, You created a world with structure and order — cells, molecules, systems, galaxies, all intricately organized. As these students practice organizing data in tables, may they appreciate the gift of structure: how it makes complexity navigable and information meaningful.*

*May the attention to detail they develop here — proper headers, correct scope attributes, accessible markup — carry into every aspect of their professional work.*

*In Jesus' name, Amen.*

---

> *"For everything that was written in the past was written to teach us, so that through the endurance taught in the Scriptures and the encouragement they provide we might have hope."*
> — Romans 15:4 (NIV)
