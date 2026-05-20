---
title: "Lesson 17: Section Review Quiz — Git & GitHub"
date: 2026-05-19
author: LokiSoft Team
excerpt: Prove your mastery of Git and GitHub — 20 questions covering version control concepts, core commands, branching, remotes, Pull Requests, and .gitignore.
categories: shadcn-nextjs, Git, GitHub, Quiz
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 17: Section Review Quiz — Git & GitHub

> *"Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth."*
> — 2 Timothy 2:15 (NIV)

---

## Time to Prove Your Worth, Adventurer

You've walked through the full Historian's Scroll — version control concepts, Git installation and configuration, the core commit loop, reading history, branching and merging, remotes, GitHub, Pull Requests, Issues, and `.gitignore`.

Now it's time to see what you've retained. This quiz covers every major topic from Section 1. Don't rush — read each question carefully and think it through before answering.

**20 questions. No time limit. Learn from every answer.**

If you struggle on a question, the explanation will point you back to the lesson where that concept lives. There's no shame in revisiting — that's how mastery is built.

---

## Section 1 Review Quiz

<div data-quiz-group data-title="Part 1 — Version Control Concepts">

<div data-quiz-question="What problem does version control solve that copying project folders does not?" data-correct="2" data-explanation="Folder copies give you snapshots but no meaningful history: you don't know what changed between 'final' and 'final2', you can't see who changed what or why, you can't merge two people's changes together, and the folders pile up endlessly. Version control tracks every change with context (who, when, why), enables branching, and supports collaborative merging — none of which a folder copy does.">
<div data-quiz-option>It compresses files to save disk space</div>
<div data-quiz-option>It automatically uploads files to the cloud</div>
<div data-quiz-option>It records every change with context (who, when, why) and enables safe collaboration and branching</div>
<div data-quiz-option>It prevents anyone from editing the same file at the same time</div>
</div>

<div data-quiz-question="What does 'distributed' mean in the context of Git as a distributed version control system?" data-correct="1" data-explanation="In a distributed system, every developer's copy of the repository contains the complete history — not just the latest files. There is no single central server that everything depends on. If the server goes down or is destroyed, the full history survives in every developer's local copy. This contrasts with centralized systems like SVN, where the server holds the authoritative history and loss of the server is catastrophic.">
<div data-quiz-option>The project files are split across multiple folders on your computer</div>
<div data-quiz-option>Every copy of the repository contains the complete history — no single central point of failure</div>
<div data-quiz-option>Multiple developers must approve each commit before it is saved</div>
<div data-quiz-option>Commits are automatically distributed to all team members' machines in real time</div>
</div>

<div data-quiz-question="What is the staging area (index) in Git?" data-correct="3" data-explanation="The staging area is a preparation zone between your working files and your committed history. When you run git add, you move changes from the working tree into the staging area. When you run git commit, everything in the staging area becomes a permanent snapshot. This two-step process lets you control exactly which changes go into each commit, even if multiple unrelated things changed in your working tree.">
<div data-quiz-option>The GitHub website where you review your code before publishing</div>
<div data-quiz-option>A backup folder Git creates alongside your project</div>
<div data-quiz-option>The local copy of the repository on your machine</div>
<div data-quiz-option>A preparation zone where you select changes to include in your next commit</div>
</div>

<div data-quiz-question="What is HEAD in Git?" data-correct="0" data-explanation="HEAD is a special pointer that indicates your current position in the Git history — specifically, which commit (or branch tip) you're currently 'on'. When you make a new commit, HEAD and the current branch pointer both advance to the new commit. HEAD~1 means 'one step before HEAD', HEAD~2 means 'two steps before', and so on.">
<div data-quiz-option>A pointer to your current position in the commit history (usually the tip of the current branch)</div>
<div data-quiz-option>The first commit ever made in the repository</div>
<div data-quiz-option>The title of your most recent commit message</div>
<div data-quiz-option>The remote repository on GitHub</div>
</div>

