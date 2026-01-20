---
title: "Blog Post Features Reference: Your Complete Guide to Rich Content"
date: 2026-01-14
author: LokiSoft Team
excerpt: A comprehensive reference guide showcasing all the features available in the LokiSoft blog system - from basic Markdown to interactive components.
categories: Documentation, Reference, Tutorial
difficulty: 2
featured: false
coverImage: /features-reference-cover.svg
---

# Complete Feature Reference

This comprehensive guide documents every feature available in the LokiSoft blog system. Whether you're writing your first post or looking for advanced formatting options, you'll find everything you need here.

> *"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."*
> — Colossians 3:23 (NIV)

---

## Introduction

The LokiSoft blog system is built on Markdown with powerful extensions for interactive content. This reference covers:

- **Basic formatting** - Text styles, headings, lists
- **Rich media** - Images, code blocks, tables
- **Interactive components** - Info boxes, toggles, quizzes
- **Advanced features** - Math equations, custom HTML

### What You'll Learn

| Section | Content |
|---------|---------|
| Frontmatter | Post metadata and settings |
| Text Formatting | Bold, italic, headings |
| Media | Images, links, code |
| Components | Info boxes, toggles, quizzes |
| Advanced | Math, custom HTML |

<div data-info-box="hint" data-title="Bookmark This Page">
Keep this reference handy while writing. It covers every feature with examples you can copy and adapt.
</div>

---

## Frontmatter Options

Every post begins with YAML frontmatter that defines its metadata:

```yaml
---
title: Your Post Title
date: 2026-01-15
author: Author Name
excerpt: Brief description for cards and SEO (150-160 characters)
categories: Cat1, Cat2, Cat3
difficulty: 3
featured: true
announcement: false
coverImage: /path/to/image.jpg
---
```

### Field Reference

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | "Untitled" | Post title displayed everywhere |
| `date` | string | Today | Publication date (YYYY-MM-DD) |
| `author` | string | "LokiSoft Team" | Author name shown on post |
| `excerpt` | string | First 160 chars | Short description for SEO |
| `categories` | string/array | [] | Comma-separated or array format |
| `difficulty` | number | 1 | Skill level (1-5 stars) |
| `featured` | boolean | false | Show on homepage featured section |
| `announcement` | boolean | false | Display with announcement styling |
| `coverImage` | string | null | Path to cover image |

> *"The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding."*
> — Proverbs 4:7 (NIV)

---

## Text Formatting

### Basic Styles

| Markdown | Result | Use For |
|----------|--------|---------|
| `**bold**` | **bold** | Emphasis, key terms |
| `*italic*` | *italic* | Titles, foreign words |
| `***bold italic***` | ***bold italic*** | Strong emphasis |
| `` `code` `` | `code` | Code, commands |
| `~~strikethrough~~` | ~~strikethrough~~ | Corrections, old info |

### Headings

Use headings to create structure. They automatically populate the Table of Contents.

```markdown
# H1 - Page Title (one per post)
## H2 - Major Section
### H3 - Subsection
#### H4 - Minor Section
##### H5 - Detail
###### H6 - Fine Detail
```

<div data-info-box="info" data-title="Table of Contents">
Headings H2-H6 automatically appear in the sidebar Table of Contents, helping readers navigate your post.
</div>

---

## Links & Images

### Link Formats

```markdown
[External Link](https://example.com)
[Internal Link](/about)
[Link with Title](https://example.com "Hover text")
[Email Link](mailto:hello@lokisoft.xyz)
```

**Examples:**
- [Visit our About Page](/about)
- [Contact Us](mailto:hello@lokisoft.xyz)

### Images

```markdown
![Alt text](/image.jpg)
![Alt text](/image.jpg "Title on hover")
```

**Image Features:**
- Click any image to open in a lightbox viewer
- Navigate between images with arrow keys
- Zoom up to 300% with scroll wheel
- Drag to pan when zoomed in

Example images:

![LokiSoft Logo](/lokisoft-logo.svg "Company Logo")

![Tutorial Screenshot](/tutorial-screenshot.svg "Code Example")

> *"A picture is worth a thousand words, but a word fitly spoken is like apples of gold in a setting of silver."*
> — Proverbs 25:11 (ESV)

---

## Code Blocks

### Inline Code

Use backticks for `inline code` like `const x = 5` or `npm install`.

### Block Code with Syntax Highlighting

Specify the language after the opening backticks:

**JavaScript:**
```javascript
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

// Call the function
greet("World"); // Output: "Hello, World!"
```

**TypeScript:**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (data: Partial<User>): User => ({
  id: Date.now(),
  name: '',
  email: '',
  ...data
});
```

**Python:**
```python
def fibonacci(n: int) -> list[int]:
    """Generate the first n Fibonacci numbers."""
    if n <= 0:
        return []
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

# Example: Get first 10 numbers
print(fibonacci(10))
```

**Bash:**
```bash
# Clone and setup a project
git clone https://github.com/user/repo.git
cd repo
npm install
npm run dev
```

**CSS:**
```css
.neon-glow {
  color: var(--neon-pink);
  text-shadow:
    0 0 10px var(--neon-pink),
    0 0 20px var(--neon-pink);
}
```

**JSON:**
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0"
  }
}
```

<div data-info-box="hint" data-title="Supported Languages">
The syntax highlighter supports dozens of languages including: javascript, typescript, python, bash, css, html, json, yaml, rust, go, java, c, cpp, and many more.
</div>

---

## Lists

### Unordered Lists

```markdown
- First item
- Second item with **formatting**
- Third item
  - Nested item
  - Another nested
    - Deep nesting
- Back to top level
```

- First item
- Second item with **formatting**
- Third item
  - Nested item
  - Another nested
    - Deep nesting
- Back to top level

### Ordered Lists

```markdown
1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Fourth step
```

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Fourth step

### Task Lists (Interactive Checklists)

Task lists become interactive checklists that readers can use:

```markdown
- [x] Completed task
- [x] Another done item
- [ ] Pending task
- [ ] Future work
```

- [x] Completed task
- [x] Another done item
- [ ] Pending task
- [ ] Future work

<div data-info-box="success" data-title="Interactive Feature">
Checkboxes are fully interactive! Readers can check items off, and their progress is saved in their browser.
</div>

---

## Tables

### Basic Table

```markdown
| Feature | Status | Priority |
|---------|--------|----------|
| Dark Mode | Complete | High |
| Search | Complete | High |
| Comments | Complete | Medium |
```

| Feature | Status | Priority |
|---------|--------|----------|
| Dark Mode | Complete | High |
| Search | Complete | High |
| Comments | Complete | Medium |

### Column Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L1 | C1 | R1 |
| L2 | C2 | R2 |
```

| Left | Center | Right |
|:-----|:------:|------:|
| L1 | C1 | R1 |
| L2 | C2 | R2 |

---

## Blockquotes

### Simple Quote

```markdown
> This is a blockquote. Great for highlighting important
> information or citing sources.
```

> This is a blockquote. Great for highlighting important information or citing sources.

### Scripture Formatting

For Bible verses, use italics and attribution:

```markdown
> *"For God so loved the world that he gave his one and only Son,
> that whoever believes in him shall not perish but have eternal life."*
> — John 3:16 (NIV)
```

> *"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."*
> — John 3:16 (NIV)

---

## Math Expressions

Using LaTeX syntax for mathematical notation.

### Inline Math

The quadratic formula is $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$ for solving $ax^2 + bx + c = 0$.

### Block Math

```markdown
$$
E = mc^2
$$
```

$$
E = mc^2
$$

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

> *"He determines the number of the stars and calls them each by name. Great is our Lord and mighty in power; his understanding has no limit."*
> — Psalm 147:4-5 (NIV)

---

## Special Components

### Info Boxes

Five types of info boxes for different purposes:

<div data-info-box="info" data-title="Information">
General information, notes, and context for the reader. Use for supplementary details.
</div>

<div data-info-box="hint" data-title="Hint">
Tips, best practices, and helpful suggestions. Share your experience and wisdom.
</div>

<div data-info-box="warning" data-title="Warning">
Cautions, potential issues, and things to watch out for. Prevent common mistakes.
</div>

<div data-info-box="danger" data-title="Danger">
Critical warnings, destructive actions, and security concerns. Use sparingly for impact.
</div>

<div data-info-box="success" data-title="Success">
Confirmations, achievements, and positive outcomes. Celebrate wins with your readers.
</div>

**Syntax:**
```html
<div data-info-box="TYPE" data-title="Your Title">
Your content here...
</div>
```

Types: `info`, `hint`, `warning`, `danger`, `success`

### Toggle Boxes

Collapsible sections for optional content:

<div data-toggle-box data-title="Collapsed by Default">

This content is hidden until clicked. Perfect for:

- Spoilers or solutions
- Advanced details
- Long code examples
- Optional deep-dives

```javascript
// Code works inside toggle boxes too!
console.log("Hidden code revealed!");
```

</div>

<div data-toggle-box="open" data-title="Expanded by Default">

Use `data-toggle-box="open"` to start expanded. Good for important content that should still be collapsible for space.

</div>

**Syntax:**
```html
<!-- Collapsed -->
<div data-toggle-box data-title="Click to Expand">
Content...
</div>

