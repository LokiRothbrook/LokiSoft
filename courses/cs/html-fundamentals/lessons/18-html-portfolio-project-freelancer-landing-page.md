---
title: "Lesson 35: HTML Portfolio Project — Freelancer Landing Page"
date: 2026-05-19
author: LokiSoft Team
excerpt: Build a full, deployed freelancer landing page — hero, services, about, testimonials, and contact form — using semantic HTML and ARIA, then ship it live on GitHub Pages.
categories: shadcn-nextjs, HTML, Project
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 35: HTML Portfolio Project — Freelancer Landing Page

> *"Commit to the Lord whatever you do, and he will establish your plans."*
> — Proverbs 16:3 (NIV)

---

## What This Proves

Before you build anything, understand what this project signals to employers:

**HTML Mastery** — A handwritten landing page with no HTML framework proves you understand the language at a foundational level, not just "I copied a template." Employers can tell the difference.

**Accessibility Awareness** — Correct use of semantic landmarks, ARIA labels, form associations, and skip links shows you've thought about every user — not just typical ones. This is increasingly valued and screened for in interviews.

**Semantic Discipline** — Using `<article>`, `<section>`, `<header>`, `<footer>`, `<address>`, and `<time>` correctly (not just `<div>` with class names) demonstrates you understand the *why* behind the markup — not just the syntax.

**Project Initiative** — A deployed page with a README shows you can take a project from zero to live. That matters more than you think.

---

## Project Brief

<div data-info-box="info" data-title="Client Brief — WebCraft Co.">

**Client:** WebCraft Co. (a fictional freelance web development agency — you are the founder)

**Project Type:** Marketing / Landing Page

**Deliverables:**
- Single-page marketing site for a freelance web developer
- Sections: Hero, Services, About, Testimonials, Contact
- Must be fully accessible and semantically correct
- Deployed to a live URL via GitHub Pages

**Tech Stack:** HTML5 only (CSS and JavaScript come in later sections)

**Deadline:** End of this lesson

**Notes:** The client (you) wants prospective employers and clients to be able to visit a URL and immediately understand what you do, what you've built, and how to contact you.

</div>

---

## What You'll Build

A six-section landing page:

1. **Header** — logo/name, navigation, skip link
2. **Hero** — headline, subheadline, two CTA buttons
3. **Services** — three service cards describing what you offer
4. **About** — bio, skills, photo placeholder
5. **Testimonials** — two or three quote cards
6. **Contact** — full accessible form + contact details
7. **Footer** — links, copyright

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 34 | HTML Mini-Project (completed) |
| Lesson 33 | Accessibility in HTML |
| Lesson 29 | Semantic HTML |
| Lesson 27–28 | Forms |

---

## Step 1: Create the Project

**Linux / macOS:**
```bash
mkdir ~/projects/freelancer-landing
cd ~/projects/freelancer-landing
git init
```

**Windows (Command Prompt):**
```cmd
mkdir %USERPROFILE%\projects\freelancer-landing
cd %USERPROFILE%\projects\freelancer-landing
git init
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Path "$env:USERPROFILE\projects\freelancer-landing"
Set-Location "$env:USERPROFILE\projects\freelancer-landing"
git init
```

Create `index.html` in VS Code:

```bash
code .
```

---

## Step 2: Document Shell

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO -->
    <title>Your Name — Freelance Web Developer</title>
    <meta name="description"
          content="Freelance web developer specializing in semantic HTML, accessible interfaces, and clean front-end code. Based in [Your City]. Available for projects.">

    <!-- Open Graph (social sharing) -->
    <meta property="og:title" content="Your Name — Freelance Web Developer">
    <meta property="og:description" content="Clean, accessible web development for businesses and individuals.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourusername.github.io/freelancer-landing">
</head>
<body>

</body>
</html>
```

---

## Step 3: Skip Link

```html
<a class="skip-link" href="#main-content"
   style="position:absolute;top:-40px;left:0;background:#1a56db;color:white;padding:8px 16px;text-decoration:none;z-index:9999;border-radius:0 0 4px 0;">
    Skip to main content