<div data-quiz-question="Why is a Git branch so lightweight compared to copying a project folder?" data-correct="2" data-explanation="A Git branch is literally just a file containing a 40-character SHA hash — a pointer to a commit. Creating a branch costs almost nothing: no files are copied, no history is duplicated. Git just writes a tiny file pointing to the current commit. That's why creating and deleting branches is nearly instant, no matter how large the project is.">
<div data-quiz-option>Git compresses the branch files during creation</div>
<div data-quiz-option>Git only stores the differences between the branch and main</div>
<div data-quiz-option>A branch is just a pointer (a file with a SHA hash) — no files are copied when it's created</div>
<div data-quiz-option>Git stores branch files on GitHub's servers instead of your local machine</div>
</div>

</div>

<div data-quiz-group data-title="Part 2 — Core Git Commands">

<div data-quiz-question="What is the correct sequence to save a file change to Git history?" data-correct="1" data-explanation="The core Git workflow is always: edit the file → git add (move to staging area) → git commit (create a permanent snapshot from the staging area). git add alone does not save to history — it only stages. git commit alone commits nothing if the staging area is empty. Both steps are required in this order.">
<div data-quiz-option>git commit → git add → git push</div>
<div data-quiz-option>edit file → git add → git commit</div>
<div data-quiz-option>git stage → git save → git log</div>
<div data-quiz-option>git track → git commit → git sync</div>
</div>

<div data-quiz-question="What does git status show?" data-correct="3" data-explanation="git status shows the current state of your working tree and staging area. It tells you which branch you're on, which tracked files have been modified (not yet staged), which changes are staged and ready to commit, which files are untracked (new files Git doesn't know about yet), and whether you're ahead or behind the remote. It's the most frequently run Git command.">
<div data-quiz-option>The diff between your last two commits</div>
<div data-quiz-option>The list of all branches in the repository</div>
<div data-quiz-option>The full commit log with author and date information</div>
<div data-quiz-option>The current state of the working tree: staged changes, unstaged changes, and untracked files</div>
</div>

<div data-quiz-question="What does git diff --staged show?" data-correct="0" data-explanation="git diff --staged (also written as git diff --cached) compares the staging area to the last commit. It shows exactly what will be in your next commit — the changes you've staged with git add but not yet committed. Without --staged, git diff shows changes in the working tree that haven't been staged yet. These are two different comparisons.">
<div data-quiz-option>The changes currently staged for the next commit (staging area vs. last commit)</div>
<div data-quiz-option>The changes in the working tree that haven't been staged yet</div>
<div data-quiz-option>The difference between the local repo and the remote on GitHub</div>
<div data-quiz-option>The changes made in the most recent commit</div>
</div>

<div data-quiz-question="You want to see only commits from the last week, one line each. Which command works?" data-correct="2" data-explanation="Combining --oneline (compact one-line format) with --since (date filter) gives exactly one line per commit for the specified time range. --since accepts natural language ('1 week ago', '2 days ago') or exact dates ('2026-05-12'). This is a common way to review recent work quickly.">
<div data-quiz-option>git log --compact --week</div>
<div data-quiz-option>git history -7 --short</div>
<div data-quiz-option>git log --oneline --since="1 week ago"</div>
<div data-quiz-option>git show --recent --brief</div>
</div>

<div data-quiz-question="You staged a file by mistake. Which command removes it from staging WITHOUT discarding your changes?" data-correct="3" data-explanation="git restore --staged filename moves the file back from the staging area to the working tree while keeping all your edits intact. It's a safe, non-destructive operation. The dangerous counterpart is git restore filename (without --staged), which discards all your working-tree changes for that file — there's no undo for that.">
<div data-quiz-option>git unstage filename</div>
<div data-quiz-option>git reset --hard filename</div>
<div data-quiz-option>git restore filename</div>
<div data-quiz-option>git restore --staged filename</div>
</div>

</div>

<div data-quiz-group data-title="Part 3 — Branching and Merging">

