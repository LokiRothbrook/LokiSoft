---
title: "Lesson 14: Branching and Merging — Parallel Timelines"
date: 2026-05-19
author: LokiSoft Team
excerpt: Master Git branches — create parallel timelines to develop features safely, merge them back, and handle merge conflicts with confidence.
categories: shadcn-nextjs, Git, Intermediate
difficulty: 2
featured: false
coverImage: /cover-image.svg
---

# Lesson 14: Branching and Merging — Parallel Timelines

> *"Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up."*
> — Ecclesiastes 4:9-10 (NIV)

---

## Quest Briefing

This is where Git transforms from a useful backup tool into a genuine superpower. Branches let you work in parallel timelines — developing a new feature in isolation while your stable code stays untouched. When the feature is ready, you merge it back.

Professional developers use branches constantly. Every new feature, every bug fix, every experiment gets its own branch. This lesson will make that workflow feel completely natural.

By the end of this lesson you will:
- Create, switch between, and delete branches
- Understand what a branch actually is under the hood
- Merge branches together using both fast-forward and merge commits
- Identify and resolve merge conflicts confidently
- Know when to use `git checkout` vs the newer `git switch`

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 12 | Git Fundamentals — Your First Repository |
| Lesson 13 | Understanding Git History |

Have your `my-first-repo` practice repository from the previous lessons open in your terminal.

---

## What Is a Branch, Really?

Before you create your first branch, let's understand what it actually is — because Git's branches are brilliantly simple.

A **branch is just a pointer** — a lightweight label that points to a specific commit. When you create a branch, Git doesn't copy any files. It simply creates a new pointer at your current commit. That's all.

Here's the current state of your repo (from Lesson 12):

```
a1b2c3d ← b2c3d4e ← c3d4e5f
                         ↑
                        main
                         ↑
                        HEAD
```

When you create a new branch called `feature-about-page`:

```
a1b2c3d ← b2c3d4e ← c3d4e5f
                         ↑          ↑
                        main    feature-about-page
                                     ↑
                                    HEAD
```

Both `main` and `feature-about-page` point to the same commit. No files were copied. Git just added a new label.

As you make commits on `feature-about-page`, that pointer moves forward while `main` stays where it was:

```
                              ← d4e5f6g ← e5f6g7h
                             /               ↑
a1b2c3d ← b2c3d4e ← c3d4e5f          feature-about-page
                         ↑                   ↑
                        main                HEAD
```

Your `main` branch is completely untouched. You can switch back to it at any time and your code will look exactly as it did before.

<div data-info-box="info" data-title="Why Branches Are Cheap">
Because a branch is just a 41-byte pointer file (the SHA hash + a newline), creating a branch is essentially free. It takes milliseconds and uses almost no disk space — no matter how large your project is. This is why Git encourages branching liberally, unlike older version control systems where branches were expensive operations.
</div>

---

## Creating and Switching Branches

### The Modern Way: git switch (Git 2.23+)

In 2019, Git introduced dedicated commands for branch operations: `git switch` for changing branches and `git restore` for restoring files. These replaced the overloaded `git checkout` command, which tried to do too many things.

**Create a new branch and switch to it:**

**Linux / macOS / Windows:**
```bash
git switch -c feature-about-page
```

The `-c` flag means "create." This is the equivalent of doing `git branch feature-about-page` then `git switch feature-about-page` in two steps.

**Switch to an existing branch:**
```bash
git switch main
git switch feature-about-page
```

**See all branches:**
```bash
git branch
```

Output:
```
* feature-about-page
  main
```

The `*` marks the currently active branch.

### The Classic Way: git checkout

`git checkout` still works and you'll see it everywhere — in documentation, Stack Overflow answers, tutorials, and on teams using older Git versions. You should know both:

```bash
git checkout -b feature-about-page
```
(Create and switch — the `-b` flag means "branch")

```bash
git checkout main
```
(Switch to an existing branch)

<div data-info-box="hint" data-title="Which Should You Use?">
Use `git switch` for branch operations and `git restore` for file operations in your own work — they're clearer and less error-prone. But recognize `git checkout` when you see it in documentation or team code, because you'll encounter it constantly. Both work; `git switch` is just more explicit about its purpose.
</div>

---

## Working on a Branch

Let's do a real example. Make sure you're on `feature-about-page`:

```bash
git branch
```
(The `*` should be next to `feature-about-page`)

### Create a New File on the Branch

Create `about.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About Me</title>
</head>
<body>
    <h1>About Me</h1>
    <p>I am learning web development with Git!</p>
    <p><a href="index.html">Back to Home</a></p>
</body>
</html>
```

```bash
git add about.html
git commit -m "Add about page with basic content"
```

### Make Another Commit