</a>
```

---

## Step 4: Site Header

```html
<header>
    <a href="/" aria-label="Your Name — home">
        <strong>YourName<span aria-hidden="true">.</span>dev</strong>
    </a>

    <nav aria-label="Main navigation">
        <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <a href="#contact">Hire Me</a>
</header>
```

---

## Step 5: Hero Section

```html
<main id="main-content">

    <section id="hero" aria-labelledby="hero-heading">
        <header>
            <h1 id="hero-heading">
                I build clean, accessible websites that work for everyone.
            </h1>
            <p>
                Freelance web developer based in [Your City]. I help small businesses
                and startups establish a professional online presence &mdash; built on
                solid HTML foundations, designed to grow.
            </p>
        </header>

        <div role="group" aria-label="Call to action">
            <a href="#contact">Start a Project</a>
            <a href="#services">See My Services</a>
        </div>

        <dl aria-label="Quick stats">
            <div>
                <dt>Projects Completed</dt>
                <dd>5+</dd>
            </div>
            <div>
                <dt>Months Learning</dt>
                <dd>5</dd>
            </div>
            <div>
                <dt>Commitment</dt>
                <dd>100%</dd>
            </div>
        </dl>
    </section>
```

The `<dl>` in the hero shows quick-stats — a common landing page pattern. Each `<div>` wraps a `<dt>/<dd>` pair for styling flexibility.

---

## Step 6: Services Section

```html
    <section id="services" aria-labelledby="services-heading">
        <header>
            <h2 id="services-heading">What I Build</h2>
            <p>Every project starts with the right foundation.</p>
        </header>

        <article aria-labelledby="service-1-heading">
            <h3 id="service-1-heading">Marketing Websites</h3>
            <p>
                Multi-section landing pages for freelancers, agencies, and small
                businesses. Built with semantic HTML for strong SEO, fast load times,
                and clear information architecture.
            </p>
            <ul>
                <li>Multi-section single-page layouts</li>
                <li>SEO-optimized structure</li>
                <li>Contact form integration</li>
            </ul>
        </article>

        <article aria-labelledby="service-2-heading">
            <h3 id="service-2-heading">Accessible Web Interfaces</h3>
            <p>
                Interfaces that work for every user &mdash; including those using
                screen readers, keyboard navigation, and assistive technologies.
                WCAG 2.1 compliance built in from the start.
            </p>
            <ul>
                <li>Semantic landmark structure</li>
                <li>Keyboard-navigable forms</li>
                <li>ARIA labels and live regions</li>
            </ul>
        </article>

        <article aria-labelledby="service-3-heading">
            <h3 id="service-3-heading">HTML Email Templates</h3>
            <p>
                Email is a completely separate HTML environment with its own quirks.
                I build table-based HTML email templates that render consistently
                across Gmail, Outlook, Apple Mail, and mobile clients.
            </p>
            <ul>
                <li>Cross-client compatibility</li>
                <li>Plain text fallback included</li>
                <li>Accessible alt text on all images</li>
            </ul>
        </article>
    </section>
