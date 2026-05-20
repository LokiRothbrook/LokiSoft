---
title: "Lesson 15: Remote Repositories and GitHub — Sharing Your Work with the World"
date: 2026-05-19
author: LokiSoft Team
excerpt: Connect your local Git repositories to GitHub, push your code to the cloud, pull down changes, clone other projects, and set up SSH keys for seamless authentication.
categories: shadcn-nextjs, Git, GitHub, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 15: Remote Repositories and GitHub — Sharing Your Work with the World

> *"Go into all the world and proclaim the good news to the whole creation."*
> — Mark 16:15 (NRSV)

---

## Quest Briefing

Until now, your Git history has lived entirely on your computer. That's powerful — but the real magic of version control is what happens when your code reaches the world. GitHub is where your code gets backed up, shared with teammates, discovered by employers, and contributed to open-source projects.

This is the lesson where your local solo workflow connects to the global web of developers.

By the end of this lesson you will:
- Have a GitHub account set up and ready
- Understand what a remote repository is
- Push your local repository to GitHub for the first time
- Pull down changes from a remote
- Clone an existing GitHub repository to your machine
- Set up SSH keys so you never need to type a password again

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 12 | Git Fundamentals — Your First Repository |
| Lesson 14 | Branching and Merging |

Have your `my-first-repo` practice repository from the previous lessons ready.

---

## Step 1 — Create a GitHub Account

If you don't have one already:

1. Go to **github.com**
2. Click **Sign up**
3. Choose a username — this will be public and on your developer profile forever. Keep it professional: your name, initials, or a professional handle works well. Avoid handles with numbers, underscores, or jokes you'll regret.
4. Enter the same email address you configured in `git config --global user.email` (Lesson 11)
5. Complete the verification steps and confirm your email

<div data-info-box="hint" data-title="Your GitHub Username Is Your Developer Brand">
Employers, recruiters, and collaborators will see your GitHub username. Many developers use their GitHub profile as a portfolio and resume supplement. Choose a username you'd be comfortable putting on a job application. You can change it later, but all your old links will break.
</div>

### Explore GitHub While You're There

Before moving on, take 5 minutes to explore:
- Your profile page (github.com/your-username)
- The **Explore** tab — trending repositories and topics
- Search for a project you use, like `vercel/next.js` or `shadcn-ui/ui`, and look at its Issues and Pull Requests

This is the open-source ecosystem you're joining.

---

## What Is a Remote?

A **remote** is a version of your repository stored on another computer — in this case, GitHub's servers. The remote has a name (by convention, the primary remote is called `origin`) and a URL pointing to where it lives.

Your local repository and the remote are separate copies. Changes don't sync automatically — you explicitly **push** to send your commits to the remote, and **pull** to receive commits from it.

```
┌─────────────────┐         push          ┌─────────────────┐
│   Your Local    │  ───────────────────→  │  GitHub Remote  │
│   Repository    │                        │   (origin)      │
│                 │  ←───────────────────  │                 │
└─────────────────┘         pull           └─────────────────┘
```

This separation is deliberate. It means you can work offline, make dozens of commits, then push them all at once. You're always in control of when your work is shared.

---

## Step 2 — Set Up SSH Keys (Recommended)

When you push to or pull from GitHub, you need to prove your identity. There are two methods:
1. **HTTPS** — uses your GitHub username and a Personal Access Token (PAT) as a password
2. **SSH** — uses a cryptographic key pair: a private key on your computer and a public key on GitHub

SSH is more convenient for daily use because you authenticate once (when you unlock your private key) rather than entering credentials on every push. Let's set it up.

### Check for Existing SSH Keys

**Linux / macOS:**
```bash
ls -la ~/.ssh
```

**Windows (PowerShell):**
```powershell
ls $HOME\.ssh
```

If you see files named `id_ed25519` and `id_ed25519.pub` (or `id_rsa` and `id_rsa.pub`), you already have keys. Skip to "Add Your Public Key to GitHub" below.

### Generate a New SSH Key