<div data-quiz-question="What command creates a new branch called 'feature-login' AND switches to it, using modern Git syntax?" data-correct="1" data-explanation="git switch -c feature-login both creates the branch and switches to it in one step. The -c flag stands for 'create'. The classic equivalent is git checkout -b feature-login. Both work correctly; git switch is the modern, purpose-built command for branch switching, introduced in Git 2.23 to reduce confusion with git checkout's dual responsibilities.">
<div data-quiz-option>git branch -new feature-login</div>
<div data-quiz-option>git switch -c feature-login</div>
<div data-quiz-option>git create feature-login && git switch feature-login</div>
<div data-quiz-option>git checkout --new-branch feature-login</div>
</div>

<div data-quiz-question="When does a fast-forward merge occur?" data-correct="0" data-explanation="A fast-forward merge happens when the branch you're merging into (e.g., main) has no new commits since the feature branch was created — the histories are linear. Git can simply move the main pointer forward to the tip of the feature branch without creating a merge commit. If both branches have diverged (each has commits the other doesn't), a true merge commit is required instead.">
<div data-quiz-option>When the base branch (e.g., main) has no new commits since the feature branch was created — Git just moves the pointer forward</div>
<div data-quiz-option>When the merge completes in under one second</div>
<div data-quiz-option>When there are no merge conflicts in any file</div>
<div data-quiz-option>When both branches changed the same files</div>
</div>

<div data-quiz-question="During a merge conflict, what must you do before you can complete the merge?" data-correct="2" data-explanation="To resolve a merge conflict you must: (1) manually edit each conflicted file to decide what the final content should be, removing all three conflict markers (<<<<<<< HEAD, =======, and >>>>>>> branch-name); then (2) git add the resolved files to mark them as resolved; then (3) git commit to complete the merge. If you want to cancel the whole merge instead, use git merge --abort.">
<div data-quiz-option>Run git merge --force to override the conflict</div>
<div data-quiz-option>Delete the conflicted file and create it again from scratch</div>
<div data-quiz-option>Edit the conflicted files to remove all conflict markers, then git add and git commit</div>
<div data-quiz-option>Run git conflict --resolve to let Git decide automatically</div>
</div>

<div data-quiz-question="What is the safe way to delete a branch that has already been merged?" data-correct="3" data-explanation="git branch -d branch-name (lowercase -d) is the safe delete — it only succeeds if the branch has been fully merged into the current branch. If there are unmerged commits, Git refuses and warns you. The uppercase -D forces deletion regardless of merge status, permanently discarding any unmerged commits. Always prefer -d for merged branches.">
<div data-quiz-option>git branch --remove branch-name</div>
<div data-quiz-option>git delete branch-name</div>
<div data-quiz-option>git branch -D branch-name (force delete regardless of merge status)</div>
<div data-quiz-option>git branch -d branch-name (safe delete — only works if already merged)</div>
</div>

</div>

<div data-quiz-group data-title="Part 4 — Remotes and GitHub">

<div data-quiz-question="What does git remote add origin <url> do?" data-correct="1" data-explanation="git remote add registers a new remote repository under the name 'origin' at the specified URL. 'origin' is just the conventional name — you could name it anything, but origin is so universally used that it's effectively a standard. After running this command, 'origin' becomes a shorthand you can use in push, pull, and fetch commands instead of typing the full URL every time.">
<div data-quiz-option>Creates a new repository on GitHub at the specified URL</div>
<div data-quiz-option>Registers a remote repository named 'origin' at the given URL in your local config</div>
<div data-quiz-option>Downloads all files from the remote URL to your current folder</div>
<div data-quiz-option>Sets GitHub as the default code review platform for this project</div>
</div>

<div data-quiz-question="What is the difference between git fetch and git pull?" data-correct="3" data-explanation="git fetch downloads new commits and branch information from the remote, updating remote-tracking branches (like origin/main), but it does NOT change your working files or current branch. git pull runs git fetch followed by git merge — it both downloads and immediately integrates the remote changes. Fetching alone lets you inspect what's coming before merging.">
<div data-quiz-option>git fetch downloads everything; git pull only downloads recent changes</div>
<div data-quiz-option>git fetch works only with SSH; git pull works with HTTPS</div>
<div data-quiz-option>There is no functional difference — they are aliases for the same command</div>
<div data-quiz-option>git fetch downloads without merging; git pull downloads AND merges into your current branch</div>
</div>

