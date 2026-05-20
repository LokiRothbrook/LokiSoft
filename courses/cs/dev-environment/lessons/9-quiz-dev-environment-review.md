---
title: "Lesson 9: Section 0 Review Quiz — Dev Environment Mastery Check"
date: 2026-05-19
author: LokiSoft Team
excerpt: Test your Section 0 knowledge — the web, VS Code, Cursor, the terminal, Node.js, and npm — before advancing to Git and GitHub.
categories: shadcn-nextjs, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Section 0 Review Quiz — Dev Environment Mastery Check

> *"Examine yourselves to see whether you are in the faith; test yourselves."*
> — 2 Corinthians 13:5a (NIV)

---

The forge is hot, adventurer — and the first true test of your mettle has arrived.

You have spent eight lessons building the foundation of your developer environment. You learned how the web works, armed yourself with VS Code and Cursor, conquered the terminal, and installed the JavaScript runtime that powers everything. Before you cross the threshold into **Section 1: Git & GitHub**, you must prove those lessons have taken root.

This quiz contains **18 questions** organized into four arenas of knowledge. Each question has one correct answer — take your time, think it through, and trust the training. When you reveal an explanation after answering, read it fully: those explanations contain the *why*, which is worth more than just knowing the *what*.

If you find yourself struggling in a particular arena, the closing section will point you back to exactly the right lesson to revisit. There is no shame in returning to sharpen a skill before moving forward. The wisest adventurers are the ones who know what they do not yet know.

> *"The heart of the discerning acquires knowledge, for the ears of the wise seek it out."*
> — Proverbs 18:15 (NIV)

---

## ⚔️ Arena 1 — How the Web Works

*Lessons covered: Lesson 1*

<div data-quiz-group data-title="Arena 1: How the Web Works">

<div data-quiz-question="What is the correct relationship between the Internet and the World Wide Web?" data-correct="1" data-explanation="The Internet is the global infrastructure — the physical and logical network of interconnected computers spanning the planet (cables, routers, wireless signals, servers). The World Wide Web is just one of many services that runs on top of that infrastructure, specifically the system of web pages and resources linked by URLs and accessed using the HTTP or HTTPS protocol. Other services like email, FTP, and SSH also run over the Internet but are not part of 'the Web.'">
<div data-quiz-option>They are two names for the same thing</div>
<div data-quiz-option>The Internet is the global network infrastructure; the Web is one service running on top of it using HTTP/HTTPS</div>
<div data-quiz-option>The Web is the physical cables; the Internet is the collection of websites</div>
<div data-quiz-option>The Internet is for email; the Web is for browsing</div>
</div>

<div data-quiz-question="When you type 'google.com' into your browser, what does DNS do?" data-correct="2" data-explanation="DNS (Domain Name System) is the internet's phone book. Computers communicate using IP addresses (e.g., 142.250.190.78), not human-readable names. DNS translates 'google.com' into the corresponding IP address so your computer knows which server to send the HTTP request to. Without DNS, you would have to memorize IP addresses for every website — which is why DNS is considered one of the most critical parts of internet infrastructure.">
<div data-quiz-option>Downloads the web page directly to your machine</div>
<div data-quiz-option>Encrypts the connection between your browser and the server</div>
<div data-quiz-option>Translates the human-readable domain name into an IP address so your computer can find the correct server</div>
<div data-quiz-option>Sends your request through a government firewall for safety screening</div>
</div>

<div data-quiz-question="What are the three layers of a web page, and what is the role of each?" data-correct="0" data-explanation="HTML (HyperText Markup Language) is the structure — it defines what content exists and how it is organized, like the bones of a building. CSS (Cascading Style Sheets) is the presentation layer — it controls colors, fonts, spacing, and layout, like paint and interior design. JavaScript is the behavior layer — it makes the page interactive and dynamic, like the electrical system that makes lights switch on and doors open. These three layers work together and are kept separate on purpose so each can be maintained independently.">
<div data-quiz-option>HTML = structure/content, CSS = styling/presentation, JavaScript = interactivity/behavior</div>
<div data-quiz-option>HTML = colors, CSS = page layout, JavaScript = the text content</div>
<div data-quiz-option>HTML = frontend design, CSS = application logic, JavaScript = database queries</div>
<div data-quiz-option>HTML = backend server, CSS = frontend display, JavaScript = network requests only</div>
</div>

