---
title: "Lesson 23: Images and Media — Showing the World"
date: 2026-05-19
author: LokiSoft Team
excerpt: Master HTML images with proper alt text, responsive images with srcset and picture, lazy loading, and embedding audio and video the right way.
categories: shadcn-nextjs, HTML, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 23: Images and Media — Showing the World

> *"The heavens declare the glory of God; the skies proclaim the work of his hands."*
> — Psalm 19:1 (NIV)

---

## Quest Briefing

Images are often the most impactful visual elements on a page — but they're also where many developers make mistakes: missing alt text, using the wrong format, loading enormous files on mobile, or breaking accessibility for blind users.

This lesson covers HTML images from the basics to the advanced `<picture>` element for responsive images. You'll also learn how to embed audio and video the HTML way.

By the end of this lesson you will:
- Write proper `<img>` tags with all required and recommended attributes
- Understand the critical importance of alt text
- Use `srcset` to serve different image sizes to different screens
- Use `<picture>` to serve different image formats or art-directed crops
- Add lazy loading for performance
- Embed audio and video with accessibility in mind

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 18 | What is HTML? |
| Lesson 22 | Links and Navigation |

---

## The `<img>` Element

```html
<img src="photo.jpg" alt="A golden retriever sitting in a field of sunflowers">
```

`<img>` is a **void element** (no closing tag). Its two required attributes:

- `src` — the path to the image file (relative or absolute URL)
- `alt` — alternative text describing the image

### File Paths Work the Same as Links

```html
<!-- Same directory -->
<img src="hero.jpg" alt="...">

<!-- Subfolder -->
<img src="images/profile.jpg" alt="...">

<!-- Root-relative -->
<img src="/images/logo.svg" alt="...">

<!-- External URL -->
<img src="https://example.com/photo.jpg" alt="...">
```

---

## The `alt` Attribute — Non-Negotiable

The `alt` attribute provides a **text alternative** for the image. This text is:
- Read aloud by screen readers for users who cannot see the image
- Displayed in place of the image if it fails to load
- Indexed by search engines (images can rank in image search)
- Used by some browsers when images are disabled

### Writing Good Alt Text

Think about what the image communicates. Describe the content and function, not the aesthetic.

| Context | Image | Good Alt Text |
|---------|-------|--------------|
| Product page | Photo of a blue sneaker | `"Blue Nike Air Max in size 10, side view"` |
| Article | Graph of sales data | `"Bar chart showing 40% sales increase from Q1 to Q2 2026"` |
| Team page | Headshot | `"Sarah Chen, Lead Developer at TechCorp"` |
| Icon button | Magnifying glass | `"Search"` (describes function, not appearance) |
| Decorative | Abstract background texture | `""` (empty alt — explained below) |

### Empty Alt Text for Decorative Images

If an image is purely decorative — a background texture, an icon that duplicates adjacent text, a flourish — give it an empty `alt=""`:

```html
<!-- Decorative divider — no information value -->
<img src="divider-line.png" alt="">

<!-- Icon next to labeled text — the text already says it -->
<a href="/home">
    <img src="home-icon.svg" alt="">
    Home
</a>
```

An empty `alt=""` tells screen readers to skip the image entirely. A **missing** `alt` attribute is different — screen readers often read the filename (`"home-icon-svg"`) which is useless noise. Always include `alt`, even if it's empty.

<div data-info-box="danger" data-title="Missing alt Is an Accessibility Failure">
An image without any alt attribute is a WCAG accessibility violation. It fails WCAG 2.1 Success Criterion 1.1.1 (Non-text Content). All professional projects are expected to meet accessibility standards. Make `alt` text a reflex — never add an image without it.
</div>

---

## Width and Height Attributes

```html
<img src="photo.jpg" alt="Mountain landscape" width="800" height="600">
```

Setting explicit `width` and `height` helps the browser **reserve space** for the image before it loads. Without these, the browser doesn't know how big the image is until it loads — causing **layout shift** (content jumping around as images load).

The values should match the image's natural (intrinsic) dimensions in pixels. CSS can scale the image further, but the attributes prevent layout shift.

