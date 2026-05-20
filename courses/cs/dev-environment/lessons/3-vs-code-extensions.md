---
title: "Lesson 3: VS Code Extensions — Equipping Your Spellbook"
date: 2026-05-19
author: LokiSoft Team
excerpt: A plain VS Code installation is powerful, but extensions transform it into a specialized web development powerhouse. Learn the essential extensions every web developer needs and exactly how to install them.
categories: shadcn-nextjs, Beginner, Dev Environment
difficulty: 1
featured: false
coverImage: /dev-environment-cover.svg
---

# Lesson 3: VS Code Extensions — Equipping Your Spellbook

> *"By wisdom a house is built, and through understanding it is established; through knowledge its rooms are filled with rare and beautiful treasures."*
> — Proverbs 24:3-4 (NIV)

---

## Introduction

You have your spellbook. Now it is time to fill it with spells.

A fresh VS Code installation is like a new workbench — solid, reliable, and ready. But a master carpenter does not work with just a bare workbench. They hang their tools on the wall, organize their bits and blades, position their lighting, and set up their jigs. The workbench becomes *theirs* — specialized for the exact kind of work they do.

Extensions are how you do that for VS Code. They add new capabilities: automatic code formatting, real-time error detection, smarter autocomplete, live preview of your web pages, API testing tools, and dozens of other superpowers that make the difference between a frustrating development experience and a genuinely enjoyable one.

In this lesson you will install every extension that a professional web developer working with Next.js and shadcn/ui needs. You will understand what each one does, why it matters, and how to configure it. By the end, your VS Code will be fully equipped for every lesson that follows.

<div data-info-box="info" data-title="Extensions Are Portable">
VS Code can sync your extensions across computers. Once you set up your extensions profile in this lesson, you can sign in with a GitHub or Microsoft account and have the exact same setup on any machine in under a minute. We will cover this at the end of the lesson.
</div>

### What You'll Learn

- What VS Code extensions are and how they work
- How to find, install, and manage extensions
- Every essential extension for this course — what it does and why you need it
- How to configure the most important extensions
- How to sync your extensions across machines

### Prerequisites

| Requirement | Status |
|-------------|--------|
| Lesson 2: Installing VS Code | ✅ Complete |
| VS Code open and working | Required |

---

## How Extensions Work

Extensions are add-ons built by Microsoft and the community that hook into VS Code's extension API. They can:

- Add new language support (syntax highlighting, autocomplete)
- Add new commands to the Command Palette
- Modify how the editor looks or behaves
- Add panels, views, and sidebars
- Integrate with external tools and services
- Run code in the background while you type

VS Code's extension marketplace has over **50,000 extensions**, all free. The key is knowing which ones actually matter — and which ones are a waste of memory.

---

## Installing Extensions — Three Ways

### Method 1: The Extensions Panel (easiest)

1. Click the **Extensions icon** in the Activity Bar (it looks like four squares, one slightly detached), or press:
   - **Windows / Linux:** `Ctrl + Shift + X`
   - **macOS:** `Cmd + Shift + X`

2. In the search box, type the extension name
3. Click the blue **Install** button on the correct extension
4. VS Code will download and activate it — no restart needed for most extensions

### Method 2: The Command Palette

Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (macOS) to open the Command Palette, then type:

```
ext install publisher.extension-name
```

For example: `ext install esbenp.prettier-vscode`

### Method 3: Command Line

```bash
code --install-extension esbenp.prettier-vscode
```

This is useful if you want to script the installation of many extensions at once.

<div data-info-box="hint" data-title="Always Use the Extension ID">
When searching for an extension, dozens of similarly named results can appear. The safest way to install the right one is to use the <strong>Extension ID</strong> — the unique identifier in the format <code>publisher.extension-name</code>. Every extension ID in this lesson is provided so you install exactly the right one.
</div>

---

## The Essential Extensions

Here is every extension you need. Install them in order and we will configure each one as we go.

---

### 1. Prettier — Code Formatter
**Extension ID:** `esbenp.prettier-vscode`

**What it does:** Prettier automatically formats your code to a consistent style every time you save a file. It handles JavaScript, TypeScript, HTML, CSS, JSON, and more. You write code however it comes out naturally, and Prettier cleans it up: consistent indentation, quotes, semicolons, line breaks, and spacing.

**Why you need it:** Inconsistent formatting is one of the most common sources of frustration and confusion in codebases. Prettier eliminates the entire problem. You never have to think about formatting again — it just happens.

