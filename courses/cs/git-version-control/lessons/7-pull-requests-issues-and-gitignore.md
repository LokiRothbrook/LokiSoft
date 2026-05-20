---
title: "Lesson 16: Pull Requests, Issues, and .gitignore — Professional GitHub Workflow"
date: 2026-05-19
author: LokiSoft Team
excerpt: Master the professional GitHub workflow — open Pull Requests for code review, track work with Issues, protect your secrets with .gitignore, and explore GitHub Desktop as a visual option.
categories: shadcn-nextjs, Git, GitHub, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 16: Pull Requests, Issues, and .gitignore — Professional GitHub Workflow

> *"Plans fail for lack of counsel, but with many advisers they succeed."*
> — Proverbs 15:22 (NIV)

---

## Quest Briefing

Knowing Git commands is one thing. Working like a professional developer on a team is another. This lesson bridges that gap — you'll learn the GitHub workflow that actual engineering teams use every single day.

Pull Requests are how developers propose changes, review each other's code, and maintain quality. Issues are how teams track bugs and features. `.gitignore` keeps sensitive files and clutter out of your repository. Together, these tools transform you from someone who uses Git alone into someone who can collaborate professionally.

By the end of this lesson you will:
- Open a Pull Request on GitHub and understand the review process
- Create and manage Issues to track work
- Write a comprehensive `.gitignore` file that protects your secrets
- Know what belongs in a `.gitignore` and why
- Understand GitHub Desktop as a visual alternative to the CLI

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 14 | Branching and Merging |
| Lesson 15 | Remote Repositories and GitHub |

You'll need a GitHub account and a repository pushed to GitHub. Have your `my-first-repo` repository from Lesson 15 ready.

---

## Pull Requests — Proposing and Reviewing Changes

A **Pull Request** (PR) is a formal proposal to merge changes from one branch into another. It's GitHub's centerpiece feature for collaboration and code review.

When you open a PR, you're saying: *"I've made some changes on this branch. Here's what they do. Please review them before merging into main."*

Your teammates can comment on specific lines of code, ask questions, request changes, or approve the PR. Only after review is the code merged. This is how professional teams maintain quality at scale.

### The PR Workflow

```
feature branch → open PR → code review → address feedback → approved → merge → delete branch
```

This workflow is called the **GitHub Flow** and it's what most teams use.

### Let's Create a Real Pull Request

**Step 1 — Create a feature branch locally:**

```bash
git switch -c feature-add-footer
```

**Step 2 — Make some changes:**

Edit `index.html` to add a footer:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page, tracked with Git.</p>
    <p><a href="about.html">About Me</a></p>

    <footer>
        <p>&copy; 2026 My First Repository. Built with Git and GitHub.</p>
    </footer>