**Linux / macOS:**
```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

**Windows (PowerShell or Git Bash):**
```powershell
ssh-keygen -t ed25519 -C "your@email.com"
```

When prompted:
- **"Enter a file in which to save the key"** — Press Enter to accept the default location (`~/.ssh/id_ed25519`)
- **"Enter passphrase"** — You can set a passphrase for extra security (recommended) or press Enter twice to skip. With a passphrase, you'll be asked for it once per session when the key is loaded.

<div data-info-box="info" data-title="ed25519 vs RSA">
ed25519 is a modern elliptic-curve algorithm that generates shorter, faster, and more secure keys than the older RSA algorithm. If you have an old RSA key and it's working fine, you don't need to replace it — but for new keys, ed25519 is the current best practice.
</div>

### Add Your SSH Key to the SSH Agent

The SSH agent manages your keys in memory so you don't retype the passphrase constantly.

**Linux / macOS:**
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**Windows (PowerShell — run as Administrator once to enable the service):**
```powershell
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
ssh-add $HOME\.ssh\id_ed25519
```

**Windows (Git Bash):**
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Copy Your Public Key

**Linux:**
```bash
cat ~/.ssh/id_ed25519.pub
```
Select and copy the output.

**macOS:**
```bash
pbcopy < ~/.ssh/id_ed25519.pub
```
(Copies directly to clipboard)

**Windows (PowerShell):**
```powershell
Get-Content $HOME\.ssh\id_ed25519.pub | clip
```

**Windows (Git Bash):**
```bash
clip < ~/.ssh/id_ed25519.pub
```

### Add Your Public Key to GitHub

1. Go to **github.com → Settings** (click your avatar, top right)
2. Click **SSH and GPG keys** in the left sidebar
3. Click **New SSH key**
4. Give it a title (e.g., "My MacBook", "Work PC", "Home Linux")
5. Paste your public key into the **Key** field
6. Click **Add SSH key**

### Test the Connection

```bash
ssh -T git@github.com
```

You should see:
```
Hi your-username! You've successfully authenticated, but GitHub does not provide shell access.
```

That message ("does not provide shell access") is normal — you're not trying to log in to a shell. The important part is "successfully authenticated."

<div data-toggle-box data-title="What If I Don't Want to Set Up SSH? (HTTPS Method)">

HTTPS works fine and is simpler to set up initially. The tradeoff is that you'll need a **Personal Access Token** (PAT) instead of your password (GitHub no longer accepts plain passwords for Git operations).

**To create a PAT:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token**
3. Give it a name, set an expiration, and check the **repo** scope
4. Copy the token — it's shown only once

When Git asks for a password during push/pull, use this token instead. You can also configure Git to remember it with a **credential manager**:

**macOS (uses the Keychain automatically):**
```bash
git config --global credential.helper osxkeychain
```

**Windows (usually auto-configured with Git for Windows):**
```cmd
git config --global credential.helper manager
```

**Linux:**
```bash
git config --global credential.helper cache
```
(Caches for 15 minutes; use `--timeout 3600` for 1 hour)

For long-term convenience, SSH is the better choice — but HTTPS with a credential manager works well too.

</div>

---

## Step 3 — Create a Repository on GitHub

1. Click the **+** icon in the top-right of GitHub and select **New repository**
2. Fill in:
   - **Repository name**: `my-first-repo` (match your local folder name)
   - **Description**: "My first Git repository — practicing version control"
   - **Public or Private**: Public for now (employers can see public repos; private repos are hidden)
   - **Do NOT** check "Add a README" or any other initialization options — your local repo already has files
3. Click **Create repository**

GitHub shows you a page with instructions. Find the section **"…or push an existing repository from the command line"** — that's exactly what you need.

---

## Step 4 — Connect Your Local Repo to GitHub

In your terminal, inside `my-first-repo`:

**Using SSH (recommended):**
```bash
git remote add origin git@github.com:your-username/my-first-repo.git
```

**Using HTTPS:**
```bash
git remote add origin https://github.com/your-username/my-first-repo.git
```

`git remote add` takes two arguments:
1. The name for this remote (`origin` is the convention for the primary remote)
2. The URL of the remote repository

Verify it was added:
```bash
git remote -v
```

Output:
```
origin  git@github.com:your-username/my-first-repo.git (fetch)
origin  git@github.com:your-username/my-first-repo.git (push)
```

You see two lines because Git tracks separate URLs for fetching (downloading) and pushing (uploading). They're usually the same URL.

---

## Step 5 — Push Your Local Repository

Send your local commits to GitHub:

**Linux / macOS / Windows:**
```bash
git push -u origin main
```

The `-u` flag sets `origin main` as the **upstream** (the default remote + branch for this branch). After this first push, you can just type `git push` and Git knows where to send it.

Output:
```
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (12/12), 1.05 KiB | 1.05 MiB/s, done.
Total 12 (delta 1), reused 0 (delta 0), pack-reused 0
To github.com:your-username/my-first-repo.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

Now go to `github.com/your-username/my-first-repo` in your browser. Your files and commit history are there.