<div data-info-box="info" data-title="Core Web Vitals: Cumulative Layout Shift">
Layout shift is measured by Google as the **Cumulative Layout Shift (CLS)** Core Web Vital — one of the metrics that directly affects your search rankings. Always set width and height on images to get a CLS score of 0. This is one of the easiest wins for page performance.
</div>

---

## Choosing the Right Image Format

| Format | Best For | Notes |
|--------|----------|-------|
| **WebP** | Photos, graphics | Modern format — 25-35% smaller than JPEG with same quality |
| **AVIF** | Photos | Even smaller than WebP — cutting-edge, less browser support |
| **JPEG/JPG** | Photos | Good fallback for older browsers |
| **PNG** | Graphics needing transparency | Larger than WebP for photos |
| **SVG** | Logos, icons, illustrations | Vector — scales to any size perfectly |
| **GIF** | Simple animations | Large; prefer video format for complex animations |

The modern best practice: **serve WebP** to browsers that support it, with a JPEG fallback. This is what the `<picture>` element was designed for.

---

## `<figure>` and `<figcaption>` — Semantic Image Container

```html
<figure>
    <img src="grand-canyon.jpg" alt="Aerial view of the Grand Canyon at sunset, showing layered red and orange rock formations">
    <figcaption>The Grand Canyon, Arizona. Photo taken during the golden hour in October 2024.</figcaption>
</figure>
```

`<figure>` is a semantic container for self-contained content referenced from the main text — images, charts, code examples, etc. `<figcaption>` provides the visible caption.

The caption is separate from alt text: alt describes the image for those who can't see it; the caption provides context for everyone.

---

## Responsive Images with `srcset`

A photo that looks great at 1200px wide on a desktop is 10x more data than needed on a phone. The `srcset` attribute lets you provide multiple versions of the same image and let the browser choose the most appropriate:

```html
<img
    src="photo-800.jpg"
    srcset="
        photo-400.jpg 400w,
        photo-800.jpg 800w,
        photo-1200.jpg 1200w,
        photo-1600.jpg 1600w
    "
    sizes="
        (max-width: 600px) 100vw,
        (max-width: 1200px) 50vw,
        800px
    "
    alt="A mountain landscape at sunrise"
    width="800"
    height="533"
>
```

Breaking this down:

**`srcset`** — a list of image sources with their widths:
- `photo-400.jpg 400w` — this file is 400px wide
- `photo-800.jpg 800w` — this file is 800px wide

**`sizes`** — tells the browser how wide the image will actually display at different viewport sizes:
- `(max-width: 600px) 100vw` — on screens ≤600px wide, the image takes up 100% of the viewport width
- `(max-width: 1200px) 50vw` — on screens ≤1200px, the image takes up 50%
- `800px` — otherwise (desktop), the image is 800px wide

The browser uses `sizes` to determine how wide the image will be displayed, then picks the smallest image from `srcset` that's large enough for that display. A phone gets `photo-400.jpg`; a Retina desktop might get `photo-1600.jpg`.

<div data-info-box="hint" data-title="srcset for 2x / Retina Displays">
You can also use `srcset` with pixel density descriptors for Retina support:

```html
<img
    src="logo.png"
    srcset="logo.png 1x, logo@2x.png 2x, logo@3x.png 3x"
    alt="LokiSoft logo"
>
```

On a standard screen, `logo.png` loads. On a Retina/HiDPI screen, `logo@2x.png` loads — sharper without the user doing anything.
</div>

---

## The `<picture>` Element — Advanced Image Control

`<picture>` gives you full control over which image loads, with fallbacks:

### Format Switching (WebP with JPEG fallback)

```html
<picture>
    <!-- Modern browsers use AVIF -->
    <source srcset="photo.avif" type="image/avif">
    <!-- Browsers that don't support AVIF use WebP -->
    <source srcset="photo.webp" type="image/webp">
    <!-- Fallback for browsers that don't support either -->
    <img src="photo.jpg" alt="A mountain landscape" width="800" height="533">
</picture>
```