</body>
</html>
```

**Step 3 — Commit and push the branch:**

```bash
git add index.html
git commit -m "Add footer to index page"
git push -u origin feature-add-footer
```

**Step 4 — Open the PR on GitHub:**

Go to your repository on GitHub. You'll see a yellow banner:
> "feature-add-footer had recent pushes 1 minute ago. **Compare & pull request**"

Click that button. Alternatively, go to the **Pull requests** tab and click **New pull request**.

On the PR creation screen:
- **Base**: `main` (where you want to merge into)
- **Compare**: `feature-add-footer` (what you're proposing to merge)
- **Title**: "Add footer to index page"
- **Description**: Write a clear description of what you changed and why

<div data-info-box="hint" data-title="Write a Good PR Description">
A great PR description includes:

1. **What** — A summary of the changes ("Added a footer with copyright text and current year")
2. **Why** — The motivation ("Every professional page needs a footer for attribution and legal reasons")
3. **How to test** — How to verify it works ("Open index.html in a browser and scroll to the bottom")
4. **Screenshots** — For UI changes, include before/after screenshots

This helps reviewers understand your intent without having to read every line of code first.
</div>

Click **Create pull request**.

### Reading a PR

The PR page shows:
- **Conversation tab** — The description, all review comments, and the merge history
- **Commits tab** — All commits included in this PR
- **Files changed tab** — A diff view of every change, line by line

This is where reviewers leave feedback. They can click the `+` button next to any line to leave an inline comment.

### Reviewing Someone Else's PR

In a real team, you'd review PRs from teammates. On your own repos, you can still practice by reviewing your own PR. Click **Files changed** and explore:
- Lines highlighted in green were added
- Lines highlighted in red were removed
- Leave a comment: click the `+` on any line

After reviewing, you can:
- **Comment** — Leave general feedback without approving or requesting changes
- **Approve** — The changes look good, ready to merge
- **Request changes** — Something needs to be fixed before this can merge

### Merging the PR

Once approved (or since it's your own repo and no review is required), click **Merge pull request** → **Confirm merge**.

You'll see three merge options:
- **Create a merge commit** — Creates a merge commit preserving full branch history (default)
- **Squash and merge** — Combines all branch commits into a single commit on main (cleaner history)
- **Rebase and merge** — Replays branch commits one by one on top of main (linear history, no merge commit)

<div data-toggle-box data-title="Which Merge Strategy Should You Use?">

| Strategy | Best For | History Effect |
|----------|----------|----------------|
| Merge commit | Teams that want full branch history visible | Shows the branch structure in the graph |
| Squash and merge | Messy feature branches with many WIP commits | One clean commit on main per feature |
| Rebase and merge | Teams that prefer linear history | Linear, no merge commits |

For this course and most small teams: **merge commit** is fine for understanding, **squash and merge** produces the cleanest long-term history. Many open-source projects use squash-and-merge to keep `main` clean.

</div>

After merging, GitHub asks if you want to delete the branch. Click **Delete branch** — always clean up merged branches. Then pull locally:

```bash
git switch main
git pull
git branch -d feature-add-footer
```

Your local `main` is now up to date and the feature branch is cleaned up on both remote and local.

---

## GitHub Issues — Tracking Work

**Issues** are GitHub's built-in task tracker. Every bug report, feature request, question, or to-do item in a professional project lives as an Issue.

Issues can be:
- Bug reports: "The login button doesn't work on mobile"
- Feature requests: "Add dark mode support"
- Tasks: "Write tests for the authentication module"
- Questions: "What's the best way to handle image uploads?"

### Creating an Issue

On your repository, go to the **Issues** tab → **New issue**.

Fill in:
- **Title**: Short, specific summary ("Footer text wraps oddly on mobile screens")
- **Description**: Detailed explanation. Use the template if one exists.
  - Steps to reproduce (for bugs)
  - Expected behavior vs actual behavior
  - Environment (browser, OS, screen size)
  - Screenshots

Click **Submit new issue**. The issue gets a number (e.g., `#1`, `#2`) — these numbers are permanent references.

### Linking Issues to Commits and PRs

Here's one of GitHub's most useful features: **closing keywords**. If your commit message or PR description includes specific phrases, GitHub automatically closes the linked issue when the code is merged:

```
git commit -m "Fix footer wrapping on small screens

Closes #1"
```

Or in a PR description:
```
Resolves #1
Fixes #3
```

When the PR merges to `main`, GitHub closes issue #1 automatically. The issue shows a link to the PR that closed it.

### Issue Labels, Assignees, and Milestones

- **Labels**: Color-coded tags like `bug`, `enhancement`, `good first issue`, `help wanted`
- **Assignees**: Who is responsible for resolving this issue
- **Milestone**: Which version or deadline this issue belongs to

For personal projects, you may not use all of these. On a team, they're essential for keeping dozens of open issues organized.

<div data-info-box="hint" data-title="'Good First Issue' — Your Path Into Open Source">
Many open-source repositories tag beginner-friendly issues with "good first issue". This is how millions of developers have made their first open-source contribution. Browse GitHub Explore, find a project you use, click Issues, filter by "good first issue", and you'll find work that welcoming maintainers have specifically set aside for new contributors.
</div>