<div data-quiz-question="What is the key difference between HTTP and HTTPS?" data-correct="1" data-explanation="HTTP (HyperText Transfer Protocol) sends all data — including form submissions, passwords, and cookies — as plain text. Anyone intercepting the network traffic (on public Wi-Fi, for example) can read it. HTTPS adds TLS (Transport Layer Security) encryption, which scrambles the data so that only the sender and receiver can decode it. When you see the padlock icon in your browser's address bar, that is TLS/HTTPS at work. In modern web development, every production site uses HTTPS — browsers now actively warn users when a site is HTTP-only.">
<div data-quiz-option>HTTP is a newer, faster version of HTTPS</div>
<div data-quiz-option>HTTPS encrypts the connection using TLS so data cannot be read in transit; HTTP sends data as unencrypted plain text</div>
<div data-quiz-option>They are functionally identical; the 'S' only indicates the site is operated by a trusted company</div>
<div data-quiz-option>HTTPS is only required for e-commerce sites; HTTP is fine for blogs</div>
</div>

</div>

---

## ⚔️ Arena 2 — VS Code & Cursor: Your Developer Forge

*Lessons covered: Lessons 2, 3, 4, 7, 8*

<div data-quiz-group data-title="Arena 2: VS Code & Cursor">

<div data-quiz-question="What is the keyboard shortcut to open the VS Code Command Palette on Windows/Linux?" data-correct="1" data-explanation="Ctrl+Shift+P (Cmd+Shift+P on macOS) opens the Command Palette — the single most powerful shortcut in VS Code. It surfaces every command the editor can perform, even ones without a keyboard shortcut. You can install extensions, change color themes, format the current document, toggle settings, run build tasks, and much more without ever touching a menu. If you only memorize one VS Code shortcut, make it this one.">
<div data-quiz-option>Ctrl+P</div>
<div data-quiz-option>Ctrl+Shift+P</div>
<div data-quiz-option>Ctrl+K</div>
<div data-quiz-option>Ctrl+Shift+X</div>
</div>

<div data-quiz-question="Which VS Code extension automatically reformats your code to consistent style every time you save a file?" data-correct="2" data-explanation="Prettier (extension ID: esbenp.prettier-vscode) is an opinionated code formatter. When you add '\"editor.formatOnSave\": true' and '\"editor.defaultFormatter\": \"esbenp.prettier-vscode\"' to your settings.json, Prettier runs every time you press Ctrl+S / Cmd+S and rewrites your file to a consistent style — fixing indentation, quote style, semicolons, trailing commas, and more. ESLint is a linter that finds logical code problems; GitLens adds Git blame information to your editor; Live Server launches a local web server with live reload.">
<div data-quiz-option>ESLint</div>
<div data-quiz-option>GitLens</div>
<div data-quiz-option>Prettier</div>
<div data-quiz-option>Live Server</div>
</div>

<div data-quiz-question="What makes Cursor different from plain VS Code at its core?" data-correct="0" data-explanation="Cursor is a fork of VS Code — it is built directly on top of VS Code's open-source codebase, which is why your extensions, themes, and settings.json all transfer over. The core difference is that Cursor has AI features deeply integrated into the editor itself: Tab autocomplete (predicts full lines/blocks in context), Cmd+K inline editing (select code, describe the change, get a diff), Cmd+L Chat (converse with the AI with codebase context), and Cmd+I Composer (multi-file AI agent). These are not plugins; they are first-class features of the editor. A standalone AI chatbot has no context about your code — Cursor's AI lives inside your files.">
<div data-quiz-option>Cursor is a fork of VS Code with AI features (Tab autocomplete, inline editing, Composer, Chat) deeply integrated into the editor itself</div>
<div data-quiz-option>Cursor is a browser-based IDE that works without installation</div>
<div data-quiz-option>Cursor is a VS Code theme pack with syntax highlighting improvements</div>
<div data-quiz-option>Cursor is a plugin that adds a terminal emulator to VS Code</div>
</div>

<div data-quiz-question="What is a .cursorrules file and where does it go?" data-correct="1" data-explanation="The .cursorrules file is a plain text file placed at the root of your project that gives Cursor's AI model custom, persistent instructions for that specific project. Every AI response Cursor generates reads this file first. You use it to specify your tech stack ('This is a Next.js 15 App Router project using TypeScript and Tailwind CSS 4'), naming conventions, rules ('always use server components unless the component needs useState or event handlers'), or project context. Without .cursorrules, Cursor guesses your conventions; with it, AI responses are tuned to your exact project. One file, much smarter suggestions.">
<div data-quiz-option>A file that lists all Cursor extensions currently installed</div>
<div data-quiz-option>A plain text file at your project root that provides custom AI instructions and project-specific context to Cursor's AI model</div>
<div data-quiz-option>A configuration file that sets the Cursor application's color theme</div>
<div data-quiz-option>A log file generated by Cursor to record all AI interactions</div>
</div>

