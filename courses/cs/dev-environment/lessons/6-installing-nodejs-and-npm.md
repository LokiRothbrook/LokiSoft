---
title: "Lesson 6: Installing Node.js and npm — The Engine Under the Hood"
date: 2026-05-19
author: LokiSoft Team
excerpt: Node.js is the runtime that powers every development tool in this course. Learn how to install it correctly using nvm, understand the difference between npm, npx, and pnpm, and run your first JavaScript outside the browser.
categories: shadcn-nextjs, Beginner, Dev Environment
difficulty: 1
featured: false
coverImage: /dev-environment-cover.svg
---

# Lesson 6: Installing Node.js and npm — The Engine Under the Hood

> *"The Lord God took the man and put him in the Garden of Eden to work it and take care of it."*
> — Genesis 2:15 (NIV)

---

## Introduction

Every tool you use for the rest of this course runs on **Node.js**. The development server, the package installer, the TypeScript compiler, the Next.js framework, the build tools — all of it. Node.js is the engine under the hood of modern web development.

Before Node.js existed (it was released in 2009), JavaScript could only run inside a browser. Node.js changed that by pulling the V8 JavaScript engine — the same one inside Chrome — out of the browser and letting it run as a standalone program on your computer. Suddenly, JavaScript could read files, talk to databases, run servers, and do everything that "real" programming languages could do.

This single innovation completely transformed web development and gave us the entire JavaScript/TypeScript ecosystem we use today.

<div data-info-box="info" data-title="You Are Not Learning Node.js Yet">
This lesson is just about installing Node.js so the tools work. You are not learning to write Node.js applications right now — that happens naturally as part of learning Next.js. Think of this lesson as installing the engine in a car you will learn to drive later.
</div>

### What You'll Learn

- What Node.js is and why every web developer needs it
- The right way to install Node.js using **nvm** (Node Version Manager)
- Why nvm is better than installing Node.js directly
- How to install nvm on **Windows**, **macOS**, and **Linux**
- The difference between **npm**, **npx**, and **pnpm**
- How to verify everything is installed correctly
- Basic npm commands you will use constantly

### Prerequisites

| Requirement | Status |
|-------------|--------|
| Lesson 5: The Terminal | ✅ Complete |
| Comfortable opening and typing in a terminal | Required |

---

## What is Node.js?

Node.js is a **JavaScript runtime** — a program that can read and execute JavaScript files outside of a browser. Under the hood, it uses Google's V8 engine (the same engine that runs JavaScript in Chrome) compiled to run as a native application on your OS.

Here is why that matters:

```
WITHOUT Node.js:    JavaScript runs only in the browser
                    (clicking buttons, updating the DOM, fetching data)

WITH Node.js:       JavaScript can also:
                    - Run a web server
                    - Read and write files on disk
                    - Connect to databases
                    - Build and bundle your code
                    - Run automated tests
                    - Power CLI tools (like the Next.js CLI)
```

When you run `npm run dev` to start your development server later in this course, that command starts a Node.js process that serves your Next.js application locally. Node.js is the runtime making that possible.

---

## What is npm?

**npm** (Node Package Manager) is installed automatically with Node.js. It is the world's largest software registry — a massive catalog of over 2 million open-source JavaScript packages that you can download and use in your projects with a single command.

Every project in this course will use npm packages. When you install shadcn/ui, React, Next.js, Tailwind CSS, or Prisma, you are downloading packages from the npm registry.

```bash
# This command downloads and installs a package:
npm install react

# This creates a node_modules/ folder containing the package code
# and updates package.json to record the dependency
```

### The package.json File