**After installing:** We will configure Prettier in Lesson 4 to format on save. For now, just install it.

```
Marketplace search: "Prettier"
Publisher: Prettier
Extension ID: esbenp.prettier-vscode
Weekly installs: 35+ million
```

---

### 2. ESLint
**Extension ID:** `dbaeumer.vscode-eslint`

**What it does:** ESLint analyzes your JavaScript and TypeScript code in real time and highlights problems: unused variables, undefined references, code that could cause bugs, violations of best practices. It shows red and yellow squiggles under problematic code while you type — before you even run anything.

**Why you need it:** ESLint catches bugs before they become bugs. It is like having a senior developer reviewing your code as you write it, pointing out problems before you commit them. In a Next.js project, ESLint rules are configured automatically — this extension just surfaces those rules inside VS Code.

```
Marketplace search: "ESLint"
Publisher: Microsoft
Extension ID: dbaeumer.vscode-eslint
Weekly installs: 28+ million
```

<div data-info-box="info" data-title="Prettier vs ESLint — They Do Different Things">
Students often confuse these two. <strong>Prettier</strong> handles <em>formatting</em> — how code looks (indentation, spacing, quotes). <strong>ESLint</strong> handles <em>quality</em> — how code behaves (logic errors, unused variables, bad patterns). You need both, and they work together.
</div>

---

### 3. GitLens
**Extension ID:** `eamodio.gitlens`

**What it does:** GitLens supercharges VS Code's built-in Git support. Its most visible feature is **inline blame** — every line of code shows who last changed it and when, right in the editor. It also adds a full history browser, commit comparisons, branch visualization, and much more.

**Why you need it:** When something breaks and you do not know why, GitLens lets you ask "who changed this line and when?" in about two seconds. You will also use it to understand unfamiliar code, track down the origin of a bug, and learn from the history of a project.

```
Marketplace search: "GitLens"
Publisher: GitKraken
Extension ID: eamodio.gitlens
Weekly installs: 5+ million
```

---

### 4. Live Server
**Extension ID:** `ritwickdey.liveserver`

**What it does:** Live Server launches a local development server for your static HTML/CSS/JavaScript files and **automatically refreshes the browser** every time you save. You edit code → save → the browser instantly shows the result. No manual refreshing.

**Why you need it:** During the HTML and CSS sections of this course, you will be building pages and tweaking styles constantly. Without Live Server, you would have to manually open your browser and refresh it after every single change. Live Server removes that friction entirely.

**How to use it:**
1. Open an HTML file
2. Right-click anywhere in the editor → **"Open with Live Server"**
   — OR —
   Click the **"Go Live"** button in the Status Bar (bottom right)
3. Your browser opens automatically, pointed at `http://127.0.0.1:5500`

```
Marketplace search: "Live Server"
Publisher: Ritwick Dey
Extension ID: ritwickdey.liveserver
Weekly installs: 5+ million
```

<div data-info-box="hint" data-title="Live Server Port">
Live Server uses port 5500 by default. If another program is using that port, you can change it in Live Server's settings. We will not need to do this for the course, but it is good to know.
</div>

---

### 5. Auto Rename Tag
**Extension ID:** `formulahendry.auto-rename-tag`

**What it does:** When you rename an HTML or JSX opening tag, Auto Rename Tag automatically renames the matching closing tag simultaneously. If you change `<div>` to `<section>`, the `</div>` becomes `</section>` at the same time.

**Why you need it:** HTML and JSX require perfectly matched opening and closing tags. Without this extension, changing a tag name means finding and updating it in two places — an annoying and error-prone process. With this extension, it is one keypress.

```
Marketplace search: "Auto Rename Tag"
Publisher: Jun Han
Extension ID: formulahendry.auto-rename-tag
Weekly installs: 8+ million
```

---

### 6. Tailwind CSS IntelliSense
**Extension ID:** `bradlc.vscode-tailwindcss`

**What it does:** This extension provides autocomplete, syntax highlighting, and hover previews for Tailwind CSS utility classes. When you type `class="flex` in an HTML or JSX file, it shows a dropdown of all matching Tailwind classes. Hovering over a class shows the actual CSS it generates.

**Why you need it:** Tailwind CSS is the styling system used by shadcn/ui and all Next.js projects in this course. Tailwind has hundreds of utility classes, and no developer memorizes all of them. This extension means you never have to — the autocomplete guide you in real time.

```
Marketplace search: "Tailwind CSS IntelliSense"
Publisher: Tailwind Labs
Extension ID: bradlc.vscode-tailwindcss
Weekly installs: 9+ million
```