<div data-quiz-question="What is Cursor Composer (Cmd+I / Ctrl+I) designed to do that Chat (Cmd+L / Ctrl+L) cannot?" data-correct="1" data-explanation="Cursor Chat (Cmd+L) is a conversation panel — you ask questions and it replies with code suggestions, but you must copy those suggestions manually into your files. Cursor Composer (Cmd+I) is an autonomous AI agent: you describe a feature, bug fix, or change, and Composer creates a plan, then writes to and edits multiple files in your project simultaneously. Before changes are applied, you can review the diff for each file and accept or reject individually. Chat = 'explain and suggest.' Composer = 'plan and build across the whole codebase.' Composer is the right tool when a task requires touching more than one file.">
<div data-quiz-option>Composer lets you search the internet for code answers without leaving Cursor</div>
<div data-quiz-option>Composer plans and applies changes across multiple files simultaneously; Chat only shows suggested code in the chat panel for you to copy manually</div>
<div data-quiz-option>Composer is a faster version of Chat that produces shorter responses</div>
<div data-quiz-option>Composer builds and runs your project; Chat is for asking questions</div>
</div>

</div>

---

## ⚔️ Arena 3 — The Terminal: Your Command Center

*Lessons covered: Lesson 5*

<div data-quiz-group data-title="Arena 3: The Terminal">

<div data-quiz-question="Which of the following correctly describes the relationship between Terminal, Shell, and CLI?" data-correct="1" data-explanation="These three terms are often used interchangeably in conversation, but they describe different layers of the same system. The Terminal (or terminal emulator) is the application window you see and type into — examples include Terminal.app on macOS, Windows Terminal on Windows, and GNOME Terminal on Linux. The Shell is the program running inside that window that interprets your typed commands and executes them — common shells are bash, zsh (macOS default since Catalina), fish, and PowerShell. CLI (Command Line Interface) is the broader concept: any interface where you interact with a program by typing text commands rather than clicking a GUI. All three together give you the power to control your computer with precision.">
<div data-quiz-option>Terminal is the interpreter; Shell is the window; CLI only runs on Linux</div>
<div data-quiz-option>Terminal is the application window; Shell is the program inside it that interprets commands (e.g., bash, zsh, PowerShell); CLI is the general concept of a text-based interface</div>
<div data-quiz-option>Shell and Terminal are the same; CLI is an older version of both</div>
<div data-quiz-option>CLI is the window; Terminal is the scripting language; Shell is the OS kernel</div>
</div>

<div data-quiz-question="You are inside '/home/user/projects/website'. What does running 'cd ../..' do?" data-correct="1" data-explanation="Each '..' means 'go up one directory level.' Starting from '/home/user/projects/website': the first '..' moves you up to '/home/user/projects', and the second '..' moves you up again to '/home/user'. The forward slash between them is just the path separator connecting two '..' segments into one command. This relative navigation is faster than typing absolute paths. You can chain as many '..' as needed — 'cd ../../..' from '/home/user/projects/website' would land you at '/home'.">
<div data-quiz-option>Takes you to the filesystem root (/)</div>
<div data-quiz-option>Moves up two directory levels, landing you at /home/user</div>
<div data-quiz-option>Creates two new empty directories</div>
<div data-quiz-option>Moves up one level to /home/user/projects</div>
</div>

<div data-quiz-question="What command do you use on macOS and Linux to list all files and folders in the current directory?" data-correct="2" data-explanation="'ls' (short for list) is the standard macOS and Linux command for listing directory contents. The Windows Command Prompt equivalent is 'dir'. You can enhance ls with flags: 'ls -l' shows a detailed list with permissions, owner, size, and date; 'ls -a' shows hidden files (those starting with a dot, like .gitignore); 'ls -la' combines both. In your day-to-day workflow, you will run 'ls' (or 'ls -la') constantly to see what is in the current directory before running other commands.">
<div data-quiz-option>dir</div>
<div data-quiz-option>list</div>
<div data-quiz-option>ls</div>
<div data-quiz-option>show</div>
</div>

<div data-quiz-question="What happens when you press the Tab key while typing a command in the terminal?" data-correct="2" data-explanation="Tab completion is one of the terminal's most valuable features. When you type the beginning of a file name, folder name, or command and press Tab, the shell automatically completes it. If there is only one match, it fills in immediately. If there are multiple matches, pressing Tab twice shows you all options. This prevents the most common beginner mistake: misspelled file paths. If you type 'cd proj' and press Tab and it completes to 'projects/', you know the folder exists exactly as named. If Tab does nothing, the path or command does not exist — a useful early warning before running a command that would fail.">
<div data-quiz-option>Runs the current command immediately</div>
<div data-quiz-option>Inserts a literal tab character (for indentation) into the command</div>
<div data-quiz-option>Autocompletes file names, folder names, and commands — saving typing and preventing path typos</div>
<div data-quiz-option>Switches focus between open terminal tabs in the application</div>
</div>