<div data-quiz-question="You ran git push -u origin main. What does the -u flag do?" data-correct="0" data-explanation="The -u flag (--set-upstream) links your local branch to the specified remote branch, establishing an 'upstream' relationship. After this one-time setup, you can run just 'git push' or 'git pull' from this branch and Git knows where to send/receive — you don't have to type 'origin main' every time. Without -u, you'd need to specify the remote and branch name on every push and pull.">
<div data-quiz-option>Sets up a tracking relationship so future pushes/pulls only need 'git push' or 'git pull'</div>
<div data-quiz-option>Uploads your SSH key to GitHub as part of the push</div>
<div data-quiz-option>Forces the push even if the remote has newer commits</div>
<div data-quiz-option>Marks the push as urgent so GitHub prioritizes processing it</div>
</div>

<div data-quiz-question="What does git clone do?" data-correct="2" data-explanation="git clone copies the entire repository — all files, the complete commit history, and all branches — from a remote URL to a new folder on your local machine. It also automatically sets up 'origin' pointing to the source URL, so you can push and pull immediately. It's the standard way to get your own working copy of any remote repository.">
<div data-quiz-option>Creates an identical copy of a local repository in a different folder</div>
<div data-quiz-option>Downloads only the files changed in the most recent commit</div>
<div data-quiz-option>Downloads the entire repository (all files and history) from a URL and configures origin automatically</div>
<div data-quiz-option>Creates a fork of the repository under your GitHub account</div>
</div>

</div>

<div data-quiz-group data-title="Part 5 — GitHub Workflow and .gitignore">

<div data-quiz-question="What is the primary purpose of a Pull Request on GitHub?" data-correct="1" data-explanation="A Pull Request is a formal proposal to merge one branch into another. Its primary purpose is to enable code review — teammates examine changes line by line, ask questions, suggest improvements, and approve or request changes before the code reaches main. PRs also serve as documentation: months later, you can see exactly what changed, why, and who approved it.">
<div data-quiz-option>To request that a teammate pull your code to their local machine</div>
<div data-quiz-option>To formally propose changes and trigger a code review before merging into another branch</div>
<div data-quiz-option>To merge two remote repositories together on GitHub's servers</div>
<div data-quiz-option>To submit code changes to the repository owner for payment</div>
</div>

<div data-quiz-question="Which .gitignore entry correctly ignores ALL files with a .log extension?" data-correct="3" data-explanation="The *.log pattern uses a wildcard (*) to match any filename ending in .log, regardless of what comes before the extension. log/ would only ignore a folder named 'log'. .log (without *) would only ignore a file literally named '.log'. *.log* would also match files containing .log in the middle of the extension.">
<div data-quiz-option>log/</div>
<div data-quiz-option>.log</div>
<div data-quiz-option>ignore *.log</div>
<div data-quiz-option>*.log</div>
</div>

<div data-quiz-question="Why must .env files always be in .gitignore for any project pushed to GitHub?" data-correct="0" data-explanation=".env files typically contain API keys, database passwords, and other secrets. If pushed to a public GitHub repository, these secrets are exposed instantly — automated bots scan all new GitHub commits for exposed credentials within seconds of a push. Compromised secrets must be immediately revoked and regenerated. The .gitignore file prevents this by ensuring .env files are never staged or committed in the first place.">
<div data-quiz-option>They contain API keys and secrets that would be exposed publicly and can be scraped by bots within seconds of a push</div>
<div data-quiz-option>GitHub's servers can't process .env file formats</div>
<div data-quiz-option>They are too large for GitHub's file size limits</div>
<div data-quiz-option>They contain local paths that would cause errors on other developers' machines</div>
</div>