Every Node.js project has a `package.json` file — the project's "identity card." It records:
- The project name and version
- All installed packages (dependencies)
- Scripts that can be run (like `npm run dev`, `npm run build`)
- Configuration for various tools

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0"
  }
}
```

### The node_modules Folder

When you install packages, npm creates a `node_modules/` folder containing all the downloaded code. This folder can contain hundreds of sub-folders and be gigabytes in size. Two important rules:

1. **Never commit `node_modules/` to Git.** Your `.gitignore` will always include it.
2. **If node_modules is missing, run `npm install`.** This re-downloads everything from `package.json`.

---

## npm vs npx vs pnpm

You will see all three of these throughout the course. Here is exactly what each one is:

| Tool | What It Does | When You Use It |
|------|-------------|-----------------|
| **npm** | Install packages permanently into your project | `npm install react` |
| **npx** | Run a package once without installing it permanently | `npx create-next-app@latest` |
| **pnpm** | A faster, more disk-efficient alternative to npm | Optional replacement for npm |

**`npm`** is for packages your project *depends on* — things installed into `node_modules/` and recorded in `package.json`.

**`npx`** is for tools you want to run once, like project scaffolders. When you create a new Next.js project with `npx create-next-app@latest`, npx downloads and runs that tool temporarily without permanently installing it on your system.

**`pnpm`** (Performant npm) is a drop-in replacement for npm that is faster and uses far less disk space by sharing packages between projects. Many professional teams use it. This course uses npm by default, but if you want to use pnpm, all `npm` commands have a direct `pnpm` equivalent.

<div data-info-box="hint" data-title="npm Comes Free with Node.js">
You do not install npm separately — it is bundled with Node.js automatically. Once Node.js is installed, npm is available. npx is also included. pnpm must be installed separately if you choose to use it.
</div>

---

## Why Use nvm Instead of Installing Node.js Directly?

The official Node.js website offers a simple installer, and many tutorials tell you to use it. **We recommend nvm instead**, and here is why:

**The problem with direct installation:** Different projects may require different versions of Node.js. An older project might need Node 18 while a new one needs Node 22. Without nvm, you can only have one version at a time — switching requires uninstalling and reinstalling Node.js entirely.

**What nvm solves:** nvm (Node Version Manager) lets you install and switch between multiple Node.js versions instantly with a single command. It is the standard professional approach and the one used by most development teams.

```bash
nvm install 22        # install Node 22
nvm install 20        # install Node 20 alongside it
nvm use 22            # switch to Node 22
nvm use 20            # switch to Node 20
nvm ls                # list all installed versions
```

---

## Installing nvm

### macOS and Linux

The install method is the same on both macOS and Linux — a shell script from the official nvm repository.

**Step 1 — Run the install script:**

Open your terminal and run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

<div data-info-box="hint" data-title="Always Check for the Latest nvm Version">
The version number in the URL above (<code>v0.40.1</code>) may not be the latest. Check the official nvm repository at github.com/nvm-sh/nvm for the current latest release and update the URL accordingly.
</div>

**Step 2 — Apply the changes to your shell:**

The installer adds nvm to your shell profile (`.bashrc`, `.zshrc`, or `.profile`). To apply these changes without restarting your terminal:

```bash
# If you use bash:
source ~/.bashrc

# If you use zsh (macOS default):
source ~/.zshrc
```

**Alternatively**, just close and reopen your terminal.

**Step 3 — Verify:**

```bash
nvm --version
# Output: 0.40.1 (or your installed version)
```

---

### Windows

nvm does not officially support Windows, but a separate project called **nvm-windows** provides the same functionality.

**Step 1 — Download the installer:**

Go to the nvm-windows releases page:
```
https://github.com/coreybutler/nvm-windows/releases
```
Download the file named **`nvm-setup.exe`** from the latest release.

**Step 2 — Run the installer:**

Double-click `nvm-setup.exe` and follow the installation wizard. Accept all the default options.

<div data-info-box="warning" data-title="Uninstall Existing Node.js First">
If you already have Node.js installed on Windows, uninstall it first before installing nvm-windows. Having both can cause conflicts. Go to Settings → Apps → search for "Node.js" → Uninstall.
</div>

**Step 3 — Verify in a NEW PowerShell window:**

Open a new PowerShell window (important — a new one, not the one you had open before) and run:

```powershell
nvm version
# Output: 1.1.12 (or your installed version)
```

---

## Installing Node.js via nvm

With nvm installed, install the **LTS (Long Term Support)** version of Node.js. LTS versions are the most stable and are recommended for all production and development work.

**All platforms:**
```bash
nvm install --lts
```

This downloads and installs the latest LTS release. As of 2026, this is **Node.js 22 LTS**.

**Set it as your default version:**
```bash
nvm alias default node
```

This makes the LTS version the one that activates automatically in every new terminal session.

---

## Verifying Your Installation

Run these commands to confirm everything installed correctly:

```bash
node --version
# Output: v22.x.x (or your current LTS version)

npm --version
# Output: 10.x.x (or your current npm version)