</div>

---

## ⚔️ Arena 4 — Node.js & npm: The Engine Room

*Lessons covered: Lesson 6*

<div data-quiz-group data-title="Arena 4: Node.js and npm">

<div data-quiz-question="What is Node.js, and why does a web developer need it even if they are not building a server?" data-correct="1" data-explanation="Node.js is a JavaScript runtime built on Chrome's V8 engine. Before Node.js existed, JavaScript could only run inside a web browser. Node.js lets JavaScript run on your machine and on servers. Even if you never build a backend, you need Node.js because the entire modern web dev toolchain depends on it: npm (the package manager), Vite (dev server and bundler), Next.js (the framework), ESLint, Prettier, TypeScript compiler — all of these are Node.js programs. Without Node.js installed, none of these tools run. Node.js is the engine; everything else is the vehicle.">
<div data-quiz-option>A browser extension that speeds up JavaScript execution in Chrome</div>
<div data-quiz-option>A JavaScript runtime built on Chrome's V8 engine that lets JavaScript run outside the browser — required by npm, Next.js, Vite, and every modern dev tool</div>
<div data-quiz-option>A relational database management system used with JavaScript backends</div>
<div data-quiz-option>A CSS preprocessor similar to Sass that adds features to plain CSS</div>
</div>

<div data-quiz-question="Why is nvm (Node Version Manager) the recommended way to install Node.js instead of the official installer from nodejs.org?" data-correct="1" data-explanation="Two main reasons. First, different projects often need different Node.js versions — one might require Node 18, another Node 20. The official installer only supports one version at a time; switching means uninstalling and reinstalling. nvm lets you install multiple versions and switch between them with 'nvm use 18' or 'nvm use 20'. Second, on macOS and Linux, installing Node.js via the official installer places npm in a system-protected directory, which causes 'permission denied' errors when installing global packages. nvm installs everything inside your home folder, so no sudo or permission fixes are needed. nvm-windows is a separate project (not nvm-sh) that does the same for Windows.">
<div data-quiz-option>nvm produces faster JavaScript execution than the official installer</div>
<div data-quiz-option>nvm lets you install and switch between multiple Node.js versions and avoids the permission issues that come with system-level installations</div>
<div data-quiz-option>The official nodejs.org installer requires a paid license for commercial use</div>
<div data-quiz-option>nvm has a better security audit history than the official installer</div>
</div>

<div data-quiz-question="What is the difference between 'npm install', 'npm install -D', and 'npx'?" data-correct="1" data-explanation="Understanding this distinction is critical for working with any JavaScript project. 'npm install package-name' adds the package to 'dependencies' in package.json — these are packages your application needs at runtime (e.g., React, Next.js). 'npm install -D package-name' adds it to 'devDependencies' — packages only needed during development, not in the deployed app (e.g., ESLint, TypeScript, Prettier). The build process can strip devDependencies for smaller production bundles. 'npx package-name' runs a package's binary once without permanently installing it — perfect for scaffolding tools like 'npx create-next-app' that you use once to set up a project.">
<div data-quiz-option>They are all the same command; -D and npx are optional shorthand aliases</div>
<div data-quiz-option>'npm install' adds to dependencies (needed at runtime); 'npm install -D' adds to devDependencies (development only); 'npx' runs a binary once without installing it permanently</div>
<div data-quiz-option>'npm install -D' installs packages globally on your machine; 'npx' is only for TypeScript packages</div>
<div data-quiz-option>'npx' is a newer, faster version of npm install with automatic caching</div>
</div>

<div data-quiz-question="What is the node_modules folder, and why should it never be committed to Git?" data-correct="2" data-explanation="When you run 'npm install', npm reads your package.json and downloads all the dependency files into a folder called node_modules. This folder can easily contain 50,000+ files and grow to 200MB or more, because each package you install may itself depend on dozens of other packages. Committing this to Git would bloat your repository, make every clone painfully slow, and generate massive merge conflicts. Instead, you add 'node_modules' to your .gitignore file. When another developer clones your project, they simply run 'npm install' and npm recreates the folder in seconds from your package.json and package-lock.json. The lock file records exact versions so the recreation is deterministic.">
<div data-quiz-option>It stores your project's source code and must always be committed for collaborators to see your work</div>
<div data-quiz-option>It is a hidden system folder managed by the operating system, not npm</div>
<div data-quiz-option>It contains all downloaded package files (often 50,000+ files, hundreds of MB); excluded from Git because 'npm install' recreates it from package.json instantly</div>
<div data-quiz-option>It stores environment variables and API secrets used by your application</div>
</div>

