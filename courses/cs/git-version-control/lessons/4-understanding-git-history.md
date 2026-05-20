---
title: "Lesson 13: Understanding Git History — Reading the Scroll"
date: 2026-05-19
author: LokiSoft Team
excerpt: Learn to read your Git history like a professional — git log variants, git diff, git show, and a deep dive into how the staging area really works.
categories: shadcn-nextjs, Git, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 13: Understanding Git History — Reading the Scroll

> *"Remember the days of old; consider the generations long past. Ask your father and he will tell you, your elders, and they will explain to you."*
> — Deuteronomy 32:7 (NIV)

---

## Quest Briefing

A historian doesn't just write scrolls — they read them. In Lesson 12 you wrote your first entries. Now you're going to learn to read the record: how to inspect what changed, when it changed, why it changed, and exactly what the difference was between any two moments in history.

This is one of the most powerful skills Git gives you. When a bug appears in production and you need to find out when it was introduced and what line of code caused it, these commands are your investigative tools.

By the end of this lesson you will:
- Use multiple `git log` formats to navigate history efficiently
- Use `git diff` to see exactly what changed between any two states
- Use `git show` to inspect the details of any single commit
- Deeply understand the staging area as a three-way comparison
- Know how to recover or reference any commit by its ID

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 12 | Git Fundamentals — Your First Repository |

You should have a practice repository with at least 2–3 commits from Lesson 12. If not, recreate it quickly:

```bash
mkdir git-practice && cd git-practice
git init
echo "# Practice Repo" > README.md
git add README.md
git commit -m "Initial commit: add README"
echo "Hello World" > index.html
git add index.html
git commit -m "Add index.html"
```

---

## git log — The Full Power

You've seen `git log --oneline`. Let's unlock the full range of options.

### The Default View

```bash
git log
```

Shows full information for each commit: SHA hash, author, date, and full message. Press `q` to exit, arrow keys or `j`/`k` to scroll.

### Compact View

```bash
git log --oneline
```

One line per commit. Essential for quickly scanning recent history.

Example output:
```
c3d4e5f Update README to list project files
b2c3d4e Add basic index.html page
a1b2c3d Initial commit: add README
```

### Decorated View

```bash
git log --oneline --decorate
```

Shows branch and tag labels next to commits:
```
c3d4e5f (HEAD -> main) Update README to list project files
b2c3d4e Add basic index.html page
a1b2c3d Initial commit: add README
```

`HEAD -> main` means: "Your current position (HEAD) is on the branch called main, and the tip of main is this commit."

### Graph View

```bash
git log --oneline --graph
```

Draws an ASCII art graph of branches and merges. Not very useful yet with a linear history, but you'll love this once you start branching:
```
* c3d4e5f (HEAD -> main) Update README
* b2c3d4e Add basic index.html page
* a1b2c3d Initial commit: add README
```

The `*` marks each commit. Once you have branches, this becomes a tree diagram.

### Combined: The Professional View

This is the combination most experienced developers use daily:

```bash
git log --oneline --graph --decorate --all
```

- `--oneline` — compact
- `--graph` — branch visualization
- `--decorate` — show branch/tag names
- `--all` — show all branches, not just the current one

<div data-info-box="hint" data-title="Create a Shortcut Alias">
If you find yourself typing a long git log command repeatedly, create an alias. This makes `git lg` do the same as the long command:

**Linux / macOS / Windows:**
```bash
git config --global alias.lg "log --oneline --graph --decorate --all"
```

Now `git lg` works from anywhere. Git aliases are a great way to customize your workflow.
</div>

### Filtering the Log

```bash
git log --oneline -10
```
Show only the last 10 commits.

```bash
git log --oneline --author="Your Name"
```
Show only commits by a specific author.

```bash
git log --oneline --since="2 weeks ago"
git log --oneline --since="2026-05-01"
```
Show commits from the last 2 weeks or after a specific date.

```bash
git log --oneline --grep="README"
```
Show commits whose message contains "README".

```bash
git log --oneline -- README.md
```
Show only commits that touched `README.md`. The `--` separates git options from file paths.

---

## Understanding the SHA Hash

Every commit has a unique identifier called a **SHA-1 hash** — a 40-character hex string like:
```
a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0
```