<div data-info-box="hint" data-title="Tailwind IntelliSense Only Activates in Tailwind Projects">
This extension activates when VS Code detects a Tailwind config file in your project. It will not activate in your plain HTML lessons but will be essential once we reach the Next.js section.
</div>

---

### 7. ES7+ React/Redux/React-Native Snippets
**Extension ID:** `dsznajder.es7-react-js-snippets`

**What it does:** Adds dozens of code snippet shortcuts for React and JavaScript. Type a short abbreviation and press Tab to expand it into a full block of code. For example, `rafce` + Tab produces a complete React Arrow Function Component with an export.

**Why you need it:** You will write hundreds of React components in this course. Snippets save time and reduce typos on boilerplate you type over and over.

**Most useful snippets you will use:**

| Snippet | Expands To |
|---------|-----------|
| `rafce` | React Arrow Function Component (exported) |
| `rfc` | React Functional Component |
| `imr` | `import React from 'react'` |
| `useState` | `const [state, setState] = useState()` |
| `useEffect` | A full `useEffect` block with dependencies |
| `clg` | `console.log()` |

```
Marketplace search: "ES7+ React"
Publisher: dsznajder
Extension ID: dsznajder.es7-react-js-snippets
Weekly installs: 4+ million
```

---

### 8. Thunder Client
**Extension ID:** `rangav.vscode-thunder-client`

**What it does:** Thunder Client is a REST API client built directly into VS Code — similar to Postman or Insomnia, but without leaving your editor. It lets you send HTTP requests (GET, POST, PUT, DELETE) to any API and inspect the responses.

**Why you need it:** In the later sections of this course, you will build your own API routes and connect to third-party APIs. Thunder Client lets you test those APIs without switching to a separate application.

**How to access it:** After installing, click the **Thunder Client icon** (lightning bolt) in the Activity Bar.

```
Marketplace search: "Thunder Client"
Publisher: Ranga Vadhineni
Extension ID: rangav.vscode-thunder-client
Weekly installs: 3+ million
```

---

### 9. Error Lens
**Extension ID:** `usernamehm1.errorlens`

**What it does:** Error Lens makes errors and warnings much harder to miss. Instead of just showing a squiggle under problematic code, it displays the error message **inline on the same line** in bright red or yellow text. You see the problem and the explanation without having to hover.

**Why you need it:** VS Code's default error indicators — small colored squiggles — are easy to overlook. Error Lens makes errors impossible to ignore, which means you fix them faster.

```
Marketplace search: "Error Lens"
Publisher: Alexander
Extension ID: usernamehm1.errorlens
Weekly installs: 4+ million
```

---

### 10. Path IntelliSense
**Extension ID:** `christian-kohler.path-intellisense`

**What it does:** When you type a file path in your code — like `import Button from './components/Button'` or `src="/images/photo.jpg"` — Path IntelliSense autocompletes the path based on your actual file system. It shows a dropdown of matching files and folders.

**Why you need it:** Typos in file paths are a common source of errors that produce cryptic "file not found" messages. Path IntelliSense eliminates them by letting you select the correct path from a list.

```
Marketplace search: "Path IntelliSense"
Publisher: Christian Kohler
Extension ID: christian-kohler.path-intellisense
Weekly installs: 7+ million
```

---

### 11. Pretty TypeScript Errors
**Extension ID:** `yoavbls.pretty-ts-errors`

**What it does:** TypeScript error messages are notoriously hard to read — they can stretch for paragraphs of dense, nested type information. Pretty TypeScript Errors reformats them with syntax highlighting, better structure, and clearer language.

**Why you need it:** You will write TypeScript from Section 5 of this course onward. When TypeScript errors appear, being able to actually read them is the difference between fixing the problem in 30 seconds and staring at it in confusion for 20 minutes.

```
Marketplace search: "Pretty TypeScript Errors"
Publisher: yoavbls
Extension ID: yoavbls.pretty-ts-errors
Weekly installs: 1+ million
```

---

### 12. Color Highlight
**Extension ID:** `naumovs.color-highlight`

**What it does:** Anywhere a color value appears in your code — `#ff6b6b`, `rgb(255, 107, 107)`, `hsl(0, 100%, 71%)` — Color Highlight displays a small colored rectangle inline, showing exactly what that color looks like.

**Why you need it:** Reading CSS color values as hex codes or HSL numbers is difficult. Seeing the actual color inline makes reading and writing CSS much faster and more intuitive. This is especially useful when working with shadcn/ui's CSS variable color system.

