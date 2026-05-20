---
title: "Lesson 34: HTML Mini-Project — Build a Static Profile Page"
date: 2026-05-19
author: LokiSoft Team
excerpt: Apply every HTML concept from Section 2 to build a fully semantic, accessible static profile page — then push it to GitHub as the first piece of your portfolio.
categories: shadcn-nextjs, HTML, Project
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 34: HTML Mini-Project — Build a Static Profile Page

> *"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."*
> — Colossians 3:23 (NIV)

---

## Quest Briefing

Adventurer — it's time to forge your first artifact.

Every HTML concept you've unlocked in Section 2 gets synthesized into a single project: a **static developer profile page**. No CSS. No JavaScript. Pure, professional HTML — semantic, accessible, and complete.

This page will become the seed of your portfolio. By the end of this lesson, you'll have a real file on GitHub that proves you can write structured, meaningful HTML from scratch.

---

## What You'll Build

A single-page personal profile that includes:

- A site header with your name and navigation
- A hero section with your name, role, and a brief bio
- An "About Me" section with key facts
- A "Skills" section showing your technical toolkit
- A "Projects" section with placeholder project cards
- A contact section with a working HTML form
- A semantic footer

All built with correct semantic elements, proper accessibility, and zero `<div>` soup.

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 18–33 | All of Section 2 — HTML Fundamentals |

---

## Step 1: Create Your Project Folder

Create a new folder for this project. Choose a location you'll remember.

**Linux / macOS:**
```bash
mkdir ~/projects/html-profile
cd ~/projects/html-profile
```

**Windows (Command Prompt):**
```cmd
mkdir %USERPROFILE%\projects\html-profile
cd %USERPROFILE%\projects\html-profile
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Path "$env:USERPROFILE\projects\html-profile"
Set-Location "$env:USERPROFILE\projects\html-profile"
```

---

## Step 2: Open in VS Code

**Linux / macOS / Windows:**
```bash
code .
```

This opens the folder in VS Code. If `code .` doesn't work, open VS Code manually and choose **File → Open Folder**.

---

## Step 3: Create `index.html`

In VS Code, create a new file named **`index.html`** in your project folder.

Type `!` and press **Tab** to generate the Emmet HTML boilerplate, then modify it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name — Web Developer</title>
    <meta name="description" content="Web developer profile for [Your Name]. Skills, projects, and contact information.">
</head>
<body>

</body>
</html>
```

Replace `Your Name` with your actual name throughout the lesson. Now let's build the body, section by section.

---

## Step 4: The Skip Link and Header

Add this directly inside `<body>`:

```html
<!-- Skip link for keyboard accessibility -->
<a href="#main-content" style="
    position: absolute;
    top: -40px;
    left: 0;
    background: #1a56db;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 0 0 4px 0;
    transition: top 0.2s;
">
    Skip to main content
</a>
<!-- Note: In a real project you'd put this style in a CSS file.
     We're using inline style here since we haven't covered CSS yet. -->

<header>
    <a href="/" aria-label="Home — Your Name's profile">
        <strong>Your Name</strong>
    </a>

    <nav aria-label="Main navigation">
        <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
</header>
```

The skip link uses `position: absolute; top: -40px` to hide it offscreen by default. When a keyboard user tabs to it, it becomes visible. The inline style is temporary — when you learn CSS in Section 3, you'll move all styling to a separate stylesheet.

---

## Step 5: The Hero Section

```html
<main id="main-content">

    <section aria-labelledby="hero-heading">
        <header>
            <h1 id="hero-heading">Hi, I'm Your Name.</h1>
            <p>Aspiring web developer &mdash; building my skills one lesson at a time.</p>
        </header>

        <p>
            I'm currently learning full-stack web development through the LokiSoft curriculum.
            I'm passionate about building clean, accessible web experiences. This page is my
            first hand-crafted HTML project &mdash; semantic, accessible, and made with care.
        </p>

        <a href="#contact">Get in touch &rarr;</a>
    </section>