Git generates this by hashing the commit's content: the author, timestamp, message, parent commit, and all the file changes. The result is mathematically unique.

The short 7-character version (like `a1b2c3d`) is almost always unique within a project and is what you'll use in day-to-day commands.

<div data-info-box="info" data-title="Why SHA Hashes Are Trustworthy">
Because the SHA is computed from the content, you can always verify integrity. If any bit of a commit's data changed, the SHA would be completely different. This means you can trust that `a1b2c3d` is always the exact same commit, forever. It's cryptographically tamper-evident — no one can secretly alter history without you being able to detect it.
</div>

### Referencing Commits

In any Git command that accepts a commit reference, you can use:
- The full 40-character SHA: `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0`
- A short prefix (usually 7 characters is enough): `a1b2c3d`
- A branch name: `main` (refers to the tip of main)
- `HEAD` — your current commit
- `HEAD~1` — one commit before HEAD
- `HEAD~3` — three commits before HEAD

---

## git show — Inspecting a Single Commit

`git show` displays the full details of any commit: the metadata plus the exact diff of what changed.

### Show the Latest Commit

```bash
git show
```

This shows HEAD (your most recent commit) by default.

### Show a Specific Commit

```bash
git show a1b2c3d
```

```bash
git show HEAD~1
```

Output looks like:
```
commit b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1
Author: Your Name <your@email.com>
Date:   Mon May 19 10:25:00 2026 +0000

    Add basic index.html page

diff --git a/index.html b/index.html
new file mode 100644
index 0000000..e8e3562
--- /dev/null
+++ b/index.html
@@ -0,0 +1,10 @@
+<!DOCTYPE html>
+<html lang="en">
+<head>
+    <meta charset="UTF-8">
+    <title>My First Page</title>
+</head>
+<body>
+    <h1>Hello, World!</h1>
+</body>
+</html>
```

Lines beginning with `+` were added. Lines beginning with `-` were removed. Lines with neither were unchanged context.

### Show Only File Names

```bash
git show --name-only HEAD
git show --stat HEAD
```

`--name-only` lists just the filenames that changed. `--stat` shows filenames plus a summary of how many lines were added/removed.

---

## git diff — Comparing Versions

`git diff` is how you see exactly what changed between any two states. It's one of the most useful commands for understanding your work.

### What Changed Since the Last Commit (Unstaged Changes)

Edit `README.md` a bit — add a line, change a word. Then run:

```bash
git diff
```

This shows the difference between your **working tree** and the **staging area** (which currently matches the last commit).

```
diff --git a/README.md b/README.md
index 8f9e8d2..c3f2a91 100644
--- a/README.md
+++ b/README.md
@@ -1,3 +1,5 @@
 # My First Repository

 This is my first Git repository. I am learning version control!
+
+## New Section Added Today
```

Reading the diff output:
- `---` and `+++` — the "before" and "after" files
- `@@ -1,3 +1,5 @@` — the line numbers that follow (the `@@` lines are called "hunks")
- Lines with `-` (in red) — lines that were removed
- Lines with `+` (in green) — lines that were added
- Lines with no prefix — unchanged context lines shown for reference

### What Changed in the Staging Area (Staged Changes)

If you've run `git add` but not yet `git commit`, use this:

```bash
git diff --staged
```