```
Marketplace search: "Color Highlight"
Publisher: Naumov
Extension ID: naumovs.color-highlight
Weekly installs: 4+ million
```

---

## Quick Install — All Extensions at Once

If you prefer to install everything from the terminal at once, paste this command:

**macOS / Linux:**
```bash
code --install-extension esbenp.prettier-vscode \
     --install-extension dbaeumer.vscode-eslint \
     --install-extension eamodio.gitlens \
     --install-extension ritwickdey.liveserver \
     --install-extension formulahendry.auto-rename-tag \
     --install-extension bradlc.vscode-tailwindcss \
     --install-extension dsznajder.es7-react-js-snippets \
     --install-extension rangav.vscode-thunder-client \
     --install-extension usernamehm1.errorlens \
     --install-extension christian-kohler.path-intellisense \
     --install-extension yoavbls.pretty-ts-errors \
     --install-extension naumovs.color-highlight
```

**Windows (PowerShell):**
```powershell
code --install-extension esbenp.prettier-vscode `
     --install-extension dbaeumer.vscode-eslint `
     --install-extension eamodio.gitlens `
     --install-extension ritwickdey.liveserver `
     --install-extension formulahendry.auto-rename-tag `
     --install-extension bradlc.vscode-tailwindcss `
     --install-extension dsznajder.es7-react-js-snippets `
     --install-extension rangav.vscode-thunder-client `
     --install-extension usernamehm1.errorlens `
     --install-extension christian-kohler.path-intellisense `
     --install-extension yoavbls.pretty-ts-errors `
     --install-extension naumovs.color-highlight