<div data-quiz-question="A file was accidentally committed to Git. You added it to .gitignore, but Git is still tracking it. What do you need to do?" data-correct="2" data-explanation=".gitignore only prevents untracked files from being added — it has no effect on files already in Git's history. To stop tracking a file that was already committed, you must run 'git rm --cached filename' to remove it from the index (without deleting it from your filesystem), then commit that removal. After this commit, the file is untracked and .gitignore will prevent it from being re-added.">
<div data-quiz-option>Delete the file from your computer and then run git add .gitignore</div>
<div data-quiz-option>Nothing — .gitignore automatically un-tracks previously committed files</div>
<div data-quiz-option>Run git rm --cached filename and commit — this removes tracking without deleting the local file</div>
<div data-quiz-option>Run git ignore --force filename to override the tracking</div>
</div>

<div data-quiz-question="What is the 'squash and merge' option when merging a Pull Request?" data-correct="1" data-explanation="Squash and merge combines all commits from the feature branch into a single new commit on the target branch. This is useful when a feature branch has many small, intermediate 'WIP' commits that would clutter the main branch history. The result is one clean, focused commit per feature on main — much easier to read in git log than dozens of micro-commits from the development process.">
<div data-quiz-option>Merges the PR and then immediately deletes the source branch on GitHub</div>
<div data-quiz-option>Combines all commits from the feature branch into a single commit on the target branch for a cleaner history</div>
<div data-quiz-option>Compresses the changed files before adding them to the target branch</div>
<div data-quiz-option>Merges without creating any commit — just updates the file contents silently</div>
</div>

</div>

<div data-quiz-score-anchor=""></div>

---

## How Did You Do?

**18–20 correct** — The Archivist Achievement is yours. You have a deep, solid understanding of Git and GitHub. Move forward with confidence into HTML.

**14–17 correct** — Strong work. You know the essentials. Review the questions you missed, re-read the relevant lessons for 15 minutes, then move on — you're ready.

**10–13 correct** — A good start, but the foundations need reinforcing. Spend some time with the lessons listed below before moving forward. The concepts you're shaky on will appear constantly in future sections.

**Under 10** — Don't be discouraged — this material is genuinely new. Go back to Lesson 12 and work through the hands-on exercises again. Actually typing the commands is what builds the understanding; reading alone isn't enough.

### Lessons to Review if You Struggled

| Questions | Topic | Lesson to Re-Read |
|-----------|-------|------------------|
| 1–5 (concepts) | Version control fundamentals | [Lesson 10](/blog/10-what-is-version-control) |
| 6–10 (commands) | Core Git commands | [Lesson 12](/blog/12-git-fundamentals), [Lesson 13](/blog/13-understanding-git-history) |
| 11–14 (branching) | Branches and merging | [Lesson 14](/blog/14-branching-and-merging) |
| 15–18 (remotes) | GitHub and remotes | [Lesson 15](/blog/15-remote-repositories-and-github) |
| 19–20 (workflow) | PRs, issues, .gitignore | [Lesson 16](/blog/16-pull-requests-issues-and-gitignore) |

---

## What's Next

You've completed **Section 1: The Historian's Scroll**. From here, the course shifts from tooling to building.

**Section 2 — The Skeleton of the Web: HTML** begins in Lesson 18. You'll write your first HTML file, understand how browsers parse documents, and start building the structure that every web page is built on. By the end of Section 2, you'll have built and deployed a real web page to the internet.

The adventure is just getting started.

---

## A Prayer for Testing and Growth

*Lord, testing is uncomfortable. When we don't know an answer, it's humbling. But You use discomfort to grow us — and the gaps we discover in a quiz are far less costly than the gaps we discover in production.*

*Thank You for the opportunity to learn and improve. For those who scored well, keep them humble — there is always more to learn. For those who struggled, give them the perseverance to go back and dig deeper. Neither group should be defined by a score.*

*May the discipline these students build — learning from mistakes, reviewing foundational material, practicing the fundamentals — be a pattern they carry through their entire careers.*

*In Jesus' name, Amen.*

---

> *"Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance."*
> — James 1:2-3 (NIV)
