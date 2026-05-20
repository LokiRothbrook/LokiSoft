---
title: "Lesson 12: Git Fundamentals — Your First Repository"
date: 2026-05-19
author: LokiSoft Team
excerpt: Create your first Git repository and master the core loop every developer uses every single day — git init, git add, git commit, and git log.
categories: shadcn-nextjs, Git, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 12: Git Fundamentals — Your First Repository

> *"Start children off on the way they should go, and even when they are old they will not turn from it."*
> — Proverbs 22:6 (NIV)

---

## Quest Briefing

This is the lesson where theory becomes reality. You've learned what Git is and you've installed it. Now you're going to use it — for real, right now, with actual commands that do actual things.

By the end of this lesson you will:
- Create a Git repository from scratch
- Understand the three states of a file (working, staged, committed)
- Make your first commits using the full `add → commit` workflow
- Read your commit history with `git log`
- Understand exactly what Git is doing under the hood

The commands you learn here — `git init`, `git status`, `git add`, `git commit`, `git log` — are the core loop. You will use these every single day for the rest of your development career. Let's build the habit right.

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 5 | The Terminal — Talking to Your Computer |
| Lesson 10 | What is Version Control? |
| Lesson 11 | Installing and Configuring Git |

You'll need a terminal and Git installed and configured. Have them open now.

---

## The Three States of a File

Before running a single command, understand this model — it's the key to never being confused by Git:

Every file in a Git repository exists in one of three states:

```
┌─────────────────┐    git add    ┌─────────────────┐    git commit    ┌─────────────────┐
│                 │  ──────────→  │                 │  ─────────────→  │                 │
│  Working Tree   │               │  Staging Area   │                  │   Repository    │
│  (your files)   │               │    (index)      │                  │  (git history)  │
│                 │               │                 │                  │                 │
└─────────────────┘               └─────────────────┘                  └─────────────────┘
```

1. **Working Tree** — The actual files on your computer. When you create, edit, or delete a file, you're working in this state. Git watches this area but hasn't recorded anything yet.

2. **Staging Area (Index)** — A preparation zone. When you run `git add`, you move changes from the working tree into staging. You're saying: "I want these changes to be part of my next commit."

3. **Repository (Git History)** — When you run `git commit`, everything in the staging area is packaged into a permanent snapshot and added to Git's history. It's saved forever.

<div data-info-box="info" data-title="Why Have a Staging Area at All?">
The staging area gives you precision. Imagine you spent the day working on three different things: a bug fix, a new button, and some CSS cleanup. These are three separate concerns. Instead of smashing them all into one commit, you can stage and commit them separately — giving each change its own clear commit message and creating a clean, meaningful history.
</div>

---

## Creating Your First Repository

Let's create a practice project. Open your terminal and follow along exactly.

### Step 1 — Create a Project Folder

**Linux / macOS:**
```bash
mkdir my-first-repo
cd my-first-repo
```

**Windows (Command Prompt):**
```cmd
mkdir my-first-repo
cd my-first-repo
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Name my-first-repo
cd my-first-repo
```

You're now inside an empty folder called `my-first-repo`.

### Step 2 — Initialize the Repository

Tell Git to start tracking this folder:

**Linux / macOS / Windows (all terminals):**
```bash
git init
```

You'll see:
```
Initialized empty Git repository in /path/to/my-first-repo/.git/
```

That's it. This folder is now a Git repository. Git created a hidden folder called `.git/` inside your project. This folder stores everything Git knows about your project — the full history, your configuration, the staging area, everything. **Never manually edit or delete the `.git/` folder.**

<div data-toggle-box data-title="What's Inside the .git Folder?">