The browser tries each `<source>` in order and uses the first one it supports. The `<img>` is the fallback and always required — it's also where `alt`, `width`, and `height` go.

### Art Direction — Different Images for Different Sizes

Sometimes you want a completely different image (not just a different size) on mobile vs. desktop — a tighter crop for small screens, a wide panoramic for large ones:

```html
<picture>
    <!-- Mobile: tight portrait crop -->
    <source
        media="(max-width: 600px)"
        srcset="hero-portrait.jpg"
    >
    <!-- Tablet: medium crop -->
    <source
        media="(max-width: 1200px)"
        srcset="hero-medium.jpg"
    >
    <!-- Desktop: full panoramic -->
    <img src="hero-wide.jpg" alt="The LokiSoft team at our annual company retreat" width="1600" height="600">
</picture>
```

---

## Lazy Loading

```html
<img src="below-fold-image.jpg" alt="Product photo" loading="lazy" width="600" height="400">
```

The `loading="lazy"` attribute tells the browser to delay loading the image until it's near the viewport (about to become visible as the user scrolls). This:
- Reduces initial page load time
- Saves bandwidth on pages with many images
- Improves performance scores

**Don't use `loading="lazy"` on images above the fold** (visible when the page first loads) — those should load immediately. Use it for all images below the fold.

```html
<!-- Above fold — load immediately (default) -->
<img src="hero.jpg" alt="Hero image" width="1200" height="600">

<!-- Below fold — defer until near viewport -->
<img src="product-1.jpg" alt="Product 1" loading="lazy" width="400" height="300">
<img src="product-2.jpg" alt="Product 2" loading="lazy" width="400" height="300">
```

---

## Audio — `<audio>`

```html
<audio controls>
    <source src="podcast-episode.mp3" type="audio/mpeg">
    <source src="podcast-episode.ogg" type="audio/ogg">
    <p>Your browser doesn't support HTML audio. <a href="podcast-episode.mp3">Download the episode</a>.</p>
</audio>
```