---

## .gitignore — Protecting Your Secrets and Keeping Things Clean

A `.gitignore` file tells Git to permanently ignore specific files and folders. They will never be staged, never committed, never pushed — even with `git add .`.

### Why This Matters

Some files should never be in your repository:

| File Type | Why It Should Stay Out |
|-----------|----------------------|
| `.env` files | Contain API keys, database passwords, secret tokens |
| `node_modules/` | Auto-generated, hundreds of MB, easily regenerated with `npm install` |
| `.DS_Store` | macOS metadata file — no use to anyone else |
| `Thumbs.db` | Windows thumbnail cache |
| `*.log` files | Log output, usually large and irrelevant to the codebase |
| `dist/` or `build/` | Generated output — should be rebuilt from source |
| `.env.local` | Local environment overrides with secrets |
| IDE config folders | `.idea/` (JetBrains), `.vscode/` (sometimes) |

<div data-info-box="danger" data-title="API Keys in Git Are a Security Emergency">
If you accidentally commit an API key, database password, or secret token to a public GitHub repository, **treat it as compromised immediately**:

1. Revoke and regenerate the secret in the service that issued it
2. Remove it from Git history (this is difficult and complicated — preventing the commit is far easier)
3. Audit your access logs for unauthorized use

Secrets can be scraped from GitHub within seconds of being pushed by automated bots that continuously scan new commits. The `.gitignore` file is your first line of defense. Always set it up before your first commit.
</div>

### Creating a .gitignore File

In your project root:

**Linux / macOS:**
```bash
touch .gitignore
```

**Windows (Command Prompt):**
```cmd
type nul > .gitignore
```

**Windows (PowerShell):**
```powershell
New-Item .gitignore -ItemType File
```

Or just create it in your editor. The file is named exactly `.gitignore` (starts with a dot, no extension).

### .gitignore Syntax

```gitignore
# This is a comment — ignored by Git

# Ignore a specific file
.env

# Ignore all files with this extension
*.log
*.tmp
*.bak

# Ignore a folder (trailing slash is optional but clear)
node_modules/
dist/
build/
.cache/

# Ignore all .env variants
.env*
.env.local
.env.*.local

# Ignore OS files
.DS_Store
Thumbs.db
desktop.ini

# Ignore IDE folders
.idea/
.vscode/

# Ignore a file everywhere in the project
**/.DS_Store

# Exception: ignore all .log files EXCEPT this specific one
*.log
!important.log
```

The `!` prefix creates an exception — "ignore everything matching the pattern above, but NOT this."

### A Real-World .gitignore for Web Projects

Here's a comprehensive starting `.gitignore` for a typical web project:

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Environment variables — NEVER commit these
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build output
dist/
build/
.next/
out/

# Testing
coverage/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids/
*.pid
*.seed

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
Thumbs.db
ehthumbs.db
Desktop.ini

# Editor directories and files
.idea/
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
*.swp
*.swo
*~

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

<div data-info-box="hint" data-title="gitignore.io — Generate .gitignore Files Automatically">
The website **gitignore.io** (also accessible as `git.io/gitignore` or via an API) generates `.gitignore` files for any combination of language, framework, and operating system. Just type "Node, React, macOS, Windows, Linux" and it produces a comprehensive file instantly.

You can also use the GitHub web interface: when creating a new repository, there's a dropdown to auto-add a `.gitignore` template for your project type.
</div>

### What About Files Already Tracked?

If you accidentally committed a file and then added it to `.gitignore`, Git still tracks it — `.gitignore` only prevents untracked files from being added. To un-track a file that was already committed:

```bash
git rm --cached filename
git commit -m "Remove accidentally committed file"
```

`git rm --cached` removes the file from Git's tracking (staging area and future commits) without deleting it from your actual filesystem. After this commit, the file stays on your computer but Git ignores it.