<!-- Expanded -->
<div data-toggle-box="open" data-title="Already Open">
Content...
</div>
```

---

## Interactive Quizzes

Create interactive quizzes with score tracking to help readers test their understanding:

<div data-quiz-group data-title="Quick Knowledge Check">

<div data-quiz-question="What format is used for blog post files?" data-correct="1" data-explanation="Blog posts are written in Markdown (.md) files, which are then converted to HTML by the blog system.">
<div data-quiz-option>HTML (.html)</div>
<div data-quiz-option>Markdown (.md)</div>
<div data-quiz-option>JSON (.json)</div>
<div data-quiz-option>Plain Text (.txt)</div>
</div>

<div data-quiz-question="Which frontmatter field makes a post appear on the homepage?" data-correct="0" data-explanation="Setting featured: true in the frontmatter makes a post appear in the featured section on the homepage.">
<div data-quiz-option>featured: true</div>
<div data-quiz-option>homepage: true</div>
<div data-quiz-option>pinned: true</div>
<div data-quiz-option>display: homepage</div>
</div>

</div>

**Quiz Syntax:**
```html
<div data-quiz-group data-title="Quiz Title">

<div data-quiz-question="Question text?" data-correct="0" data-explanation="Explanation shown after answering.">
<div data-quiz-option>Option A (index 0 - correct)</div>
<div data-quiz-option>Option B (index 1)</div>
<div data-quiz-option>Option C (index 2)</div>
</div>

</div>
```

> *"Apply your heart to instruction and your ears to words of knowledge."*
> — Proverbs 23:12 (NIV)

---

## Horizontal Rules

Create section dividers with three dashes:

```markdown
---
```

Use them to separate major sections of your post.

---

## Special Characters & Emojis

### Common Symbols

- Copyright: © (`©`)
- Trademark: ™ (`™`)
- Registered: ® (`®`)
- Degree: 45° (`°`)
- Plus/Minus: ±5 (`±`)

### Arrows

→ ← ↑ ↓ ↔ ⇒ ⇐

### Emojis

Emojis work directly in your content, but use them sparingly for professional posts.

---

## Best Practices Summary

| Element | Best Practice |
|---------|---------------|
| Headings | Use logical hierarchy (H2 > H3 > H4) |
| Images | Always include descriptive alt text |
| Code | Specify language for syntax highlighting |
| Links | Use descriptive anchor text |
| Info Boxes | Don't overuse - save for important info |
| Tables | Use for structured data, not layout |

---

## What's Next

Now that you know all the features available:

1. **Start writing** - Create your first post using these features
2. **Experiment** - Try different components to see what works
3. **Reference back** - Bookmark this page for quick lookups

### Related Resources

- [Writing Your First Post](/blog/example-post) - Quick start guide
- [Clone This Website](/blog/first-steps) - Setup instructions
- [Blog Post Template](/blog/optimized-post) - Professional template

---

## Conclusion

The LokiSoft blog system provides everything you need to create engaging, professional content. From basic Markdown to interactive quizzes, these tools help you serve your readers well.

Remember: the best content isn't about using every feature—it's about communicating clearly and helping your audience. Use these tools in service of that goal.

> *"Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone."*
> — Colossians 4:6 (NIV)

---

## A Prayer for Content Creators

*Lord, thank You for the gift of communication and the tools we have to share knowledge with others.*

*Help us use these capabilities wisely—not to show off, but to serve. May our posts be clear, helpful, and honoring to You. Give us the creativity to explain complex things simply and the humility to always keep learning.*

*Guide our words so they build others up. Use our content to answer questions, solve problems, and point people toward truth.*

*In Jesus' name, Amen.*

---

## Quick Reference Checklist

Before publishing, ensure your post:

- [ ] Has complete frontmatter (title, date, excerpt)
- [ ] Uses proper heading hierarchy
- [ ] Includes alt text on all images
- [ ] Has code blocks with language specified
- [ ] Uses info boxes appropriately
- [ ] Includes internal links to related content
- [ ] Has been proofread for errors