<div data-info-box="success" data-title="Your Code Is Now on the Internet">
Refresh the GitHub page and you'll see your README.md rendered, your files listed, and your commit history accessible. Anyone with the URL can see your project. This is the foundation of everything that follows — sharing code, collaborating, and building your public portfolio.
</div>

---

## The Full Remote Workflow

Now that your repo is connected, here's the daily workflow with a remote:

### Making Changes and Pushing

```bash
# Edit files...

git add .
git commit -m "Describe what you changed"
git push
```

After the first push with `-u`, you only need `git push`. Git knows the upstream.

### Pulling Down Changes

If someone else (or you, from another computer) made commits to the remote, you need to pull them down:

```bash
git pull
```

`git pull` is actually two commands in one:
1. `git fetch` — downloads new commits from the remote without changing your working files
2. `git merge` — merges the downloaded commits into your current branch

You can separate these steps if you want to review what's coming before merging:
```bash
git fetch origin
git log --oneline HEAD..origin/main
git merge origin/main
```

<div data-info-box="hint" data-title="Always Pull Before You Push on Shared Repos">
On a team, before you start working each day, run `git pull`. This ensures you have the latest changes from teammates before you build on top of them. If you push without pulling first and the remote has new commits, Git will reject your push and ask you to merge the remote changes first.
</div>

---

## git clone — Downloading Someone Else's Repository

`git clone` downloads an entire repository (including its full history) from a remote URL to your computer.

```bash
git clone git@github.com:vercel/next.js.git
```

```bash
git clone https://github.com/some-user/some-repo.git
```

This creates a folder named after the repository (`next.js` or `some-repo`) and sets up `origin` automatically pointing to the source URL.

You'll use `git clone` constantly throughout this course — every time we start a new project that has a starter template, or any time you want to explore another developer's code.

### Clone to a Specific Folder Name

```bash
git clone git@github.com:user/repo.git my-custom-folder-name
```

### Clone Only a Specific Branch

```bash
git clone --branch develop git@github.com:user/repo.git
```

---

## Understanding Remote-Tracking Branches

When you push or pull, Git maintains **remote-tracking branches** — local references that track the state of the remote's branches. These look like `origin/main`, `origin/develop`, etc.

```bash
git branch -a
```

Output:
```
* main
  remotes/origin/main
```

`remotes/origin/main` is your local snapshot of what `main` looks like on the remote. It updates whenever you `git fetch` or `git pull`.

```bash
git log --oneline --graph --all
```

After a push and some local commits, you might see:
```
* h8i9j0k (HEAD -> main) My latest local commit
* g7h8i9j (origin/main) Last commit that was pushed
* ...
```

The `origin/main` label shows how far ahead your local branch is compared to the remote.

---

## Other Useful Remote Commands

| Command | What It Does |
|---------|-------------|
| `git remote -v` | List all remotes with their URLs |
| `git remote add <name> <url>` | Add a new remote |
| `git remote remove <name>` | Remove a remote |
| `git remote rename <old> <new>` | Rename a remote |
| `git fetch` | Download changes without merging |
| `git fetch --all` | Download from all remotes |
| `git push origin <branch>` | Push a specific branch |
| `git push --all` | Push all branches |
| `git pull --rebase` | Pull, then replay your commits on top (cleaner history) |

<div data-toggle-box data-title="git pull --rebase vs git pull (merge)">

When you pull and there are both local and remote commits, Git has to combine them. There are two ways:

**Default (`git pull`)**: Creates a merge commit. Your history shows the divergence and convergence:
```
*   Merge branch 'main' of github.com:...
|\  
| * Remote commit
* | Your local commit
|/  
* Shared base
```

**`git pull --rebase`**: Replays your local commits on top of the remote commits. History stays linear:
```
* Your local commit (replayed)
* Remote commit
* Shared base
```

Rebase produces cleaner, linear history. Many teams use it as the default. You can set it globally:
```bash
git config --global pull.rebase true
```

We'll cover rebasing in more depth later. For now, either approach works fine — the default merge is more beginner-friendly because it's explicit about what happened.

</div>

---

## Pushing a Branch to GitHub

When you create a branch locally and want to push it:

```bash
git switch -c feature-new-thing
# ... make commits ...
git push -u origin feature-new-thing
```

The `-u` sets the upstream for this branch too. After that, `git push` from this branch sends to `origin/feature-new-thing`.

To push to a differently-named remote branch (uncommon but possible):
```bash
git push origin local-branch-name:remote-branch-name
```