```

---

## Step 7: About Section

```html
    <section id="about" aria-labelledby="about-heading">
        <header>
            <h2 id="about-heading">About Me</h2>
        </header>

        <div>
            <figure>
                <!-- Replace with a real photo — or keep this placeholder -->
                <img
                    src="https://placehold.co/300x300?text=Your+Photo"
                    alt="Your Name, freelance web developer"
                    width="300"
                    height="300"
                >
                <figcaption>
                    Your Name &mdash; freelance web developer based in [Your City]
                </figcaption>
            </figure>
        </div>

        <div>
            <p>
                I'm a self-taught web developer currently completing the LokiSoft
                full-stack curriculum. I got into web development because I believe
                the internet should work for everyone &mdash; and that starts with
                well-written HTML.
            </p>

            <p>
                I'm particularly interested in web accessibility and the craftsmanship
                of building things that are correct, not just functional. When I'm not
                coding, I'm [your hobby/interest here].
            </p>

            <section aria-labelledby="skills-summary-heading">
                <h3 id="skills-summary-heading">Technical Skills</h3>

                <table>
                    <caption>Skills by proficiency level</caption>
                    <thead>
                        <tr>
                            <th scope="col">Skill</th>
                            <th scope="col">Level</th>
                            <th scope="col">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>HTML5</td>
                            <td>Intermediate</td>
                            <td>Semantic, accessible, forms</td>
                        </tr>
                        <tr>
                            <td>Git &amp; GitHub</td>
                            <td>Intermediate</td>
                            <td>Branch, merge, PRs</td>
                        </tr>
                        <tr>
                            <td>CSS3</td>
                            <td>Beginner</td>
                            <td>Currently learning</td>
                        </tr>
                        <tr>
                            <td>JavaScript</td>
                            <td>Beginner</td>
                            <td>Up next</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </section>
```

---

## Step 8: Testimonials Section

```html
    <section id="testimonials" aria-labelledby="testimonials-heading">
        <header>
            <h2 id="testimonials-heading">What People Say</h2>
            <p>Feedback from collaborators and mentors.</p>
        </header>

        <article>
            <blockquote cite="#">
                <p>
                    &ldquo;[Your Name]'s attention to accessibility is remarkable for
                    someone early in their career. The code is clean, structured, and
                    easy to maintain. Would absolutely recommend.&rdquo;
                </p>
            </blockquote>
            <footer>
                <cite>
                    <address>
                        <strong>Alex Johnson</strong>,
                        Senior Developer &mdash; TechCorp Inc.
                    </address>
                </cite>
            </footer>
        </article>

        <article>
            <blockquote cite="#">
                <p>
                    &ldquo;When we needed a quick landing page for our product launch,
                    [Your Name] delivered a clean, fast, semantically correct page
                    in under a week. The site passed our accessibility audit on the
                    first try. Impressive.&rdquo;
                </p>
            </blockquote>
            <footer>
                <cite>
                    <address>
                        <strong>Maria Chen</strong>,
                        Founder &mdash; LaunchPad Studio
                    </address>
                </cite>
            </footer>
        </article>

        <article>
            <blockquote cite="#">
                <p>
                    &ldquo;I've mentored a lot of junior developers. What sets
                    [Your Name] apart is their commitment to doing things correctly
                    the first time. They don't rush past the fundamentals.&rdquo;
                </p>
            </blockquote>
            <footer>
                <cite>
                    <address>
                        <strong>David Park</strong>,
                        Engineering Lead &mdash; DevCraft Solutions
                    </address>
                </cite>
            </footer>
        </article>
    </section>