You can peek inside it (don't change anything, just look):

```bash
ls -la .git/
```

You'll see directories and files like:
- `HEAD` — points to the current branch you're on
- `config` — local repository configuration
- `objects/` — where all your file snapshots are stored
- `refs/` — where branch and tag pointers are stored
- `hooks/` — scripts that run automatically at certain Git events

Everything Git does, it does through this folder. When you run `git init`, this structure gets created. When you delete this folder, Git forgets your entire history (the project files survive, but the history is gone). 

</div>

---

## git status — Your Most Used Command

Run this right now:

**Linux / macOS / Windows:**
```bash
git status
```

Output:
```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

`git status` is the single command you'll run more than any other. It tells you:
- What branch you're on
- Whether you have uncommitted changes
- Which files are staged, unstaged, and untracked
- What action to take next

Get in the habit of running `git status` constantly — before, during, and after any operation. It's your compass.

---

## Making Your First Commit

Let's create some files and save them to history.

### Create a File

**Linux / macOS:**
```bash
echo "# My First Repository" > README.md
```

**Windows (Command Prompt):**
```cmd
echo # My First Repository > README.md
```

**Windows (PowerShell):**
```powershell
"# My First Repository" | Out-File -FilePath README.md -Encoding utf8
```

Or you can just open VS Code/Cursor in this folder and create the file manually:
```bash
code .
```

Create `README.md` with this content:
```markdown
# My First Repository

This is my first Git repository. I am learning version control!
```

### Check the Status

```bash
git status
```

Output:
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)
```

Git sees the file but it's **untracked** — Git knows it exists but isn't watching it yet. The file is in the Working Tree state.

### Stage the File

Move the file into the Staging Area:

**Linux / macOS / Windows:**
```bash
git add README.md
```

Check the status again:
```bash
git status
```

Output:
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
```

The file is now **staged** (shown in green if your terminal supports color). It's in the Staging Area, ready to be committed.

### Make Your First Commit

**Linux / macOS / Windows:**
```bash
git commit -m "Initial commit: add README"
```

Output:
```
[main (root-commit) a1b2c3d] Initial commit: add README
 1 file changed, 3 insertions(+)
 create mode 100644 README.md
```

That code `a1b2c3d` at the start is the beginning of your commit's unique ID (called a SHA hash). Every commit gets one. Yours will be different from mine.

**You just created your first commit.** README.md is now permanently saved in Git's history.

<div data-info-box="success" data-title="Achievement Unlocked: First Commit">
You've made your first save point. Your work is now permanently recorded. Even if you delete README.md right now, you could recover it from Git history. That's the power of version control working for you.
</div>

---

## The Commit Message — Write It Well

The `-m` flag lets you provide a commit message inline. The commit message is your future self's best friend. It answers: *"Why did I make this change?"*

### What a Good Commit Message Looks Like

```bash
git commit -m "Add user authentication to login page"
git commit -m "Fix broken link in navigation menu"
git commit -m "Update README with deployment instructions"
```

### What a Bad Commit Message Looks Like

```bash
git commit -m "stuff"
git commit -m "fix"
git commit -m "asdfgh"
git commit -m "changes"
```

Bad messages make the history useless. When you're debugging a bug that was introduced three months ago and you're trying to find the right commit to examine, you need to read the history like a story. Clear messages are the difference between finding the bug in 5 minutes and spending a frustrated afternoon on it.

<div data-info-box="hint" data-title="The Imperative Mood Convention">
Many teams write commit messages in the imperative ("Add feature", "Fix bug", "Update docs") rather than past tense ("Added feature"). This reads like an instruction: "Apply this commit and it will: Add feature." Neither style is wrong, but imperative is the convention in most professional projects. Pick one style and be consistent.
</div>

---

## Making More Commits — The Core Loop

Let's practice the full loop a few more times. This is the rhythm you'll repeat thousands of times.

### Second Commit — Add a New File

Create a new file. In your terminal (or editor):

**Linux / macOS:**
```bash
echo "Hello from my first web page!" > index.html
```

**Windows (Command Prompt):**
```cmd
echo Hello from my first web page! > index.html
```

Or create `index.html` in your editor with:
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
</body>
</html>
```

Now the loop:
```bash
git status
```
```
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html
```

```bash
git add index.html
git commit -m "Add basic index.html page"
```

### Third Commit — Edit an Existing File

Open `README.md` and add a line:
```markdown
# My First Repository

This is my first Git repository. I am learning version control!

## Files
- index.html — The main web page
```

```bash
git status
```
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md
```

Notice the wording: `modified` for an existing file, `new file` for a newly created one, `deleted` for a removed one. Git is specific about what changed.

```bash
git add README.md
git commit -m "Update README to list project files"
```

You now have three commits in your history.

---

## git log — Reading the Scroll

Now let's look at the history we've written:

**Linux / macOS / Windows:**
```bash
git log
```

Output:
```
commit c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2 (HEAD -> main)
Author: Your Name <your@email.com>
Date:   Mon May 19 10:30:00 2026 +0000

    Update README to list project files

commit b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1
Author: Your Name <your@email.com>
Date:   Mon May 19 10:25:00 2026 +0000

    Add basic index.html page

commit a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0
Author: Your Name <your@email.com>
Date:   Mon May 19 10:20:00 2026 +0000

    Initial commit: add README
```

The most recent commit is at the top. You can see:
- The full SHA hash (the long hex string)
- `HEAD -> main` on the latest commit — this means your current position and current branch both point here
- Your name and email (from your git config — this is why we set it up!)
- The date and time
- The commit message

Press `q` to exit the log viewer.

### git log Shortcuts

Full `git log` can get verbose. Here are useful variations:

```bash
git log --oneline
```
```
c3d4e5f Update README to list project files
b2c3d4e Add basic index.html page
a1b2c3d Initial commit: add README
```

Short and scannable — one line per commit.

```bash
git log --oneline --graph
```

Shows branches as an ASCII art graph (more useful once you have branches).

```bash
git log --oneline -5
```

Shows only the last 5 commits (replace 5 with any number).

---

## Staging Multiple Files and git add .

When you have many changed files to stage, typing them individually is tedious. You can stage all modified and new files at once:

**Linux / macOS / Windows:**
```bash
git add .
```

The `.` means "everything in the current directory and below."

<div data-info-box="warning" data-title="Be Careful with git add .">
`git add .` stages everything indiscriminately — including files you might not want committed, like `.env` files containing passwords, auto-generated files, or personal editor settings. Before using `git add .`, always run `git status` first so you know what you're about to stage. In Lesson 16, you'll learn about `.gitignore` to tell Git to always ignore certain files.
</div>

---

## Unstaging a File

What if you staged a file by mistake and want to un-stage it (without losing your changes)?

**Modern Git (2.23+):**
```bash
git restore --staged filename.txt
```

**Older Git syntax (still works):**
```bash
git reset HEAD filename.txt
```

Both commands move the file back to the working tree state (unstaged), but your changes to the file are preserved.

---

## Discarding Changes (Working Tree)

What if you've edited a file and want to throw away those changes and restore it to how it was at the last commit?

<div data-info-box="danger" data-title="This Is Destructive — Use With Care">
The following commands permanently delete your working tree changes. There is no undo. Only use them when you're sure you don't want those changes.
</div>

**Modern Git:**
```bash
git restore filename.txt
```

**Older Git syntax:**
```bash
git checkout -- filename.txt
```

This is one of the few Git operations that can't be undone. Use it carefully.

---

## Full Command Reference for This Lesson

| Command | What It Does |
|---------|-------------|
| `git init` | Initialize a new Git repository in the current folder |
| `git status` | Show the current state of the working tree and staging area |
| `git add <file>` | Stage a specific file |
| `git add .` | Stage all changes in the current directory |
| `git commit -m "message"` | Create a commit with the staged changes |
| `git log` | Show full commit history |
| `git log --oneline` | Show compact one-line commit history |
| `git restore --staged <file>` | Unstage a file (keep the changes) |
| `git restore <file>` | Discard working tree changes (destructive!) |

---

## Knowledge Check

<div data-quiz-group data-title="Git Fundamentals">

<div data-quiz-question="What command initializes a new Git repository in a folder?" data-correct="1" data-explanation="git init creates a new Git repository by creating a .git/ folder inside the current directory. This .git/ folder contains everything Git needs to track your project's history. You only run this once per project.">
<div data-quiz-option>git create</div>
<div data-quiz-option>git init</div>
<div data-quiz-option>git start</div>
<div data-quiz-option>git new</div>
</div>

<div data-quiz-question="After editing a file, what two commands do you need to save it to Git history?" data-correct="2" data-explanation="The correct workflow is: (1) git add to move the changes from the working tree to the staging area, then (2) git commit to save everything in the staging area as a permanent snapshot. git add alone doesn't save to history — you need both steps.">
<div data-quiz-option>git save and git push</div>
<div data-quiz-option>git track and git store</div>
<div data-quiz-option>git add and git commit</div>
<div data-quiz-option>git stage and git save</div>
</div>

<div data-quiz-question="What does 'untracked' mean in git status output?" data-correct="0" data-explanation="'Untracked' means Git sees the file exists in your working directory but has never been told to watch it. Git won't include untracked files in commits until you run git add on them at least once. After the first git add and commit, the file becomes 'tracked' and Git will notice all future changes to it automatically.">
<div data-quiz-option>Git knows the file exists but has never been told to track it</div>
<div data-quiz-option>The file has been deleted</div>
<div data-quiz-option>The file is damaged and can't be read</div>
<div data-quiz-option>The file is too large for Git to handle</div>
</div>

<div data-quiz-question="What does HEAD mean in git log output?" data-correct="3" data-explanation="HEAD is a special pointer that indicates your current position in the repository — specifically, which commit you're currently 'on'. 'HEAD -> main' means HEAD is pointing to the tip of the main branch. When you make a new commit, HEAD and the branch pointer both move forward to the new commit.">
<div data-quiz-option>The title of your most recent commit message</div>
<div data-quiz-option>The first commit ever made in the repository</div>
<div data-quiz-option>The author of the repository</div>
<div data-quiz-option>A pointer to your current position in the commit history</div>
</div>

<div data-quiz-question="You staged a file by mistake. What command un-stages it WITHOUT losing your changes?" data-correct="2" data-explanation="git restore --staged <file> moves the file back from the staging area to the working tree, keeping all your changes intact. It undoes the git add without touching the file content. This is safe and non-destructive. The dangerous command is git restore <file> (without --staged), which discards your working tree changes entirely.">
<div data-quiz-option>git unstage filename</div>
<div data-quiz-option>git undo filename</div>
<div data-quiz-option>git restore --staged filename</div>
<div data-quiz-option>git remove --staged filename</div>
</div>

</div>

---

## What's Next

You've completed the core Git loop. You know how to create a repository, stage changes, commit them, and read the history. These three commands — `add`, `commit`, `log` — are the backbone of everything Git.

In **Lesson 13**, you'll go deeper into reading and understanding your history: how to see exactly what changed in each commit, how to compare different versions of a file, and how to understand the staging area at a deeper level. You'll learn to read the scroll, not just add to it.

---

## A Prayer for Diligence

*Lord, the students who have completed this lesson have taken real action today. They haven't just read theory — they've typed real commands and created real history. That takes courage and follow-through.*

*As they practice the core loop — add, commit, log — may it become second nature. May the discipline of making frequent, clear commits become a professional habit that serves them well throughout their careers.*

*We pray for those who got stuck along the way — a command that didn't work, an error message that confused them. Give them persistence. Remind them that troubleshooting is not failure; it's the real classroom.*

*May each commit they make be a small act of faithfulness — a reflection of the diligence You call us to in all things.*

*In Jesus' name, Amen.*

---

> *"The heart of the discerning acquires knowledge, for the ears of the wise seek it out."*
> — Proverbs 18:15 (NIV)
