---
title: "Lesson 11: Installing and Configuring Git — Forging Your Historian's Quill"
date: 2026-05-19
author: LokiSoft Team
excerpt: Install Git on Windows, macOS, or Linux and configure your identity so every commit you make is permanently signed with your name.
categories: shadcn-nextjs, Git, Beginner
difficulty: 1
featured: false
coverImage: /cover-image.svg
---

# Lesson 11: Installing and Configuring Git — Forging Your Historian's Quill

> *"Commit to the Lord whatever you do, and he will establish your plans."*
> — Proverbs 16:3 (NIV)

---

## Quest Briefing

Before the historian can record any scrolls, they need a quill. That's exactly what this lesson is: getting Git installed and configured on your machine so you're ready to write your first piece of history.

By the end of this lesson you will have:
- Git installed and working on your operating system
- Your name and email configured globally (so every commit is signed by you)
- A basic understanding of how to check your Git version and configuration
- Your default branch name set to `main`

This is a short, practical lesson. Let's get your tools ready.

---

## Prerequisites

| Lesson | Topic |
|--------|-------|
| Lesson 5 | The Terminal — Talking to Your Computer |
| Lesson 10 | What is Version Control? |

You'll need your terminal open and ready. If you're not comfortable with basic terminal navigation, review Lesson 5 first.

---

## Step 1 — Check If Git Is Already Installed

Before installing anything, check whether Git is already on your machine. Open your terminal and run:

**Linux / macOS:**
```bash
git --version
```

**Windows (Command Prompt or PowerShell):**
```cmd
git --version
```

If you see something like `git version 2.44.0`, Git is already installed. You can skip ahead to Step 3 (Configuration). If you get a "command not found" error, proceed to Step 2.

<div data-info-box="hint" data-title="macOS Users — Git May Already Be There">
If you're on macOS, Apple installs a version of Git as part of the Xcode Command Line Tools. Running `git --version` for the first time might trigger a prompt asking you to install Xcode Command Line Tools. You can either accept that prompt or use Homebrew for a more up-to-date version (instructions below).
</div>

---

## Step 2 — Installing Git

Choose your operating system below:

---

### Installing on Linux

Most Linux distributions include Git in their package manager. Use the command for your distro:

**Ubuntu / Debian / Linux Mint (apt):**
```bash
sudo apt update
sudo apt install git
```

**Fedora / RHEL / CentOS (dnf):**
```bash
sudo dnf install git
```

**Arch Linux (pacman):**
```bash
sudo pacman -S git
```

**openSUSE (zypper):**
```bash
sudo zypper install git
```

After installation, verify it worked:
```bash
git --version
```

You should see a version number. Linux users, you're done with Step 2 — move to Step 3.

---

### Installing on macOS

You have two options. We recommend Option A (Homebrew) for the most up-to-date version.

**Option A — Homebrew (Recommended):**