npx --version
# Output: 10.x.x (same as npm)
```

All three should print version numbers. If any of them say "command not found," close your terminal completely, reopen it, and try again. If the problem persists, revisit the nvm installation steps.

---

## Your First Node.js Program

Let us verify Node.js actually works by running a tiny JavaScript program — outside the browser, directly from the terminal.

Create a file called `hello.js` anywhere:

```bash
# macOS/Linux
touch hello.js

# Windows PowerShell
ni hello.js
```

Open it in VS Code and add this content:

```javascript
const message = 'Hello from Node.js!'
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(n => n * 2)

console.log(message)
console.log('Doubled numbers:', doubled)
console.log('Node version:', process.version)
```

Now run it from the terminal:

```bash
node hello.js
```

**Expected output:**
```
Hello from Node.js!
Doubled numbers: [ 2, 4, 6, 8, 10 ]
Node version: v22.x.x
```

You just ran JavaScript outside a browser. The same language you use to make buttons click in a webpage is now running as a native program on your operating system.

> *"All hard work brings a profit, but mere talk leads only to poverty."*
> — Proverbs 14:23 (NIV)

The setup work you are doing in these early lessons — installing tools, configuring settings, learning commands — is real profit. Every minute invested here returns hours saved later.

---

## Essential npm Commands

You will use these constantly throughout the course. Read them now; they will become muscle memory.

### Creating a new project

```bash
npm init             # creates a package.json interactively
npm init -y          # creates package.json with all defaults (faster)
```

### Installing packages

```bash
npm install react              # install a package (shortcut: npm i react)
npm install -D typescript      # install as devDependency (-D or --save-dev)
npm install                    # install ALL packages listed in package.json
```

**Dependencies vs devDependencies:**
- **dependencies** — packages your app needs to run in production (React, Next.js)
- **devDependencies** — packages only needed during development, not in production (TypeScript, ESLint, Prettier)

### Running scripts

```bash
npm run dev          # run the "dev" script from package.json
npm run build        # run the "build" script
npm run start        # run the "start" script
npm test             # run tests (special shortcut — no "run" needed)
```

### Removing packages

```bash
npm uninstall react  # remove a package and update package.json
```

### Viewing installed packages

```bash
npm list             # list all installed packages in current project
npm list --depth=0   # list only top-level packages (not their dependencies)
```

### Updating packages

```bash
npm update           # update all packages to their latest compatible versions
npm update react     # update a specific package
```

---

## Installing pnpm (Optional)

If you want faster installs and less disk usage, install pnpm:

```bash
npm install -g pnpm
```

Verify:

```bash
pnpm --version
# Output: 9.x.x
```

With pnpm installed, replace `npm` with `pnpm` in any command:
```bash
npm install   →   pnpm install
npm run dev   →   pnpm dev
```

<div data-toggle-box data-title="Why pnpm Uses Less Disk Space">

npm installs each package separately into each project's `node_modules/`. If you have 10 projects all using React 19, npm downloads and stores React 19 ten times on your disk.

pnpm stores each package version **once** in a global cache, and creates **links** (called hard links) from each project's `node_modules/` to the global cache. Every project shares the same files. Ten projects using React 19 = one copy of React 19 on disk.

For developers with many projects, pnpm can save gigabytes of disk space and significantly speed up install times.

</div>

---

## Knowledge Check

<div data-quiz-group data-title="Node.js and npm — Knowledge Check">

<div data-quiz-question="What is Node.js?" data-correct="1" data-explanation="Node.js is a JavaScript runtime — it allows JavaScript to run outside the browser as a native program on your operating system. Before Node.js, JavaScript could only run inside web browsers. Node.js uses Google's V8 engine (the same one in Chrome) but packages it to run standalone on your machine.">
<div data-quiz-option>A browser plugin that makes JavaScript run faster</div>
<div data-quiz-option>A JavaScript runtime that lets JavaScript run outside the browser as a native program</div>
<div data-quiz-option>A framework for building user interfaces, similar to React</div>
<div data-quiz-option>A database management system for JavaScript applications</div>
</div>

<div data-quiz-question="What is the difference between npm install and npx?" data-correct="3" data-explanation="'npm install' permanently downloads a package into your project's node_modules/ folder and records it in package.json — the package becomes a dependency of your project. 'npx' runs a package once without permanently installing it. When you run 'npx create-next-app@latest', it downloads the tool, runs it to scaffold your project, and then discards it.">
<div data-quiz-option>npm install is for global packages; npx is for local packages</div>
<div data-quiz-option>npm install works on macOS; npx works on Windows</div>
<div data-quiz-option>They do the same thing — npx is just a newer name for npm install</div>
<div data-quiz-option>npm install permanently adds a package to your project; npx runs a package once without permanently installing it</div>
</div>

<div data-quiz-question="Why is installing Node.js via nvm recommended over the direct installer from nodejs.org?" data-correct="2" data-explanation="nvm lets you install and switch between multiple Node.js versions instantly. Different projects may require different Node.js versions. With nvm, you can run 'nvm use 20' or 'nvm use 22' to switch versions. With the direct installer, you can only have one version and changing it requires a full uninstall/reinstall.">
<div data-quiz-option>nvm makes Node.js run faster than the direct installer</div>
<div data-quiz-option>The direct installer from nodejs.org installs an outdated version</div>
<div data-quiz-option>nvm lets you easily switch between multiple Node.js versions for different projects</div>
<div data-quiz-option>nvm works on all platforms; the nodejs.org installer only works on Windows</div>
</div>

<div data-quiz-question="What is the difference between 'dependencies' and 'devDependencies' in package.json?" data-correct="0" data-explanation="dependencies are packages your application needs to run in production — things like React, Next.js, and your UI components. devDependencies are only needed during development: TypeScript, ESLint, Prettier, testing libraries. When your app is deployed, devDependencies are typically excluded from the production build to keep it smaller.">
<div data-quiz-option>dependencies are needed in production; devDependencies are only needed during development</div>
<div data-quiz-option>dependencies are installed globally; devDependencies are installed locally</div>
<div data-quiz-option>dependencies are for JavaScript; devDependencies are for TypeScript</div>
<div data-quiz-option>There is no practical difference — it is just an organizational convention</div>
</div>

<div data-quiz-question="If you delete the node_modules/ folder from a project, how do you restore all the packages?" data-correct="1" data-explanation="Running 'npm install' (with no package name) reads your project's package.json file and downloads all listed dependencies fresh into a new node_modules/ folder. This is why you should always have a package.json — it is the recipe that recreates your environment. It is also why node_modules/ is never committed to Git.">
<div data-quiz-option>You cannot — once deleted, the packages are gone permanently</div>
<div data-quiz-option>Run 'npm install' in the project folder to reinstall all packages from package.json</div>
<div data-quiz-option>Run 'npm restore' to recover the deleted files</div>
<div data-quiz-option>Copy the node_modules/ folder from another project</div>
</div>

</div>

---

## What's Next

Node.js and npm are installed and verified. In **Lesson 7**, you will upgrade your development environment to **Cursor** — an AI-powered code editor built on VS Code that gives you a co-pilot for every line of code you write.

- **Next Lesson:** [Lesson 7 — Upgrading to Cursor: Your AI-Powered Co-Pilot](/courses/shadcn-nextjs/lessons/7-upgrading-to-cursor)

---

## Conclusion

You installed the engine. Every command-line tool in this course, every framework, every package runs on the runtime you just set up. It is invisible infrastructure — you will rarely think about Node.js directly — but without it, none of the rest works.

That is often how the most important things work. The foundation that holds everything up is the last thing you notice — until it is not there.

> *"Unless the Lord builds the house, the builders labor in vain."*
> — Psalm 127:1 (NIV)

Build on a solid foundation. nvm gives you a flexible, version-controlled Node.js installation that will serve you well across every project for years to come.

---

## A Prayer for This Lesson

*Lord, we thank You for the people who built Node.js, npm, and the entire open-source ecosystem that makes modern web development possible. Millions of developers have freely given their work so that others could build.*

*Help this student appreciate the generosity embedded in the tools they now have — tools that cost nothing but represent countless thousands of hours of human creativity and labor given freely.*

*As they grow in skill, may they too become generous contributors — to their teams, their communities, and the broader ecosystem. Excellence shared is excellence multiplied.*

*In Jesus' name, Amen.*

---

## Lesson Checklist

- [ ] nvm is installed (`nvm --version` returns a version number)
- [ ] Node.js LTS is installed via nvm (`node --version` shows v22.x.x or similar)
- [ ] npm is working (`npm --version` returns a version number)
- [ ] I created `hello.js` and ran it with `node hello.js` successfully
- [ ] I understand the difference between npm, npx, and pnpm
- [ ] I understand the difference between dependencies and devDependencies
- [ ] I scored at least 4/5 on the Knowledge Check quiz above