(Also written as `git diff --cached` in older Git versions — they're identical.)

This shows the difference between the **staging area** and the **last commit** — in other words, exactly what your next commit will contain.

```
┌─────────────┐          ┌──────────────┐          ┌──────────────┐
│  Last       │          │  Staging     │          │  Working     │
│  Commit     │ ←──────  │  Area        │ ←──────  │  Tree        │
│             │ git diff │              │ git diff │              │
│             │ --staged │              │          │              │
└─────────────┘          └──────────────┘          └──────────────┘
                         ↑                          ↑
                         git diff --staged          git diff
```

<div data-info-box="info" data-title="The Three-Way Comparison">
The staging area is always a three-way comparison point:

- `git diff` — Working tree vs. Staging area (what's changed but not yet staged)
- `git diff --staged` — Staging area vs. Last commit (what will be in the next commit)
- `git diff HEAD` — Working tree vs. Last commit (everything changed since the last commit, staged or not)
</div>

### Compare Two Commits

```bash
git diff a1b2c3d b2c3d4e
```

```bash
git diff HEAD~2 HEAD
```

Shows everything that changed between those two commits.

### Compare a Specific File Across Commits

```bash
git diff HEAD~1 HEAD -- README.md
```

Shows only the changes to README.md between the second-to-last commit and the latest.

---

## git log with Diff Information

You can combine `git log` with diff options to see both history and changes in one view:

```bash
git log -p
```

Shows the full diff for every commit in the log. Very verbose but incredibly detailed.

```bash
git log -p --follow README.md
```

Shows every change ever made to `README.md`, following the file even if it was renamed.

```bash
git log --stat
```

Shows each commit with a summary of which files changed and how many lines were added/removed — without showing the full diff content.

---

## Referencing Commits Relatively

You'll often need to refer to "the commit before the current one" or "three commits ago." Git has shorthand for this:

| Reference | Meaning |
|-----------|---------|
| `HEAD` | The current commit |
| `HEAD~1` | One commit before HEAD |
| `HEAD~3` | Three commits before HEAD |
| `HEAD^` | The parent of HEAD (same as `HEAD~1` for linear history) |
| `main~2` | Two commits before the tip of `main` |
| `a1b2c3d` | The commit with that SHA |

<div data-toggle-box data-title="HEAD~ vs HEAD^ — What's the Difference?">

For most purposes, `HEAD~1` and `HEAD^` mean the same thing: the commit immediately before HEAD.

The difference only matters with **merge commits**, which have two parents (because a merge joins two branches). In that case:
- `HEAD^1` — the first parent (the branch you were on when you merged)
- `HEAD^2` — the second parent (the branch you merged in)
- `HEAD~2` — follows the first-parent chain, going back two steps

For linear history (which you have now), they're interchangeable. You'll rarely need this distinction until you're working with complex branch histories.

</div>

---

## The Staging Area — A Deeper Look

Let's revisit the staging area with fresh eyes now that you understand diffs.

### Why the Staging Area Is Brilliant

Imagine you've been coding all afternoon. You fixed a bug in `login.js`, refactored some styles in `app.css`, and started (but didn't finish) a new feature in `dashboard.js`. At the end of the day you want to commit, but these are three separate concerns.

Without the staging area, you'd have to commit everything together in one messy commit that mixes a bug fix, a refactor, and an incomplete feature.

With the staging area, you can:
1. Stage only `login.js` → commit: "Fix login redirect bug"
2. Stage only `app.css` → commit: "Refactor button styles for consistency"
3. Leave `dashboard.js` unstaged for tomorrow

Three clean, separate commits from one messy afternoon of work. Your history tells a clear story instead of a confused jumble.

### Staging Part of a File (Interactive Staging)

You can even stage specific lines within a file — called a "hunk":

**Linux / macOS / Windows:**
```bash
git add -p README.md
```

The `-p` flag (short for `--patch`) walks you through each changed section of the file and asks: "Do you want to stage this hunk?" Answer `y` (yes), `n` (no), `s` (split into smaller hunks), or `?` (help).

This is an advanced technique but extremely powerful for creating clean, precise commits.

<div data-toggle-box data-title="Full Interactive Staging Options">

When using `git add -p`, you're presented with each "hunk" (a block of changed lines) and can respond with:

| Key | Action |
|-----|--------|
| `y` | Stage this hunk |
| `n` | Skip this hunk (don't stage) |
| `s` | Split hunk into smaller pieces |
| `e` | Manually edit the hunk |
| `q` | Quit — don't stage anything else |
| `?` | Show help |

This lets you make surgical commits where each one represents exactly one idea, even if your work in progress mixed several ideas in the same file.

</div>

---

## Finding a Commit That Introduced a Bug

Here's a real-world scenario you'll face eventually. You notice a bug in your app. You know it didn't exist a month ago. How do you find which commit introduced it?

### Manual Method

```bash
git log --oneline --since="1 month ago"
```

Look through the commits. Check out suspicious ones and test. This is fine for small histories.

### git bisect (The Power Tool)

Git has a built-in binary search for finding bugs called `git bisect`. You tell it:
- "This commit is good (no bug)"
- "This commit is bad (has the bug)"

Git automatically checks out the midpoint between them. You test, report good or bad, and Git narrows the range — cutting the search space in half each time. For 1,000 commits, you find the bad commit in just 10 tests.

We'll cover `git bisect` in depth later in the course. For now, just know it exists. It's one of Git's most impressive features.

---

## Knowledge Check

<div data-quiz-group data-title="Git History and Diffs">

<div data-quiz-question="What does git diff show when run with no arguments?" data-correct="1" data-explanation="With no arguments, git diff compares the working tree to the staging area. It shows changes you've made to files that you haven't yet staged with git add. It does NOT show staged changes — use git diff --staged for those.">
<div data-quiz-option>The difference between two branches</div>
<div data-quiz-option>Unstaged changes: the difference between the working tree and the staging area</div>
<div data-quiz-option>The difference between your local code and GitHub</div>
<div data-quiz-option>Every change ever made to the project</div>
</div>

<div data-quiz-question="What does git diff --staged show?" data-correct="2" data-explanation="git diff --staged (also called git diff --cached) shows the difference between the staging area and the last commit. In other words, it shows exactly what will be included in your next commit — the changes you've staged with git add but haven't committed yet. It's a preview of your next commit.">
<div data-quiz-option>Unstaged changes in the working tree</div>
<div data-quiz-option>The difference between two different commits</div>
<div data-quiz-option>Changes staged for the next commit: staging area vs. last commit</div>
<div data-quiz-option>Changes on the remote server not yet downloaded</div>
</div>

<div data-quiz-question="What does HEAD~2 refer to?" data-correct="3" data-explanation="HEAD is a pointer to your current commit. The ~ (tilde) operator goes backward in the commit history by the specified number. HEAD~2 means 'go back two commits from HEAD' — the commit that is two steps before the current one. HEAD~1 (or HEAD^) is one step back, HEAD~3 is three steps back, and so on.">
<div data-quiz-option>The second commit ever made in the repository</div>
<div data-quiz-option>Two commits ahead of the current HEAD</div>
<div data-quiz-option>The second branch in the repository</div>
<div data-quiz-option>The commit two steps before the current HEAD</div>
</div>

<div data-quiz-question="What does git show do?" data-correct="0" data-explanation="git show displays the full details of a specific commit: its metadata (author, date, message) AND the diff of what changed in that commit. With no arguments it shows the current HEAD commit. You can pass any commit reference (SHA, HEAD~1, branch name) to inspect any specific commit in history.">
<div data-quiz-option>Displays the metadata and diff of a specific commit</div>
<div data-quiz-option>Shows all files currently in the staging area</div>
<div data-quiz-option>Displays the contents of the .git folder</div>
<div data-quiz-option>Shows the difference between two branches</div>
</div>

<div data-quiz-question="What is the benefit of the staging area when you've changed multiple unrelated things during the day?" data-correct="1" data-explanation="The staging area lets you select only the specific changes you want in each commit. If you've worked on three unrelated things, you can stage and commit them separately — creating three clean, focused commits with clear messages. Without the staging area, everything would have to go into one mixed-up commit, making the history much harder to understand.">
<div data-quiz-option>It speeds up the git commit command</div>
<div data-quiz-option>It lets you stage and commit each unrelated change separately, creating a clean history</div>
<div data-quiz-option>It prevents you from accidentally committing too much</div>
<div data-quiz-option>It automatically groups related changes together</div>
</div>

</div>

---

## What's Next

You can now read history like a historian — seeing what changed, when, and exactly how. Your investigative toolkit is growing.

In **Lesson 14**, you'll unlock one of Git's most powerful features: **branching and merging**. You'll learn how to create parallel timelines, experiment freely without affecting stable code, and bring branches back together. This is where Git goes from useful to magical.

---

## A Prayer for Understanding

*Lord, there is something beautiful about a record faithfully kept — a history that tells the true story of how something came to be. As these students learn to read their code's history, may they appreciate the value of careful documentation and intentional work.*

*When they use these tools in the future to investigate a bug or review a teammate's changes, may they approach it with curiosity and generosity — seeking to understand rather than to assign blame.*

*And as they grow in technical skill, may they never lose sight of the greater story: that they are made in Your image, endowed with creativity and reason, called to build things that serve others.*

*In Jesus' name, Amen.*

---

> *"For everything that was written in the past was written to teach us, so that through the endurance taught in the Scriptures and the encouragement they provide we might have hope."*
> — Romans 15:4 (NIV)