If you have Homebrew installed (from Lesson 6's Node.js setup), just run:
```bash
brew install git
```

Then verify:
```bash
git --version
```

**Option B — Xcode Command Line Tools:**

If you don't have Homebrew, run this to trigger Apple's built-in installer:
```bash
xcode-select --install
```

A dialog box will appear asking you to install the Command Line Developer Tools. Click **Install**. This takes a few minutes. Once done:
```bash
git --version
```

<div data-toggle-box data-title="Why Homebrew Is Better Than the Apple Version">

Apple ships a version of Git with macOS, but it's often outdated. For example, macOS Ventura shipped with Git 2.39, while Homebrew often has 2.44+ within days of release.

The newer the Git version, the more features and bug fixes you get. For learning purposes either works fine, but if you're doing professional work, Homebrew keeps Git current automatically with `brew upgrade git`.

</div>

---

### Installing on Windows

You have two options on Windows. Option A (Git for Windows) is the classic installer; Option B (winget) uses Windows' built-in package manager.

**Option A — Git for Windows (Recommended for Beginners):**

1. Go to [git-scm.com](https://git-scm.com) and click **Download for Windows**
2. Run the downloaded installer (`.exe` file)
3. Most defaults are fine. **Pay attention to these specific screens:**
   - **Default editor**: Change from Vim to Visual Studio Code (or Cursor) if you prefer
   - **Default branch name**: Select **"Override the default branch name for new repositories"** and type `main`
   - **PATH environment**: Keep the recommended option: "Git from the command line and also from 3rd-party software"
   - **Line ending conversions**: Keep "Checkout Windows-style, commit Unix-style line endings"
4. Complete the installation
5. Open **Git Bash** (installed with Git for Windows) or a new Command Prompt / PowerShell:

```cmd
git --version
```

**Option B — winget (Windows Package Manager):**

If you prefer using the command line, open PowerShell as Administrator and run:
```powershell
winget install --id Git.Git -e --source winget
```

After installation, close and reopen your terminal, then verify:
```powershell
git --version
```

<div data-info-box="info" data-title="Windows Terminal Recommendation">
On Windows, you'll have several terminal options after installing Git: Command Prompt, PowerShell, and Git Bash (which comes with Git for Windows). Throughout this course, any of them work for Git commands. Git Bash gives you a Unix-like experience that matches the Linux/macOS examples more closely.
</div>

---

## Step 3 — Configure Your Identity

This is the most important configuration step and it's easy to overlook. Before you make any commits, you must tell Git your name and email address. These get permanently embedded in every commit you create — they're how your teammates (and GitHub) know who made each change.

Run these two commands, replacing the example values with your own:

**Linux / macOS:**
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your@email.com"
```

**Windows (Command Prompt):**
```cmd
git config --global user.name "Your Full Name"
git config --global user.email "your@email.com"
```

**Windows (PowerShell):**
```powershell
git config --global user.name "Your Full Name"
git config --global user.email "your@email.com"
```

<div data-info-box="warning" data-title="Use the Email You'll Use for GitHub">
In Lesson 15, you'll create a GitHub account. Use the same email address here that you'll use for GitHub. This allows GitHub to properly link your commits to your account and show your contribution history correctly on your profile.
</div>

The `--global` flag means this setting applies to every Git repository on your machine. You can override it per-repository later (useful if you have work and personal projects with different emails), but global is the right default for now.

---

## Step 4 — Set the Default Branch Name

Modern Git uses `main` as the default branch name (it used to be `master`). GitHub changed to `main` in 2020, and most of the industry followed. Let's make sure your Git matches:

**Linux / macOS:**
```bash
git config --global init.defaultBranch main
```

**Windows (Command Prompt):**
```cmd
git config --global init.defaultBranch main
```

**Windows (PowerShell):**
```powershell
git config --global init.defaultBranch main
```

This means every new repository you create with `git init` will start with a branch called `main` instead of `master`.

<div data-toggle-box data-title="Why Did It Change from 'master' to 'main'?">

The renaming from `master` to `main` was part of a broader industry effort in 2020 to remove terminology with historical associations to slavery. GitHub, GitLab, Bitbucket, and all major platforms now use `main` as the default.

If you encounter old repositories still using `master`, don't be confused — they work exactly the same way. The name `master` has no technical significance; it's just the default name that was used for 15 years. You'll see both in the wild, and knowing this history helps you navigate either without confusion.

</div>

---

## Step 5 — Set Your Default Editor (Optional but Recommended)

Git occasionally needs you to type a message in a text editor (for example, when writing a longer commit message or resolving a merge conflict). By default it opens **Vim**, which is powerful but has a notoriously steep learning curve (many beginners have gotten trapped inside Vim and don't know how to exit).

Set it to VS Code or Cursor instead:

**VS Code:**

**Linux / macOS:**
```bash
git config --global core.editor "code --wait"
```

**Windows (Command Prompt):**
```cmd
git config --global core.editor "code --wait"
```

**Cursor (if you completed Lesson 7):**

**Linux / macOS:**
```bash
git config --global core.editor "cursor --wait"
```

**Windows (Command Prompt):**
```cmd
git config --global core.editor "cursor --wait"
```

The `--wait` flag tells Git to pause and wait until you close the editor tab before continuing.

<div data-info-box="hint" data-title="You Can Always Change This Later">
These configuration settings are stored in a file called `.gitconfig` in your home directory. You can edit that file directly or run `git config --global` commands any time to change them. Nothing is permanent — except your actual commits, which is the whole point.
</div>

---

## Step 6 — Verify Your Configuration

Let's confirm everything is set up correctly. Run:

**Linux / macOS:**
```bash
git config --list
```

**Windows (Command Prompt / PowerShell):**
```cmd
git config --list
```

You should see output that includes your name, email, and the settings you configured:

```
user.name=Your Full Name
user.email=your@email.com
init.defaultbranch=main
core.editor=code --wait
```

(Other settings may appear too — that's normal.)

You can also check a single setting:
```bash
git config user.name
git config user.email
```

---

## Where Git Stores Your Configuration

Git has three levels of configuration, from most specific to most general:

| Level | File Location | Scope |
|-------|--------------|-------|
| `--system` | `/etc/gitconfig` | Applies to all users on the machine |
| `--global` | `~/.gitconfig` (Linux/macOS) or `C:\Users\YourName\.gitconfig` (Windows) | Applies to all your repos |
| `--local` | `.git/config` inside a repo | Applies only to that one repo |

When the same setting exists at multiple levels, the most specific level wins. So a local repo setting overrides your global setting, which overrides the system setting.

For now, `--global` is all you need. Just know these levels exist for when you have advanced use cases (like using a different email for work projects).

<div data-toggle-box data-title="Viewing Your .gitconfig File Directly">

Your global config file is a plain text file you can open and read any time:

**Linux / macOS:**
```bash
cat ~/.gitconfig
```

**Windows (PowerShell):**
```powershell
cat $HOME\.gitconfig
```

It looks something like this:
```ini
[user]
    name = Your Full Name
    email = your@email.com
[init]
    defaultBranch = main
[core]
    editor = code --wait
```

You can edit this file directly in any text editor. The `git config --global` commands are just a convenient way to write to this file without opening it manually.

</div>

---

## Troubleshooting Common Installation Issues

<div data-toggle-box data-title="'git' is not recognized as a command (Windows)">

**Symptoms**: You type `git --version` and get "'git' is not recognized as an internal or external command."

**Cause**: Git wasn't added to your system's PATH during installation, or your terminal needs to be restarted.

**Solution**:
1. Close your terminal completely and reopen it
2. If that doesn't work, reinstall Git for Windows and make sure to select "Git from the command line and also from 3rd-party software" on the PATH screen
3. After reinstalling, open a brand new terminal window

</div>

<div data-toggle-box data-title="macOS: 'xcrun: error: invalid active developer path'">

**Symptoms**: After trying to run Git, you see an error about `xcrun` or the developer path being invalid.

**Cause**: The Xcode Command Line Tools are installed but not linked correctly (often happens after a macOS update).

**Solution**:
```bash
xcode-select --reset
sudo xcode-select --switch /Library/Developer/CommandLineTools
```

Or reinstall them:
```bash
xcode-select --install
```

</div>

<div data-toggle-box data-title="Linux: 'sudo: apt: command not found'">

**Symptoms**: The `apt` command doesn't exist.

**Cause**: You're not on a Debian/Ubuntu-based distribution. Different distros use different package managers.

**Solution**: Use the correct command for your distro:
- Fedora/RHEL: `dnf install git`
- Arch: `pacman -S git`
- openSUSE: `zypper install git`

Not sure which distro you have? Run `cat /etc/os-release` to find out.

</div>

---

## Knowledge Check

<div data-quiz-group data-title="Git Installation and Configuration">

<div data-quiz-question="What does the --global flag do in git config --global user.name?" data-correct="1" data-explanation="The --global flag makes the configuration setting apply to all Git repositories on your computer. Without it, the setting would only apply to the current repository. You can override a global setting on a per-repo basis with git config (no flag), which writes to the local .git/config file.">
<div data-quiz-option>It makes the setting apply only to the current repository</div>
<div data-quiz-option>It makes the setting apply to all repositories on your computer</div>
<div data-quiz-option>It uploads the setting to GitHub</div>
<div data-quiz-option>It sets the setting for all users on the machine</div>
</div>

<div data-quiz-question="Why should you use the same email in git config that you'll use for GitHub?" data-correct="2" data-explanation="GitHub uses your email address to link commits to your GitHub account. When the email in your git config matches your GitHub account email, GitHub can attribute your commits to your profile and show them in your contribution graph. If they don't match, commits won't be linked correctly.">
<div data-quiz-option>Because Git requires a GitHub account to work</div>
<div data-quiz-option>Because GitHub will reject commits with a different email</div>
<div data-quiz-option>So GitHub can link your commits to your profile and contribution graph</div>
<div data-quiz-option>Because the email is used to encrypt your commits</div>
</div>

<div data-quiz-question="What command verifies all your current Git configuration settings?" data-correct="0" data-explanation="git config --list shows all configuration settings that apply to your current context — including system, global, and (if you're inside a repo) local settings. It's the fastest way to verify your setup is correct.">
<div data-quiz-option>git config --list</div>
<div data-quiz-option>git --verify</div>
<div data-quiz-option>git settings show</div>
<div data-quiz-option>git config check</div>
</div>

<div data-quiz-question="What is the recommended default branch name in modern Git projects?" data-correct="3" data-explanation="Since 2020, the industry standard default branch name is 'main'. This replaced the old default of 'master'. GitHub, GitLab, and most major platforms now use 'main' by default. Setting init.defaultBranch to 'main' ensures every new repository you create starts with this modern naming.">
<div data-quiz-option>master</div>
<div data-quiz-option>default</div>
<div data-quiz-option>primary</div>
<div data-quiz-option>main</div>
</div>

</div>

---

## What's Next

Your quill is forged and your ink is ready. In **Lesson 12**, you'll create your very first Git repository, make your first commit, and experience the core Git loop for the very first time — `add`, `commit`, `log`. By the end of that lesson, you'll have saved your first piece of history.

The scroll awaits the first entry.

---

## A Prayer for New Beginnings

*Lord, these students are setting up their tools — preparing to do real work for the first time. There is something sacred about beginnings: the blank canvas, the new notebook, the freshly installed tool waiting to be put to use.*

*Give them patience as they navigate the quirks of installation. When commands don't work right away, remind them that troubleshooting is part of the craft — not a sign of failure. Every developer has sat exactly where they are, wondering if they did something wrong.*

*May the tools they set up today serve them for years to come. And may the discipline of committing their work — saving their progress — reflect the faithfulness You call us to in all things.*

*In Jesus' name, Amen.*

---

> *"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."*
> — Colossians 3:23 (NIV)