```

<div data-info-box="hint" data-title="Placeholder Testimonials">
Replace these placeholder testimonials with real ones as you gather them — from instructors, peers, collaborators on open-source projects, or anyone who can speak to your work ethic and code quality. Even one real testimonial is stronger than three fictional ones.
</div>

---

## Step 9: Contact Section

```html
    <section id="contact" aria-labelledby="contact-heading">
        <header>
            <h2 id="contact-heading">Start a Project</h2>
            <p>
                Tell me about what you need and I'll get back to you within
                24&nbsp;hours. No pressure, just conversation.
            </p>
        </header>

        <div>
            <!-- Contact form -->
            <form
                action="https://formspree.io/f/your-form-id"
                method="post"
                aria-label="Project inquiry form"
                novalidate
            >
                <div>
                    <label for="client-name">
                        Your Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                        type="text"
                        id="client-name"
                        name="name"
                        required
                        autocomplete="name"
                        placeholder="Jane Smith"
                        aria-describedby="name-hint"
                    >
                    <p id="name-hint">How should I address you in my reply?</p>
                </div>

                <div>
                    <label for="client-email">
                        Email Address <span aria-hidden="true">*</span>
                    </label>
                    <input
                        type="email"
                        id="client-email"
                        name="email"
                        required
                        autocomplete="email"
                        placeholder="jane@company.com"
                    >
                </div>

                <div>
                    <label for="client-company">Company or Website</label>
                    <input
                        type="text"
                        id="client-company"
                        name="company"
                        placeholder="Acme Corp or acme.com"
                        autocomplete="organization"
                    >
                </div>

                <fieldset>
                    <legend>Project Type <span aria-hidden="true">*</span></legend>
                    <label>
                        <input type="radio" name="project-type" value="landing-page" required>
                        Marketing / Landing Page
                    </label>
                    <label>
                        <input type="radio" name="project-type" value="accessible-ui">
                        Accessible Web Interface
                    </label>
                    <label>
                        <input type="radio" name="project-type" value="email-template">
                        HTML Email Template
                    </label>
                    <label>
                        <input type="radio" name="project-type" value="other">
                        Other — I'll explain in the message
                    </label>
                </fieldset>

                <div>
                    <label for="project-budget">
                        Budget Range
                    </label>
                    <select id="project-budget" name="budget">
                        <option value="">-- Select a range --</option>
                        <option value="under-500">Under $500</option>
                        <option value="500-1000">$500 &ndash; $1,000</option>
                        <option value="1000-3000">$1,000 &ndash; $3,000</option>
                        <option value="3000+">$3,000+</option>
                        <option value="unsure">Not sure yet</option>
                    </select>
                </div>

                <div>
                    <label for="project-timeline">
                        Desired Timeline
                    </label>
                    <input
                        type="date"
                        id="project-timeline"
                        name="timeline"
                        min="2026-05-20"
                    >
                </div>

                <div>
                    <label for="project-message">
                        Project Description <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                        id="project-message"
                        name="message"
                        required
                        rows="6"
                        placeholder="Tell me about your project. What does your business do? What problem does this website need to solve? Any design inspiration or examples you like?"
                        aria-describedby="message-hint"
                    ></textarea>
                    <p id="message-hint">
                        The more detail you provide, the more accurately I can
                        estimate the project. Minimum 50 characters.
                    </p>
                </div>

                <div>
                    <label>
                        <input type="checkbox" name="newsletter" value="yes">
                        I'd like to receive occasional updates about web development
                        tips from Your Name.
                    </label>
                </div>

                <button type="submit">Send Inquiry</button>
            </form>

            <!-- Direct contact info -->
            <aside aria-label="Direct contact information">
                <h3>Prefer to Reach Out Directly?</h3>
                <address>
                    <p>
                        <strong>Email:</strong>
                        <a href="mailto:hello@yourname.dev">hello@yourname.dev</a>
                    </p>
                    <p>
                        <strong>Response time:</strong> within 24 hours on business days
                    </p>
                </address>

                <h3>Find Me Online</h3>
                <ul>
                    <li>
                        <a href="https://github.com/yourusername"
                           target="_blank"
                           rel="noopener noreferrer">
                            GitHub &rarr;
                        </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/in/yourusername"
                           target="_blank"
                           rel="noopener noreferrer">
                            LinkedIn &rarr;
                        </a>
                    </li>
                </ul>

                <h3>Availability</h3>
                <p>
                    <strong>Status:</strong> Available for new projects
                </p>
                <p>
                    <time datetime="2026-05">As of May 2026</time>
                </p>
            </aside>
        </div>
    </section>

</main>
```

---

## Step 10: Footer

```html
<footer>
    <div>
        <strong>YourName.dev</strong>
        <p>Freelance web development &mdash; semantic, accessible, professional.</p>
    </div>

    <nav aria-label="Footer navigation">
        <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <div>
        <ul aria-label="Social links">
            <li>
                <a href="https://github.com/yourusername"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="GitHub profile (opens in new tab)">
                    GitHub
                </a>
            </li>
            <li>
                <a href="https://linkedin.com/in/yourusername"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="LinkedIn profile (opens in new tab)">
                    LinkedIn
                </a>
            </li>
        </ul>
    </div>

    <p>
        <small>
            &copy; <time datetime="2026">2026</time> Your Name. All rights reserved.
            Built with &hearts; and semantic HTML.
        </small>
    </p>