Edit `about.html` to add more content:
```html
<body>
    <h1>About Me</h1>
    <p>I am learning web development with Git!</p>
    <ul>
        <li>JavaScript</li>
        <li>HTML &amp; CSS</li>
        <li>Next.js</li>
    </ul>
    <p><a href="index.html">Back to Home</a></p>
</body>
```

```bash
git add about.html
git commit -m "Add skills list to about page"
```

### Check the Log

```bash
git log --oneline --graph --all
```

```
* e5f6g7h (HEAD -> feature-about-page) Add skills list to about page
* d4e5f6g Add about page with basic content
* c3d4e5f (main) Update README to list project files
* b2c3d4e Add basic index.html page
* a1b2c3d Initial commit: add README
```

You can see your branch has moved forward while `main` stayed at `c3d4e5f`.

### Switch Back to Main

```bash
git switch main
```

Now open your project folder. `about.html` is **gone** — because it only exists on the `feature-about-page` branch. The `index.html` and `README.md` are exactly as they were before you created the branch.

This is branching working as intended. Switch back:

```bash
git switch feature-about-page
```

`about.html` is back. Git literally checks out the file state for each branch as you switch. The files on your disk change based on which branch you're on.

---

## Merging Branches

When your feature is ready, you merge it back into `main`.

### Step 1 — Switch to the Destination Branch

You merge **into** the branch you're currently on. So to merge `feature-about-page` into `main`, first switch to `main`:

```bash
git switch main
```

### Step 2 — Merge

```bash
git merge feature-about-page
```

Output:
```
Updating c3d4e5f..e5f6g7h
Fast-forward
 about.html | 14 +++++++++++++
 1 file changed, 14 insertions(+)
 create mode 100644 about.html
```

Notice: **Fast-forward**. This is one type of merge.

---

## Types of Merges

### Fast-Forward Merge

A fast-forward merge happens when the target branch (`main`) hasn't moved since the feature branch was created. Git can simply move the `main` pointer forward to the tip of the feature branch — no new commit is needed.

**Before:**
```
a1b2c3d ← b2c3d4e ← c3d4e5f          ← d4e5f6g ← e5f6g7h
                         ↑                               ↑
                        main                    feature-about-page
```

**After fast-forward merge:**
```
a1b2c3d ← b2c3d4e ← c3d4e5f ← d4e5f6g ← e5f6g7h
                                               ↑
                                              main
```

The history is perfectly linear. No merge commit. Clean and simple.

### True Merge (Three-Way Merge)

A true merge happens when both branches have commits that the other doesn't — they've diverged. Git creates a new **merge commit** that has two parents (one from each branch).

Let's create this scenario. First, make a change on `main`:

```bash
git switch main
```

Edit `index.html` — add a link to the about page:
```html
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page, tracked with Git.</p>
    <p><a href="about.html">About Me</a></p>
</body>
```

```bash
git add index.html
git commit -m "Add link to about page in index.html"
```

Now create and work on another branch:
```bash
git switch -c feature-contact-page
```

Create `contact.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact</title>
</head>
<body>
    <h1>Contact Me</h1>
    <p>Email: hello@example.com</p>
</body>
</html>
```

```bash
git add contact.html
git commit -m "Add contact page"
```

Now look at the graph:
```bash
git log --oneline --graph --all
```

```
* f6g7h8i (HEAD -> feature-contact-page) Add contact page
| * g7h8i9j (main) Add link to about page in index.html
|/  
* e5f6g7h Add skills list to about page
* d4e5f6g Add about page with basic content
* c3d4e5f Update README to list project files
...
```

The history has diverged — `main` and `feature-contact-page` have both moved since the branch was created.

Now merge:
```bash
git switch main
git merge feature-contact-page
```

Git creates a merge commit automatically:
```
Merge made by the 'ort' strategy.
 contact.html | 10 ++++++++++
 1 file changed, 10 insertions(+)
 create mode 100644 contact.html
```

The graph now looks like:
```
*   h8i9j0k (HEAD -> main) Merge branch 'feature-contact-page'
|\  
| * f6g7h8i (feature-contact-page) Add contact page
* | g7h8i9j Add link to about page in index.html
|/  
* e5f6g7h Add skills list to about page
...
```

The merge commit (`h8i9j0k`) has two parents — that's what the `|\` shape represents.

<div data-info-box="hint" data-title="--no-ff: Always Create a Merge Commit">
If you prefer to always create a merge commit even for fast-forward merges (to preserve branch history in the graph), use:

```bash
git merge --no-ff feature-about-page
```

Many teams require this for pull requests so the branch structure stays visible in history. Both approaches are valid — consistency matters more than which you choose.
</div>

---

## Deleting Branches

After merging, the branch isn't automatically deleted. Clean up merged branches:

**Linux / macOS / Windows:**
```bash
git branch -d feature-about-page
git branch -d feature-contact-page
```