```

Notice `aria-labelledby="hero-heading"` on the `<section>`. This associates the section's accessible name to the `<h1>` inside it — screen readers will announce "hero-heading section" when users navigate to it.

---

## Step 6: The About Section

```html
    <section id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">About Me</h2>

        <p>
            I'm based in [Your City, Your Country]. I discovered web development through
            [your story here — e.g., "a friend's recommendation" or "curiosity about how
            websites work"]. I'm working toward building real-world applications and
            eventually contributing to open-source projects.
        </p>

        <dl>
            <dt>Current Focus</dt>
            <dd>HTML, CSS, and JavaScript fundamentals</dd>

            <dt>Goal</dt>
            <dd>Full-stack web developer</dd>

            <dt>Learning Since</dt>
            <dd><time datetime="2026-01">January 2026</time></dd>

            <dt>Interests</dt>
            <dd>Web accessibility, clean code, open-source software</dd>
        </dl>
    </section>
```

The `<dl>` (description list) is the perfect element for key-value pairs like personal facts. The `<time>` element makes the date machine-readable.

---

## Step 7: The Skills Section

```html
    <section id="skills" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills</h2>

        <section aria-labelledby="current-skills-heading">
            <h3 id="current-skills-heading">Currently Learning</h3>
            <ul>
                <li>HTML5 — semantic structure, forms, accessibility</li>
                <li>CSS3 — layout, typography, responsive design</li>
                <li>JavaScript — DOM manipulation, events, async</li>
                <li>Git &amp; GitHub — version control, collaboration</li>
            </ul>
        </section>

        <section aria-labelledby="tools-heading">
            <h3 id="tools-heading">Tools I Use</h3>
            <ul>
                <li>VS Code with Live Server extension</li>
                <li>Git and GitHub Desktop</li>
                <li>Chrome DevTools</li>
                <li>axe DevTools (accessibility testing)</li>
            </ul>
        </section>

        <section aria-labelledby="upcoming-heading">
            <h3 id="upcoming-heading">Up Next</h3>
            <ul>
                <li>React and Next.js</li>
                <li>Tailwind CSS</li>
                <li>Node.js and REST APIs</li>
            </ul>
        </section>
    </section>
```

---

## Step 8: The Projects Section

```html
    <section id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>

        <article>
            <header>
                <h3>HTML Profile Page</h3>
                <p>
                    <time datetime="2026-05">May 2026</time> &mdash;
                    <strong>HTML</strong>
                </p>
            </header>
            <p>
                My first fully hand-crafted web page. Built with semantic HTML5, proper
                accessibility, and every element chosen for meaning rather than appearance.
                No CSS frameworks, no JavaScript — pure HTML craftsmanship.
            </p>
            <p>
                <a href="https://github.com/yourusername/html-profile"
                   target="_blank"
                   rel="noopener noreferrer">
                    View on GitHub &rarr;
                </a>
            </p>
        </article>

        <article>
            <header>
                <h3>More Projects Coming Soon</h3>
                <p><em>In progress &mdash; Section 3 starts soon.</em></p>
            </header>
            <p>
                As I continue through the LokiSoft curriculum, this section will grow
                with CSS, JavaScript, and React projects. Check back soon!
            </p>
        </article>
    </section>
```

Each project is wrapped in `<article>` because each one is self-contained content that could stand alone (it describes a specific project).

---

## Step 9: The Contact Section

```html
    <section id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Get in Touch</h2>

        <p>
            I'm always open to conversations about web development, learning resources,
            or collaboration. Fill out the form below and I'll get back to you.
        </p>

        <form action="https://formspree.io/f/your-form-id" method="post"
              aria-label="Contact form" novalidate>
            <!-- Replace the action URL with your Formspree endpoint -->
            <!-- Sign up free at formspree.io to get a real form endpoint -->

            <div>
                <label for="contact-name">
                    Your Name <span aria-hidden="true">*</span>
                </label>
                <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    autocomplete="name"
                    placeholder="Jane Smith"
                >
            </div>

            <div>
                <label for="contact-email">
                    Your Email <span aria-hidden="true">*</span>
                </label>
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
                <label for="contact-subject">Subject</label>
                <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    placeholder="What's this about?"
                >
            </div>

            <div>
                <label for="contact-message">
                    Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows="6"
                    placeholder="Tell me about your project or question..."
                ></textarea>
            </div>

            <button type="submit">Send Message</button>
        </form>

        <section aria-labelledby="elsewhere-heading">
            <h3 id="elsewhere-heading">Find Me Elsewhere</h3>
            <ul>
                <li>
                    <a href="https://github.com/yourusername"
                       target="_blank"
                       rel="noopener noreferrer">
                        GitHub
                    </a>
                </li>
                <li>
                    <a href="https://linkedin.com/in/yourusername"
                       target="_blank"
                       rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </li>
            </ul>
        </section>
    </section>

</main>
```

---

## Step 10: The Footer

```html
<footer>
    <nav aria-label="Footer navigation">
        <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <p>
        <small>
            &copy; <time datetime="2026">2026</time> Your Name.
            Built with HTML &mdash; no frameworks, just craft.
        </small>
    </p>
</footer>
```

---

## The Complete File

Here is the entire `index.html` assembled. Compare it to what you've built piece by piece:

<div data-toggle-box data-title="View Complete index.html">

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name — Web Developer</title>
    <meta name="description" content="Web developer profile for [Your Name]. Skills, projects, and contact information.">
</head>
<body>

<a href="#main-content" style="position:absolute;top:-40px;left:0;background:#1a56db;color:white;padding:8px 16px;text-decoration:none;border-radius:0 0 4px 0;">
    Skip to main content
</a>

<header>
    <a href="/" aria-label="Home — Your Name's profile">
        <strong>Your Name</strong>
    </a>
    <nav aria-label="Main navigation">
        <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
</header>

<main id="main-content">

    <section aria-labelledby="hero-heading">
        <header>
            <h1 id="hero-heading">Hi, I'm Your Name.</h1>
            <p>Aspiring web developer &mdash; building my skills one lesson at a time.</p>
        </header>
        <p>I'm currently learning full-stack web development through the LokiSoft curriculum. I'm passionate about building clean, accessible web experiences.</p>
        <a href="#contact">Get in touch &rarr;</a>
    </section>

    <section id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">About Me</h2>
        <p>I'm based in [Your City]. I discovered web development through [your story].</p>
        <dl>
            <dt>Current Focus</dt>
            <dd>HTML, CSS, and JavaScript fundamentals</dd>
            <dt>Goal</dt>
            <dd>Full-stack web developer</dd>
            <dt>Learning Since</dt>
            <dd><time datetime="2026-01">January 2026</time></dd>
            <dt>Interests</dt>
            <dd>Web accessibility, clean code, open-source</dd>
        </dl>
    </section>

    <section id="skills" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills</h2>
        <section aria-labelledby="current-skills-heading">
            <h3 id="current-skills-heading">Currently Learning</h3>
            <ul>
                <li>HTML5 &mdash; semantic structure, forms, accessibility</li>
                <li>CSS3 &mdash; layout, typography, responsive design</li>
                <li>JavaScript &mdash; DOM manipulation, events, async</li>
                <li>Git &amp; GitHub &mdash; version control, collaboration</li>
            </ul>
        </section>
        <section aria-labelledby="tools-heading">
            <h3 id="tools-heading">Tools I Use</h3>
            <ul>
                <li>VS Code with Live Server</li>
                <li>Git and GitHub Desktop</li>
                <li>Chrome DevTools</li>
            </ul>
        </section>
    </section>

    <section id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <article>
            <header>
                <h3>HTML Profile Page</h3>
                <p><time datetime="2026-05">May 2026</time> &mdash; <strong>HTML</strong></p>
            </header>
            <p>My first fully hand-crafted web page. Built with semantic HTML5 and proper accessibility.</p>
            <p><a href="https://github.com/yourusername/html-profile" target="_blank" rel="noopener noreferrer">View on GitHub &rarr;</a></p>
        </article>
    </section>

    <section id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Get in Touch</h2>
        <p>I'm open to conversations about web development, learning, and collaboration.</p>
        <form action="https://formspree.io/f/your-form-id" method="post" aria-label="Contact form" novalidate>
            <div>
                <label for="contact-name">Your Name <span aria-hidden="true">*</span></label>
                <input type="text" id="contact-name" name="name" required autocomplete="name" placeholder="Jane Smith">
            </div>
            <div>
                <label for="contact-email">Your Email <span aria-hidden="true">*</span></label>
                <input type="email" id="contact-email" name="email" required autocomplete="email" placeholder="jane@example.com">
            </div>
            <div>
                <label for="contact-message">Message <span aria-hidden="true">*</span></label>
                <textarea id="contact-message" name="message" required rows="6" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit">Send Message</button>
        </form>
        <section aria-labelledby="elsewhere-heading">
            <h3 id="elsewhere-heading">Find Me Elsewhere</h3>
            <ul>
                <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
        </section>
    </section>

</main>

<footer>
    <nav aria-label="Footer navigation">
        <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    <p><small>&copy; <time datetime="2026">2026</time> Your Name. Built with HTML &mdash; no frameworks, just craft.</small></p>
</footer>

</body>
</html>
```

</div>

---

## Step 11: Preview Your Page

In VS Code, right-click `index.html` in the file explorer and choose **Open with Live Server**. Your page will open in the browser. It will look very plain — that's expected! The structure is correct; visual design comes in Section 3 when you add CSS.

Use your browser's tab key to navigate through the page. Verify:
- [ ] You can reach every link and the form fields
- [ ] Focus is visible at each interactive element
- [ ] The form submits without errors (it will go nowhere yet without a real Formspree endpoint)
- [ ] All navigation links jump to the correct sections

---

## Step 12: Push to GitHub

Time to publish your work. This follows the workflow from Section 1.

### Initialize Git and Make Your First Commit

**Linux / macOS:**
```bash
git init
git add index.html
git commit -m "Add HTML profile page — first project"
```

**Windows (Command Prompt / PowerShell):**
```cmd
git init
git add index.html
git commit -m "Add HTML profile page — first project"
```

### Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in.
2. Click the **+** icon → **New repository**
3. Name: `html-profile`
4. Description: `My first semantic HTML project — a developer profile page.`
5. Set to **Public** (so it can serve as portfolio)
6. Do NOT check "Initialize this repository with a README" — you already have files
7. Click **Create repository**

### Connect and Push

**Linux / macOS:**
```bash
git remote add origin git@github.com:yourusername/html-profile.git
git branch -M main
git push -u origin main
```

**Windows (Command Prompt):**
```cmd
git remote add origin git@github.com:yourusername/html-profile.git
git branch -M main
git push -u origin main
```

**Windows (PowerShell):**
```powershell
git remote add origin git@github.com:yourusername/html-profile.git
git branch -M main
git push -u origin main
```

Replace `yourusername` with your actual GitHub username.

---

## Step 13: Add a README

Every portfolio project deserves a README. Create a file named `README.md` in your project root and copy this template:

```markdown
# Your Name — Developer Profile Page

A hand-crafted static HTML profile page built as the Section 2 mini-project for
the LokiSoft web development curriculum.

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)

## Features

- Semantic HTML5 structure (header, main, footer, article, section, aside)
- Keyboard-accessible navigation with skip link
- Accessible contact form with proper label associations
- ARIA landmarks and labels throughout
- Zero CSS frameworks — pure HTML

## What I Learned Building This

- How to structure a real web page with semantic landmark elements
- Proper form accessibility (label/input pairing, fieldset/legend, aria-describedby)
- How to write meaningful alt text for images
- How to make a page fully keyboard-navigable

## Setup

No build step required. Open `index.html` in any browser,
or use VS Code's Live Server extension.

## License

[MIT](LICENSE)
```

Then commit and push the README:

**Linux / macOS / Windows:**
```bash
git add README.md
git commit -m "Add project README"
git push
```

---

<div data-info-box="success" data-title="Project Complete — Your First Portfolio Piece">
Your HTML profile page is live on GitHub. This is a real portfolio piece — it proves you can write structured, semantic, accessible HTML from scratch without frameworks. Link to it from your LinkedIn profile.
</div>

---

<div data-info-box="hint" data-title="Make It Your Own">

Before moving to Lesson 35, personalize this page:

1. **Fill in real details** — replace the placeholder text with your actual name, city, story, and goals. A generic page signals you copied a template; a personal page signals you own it.

2. **Add a real project** — replaced "More Projects Coming Soon" with a mini-description of any project you've built or contributed to, even if it's just this profile page itself.

3. **Connect Formspree** — sign up at [formspree.io](https://formspree.io) (free tier available), create a form, and paste the real endpoint URL into your form's `action` attribute. Now your contact form actually sends email.

4. **Add social links** — update the GitHub and LinkedIn URLs to your real profiles.

5. **Add a favicon** — find or create a 32×32 pixel `.ico` or `.svg` file, name it `favicon.ico`, add it to your project root, and add `<link rel="icon" href="/favicon.ico">` to your `<head>`.

</div>

---

## What's Next

Your mini-project is complete and published. In **Lesson 35**, you'll build the **Section 2 Portfolio Project** — a full freelancer landing page with hero, services grid, testimonials, a full contact form, and deployment to GitHub Pages. This is your first real portfolio-grade deliverable.

---

## A Prayer for First Steps

*Lord, today these students took something from their minds and made it real. They wrote code, and something appeared. They committed their work, and it exists now in the world, shareable and permanent.*

*That is not a small thing. Creation is a reflection of You — the ultimate Creator — working through the hands and minds of the people You made.*

*May they feel the joy of that. May the small imperfections in this first project not discourage them but challenge them. And may they keep building, keep shipping, keep growing — all the way to mastery.*

*In Jesus' name, Amen.*

---

> *"The plans of the diligent lead to profit as surely as haste leads to poverty."*
> — Proverbs 21:5 (NIV)