---

## Knowledge Check

<div data-quiz-group data-title="Remote Repositories and GitHub">

<div data-quiz-question="What does 'origin' refer to in Git?" data-correct="2" data-explanation="'origin' is the conventional name given to the primary remote repository — the one you cloned from or added with git remote add. It's just a name (you could call it anything), but origin is so standard that virtually every Git tutorial and team uses it. When you run git push or git pull without specifying a remote, Git uses origin by default.">
<div data-quiz-option>The first commit ever made in the repository</div>
<div data-quiz-option>The original branch before any changes were made</div>
<div data-quiz-option>The conventional name for the primary remote repository (usually on GitHub)</div>
<div data-quiz-option>The author who created the repository</div>
</div>

<div data-quiz-question="What is the difference between git fetch and git pull?" data-correct="1" data-explanation="git fetch downloads commits from the remote but does NOT merge them into your current branch. Your working files are unchanged — it just updates your remote-tracking branches (like origin/main). git pull is git fetch followed immediately by git merge, so it both downloads and integrates the remote changes. Fetching first lets you review what's coming before merging.">
<div data-quiz-option>git fetch downloads only new files; git pull downloads all files</div>
<div data-quiz-option>git fetch downloads without merging; git pull downloads and merges into your current branch</div>
<div data-quiz-option>git fetch is faster but less safe than git pull</div>
<div data-quiz-option>git fetch only works with SSH; git pull works with both SSH and HTTPS</div>
</div>

<div data-quiz-question="Why do you use the -u flag on the first git push?" data-correct="3" data-explanation="The -u flag (short for --set-upstream) tells Git to remember that this local branch tracks the specified remote branch. After running git push -u origin main once, subsequent pushes from the main branch can use just 'git push' — Git knows where to send the commits. Without -u, you'd have to type 'git push origin main' every time.">
<div data-quiz-option>To force push even if there are conflicts</div>
<div data-quiz-option>To upload all branches at once</div>
<div data-quiz-option>To make the push faster by skipping compression</div>
<div data-quiz-option>To set the upstream so future pushes only need 'git push'</div>
</div>

<div data-quiz-question="What does git clone do?" data-correct="0" data-explanation="git clone downloads the entire repository — all files, all commit history, all branches — from a remote URL and creates a local copy on your computer. It also automatically sets up 'origin' pointing to the URL you cloned from, so you can push and pull immediately. It's how you get your own working copy of any remote repository.">
<div data-quiz-option>Downloads an entire repository from a URL, creating a full local copy with all history</div>
<div data-quiz-option>Creates a copy of one specific commit without any history</div>
<div data-quiz-option>Duplicates a local repository to a new folder</div>
<div data-quiz-option>Downloads only the files changed in the last commit</div>
</div>

<div data-quiz-question="What is an SSH key and why is it recommended over HTTPS with a password?" data-correct="2" data-explanation="An SSH key is a cryptographic key pair: a private key (stored on your computer, never shared) and a public key (uploaded to GitHub). When you connect, GitHub verifies you hold the private key matching the public key on file. It's recommended because once set up, you never need to type a password or token — authentication is automatic and more secure than password-based methods.">
<div data-quiz-option>A physical USB security key that you plug into your computer</div>
<div data-quiz-option>A long password that GitHub assigns to your account</div>
<div data-quiz-option>A cryptographic key pair that authenticates you automatically without passwords</div>
<div data-quiz-option>An encrypted backup of your repository stored on GitHub's servers</div>
</div>

</div>

---

## What's Next

Your code is now on the internet. In **Lesson 16**, you'll learn the professional GitHub workflow: creating Pull Requests for code review, opening Issues to track bugs and features, and writing `.gitignore` files to keep sensitive files and clutter out of your repository. You'll also see GitHub Desktop as a visual alternative for those who prefer a GUI.

The community awaits.

---

## A Prayer for Open Doors

*Lord, these students have just opened a door to the world. Their code is no longer hidden on a local machine — it's out there, accessible, contributing to the great collaborative tapestry of the internet.*

*Guard them in this openness. Help them be thoughtful about what they share publicly. Give them the courage to put their work out there, even when it's imperfect, because all skill is built in public, through the feedback of others.*

*And when they discover the open-source community — millions of developers giving their work freely to the world — may they feel the echo of a deeper generosity. May they one day contribute back, sharing what they've received.*

*In Jesus' name, Amen.*

---

> *"Let your light shine before others, that they may see your good deeds and glorify your Father in heaven."*
> — Matthew 5:16 (NIV)