For a whole folder:
```bash
git rm -r --cached node_modules/
git commit -m "Remove node_modules from tracking"
```

---

## Global .gitignore — OS-Level Ignores

Some files you always want to ignore regardless of which project you're in. Instead of adding `.DS_Store` to every project's `.gitignore`, create a global one:

**Linux / macOS:**
```bash
touch ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
```

Add your personal ignores:
```gitignore
# macOS
.DS_Store
.AppleDouble
.LSOverride

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# Linux
*~
.directory

# JetBrains IDEs (if you use them)
.idea/

# VS Code (user-specific, not project-wide)
.vscode/settings.json
```

Now you never need to add these to individual project `.gitignore` files.

---

## GitHub Desktop — A Visual Alternative

**GitHub Desktop** is GitHub's official GUI application for Windows and macOS. It provides a visual interface for all the Git operations you've been doing on the command line.

### When to Use GitHub Desktop

- When you're learning and want to visualize what's happening
- When you prefer clicking over typing
- When you're doing complex branch management and want to see the graph
- When you want to stage individual lines (hunks) from a visual diff

### What It Does

- Visual staging area — see all changed files and check/uncheck what to stage
- Line-by-line diff viewer with staging support
- Branch creation, switching, and merging with clicks
- Push and pull with a single button
- PR creation directly from the app

### What It Doesn't Replace

GitHub Desktop doesn't support every Git operation. Advanced commands like `git bisect`, `git rebase -i`, or `git reflog` still require the terminal. Most developers use a mix: GitHub Desktop (or another GUI like GitKraken or Tower) for visual work, and the terminal for advanced operations.

<div data-info-box="info" data-title="VS Code Has Built-In Git Support">
You don't even need GitHub Desktop. VS Code and Cursor both have excellent built-in Git GUIs in their Source Control panel (the branch icon on the left sidebar). You can stage files, write commit messages, view diffs, and manage branches — all without leaving your editor. This is what most developers use day-to-day, supplementing the terminal for complex operations.
</div>

---

## Putting It All Together — The Complete GitHub Flow

Here's the full professional workflow you now know:

```
1. Create an Issue describing the work to be done
   └─ "Feature: add footer to homepage" → becomes #1

2. Create a feature branch
   └─ git switch -c feature-add-footer

3. Write code and make commits
   └─ git add . && git commit -m "Add footer to index page"

4. Push the branch to GitHub
   └─ git push -u origin feature-add-footer

5. Open a Pull Request
   └─ Title: "Add footer to homepage"
   └─ Description: "Resolves #1 — adds copyright footer..."
   └─ Screenshots, testing instructions

6. Code review
   └─ Reviewers comment, you address feedback, push more commits

7. PR is approved → Merge
   └─ Choose merge strategy, click Merge pull request

8. Delete the branch (remote and local)
   └─ Click "Delete branch" on GitHub
   └─ git switch main && git pull && git branch -d feature-add-footer

9. Issue #1 is automatically closed ✓
```

This is exactly how engineers at top companies work. Every day. This workflow scales from a solo developer to a 10,000-person organization.

---

## Knowledge Check

<div data-quiz-group data-title="Pull Requests, Issues, and .gitignore">

<div data-quiz-question="What is the main purpose of a Pull Request?" data-correct="1" data-explanation="A Pull Request is a formal proposal to merge changes from one branch into another. Its primary purpose is to enable code review — teammates can examine the changes line by line, leave feedback, request modifications, and approve the merge. PRs create a structured quality gate before code reaches the main branch.">
<div data-quiz-option>To download changes from the remote repository to your local machine</div>
<div data-quiz-option>To formally propose changes and enable code review before merging into another branch</div>
<div data-quiz-option>To request that someone pull your files onto their computer</div>
<div data-quiz-option>To merge two branches without creating a commit</div>
</div>