</footer>
```

---

## Step 11: Validate Your HTML

Before deploying, validate your HTML. Go to [validator.w3.org](https://validator.w3.org/#validate_by_input), paste your entire `index.html`, and click **Check**. Fix any errors before continuing.

Common errors to watch for:
- Missing `alt` attribute on images
- Duplicate `id` attribute values on the page
- `<label>` `for` attribute that doesn't match any `id`
- Unclosed elements
- `<br>` or other void elements written as `<br></br>` (should be `<br>`)

---

## Step 12: GitHub & Deployment

### Commit Your Work

```bash
git add index.html
git commit -m "Add freelancer landing page — Section 2 portfolio project"
```

### Create GitHub Repository

1. Go to [github.com](https://github.com) → **+** → **New repository**
2. Name: `freelancer-landing`
3. Description: `Freelancer landing page built with semantic HTML5 — LokiSoft Section 2 portfolio project.`
4. Set to **Public**
5. Do NOT initialize with README
6. Click **Create repository**

### Push to GitHub

**Linux / macOS:**
```bash
git remote add origin git@github.com:yourusername/freelancer-landing.git
git branch -M main
git push -u origin main
```

**Windows (Command Prompt / PowerShell):**
```cmd
git remote add origin git@github.com:yourusername/freelancer-landing.git
git branch -M main
git push -u origin main
```

### Deploy with GitHub Pages

1. On GitHub, open your `freelancer-landing` repository
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select `main` and `/ (root)` — click **Save**
6. Wait ~2 minutes, then refresh the page
7. GitHub will display: **"Your site is live at https://yourusername.github.io/freelancer-landing"**

That is your live URL. Copy it — you'll need it for the README.

---

## Step 13: Write a Strong README

Create `README.md`:

```markdown
# Freelancer Landing Page