```

---

## Syncing Extensions Across Machines

VS Code can sync all your extensions, settings, keybindings, and snippets across multiple computers using your GitHub or Microsoft account. This means when you get a new computer, your entire development environment is restored in one click.

**To enable Settings Sync:**

1. Click the **profile icon** (person icon at the bottom of the Activity Bar)
2. Click **Turn on Settings Sync...**
3. Sign in with your GitHub or Microsoft account
4. Choose what to sync (check everything)
5. Click **Sign in & Turn On**

From now on, any extension you install is automatically synced to your account.

> *"Two are better than one, because they have a good return for their labor."*
> — Ecclesiastes 4:9 (NIV)

Even your tools benefit from being connected. A development environment that lives only on one machine is fragile. Sync it — and your setup travels with you everywhere.

---

## Extension Summary

| Extension | Purpose | When You Use It |
|-----------|---------|-----------------|
| Prettier | Code formatting | Every time you save a file |
| ESLint | Code quality & bug detection | Continuously while typing |
| GitLens | Git history & blame | When reviewing changes |
| Live Server | Local preview with live reload | HTML/CSS lessons |
| Auto Rename Tag | Pair HTML/JSX tag renaming | All HTML and React work |
| Tailwind IntelliSense | Tailwind autocomplete & previews | Next.js and shadcn sections |
| ES7+ Snippets | React/JS code shortcuts | All React and Next.js work |
| Thunder Client | API testing inside VS Code | API route and database lessons |
| Error Lens | Inline error messages | Continuously while typing |
| Path IntelliSense | File path autocomplete | All import statements |
| Pretty TS Errors | Readable TypeScript errors | TypeScript section onward |
| Color Highlight | Inline color previews | CSS and theming work |

---

## Knowledge Check

<div data-quiz-group data-title="VS Code Extensions — Knowledge Check">

<div data-quiz-question="What is the difference between Prettier and ESLint?" data-correct="2" data-explanation="Prettier handles FORMATTING — how your code looks: indentation, spacing, quotes, line breaks. ESLint handles QUALITY — how your code behaves: unused variables, potential bugs, bad patterns. They complement each other perfectly. Prettier makes code consistently styled; ESLint makes code consistently correct.">
<div data-quiz-option>They do the same thing — both format your code</div>
<div data-quiz-option>ESLint formats code; Prettier checks for bugs</div>
<div data-quiz-option>Prettier formats how code looks; ESLint checks for bugs and bad patterns</div>
<div data-quiz-option>Prettier only works with CSS; ESLint only works with JavaScript</div>
</div>

<div data-quiz-question="What does Live Server do when you save a file?" data-correct="1" data-explanation="Live Server watches your files for changes. When you save, it automatically refreshes the browser tab showing your page. This means you see the result of every change instantly — no manual Command+R or F5 needed. It is a huge quality-of-life improvement when working on HTML and CSS.">
<div data-quiz-option>It uploads your file to a remote server</div>
<div data-quiz-option>It automatically refreshes the browser to show your latest changes</div>
<div data-quiz-option>It validates your HTML for errors</div>
<div data-quiz-option>It runs your JavaScript code in Node.js</div>
</div>

<div data-quiz-question="What does the 'rafce' snippet from the ES7+ React Snippets extension expand into?" data-correct="3" data-explanation="rafce stands for React Arrow Function Component (Exported). It expands into a complete functional React component using an arrow function, with a default export at the bottom. It is one of the most commonly used snippets when building React or Next.js applications.">
<div data-quiz-option>A Redux action creator with fetch</div>
<div data-quiz-option>An empty React class component</div>
<div data-quiz-option>A React file with all hooks imported</div>
<div data-quiz-option>A React Arrow Function Component with a default export</div>
</div>

<div data-quiz-question="What is Thunder Client used for?" data-correct="0" data-explanation="Thunder Client is a REST API client built into VS Code — similar to Postman. It lets you send HTTP requests (GET, POST, PUT, DELETE) to any URL and inspect the responses. It is essential for testing the API routes and external APIs you will build and connect to in the later sections of this course.">
<div data-quiz-option>Testing HTTP/REST API requests from within VS Code</div>
<div data-quiz-option>Checking for Thunder CSS lint errors</div>
<div data-quiz-option>Running TypeScript compilation in watch mode</div>
<div data-quiz-option>Deploying your project to a server</div>
</div>

<div data-quiz-question="Why is the 'Pretty TypeScript Errors' extension valuable?" data-correct="2" data-explanation="TypeScript error messages are notoriously dense and hard to read — they can be paragraphs of nested type information. Pretty TypeScript Errors reformats them with syntax highlighting and clearer structure, making it dramatically faster to understand what went wrong and how to fix it.">
<div data-quiz-option>It automatically fixes TypeScript type errors for you</div>
<div data-quiz-option>It prevents TypeScript errors from appearing in the editor</div>
<div data-quiz-option>It reformats dense TypeScript error messages to be more readable</div>
<div data-quiz-option>It converts TypeScript code to JavaScript automatically</div>
</div>

</div>

---

## What's Next

Your spellbook is now fully equipped. In **Lesson 4**, you will configure VS Code exactly the way professional developers have it — auto-formatting on save, the right font, the right theme, and a full keyboard shortcut map that will make you faster with every passing week.

- **Next Lesson:** [Lesson 4 — VS Code Settings and Keybindings: Mastering Your Tools](/courses/shadcn-nextjs/lessons/4-vs-code-settings-and-keybindings)

---

## Conclusion

Twelve extensions. Each one solving a real problem. Each one backed by millions of installs and years of real-world use. Your VS Code is now a professional web development environment — not a generic text editor, but a tool tuned for exactly the work you are about to do.

The developers who invest time in their tools do not waste time fighting them. Every minute you spend learning your editor is paid back tenfold over your career.

> *"Do you see someone skilled in their work? They will serve before kings; they will not serve before obscure people."*
> — Proverbs 22:29 (NIV)

Skill in your tools is part of skill in your craft. The best developers I know are also the ones who know their editors inside out — who have every shortcut memorized, who have extensions that solve their exact problems, who have tuned their environment so carefully that the tool disappears and only the work remains. Aim for that.

---

## A Prayer for This Lesson

*Lord, thank You for the generosity of the developers and companies who built these tools and made them free.*

*Help this student to see their tools not as obstacles to understand but as gifts to enjoy. May each extension they install make the work a little more joyful, a little less frustrating, and a little more focused on what matters — creating something that helps people.*

*As they build their development environment, may they be building good habits: attention to quality (ESLint), consistency (Prettier), awareness of history (GitLens), and a willingness to keep improving their craft.*

*In Jesus' name, Amen.*

---

## Lesson Checklist

- [ ] All 12 extensions are installed and visible in my Extensions panel
- [ ] I can open the Extensions panel with `Ctrl+Shift+X` / `Cmd+Shift+X`
- [ ] I can see the Tailwind IntelliSense extension is installed (it will activate in later lessons)
- [ ] I can see the Thunder Client icon in my Activity Bar
- [ ] I understand the difference between Prettier (formatting) and ESLint (code quality)
- [ ] I have enabled Settings Sync with my GitHub or Microsoft account
- [ ] I scored at least 4/5 on the Knowledge Check quiz above