<div data-quiz-question="What does the closing keyword 'Fixes #5' in a PR description do?" data-correct="3" data-explanation="When a PR description or commit message contains a closing keyword (Fixes, Closes, Resolves) followed by an issue number, GitHub automatically closes that issue when the PR is merged into the default branch. This links the PR to the issue in both directions — the issue shows what PR fixed it, and the PR shows what issue it resolves. It's a powerful way to track work automatically.">
<div data-quiz-option>It marks the PR as fixing 5 bugs</div>
<div data-quiz-option>It assigns the PR to the developer who opened issue #5</div>
<div data-quiz-option>It prevents anyone except the issue reporter from merging</div>
<div data-quiz-option>It automatically closes issue #5 when the PR is merged into the default branch</div>
</div>

<div data-quiz-question="What is the correct way to permanently un-track a file that was accidentally committed, without deleting it from your computer?" data-correct="2" data-explanation="git rm --cached filename removes the file from Git's index (tracking) without touching the actual file on your filesystem. After running this command and committing, the file will no longer be tracked by Git — and if it's in .gitignore, it will be ignored from then on. The plain 'git rm filename' would delete the file from disk as well.">
<div data-quiz-option>Delete it from the .gitignore file</div>
<div data-quiz-option>git remove --untrack filename</div>
<div data-quiz-option>git rm --cached filename, then commit</div>
<div data-quiz-option>git reset HEAD filename</div>
</div>

<div data-quiz-question="Why should 'node_modules/' always be in .gitignore?" data-correct="0" data-explanation="The node_modules/ folder can contain hundreds of megabytes of files from thousands of packages. It's entirely auto-generated from package.json — anyone can recreate it instantly with 'npm install'. Committing it would bloat the repository size enormously, slow down all Git operations, and pollute the history with irrelevant changes. It should never be committed.">
<div data-quiz-option>It can be hundreds of megabytes and is fully regeneratable with npm install — there's no reason to commit it</div>
<div data-quiz-option>It contains secret API keys that would be exposed</div>
<div data-quiz-option>GitHub rejects repositories that contain node_modules/</div>
<div data-quiz-option>It can only run on the computer where npm install was run</div>
</div>

<div data-quiz-question="What is 'Squash and merge' in GitHub's merge options?" data-correct="3" data-explanation="Squash and merge takes all the commits from the feature branch and combines (squashes) them into a single new commit on the target branch. This is useful when a feature branch has many small, messy WIP commits that you don't want polluting the main branch history. The result is one clean, descriptive commit on main per feature, regardless of how many commits were on the branch.">
<div data-quiz-option>Merges the branch and then deletes all commits older than 30 days</div>
<div data-quiz-option>Creates a merge commit but hides it from the git log output</div>
<div data-quiz-option>Compresses the file sizes of all changed files before merging</div>
<div data-quiz-option>Combines all commits from the feature branch into a single commit on the target branch</div>
</div>

</div>

---

## What's Next

You've completed the full professional Git and GitHub workflow. You know everything from installing Git to pushing branches, opening PRs, tracking issues, and protecting your secrets.

In **Lesson 17**, you'll put everything to the test in the Section 1 Review Quiz — 20 questions covering every topic from this section. It's your chance to cement the knowledge before moving on to Section 2: HTML — The Skeleton of the Web.

If you pass with confidence, the **📜 Archivist** achievement is yours.

---

## A Prayer for Craftsmanship

*Lord, this section has been about one thing at its heart: careful, intentional work. Version control is a discipline — a commitment to recording what was done, when it was done, and why. It mirrors the kind of stewardship You call us to in all things.*

*As these students enter real teams, may they bring this discipline with them. May they write clear commit messages, meaningful PR descriptions, and Issues that help others understand the problem. May their code reviews be constructive and kind.*

*And when they handle others' code — reviewing a teammate's PR, inheriting a project — may they approach it with the same grace and care they would want shown to their own work.*

*In Jesus' name, Amen.*

---

> *"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."*
> — Colossians 3:23 (NIV)