The `-d` flag (lowercase) only deletes if the branch has been merged. If you want to force-delete an unmerged branch (discarding its commits):

```bash
git branch -D branch-name
```

<div data-info-box="warning" data-title="-D Discards Unmerged Commits">
`git branch -D` permanently discards any commits on the branch that weren't merged. Use it only when you're certain you want to throw away that work. If you accidentally delete a branch, you can sometimes recover it with `git reflog` (covered in a later lesson), but it's not guaranteed.
</div>

---

## Merge Conflicts — When Git Can't Decide

A merge conflict happens when both branches changed the **same line** in the same file. Git can't know which version is "right" — so it pauses and asks you to decide.

### Creating a Conflict

Let's deliberately create one:

```bash
git switch -c branch-a
```

Edit `README.md` — change the first line:
```markdown
# My Amazing First Repository
```

```bash
git add README.md
git commit -m "Update repo title on branch-a"
```

```bash
git switch main
git switch -c branch-b
```

Edit `README.md` — change the same first line differently:
```markdown
# My Incredible First Repository
```

```bash
git add README.md
git commit -m "Update repo title on branch-b"
```

Now merge `branch-a` into main:
```bash
git switch main
git merge branch-a
```

Fast-forward — no conflict (main was behind branch-a, no divergence). Now try to merge branch-b:
```bash
git merge branch-b
```

Output:
```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

### Reading the Conflict Markers

Open `README.md`. Git has inserted **conflict markers**:

```markdown
<<<<<<< HEAD
# My Amazing First Repository
=======
# My Incredible First Repository
>>>>>>> branch-b

This is my first Git repository. I am learning version control!
```

Reading the markers:
- `<<<<<<< HEAD` — start of your current branch's version
- `=======` — divider between the two versions
- `>>>>>>> branch-b` — end of the incoming branch's version

Everything between the markers is the conflicting content. The rest of the file is fine — only conflicted lines get these markers.

### Resolving the Conflict

Edit the file to the result you want. Remove all the conflict markers and keep (or combine) the content you want:

```markdown
# My First Repository — Amazing and Incredible

This is my first Git repository. I am learning version control!
```

Or maybe you just want one of the versions:
```markdown
# My Amazing First Repository