A fully semantic, accessible HTML5 landing page for a freelance web developer.
Built as the Section 2 portfolio project for the [LokiSoft](https://lokisoft.xyz)
web development curriculum.

## Live Demo

**[View Live Site →](https://yourusername.github.io/freelancer-landing)**

![Screenshot of the freelancer landing page](screenshot.png)

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)

## Sections

- **Hero** — Headline, subheadline, and CTA buttons
- **Services** — Three service offering cards
- **About** — Bio, photo, and skills table
- **Testimonials** — Quote cards with semantic `<blockquote>` and `<cite>`
- **Contact** — Full accessible inquiry form with radio group, select, date picker, and textarea

## Accessibility Features

- Skip to main content link
- Semantic landmark elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`)
- Every form field has a visible, persistent `<label>`
- `fieldset` + `legend` for the radio group
- `aria-label` on all navigation elements and icon-only buttons
- `aria-labelledby` linking sections to their headings
- `aria-describedby` connecting hints to their form fields
- All images have appropriate `alt` text

## What I Learned Building This

- How to structure a multi-section marketing page with semantic HTML
- Writing accessible forms: label associations, fieldsets, aria-describedby
- Using `<blockquote>`, `<cite>`, and `<address>` for semantic testimonials
- Deploying a static HTML file to GitHub Pages
- Writing a professional project README

## Setup

No build step. Clone and open `index.html`:

```bash
git clone https://github.com/yourusername/freelancer-landing.git
cd freelancer-landing
# Open index.html in your browser, or use VS Code Live Server
```

## License

[MIT](LICENSE)
```

Take a screenshot of your deployed page and save it as `screenshot.png` in the project root — then add and commit everything:

```bash
git add README.md screenshot.png
git commit -m "Add README with live demo link and screenshot"
git push
```

---

<div data-info-box="success" data-title="Portfolio Project Complete">

Your freelancer landing page is live. Here's what you now have on your GitHub profile:

- A deployed page at a real public URL
- A repository with a README, screenshot, and live demo link
- Proof of semantic HTML and accessibility knowledge
- Something you can show in interviews and link from your LinkedIn

Share your GitHub URL in the LokiSoft community and get feedback!

</div>

---

## Challenge Board — Keep Building

Finished the guided project? Here are more projects you can build independently using the HTML skills from this section. Each one you complete is another entry on your portfolio and another proof of skill for employers.

### Journeyman Challenges (similar difficulty)

- **Restaurant Menu Page** — A single-page HTML menu for a fictional restaurant. Sections: hero with restaurant name/tagline, appetizers/entrees/desserts as `<section>` elements with `<table>` or `<dl>` for menu items and prices, an accessible contact/reservation form, and a footer with hours and address using `<address>` and `<time>`. Key requirements: semantic table structure with `<caption>` and `<th scope>`, correct use of `<time datetime>` for business hours, proper form label pairing.

- **Conference Schedule Page** — A day-by-day event schedule page for a fictional tech conference. Requirements: `<table>` with `colspan` for multi-session time blocks and `rowspan` for rooms spanning multiple rows, `<time>` elements with `datetime` for all session times, `<article>` for each talk description, `<details>`/`<summary>` for optional speaker bios. Key requirements: accessible table with all headers and scopes, working anchor navigation between days.

- **Recipe Collection Page** — A page listing three detailed recipes using correct HTML list semantics. Requirements: `<ol>` for ordered steps, `<ul>` for ingredients, nested lists for sub-steps, `<dl>` for nutritional info, `<figure>`/`<figcaption>` for recipe photos, `<time>` for prep and cook time with `datetime` using duration format (e.g., `PT30M`). Key requirements: ARIA labels on each recipe article, accessible print-friendly markup.

### Master Challenges (harder, stretch goals)

- **Accessible Documentation Site** — A multi-page HTML documentation site for a fictional API (3 pages: Overview, Endpoints, Examples). Requirements: consistent site-wide navigation, breadcrumb `<nav>` on inner pages using `aria-label="Breadcrumb"` and `aria-current="page"`, `<pre><code>` blocks for all code examples with proper entity escaping, a sidebar with jump links to every heading on the page, and a full-page accessible navigation pattern. The documentation must pass the W3C validator with zero errors on all three pages.

- **Accessible Form Wizard** — A multi-step inquiry form that uses HTML's `<details>` and `<summary>` elements to reveal each step (no JavaScript). Step 1: personal info (name, email, phone with proper autocomplete values). Step 2: project details (radio group in fieldset, select for budget, textarea for description). Step 3: review section that displays a summary of what they entered (using `<dl>`) and a final submit button. Key requirements: every step's `<details>` must have a `<summary>` that announces progress ("Step 1 of 3: Personal Info"), all form fields must be correctly labeled with `aria-describedby` for hints, and the form must pass axe DevTools with zero critical violations.

---

## What's Next

Section 2 is complete. In **Lesson 36**, you'll take the Section 2 comprehensive review quiz — 25-30 questions covering every HTML concept from lessons 18 through 35. Pass it and you're officially cleared to begin **Section 3: CSS**.

---

## A Prayer for Ships That Launch

*Lord, we talk a lot about learning. But today, something shipped. A real URL. A real page on the internet. Something someone else could visit and read and contact through.*

*May these students feel what it means to finish — not just to start, not just to learn, but to complete something and put it into the world. May that feeling be addictive. May it drive them to build the next thing, and the next.*

*May they never stop shipping. And in everything they make, may they do it with the same care you put into your creation — the kind of care that says "I made this for people, and I want it to be good."*

*In Jesus' name, Amen.*

---

> *"She sees that her trading is profitable, and her lamp does not go out at night."*
> — Proverbs 31:18 (NIV)