<div data-quiz-question="Which command confirms that Node.js is installed and shows the active version number?" data-correct="2" data-explanation="'node --version' (or the shorthand 'node -v') prints the version of Node.js that is currently active, e.g., 'v20.11.0'. If the terminal responds with 'command not found' or 'node is not recognized,' Node.js is either not installed or not in your system PATH. You should also verify 'npm --version' and 'npx --version' to confirm the full toolchain is available. When using nvm, 'nvm list' shows every installed Node.js version and marks the currently active one with an arrow. Run these three checks whenever you set up on a new machine or switch Node versions.">
<div data-quiz-option>npm check</div>
<div data-quiz-option>node verify</div>
<div data-quiz-option>node --version</div>
<div data-quiz-option>nodejs -v</div>
</div>

</div>

<div data-quiz-score-anchor=""></div>

---

## 📊 How Did You Do?

<div data-info-box="success" data-title="15–18 Correct — Section 0 Cleared!">
Outstanding work, adventurer. You have absorbed the foundations of your developer environment. The forge is yours — move forward to Section 1 with confidence.
</div>

<div data-info-box="hint" data-title="10–14 Correct — Solid Foundation, Some Gaps">
Good progress! A few concepts need reinforcing before they become second nature. Check the review guide below, revisit the relevant lessons, then retake the quiz. There is no penalty for going back — only for moving forward without understanding.
</div>

<div data-info-box="warning" data-title="Under 10 Correct — Return to the Training Grounds">
The foundations are shaky, and that will slow you down later. This is not failure — it is information. The lessons are still there. Return, reread, practice the commands in your real terminal, and come back stronger. Every expert was once a beginner.
</div>

---

## 📖 Struggling? Here Is Where to Return

| If you missed questions in... | Go back to... |
|---|---|
| Arena 1 (How the Web Works) | [Lesson 1 — How the Web Works](/courses/shadcn-nextjs/lessons/1-how-the-web-works) |
| Arena 2 (VS Code questions 1–2) | [Lesson 2 — Installing VS Code](/courses/shadcn-nextjs/lessons/2-installing-vs-code) + [Lesson 3 — VS Code Extensions](/courses/shadcn-nextjs/lessons/3-vs-code-extensions) + [Lesson 4 — Settings and Keybindings](/courses/shadcn-nextjs/lessons/4-vs-code-settings-and-keybindings) |
| Arena 2 (Cursor questions 3–5) | [Lesson 7 — Upgrading to Cursor](/courses/shadcn-nextjs/lessons/7-upgrading-to-cursor) + [Lesson 8 — Cursor Workflow Tips](/courses/shadcn-nextjs/lessons/8-cursor-workflow-tips) |
| Arena 3 (The Terminal) | [Lesson 5 — The Terminal](/courses/shadcn-nextjs/lessons/5-the-terminal) |
| Arena 4 (Node.js & npm) | [Lesson 6 — Installing Node.js and npm](/courses/shadcn-nextjs/lessons/6-installing-nodejs-and-npm) |

The best way to solidify terminal and npm commands is to *practice them* — open your terminal right now and run `ls`, `mkdir`, `cd`, `node --version`, `npm --version`. Commands only click once your fingers have typed them.

> *"Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank."*
> — Proverbs 22:29 (NIV)

---

## A Prayer Before You Advance

*Lord, thank You for the patience to learn — and the grace to be tested.*

*For every question answered confidently, may we stay humble, knowing there is always more to learn. For every question that revealed a gap, may we receive it not as discouragement but as direction — a precise arrow pointing to where we should grow next.*

*As we move into the next section, help us carry these foundations firmly. May the skills we build here serve others well one day — and may the work of our hands be pleasing to You.*

*In Jesus' name, Amen.*

---

## What's Next

Section 0 is complete. Your environment is built, your tools are sharp, and your command line holds no fear for you.

The next chapter begins: **Section 1 — Git & GitHub**. You are about to learn the superpower that separates hobbyist coders from professional developers — version control. You will learn to save snapshots of your work, travel back in time through your project's history, collaborate with other developers without overwriting each other's code, and publish your projects to the world.

**Next Lesson → [Lesson 10 — What is Git? Version Control and Why It Matters](/courses/shadcn-nextjs/lessons/10-what-is-git)**