This is my first Git repository. I am learning version control!
```

Whatever you choose, **make sure you delete all three conflict markers** (`<<<<<<<`, `=======`, `>>>>>>>`). If any marker is left in the file, your code is broken.

### Complete the Merge

After resolving all conflicts:

```bash
git add README.md
git status
```

Git status shows:
```
On branch main
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)
```

```bash
git commit -m "Merge branch-b: keep 'Amazing' title variant"
```

The merge is complete. Clean up:
```bash
git branch -d branch-a
git branch -d branch-b
```

<div data-toggle-box data-title="Using VS Code or Cursor to Resolve Conflicts">

VS Code and Cursor have built-in merge conflict helpers. When you open a conflicted file, you'll see colorized conflict sections with buttons:

- **Accept Current Change** — keep HEAD's version
- **Accept Incoming Change** — keep the incoming branch's version
- **Accept Both Changes** — keep both (one after the other)
- **Compare Changes** — open a side-by-side diff view

These buttons automatically remove the conflict markers for you. This is much more convenient than manually editing the markers, especially for complex multi-file conflicts.

</div>

---

## Aborting a Merge

If you started a merge and realize you're not ready to deal with the conflicts right now:

```bash
git merge --abort
```

This returns your repository to the state before the merge attempt. Nothing is lost.

---

## Branch Strategy — How Professionals Work

Here's how most professional teams organize their branches:

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code. Never commit directly here. |
| `develop` | Integration branch where features merge before going to `main` |
| `feature/add-login` | Individual feature development |
| `fix/header-overlap` | Bug fix branches |
| `release/v2.1.0` | Release preparation branches |

The simplest strategy (and what most small teams use) is called **feature branch workflow**:
1. Create a branch for every feature or fix
2. Work on that branch, making as many commits as needed
3. Open a Pull Request (covered in Lesson 16) to merge into `main`
4. Someone reviews the code
5. It gets merged
6. The branch is deleted

You'll practice this complete workflow in Lesson 16.

---

## Full Command Reference

| Command | What It Does |
|---------|-------------|
| `git branch` | List all local branches |
| `git branch -a` | List all branches (local + remote) |
| `git switch -c branch-name` | Create and switch to a new branch |
| `git switch branch-name` | Switch to an existing branch |
| `git checkout -b branch-name` | Create and switch (classic syntax) |
| `git checkout branch-name` | Switch (classic syntax) |
| `git merge branch-name` | Merge the specified branch into the current branch |
| `git merge --no-ff branch-name` | Merge, always creating a merge commit |
| `git merge --abort` | Abort a merge in progress |
| `git branch -d branch-name` | Delete a merged branch |
| `git branch -D branch-name` | Force-delete any branch (even unmerged) |

---

## Knowledge Check

<div data-quiz-group data-title="Branching and Merging">

<div data-quiz-question="What is a branch in Git at the technical level?" data-correct="2" data-explanation="A branch is simply a lightweight pointer (a file containing a 40-character SHA hash) that points to a specific commit. This is why creating a branch is nearly instant and costs almost no disk space. When you make commits on a branch, the pointer moves forward to the new commit. The branch doesn't copy any files.">
<div data-quiz-option>A copy of the entire project folder</div>
<div data-quiz-option>A separate Git repository linked to the main one</div>
<div data-quiz-option>A lightweight pointer that points to a specific commit</div>
<div data-quiz-option>A backup of the project at a specific point in time</div>
</div>

<div data-quiz-question="What is a fast-forward merge?" data-correct="0" data-explanation="A fast-forward merge happens when the branch being merged into (e.g., main) has not received any new commits since the feature branch was created. Git can simply move the main pointer forward to the tip of the feature branch — no new merge commit is needed. The result is a perfectly linear history.">
<div data-quiz-option>A merge where the base branch hasn't changed, so Git just moves the pointer forward — no merge commit needed</div>
<div data-quiz-option>A merge that completes faster than usual because the branches are small</div>
<div data-quiz-option>A merge that skips the conflict-checking step</div>
<div data-quiz-option>A merge that only copies the most recent commit from the feature branch</div>
</div>

<div data-quiz-question="What command creates a new branch AND switches to it in one step (modern syntax)?" data-correct="3" data-explanation="git switch -c branch-name both creates the new branch and switches to it in one step. The -c flag stands for 'create'. The classic equivalent is git checkout -b branch-name. Both work; git switch is the modern, purpose-built command for branch operations.">
<div data-quiz-option>git branch -new branch-name</div>
<div data-quiz-option>git create branch-name</div>
<div data-quiz-option>git branch branch-name && git switch branch-name</div>
<div data-quiz-option>git switch -c branch-name</div>
</div>

<div data-quiz-question="During a merge conflict, what do the <<<<<<< HEAD markers mean?" data-correct="1" data-explanation="The conflict markers divide the conflicting content into two sections. Everything between <<<<<<< HEAD and ======= is from your current branch (HEAD). Everything between ======= and >>>>>>> branch-name is from the incoming branch being merged. You must choose which version to keep (or combine them), then delete ALL the conflict markers before staging and committing.">
<div data-quiz-option>The commit that caused the conflict was authored by the HEAD of the team</div>
<div data-quiz-option>The lines below are from your current branch (HEAD's version of the conflict)</div>
<div data-quiz-option>Git is suggesting you rebase instead of merging</div>
<div data-quiz-option>The conflict must be resolved by the HEAD developer on the team</div>
</div>

<div data-quiz-question="What should you do after resolving merge conflicts in a file?" data-correct="2" data-explanation="After manually editing the file to resolve conflicts (removing all conflict markers and deciding on the final content), you must: (1) git add the resolved file to mark it as resolved, and (2) git commit to complete the merge. The commit message is usually pre-filled with 'Merge branch...' — you can keep that or customize it.">
<div data-quiz-option>Run git merge --continue to automatically finish</div>
<div data-quiz-option>Delete the branch and start over</div>
<div data-quiz-option>Run git add on the resolved file, then git commit to complete the merge</div>
<div data-quiz-option>Run git resolve to finalize all conflicts at once</div>
</div>

</div>

---

## What's Next

You've mastered the local Git workflow — creating, working on, and merging branches. You can manage your code history with confidence.

In **Lesson 15**, you'll connect your local repositories to the internet. You'll create a GitHub account, push your local repository to the cloud, and learn the fundamental remote workflow: `git remote`, `git push`, `git pull`, and `git clone`. Your code will be backed up, shareable, and ready for collaboration.

The world is about to see your work.

---

## A Prayer for Collaboration

*Lord, branching and merging are, at their heart, about working together — keeping different streams of work organized and eventually bringing them into harmony. In a deeper sense, they mirror how You weave the threads of many lives into one story.*

*As these students learn to work with branches, may they also grow in the soft skills that make technical collaboration work: patience with teammates whose code conflicts with theirs, graciousness in reviewing others' work, and humility in receiving feedback.*

*May the teamwork they practice here — on code — shape how they approach every collaborative endeavor. Remind them that two are better than one, not just in productivity, but in perspective, creativity, and growth.*

*In Jesus' name, Amen.*

---

> *"Iron sharpens iron, and one person sharpens another."*
> — Proverbs 27:17 (ESV)