Key attributes:
- `controls` — shows the browser's built-in audio player UI (play, pause, volume, seek)
- `autoplay` — starts playing when the page loads (avoid this — it's jarring for users)
- `loop` — plays on repeat
- `muted` — starts muted (useful with autoplay)
- `preload="none|metadata|auto"` — controls how much to preload before the user presses play

The fallback content between the tags displays in browsers that don't support `<audio>`.

---

## Video — `<video>`

```html
<video controls width="800" height="450" poster="thumbnail.jpg">
    <source src="demo-video.webm" type="video/webm">
    <source src="demo-video.mp4" type="video/mp4">
    <p>Your browser doesn't support HTML video. <a href="demo-video.mp4">Download the video</a>.</p>
</video>
```

Key attributes:
- `controls` — shows the browser's built-in video player UI
- `width` / `height` — set dimensions (prevents layout shift)
- `poster="thumbnail.jpg"` — a still image shown before the video plays
- `autoplay` — starts playing immediately (requires `muted` in most browsers for autoplay to work)
- `muted` — mutes audio by default
- `loop` — plays on repeat
- `playsinline` — plays inline on iOS instead of full-screen (important for mobile)

```html
<!-- Background video (muted, autoplay, loop) — acceptable use of autoplay -->
<video autoplay muted loop playsinline width="1920" height="1080" aria-hidden="true">
    <source src="background.webm" type="video/webm">
    <source src="background.mp4" type="video/mp4">
</video>
```

<div data-info-box="info" data-title="YouTube and Vimeo: Use iframe Embeds">
For embedding third-party videos (YouTube, Vimeo), use their provided `<iframe>` embed code rather than `<video>`. The iframe handles all the streaming, quality selection, CDN delivery, and playback controls — far more capable than HTML5 `<video>` for streamed content.

```html
<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video title for accessibility"
    allowfullscreen
    loading="lazy"
></iframe>
```
</div>

---

## Knowledge Check

<div data-quiz-group data-title="Images and Media">

<div data-quiz-question="What is the alt attribute for, and what should you put in it for a purely decorative image?" data-correct="1" data-explanation="The alt attribute provides a text alternative for the image for screen readers, browsers that can't load images, and search engines. For purely decorative images (textures, flourishes, icons that duplicate nearby text), use alt='' (empty string) — this tells screen readers to skip the image entirely. Never omit the alt attribute — a missing alt causes screen readers to read the filename, which is useless noise.">
<div data-quiz-option>It's a tooltip shown on hover; decorative images should have alt='decorative'</div>
<div data-quiz-option>It provides a text alternative for screen readers and failed loads; decorative images get alt='' (empty)</div>
<div data-quiz-option>It describes the image for search engines only; decorative images should be omitted</div>
<div data-quiz-option>It sets the fallback color shown while the image loads; it's optional for decorative images</div>
</div>

<div data-quiz-question="Why should you always set explicit width and height attributes on &lt;img&gt; elements?" data-correct="3" data-explanation="Before an image loads, the browser doesn't know its dimensions. Without width and height, it allocates no space and the image has zero height. When the image loads, the browser must recalculate layout — causing other elements to shift. This is measured as Cumulative Layout Shift (CLS), a Google Core Web Vital that affects SEO. Setting width and height lets the browser reserve the exact right space from the start, eliminating layout shift.">
<div data-quiz-option>Because browsers refuse to display images without explicit dimensions</div>
<div data-quiz-option>To control the physical file size of the image on the server</div>
<div data-quiz-option>So that CSS cannot override the image dimensions</div>
<div data-quiz-option>To prevent layout shift — the browser reserves the right amount of space before the image loads</div>
</div>

<div data-quiz-question="What does loading='lazy' do on an img element?" data-correct="2" data-explanation="loading='lazy' tells the browser to defer loading the image until it's close to entering the viewport (as the user scrolls down). This reduces initial page load time and saves bandwidth for images the user may never scroll to. Do NOT use lazy on above-the-fold images (the ones visible when the page first loads) — those should load immediately to avoid a visible blank space.">
<div data-quiz-option>Applies a lazy loading animation as the image fades in</div>
<div data-quiz-option>Downloads the image at reduced quality initially, then improves it as bandwidth allows</div>
<div data-quiz-option>Defers loading the image until the user scrolls near it, saving initial load time and bandwidth</div>
<div data-quiz-option>Loads the image in a background worker thread to avoid blocking JavaScript</div>
</div>

<div data-quiz-question="What is the purpose of the &lt;picture&gt; element?" data-correct="0" data-explanation="The &lt;picture&gt; element lets you provide multiple image sources with conditions, and the browser picks the best one. It enables format switching (serve WebP to modern browsers, JPEG to older ones) and art direction (serve a tightly-cropped portrait on mobile, a wide landscape on desktop). The img element inside picture is always required as the fallback and is where alt, width, and height go.">
<div data-quiz-option>Allows serving different images based on browser support or screen size — enabling format switching and art direction</div>
<div data-quiz-option>Creates a frame or border around an image automatically</div>
<div data-quiz-option>Enables images to be used as clickable maps with multiple hotspots</div>
<div data-quiz-option>Replaces the img element with a more modern, accessible alternative</div>
</div>

</div>

---

## What's Next

You've brought your pages to life with images and media. In **Lesson 24**, it's time for the first checkpoint quiz — 18 questions covering everything from the DOCTYPE declaration through images, links, and media. Think of it as your first boss battle before advancing deeper into the HTML dungeon.

---

## A Prayer for Visual Craft

*Lord, You are the original Creator — light and color, form and dimension, all crafted by Your hand. When we design with images, we engage in a small reflection of that creativity.*

*Give these students an eye for purposeful visual choices — images that communicate, not just decorate. Help them think about the users who cannot see those images, and build with accessibility as a first priority.*

*May everything they create be crafted with care — for the glory of God and the genuine service of the people who will use it.*

*In Jesus' name, Amen.*

---

> *"He has filled them with skill to do all kinds of work as engravers, designers, embroiderers in blue, purple and scarlet yarn and fine linen, and weavers — all of them skilled workers and designers."*
> — Exodus 35:35 (NIV)
