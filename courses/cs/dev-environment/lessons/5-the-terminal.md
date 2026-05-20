---
title: "Lesson 5: The Terminal — Talking to Your Computer"
date: 2026-05-19
author: LokiSoft Team
excerpt: The terminal is the most powerful tool on your computer and the one most beginners avoid. Learn how to open it, navigate your file system, create and delete files, and feel completely comfortable at the command line.
categories: shadcn-nextjs, Beginner, Dev Environment
difficulty: 1
featured: false
coverImage: /dev-environment-cover.svg
---

# Lesson 5: The Terminal — Talking to Your Computer

> *"Your word is a lamp for my feet, a light on my path."*
> — Psalm 119:105 (NIV)

---

## Introduction

Every developer has a moment when the terminal stops being terrifying and starts being powerful. This lesson is designed to be that moment for you.

The terminal — also called the command line, shell, or console — is a text-based interface for communicating directly with your operating system. Instead of clicking icons and dragging files with a mouse, you type commands and the computer executes them. It sounds primitive. It is, in fact, far faster and far more powerful than any graphical interface for the tasks developers do every day.

Every tool in this course interacts through the terminal: installing packages with npm, running your development server, committing code with Git, deploying to Vercel. You cannot be a web developer without being comfortable here. But comfortable is exactly what you will be by the end of this lesson.

<div data-info-box="hint" data-title="The Terminal Is Just a Conversation">
Think of the terminal as a very literal assistant. You type a command — a precise instruction — and the computer executes it and (usually) responds. There is no ambiguity. No interpreting your intentions. You say exactly what you mean, and the computer does exactly what you said. That precision is both the challenge and the power.
</div>

### What You'll Learn

- What a terminal, shell, and CLI are — and how they differ
- Which terminal to use on Windows, macOS, and Linux
- How to navigate your file system entirely from the command line
- How to create, move, copy, and delete files and folders
- Absolute vs relative paths — the concept that unlocks everything
- Time-saving tricks: tab completion, command history, and keyboard shortcuts
- How to use the VS Code integrated terminal

### Prerequisites

| Requirement | Status |
|-------------|--------|
| Lesson 4: VS Code Settings and Keybindings | ✅ Complete |
| VS Code open and working | Recommended (for integrated terminal) |

---

## Terminal, Shell, CLI — What's the Difference?

These terms are used interchangeably in casual conversation, but they mean slightly different things:

**Terminal (or Terminal Emulator):** The application window that you open — the graphical program that renders text input and output. Examples: Terminal.app (macOS), Windows Terminal, GNOME Terminal.

**Shell:** The program *running inside* the terminal that interprets your commands and communicates with the operating system. Examples: Bash, Zsh, Fish, PowerShell, Command Prompt (cmd.exe).

**CLI (Command Line Interface):** The general concept of a text-based interface, as opposed to a GUI (Graphical User Interface). The terminal is your access point to the CLI.

```
┌─────────────────────────────────────────────────┐
│           TERMINAL (the window)                 │
│   ┌─────────────────────────────────────────┐   │
│   │       SHELL (the interpreter)           │   │
│   │   bash / zsh / PowerShell / cmd.exe     │   │
│   │                                         │   │
│   │   $ your commands go here               │   │
│   └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## Which Terminal to Use

### macOS

macOS comes with **Terminal.app** built in (find it in Applications → Utilities). It runs **Zsh** by default on modern Macs (macOS Catalina and later).

A better option that many developers prefer: **iTerm2** (free, at iterm2.com) — it adds split panes, better search, more customization, and a much cleaner experience.

For this course, either Terminal.app or iTerm2 works perfectly. You can also use the VS Code integrated terminal, which is what most developers end up using day-to-day.

### Windows

Windows has several terminal options:

| Terminal | Shell | Notes |
|----------|-------|-------|
| **Windows Terminal** | PowerShell, CMD, WSL | ✅ Best option — modern, tabbed, customizable |
| **PowerShell** | PowerShell | ✅ Good — ships with Windows |
| **Command Prompt (cmd.exe)** | cmd | ⚠️ Old, limited — avoid for development |
| **Git Bash** | Bash | ✅ Great after installing Git — Unix commands on Windows |

**Recommendation:** Install **Windows Terminal** (free from the Microsoft Store or winget) and use **PowerShell** inside it. Once we install Git in a later lesson, Git Bash becomes available and is excellent for running Unix-style commands.

```powershell
# Install Windows Terminal via winget (run in PowerShell):
winget install Microsoft.WindowsTerminal
```

### Linux

Linux comes with a terminal emulator depending on your desktop environment:

| Desktop | Default Terminal |
|---------|-----------------|
| GNOME (Ubuntu default) | GNOME Terminal |
| KDE | Konsole |
| XFCE | Xfce Terminal |
| Any | **Alacritty** or **Kitty** (fast, GPU-accelerated alternatives) |

The default terminal on your Linux distribution is perfectly fine for this course. Most Linux distros use **Bash** as the default shell.

---

## The Prompt

When you open a terminal, you see a **prompt** — the line that shows you the terminal is ready for input. It usually looks something like this:

**macOS / Linux (Bash/Zsh):**
```bash
username@computername:~/Documents$
```

**Windows PowerShell:**
```powershell
PS C:\Users\username\Documents>
```

The `$` or `>` at the end is the prompt symbol — it means "I'm ready for your command." Everything before it is context: your username, computer name, and current folder location.

<div data-info-box="info" data-title="Don't Type the $ or > Symbol">
In code examples throughout this course (and everywhere online), commands are shown with a <code>$</code> prefix to indicate they run in a terminal. Do NOT type the <code>$</code> — just type the command after it. This is a universal convention, not actual syntax.
</div>

---

## Understanding Paths

Before learning the navigation commands, you must understand **paths** — how files and folders are addressed.

Your computer organizes everything in a **tree** structure. There is one root, and everything branches from it.

**On macOS / Linux**, the root is `/`:
```
/
├── Users/
│   └── yourname/
│       ├── Documents/
│       ├── Downloads/
│       └── Desktop/
├── Applications/
└── etc/
```

**On Windows**, the root is a drive letter like `C:\`:
```
C:\
├── Users\
│   └── yourname\
│       ├── Documents\
│       ├── Downloads\
│       └── Desktop\
└── Program Files\
```

### Absolute Paths

An **absolute path** is the full address of a file or folder starting from the root. It works regardless of where you currently are.

```bash
# macOS / Linux — absolute paths start with /
/Users/yourname/Documents/my-project/index.html

# Windows — absolute paths start with a drive letter
C:\Users\yourname\Documents\my-project\index.html
```

### Relative Paths

A **relative path** is an address relative to your current location. It only works when combined with knowledge of where you are.

```bash
# If you are currently in /Users/yourname/Documents/
# then this relative path:
my-project/index.html

# ...refers to the same file as:
/Users/yourname/Documents/my-project/index.html
```

### Special Path Shortcuts

These work on macOS, Linux, and in PowerShell / Git Bash on Windows:

| Symbol | Meaning | Example |
|--------|---------|---------|
| `.` | Current directory | `./index.html` |
| `..` | Parent directory (one level up) | `../styles/main.css` |
| `~` | Your home directory | `~/Documents` |
| `/` | Root (macOS/Linux) | `/etc/hosts` |

> *"Give careful thought to the paths for your feet and be steadfast in all your ways."*
> — Proverbs 4:26 (NIV)

Understanding paths is one of those fundamentals that, once you have it, you wonder how you ever got along without it. Every file system command, every import statement, every server configuration depends on the same path concept.

---

## Core Navigation Commands

### Where Am I? — `pwd` / `cd`

**`pwd`** (Print Working Directory) tells you your current location.

**macOS / Linux / PowerShell / Git Bash:**
```bash
pwd
# Output: /Users/yourname/Documents
```

**Windows Command Prompt:**
```cmd
cd
# Output: C:\Users\yourname\Documents
```

---

### What Is Here? — `ls` / `dir`

Lists the contents of a directory.

**macOS / Linux / PowerShell / Git Bash:**
```bash
ls              # list files and folders in current directory
ls -l           # detailed list (permissions, size, date)
ls -la          # detailed list including hidden files (those starting with .)
ls Documents    # list a specific folder without navigating to it
```

**Windows Command Prompt:**
```cmd
dir             :: list files and folders
dir /a          :: include hidden files
```

<div data-info-box="hint" data-title="Hidden Files on macOS/Linux">
Files and folders whose names start with a dot (like <code>.git</code>, <code>.env</code>, <code>.gitignore</code>) are <strong>hidden files</strong>. They will not show up with a plain <code>ls</code> — you need <code>ls -la</code> or <code>ls -a</code> to see them. Almost every web project has important hidden files, so remember this flag.
</div>

---

### Moving Around — `cd`

**`cd`** (Change Directory) moves you to a different folder.

**macOS / Linux / PowerShell / Git Bash / Windows CMD:**
```bash
cd Documents              # move into a folder
cd Documents/my-project   # move into a nested folder
cd ..                     # go up one level (to parent folder)
cd ../..                  # go up two levels
cd ~                      # go to your home directory
cd /                      # go to the root (macOS/Linux)
cd -                      # go back to the previous directory (macOS/Linux/Git Bash)
```

**Windows Command Prompt (drive letters):**
```cmd
cd Documents
cd ..
cd C:\          :: go to root of C drive
D:              :: switch to D drive
```

**Example — navigating to a project:**
```bash
# You are in your home directory (~)
cd Documents
cd my-project
pwd
# Output: /Users/yourname/Documents/my-project
```

---

### Creating Folders — `mkdir`

**`mkdir`** (Make Directory) creates a new folder.

**All platforms:**
```bash
mkdir my-project                    # create one folder
mkdir -p my-project/src/components  # create nested folders all at once (macOS/Linux/Git Bash)
```

**Windows Command Prompt:**
```cmd
mkdir my-project
mkdir my-project\src\components     :: nested (Command Prompt)
```

**Windows PowerShell:**
```powershell
mkdir my-project
mkdir -Force my-project\src\components   # -Force creates intermediate folders
```

---

### Creating Files — `touch` / `New-Item`

**macOS / Linux / Git Bash:**
```bash
touch index.html       # create an empty file
touch style.css app.js # create multiple files at once
```

**Windows PowerShell:**
```powershell
New-Item index.html -ItemType File
# or the shorter alias:
ni index.html
```

**Windows Command Prompt:**
```cmd
echo. > index.html     :: creates an empty file (note the dot after echo)
```

---

### Copying Files and Folders — `cp` / `copy`

**macOS / Linux / Git Bash:**
```bash
cp index.html index-backup.html          # copy a file
cp -r my-folder my-folder-backup         # copy a folder (-r = recursive)
cp styles/main.css ../other-project/     # copy to a different location
```

**Windows PowerShell:**
```powershell
cp index.html index-backup.html
cp -Recurse my-folder my-folder-backup
```

**Windows Command Prompt:**
```cmd
copy index.html index-backup.html
xcopy my-folder my-folder-backup /E /I   :: copy folder with contents
```

---

### Moving and Renaming — `mv` / `move`

`mv` both **moves** a file to a new location and **renames** it. The same command does both.

**macOS / Linux / Git Bash:**
```bash
mv old-name.html new-name.html           # rename a file
mv index.html pages/                     # move a file to a folder
mv my-folder ../other-location/          # move a folder
```

**Windows PowerShell:**
```powershell
mv old-name.html new-name.html
mv index.html pages\
```

**Windows Command Prompt:**
```cmd
rename old-name.html new-name.html       :: rename
move index.html pages\                   :: move
```

---

### Deleting Files and Folders — `rm`

<div data-info-box="danger" data-title="The Terminal Has No Recycle Bin">
Files deleted with <code>rm</code> in the terminal are <strong>permanently gone</strong>. They do not go to the Recycle Bin or Trash. There is no undo. Double-check your command before pressing Enter, especially when using wildcards or recursive flags.
</div>

**macOS / Linux / Git Bash:**
```bash
rm index.html                # delete a single file
rm file1.html file2.css      # delete multiple files
rm -r my-folder              # delete a folder and everything inside it (-r = recursive)
rm -rf build/                # force delete without asking for confirmation (-f = force)
```

**Windows PowerShell:**
```powershell
rm index.html
rm -Recurse my-folder
Remove-Item -Recurse -Force build\
```

**Windows Command Prompt:**
```cmd
del index.html               :: delete a file
rmdir /S /Q my-folder        :: delete a folder and all contents
```

---

### Displaying File Contents — `cat` / `type`

**macOS / Linux / Git Bash:**
```bash
cat index.html               # print file contents to the terminal
cat package.json             # great for quickly reading config files
```

**Windows PowerShell:**
```powershell
cat index.html
Get-Content index.html       # the full PowerShell command
```

**Windows Command Prompt:**
```cmd
type index.html
```

---

### Clearing the Screen — `clear` / `cls`

| Platform | Command |
|----------|---------|
| macOS / Linux / Git Bash | `clear` |
| Windows CMD | `cls` |
| Windows PowerShell | `cls` or `clear` |
| All (keyboard shortcut) | `Ctrl + L` |

---

## Tab Completion — Your Biggest Time Saver

The single most useful terminal habit you can develop is using **Tab** to autocomplete commands and file paths. This saves time and prevents typos.

Type the beginning of a file name or folder name, then press `Tab`. The terminal will complete it if only one option matches, or show all options if multiple match.

```bash
cd Doc        # press Tab
cd Documents/ # terminal completes it

ls ~/Doc      # press Tab
ls ~/Documents/
```

**Tab completion works for:**
- Folder and file names in paths
- Command names
- npm script names (`npm run dev` → type `npm run d` + Tab)
- Git branch names

If nothing happens when you press Tab, either nothing matches or multiple things match. Press Tab **twice** quickly to see all matches.

---

## Command History

The terminal remembers every command you have typed. You do not have to retype long commands.

| Action | Shortcut |
|--------|---------|
| Previous command | `↑` arrow key |
| Next command | `↓` arrow key |
| Search history | `Ctrl + R`, then type to search |
| See full history | `history` (macOS/Linux/Git Bash) |
| Clear history | `history -c` (macOS/Linux) |

**Example of `Ctrl+R` reverse search:**
```bash
# Press Ctrl+R, then type "npm"
(reverse-i-search)`npm': npm run dev
# Press Enter to run it, or keep typing to refine
```

---

## Essential Keyboard Shortcuts

| Action | Shortcut |
|--------|---------|
| Cancel running command | `Ctrl + C` |
| Clear screen | `Ctrl + L` |
| Move cursor to start of line | `Ctrl + A` |
| Move cursor to end of line | `Ctrl + E` |
| Delete word before cursor | `Ctrl + W` |
| Delete from cursor to end of line | `Ctrl + K` |
| Search command history | `Ctrl + R` |
| Exit the terminal / shell | `Ctrl + D` or `exit` |

`Ctrl + C` is the most important one. If a command is running and you need to stop it (a stuck process, a looping script, a server you want to shut down), `Ctrl + C` sends an interrupt signal and stops it.

---

## A Practical Walkthrough

Let us put it all together with a realistic exercise. Follow along step by step:

**macOS / Linux / Git Bash:**
```bash
# 1. Go to your home directory
cd ~

# 2. Create a new projects folder
mkdir projects

# 3. Move into it
cd projects

# 4. Create a new project folder
mkdir my-first-website

# 5. Move into the project
cd my-first-website

# 6. Create some files
touch index.html style.css script.js

# 7. Confirm they exist
ls
# Output: index.html  script.js  style.css

# 8. Open this folder in VS Code
code .

# 9. Go back up to the projects folder
cd ..

# 10. Confirm we can see my-first-website
ls
# Output: my-first-website
```

**Windows PowerShell:**
```powershell
# 1. Go to your home directory
cd ~

# 2. Create a new projects folder
mkdir projects

# 3. Move into it
cd projects

# 4. Create a new project folder
mkdir my-first-website

# 5. Move into the project
cd my-first-website

# 6. Create some files
ni index.html; ni style.css; ni script.js

# 7. Confirm they exist
ls
# Output: index.html, script.js, style.css

# 8. Open this folder in VS Code
code .

# 9. Go back up
cd ..

# 10. Confirm
ls
# Output: my-first-website
```

---

## The VS Code Integrated Terminal

Throughout this course, you will mostly use the **VS Code integrated terminal** rather than a separate terminal window. It opens directly in VS Code, it knows your project folder, and it keeps everything in one place.

Open it with `` Ctrl + ` `` on all platforms (the backtick key, above Tab).

**Pro tips for the VS Code terminal:**

- **Create multiple terminal tabs:** Click the `+` icon in the terminal panel, or press `` Ctrl+Shift+` ``
- **Split the terminal:** Click the split icon to have two terminals side by side — one for your dev server, one for other commands
- **Switch terminals:** Use the dropdown in the terminal panel or `Ctrl+PageUp/PageDown`
- **Rename a terminal:** Right-click the terminal tab → Rename (useful when you have many terminals open)

<div data-info-box="hint" data-title="Keep Your Dev Server Running in Its Own Terminal">
When you start a development server (like <code>npm run dev</code>), leave it running in a dedicated terminal tab. Open a second terminal tab for other commands. This is the standard developer workflow — one terminal per long-running process.
</div>

---

## Knowledge Check

<div data-quiz-group data-title="The Terminal — Knowledge Check">

<div data-quiz-question="What does 'cd ..' do?" data-correct="2" data-explanation="'cd' changes your current directory. '..' is the symbol for the parent directory — one level up in the folder tree. So 'cd ..' moves you up one folder. 'cd ../..' moves up two levels. 'cd .' does nothing (moves to the current directory, which you are already in).">
<div data-quiz-option>Deletes the current directory</div>
<div data-quiz-option>Creates a new folder called '..'</div>
<div data-quiz-option>Moves up one level to the parent directory</div>
<div data-quiz-option>Prints the current directory path</div>
</div>

<div data-quiz-question="You are in /Users/yourname and you run 'mkdir projects/website'. What is the absolute path of the new folder?" data-correct="1" data-explanation="/Users/yourname/projects/website. The 'mkdir projects/website' command creates nested directories. Starting from /Users/yourname (your current location), 'projects/website' is a relative path, so the full absolute path becomes /Users/yourname/projects/website.">
<div data-quiz-option>/projects/website</div>
<div data-quiz-option>/Users/yourname/projects/website</div>
<div data-quiz-option>~/website</div>
<div data-quiz-option>./projects/website</div>
</div>

<div data-quiz-question="Which command lets you see hidden files (files starting with a dot) on macOS/Linux?" data-correct="3" data-explanation="'ls -la' (or 'ls -a') shows ALL files including hidden ones. Files starting with a dot (like .git, .env, .gitignore) are hidden by default on Unix systems and won't appear with a plain 'ls'. The '-l' flag adds details like permissions and file size.">
<div data-quiz-option>ls --hidden</div>
<div data-quiz-option>ls -h</div>
<div data-quiz-option>ls --show-all</div>
<div data-quiz-option>ls -la</div>
</div>

<div data-quiz-question="What keyboard shortcut stops a currently running terminal command or process on all platforms?" data-correct="0" data-explanation="Ctrl+C sends an interrupt signal (SIGINT) to the currently running process, stopping it. This is how you stop a running development server, cancel a hanging command, or interrupt any long-running process. It is one of the most important terminal shortcuts you will use every day.">
<div data-quiz-option>Ctrl + C</div>
<div data-quiz-option>Ctrl + Z</div>
<div data-quiz-option>Ctrl + X</div>
<div data-quiz-option>Ctrl + Q</div>
</div>

<div data-quiz-question="What is the difference between an absolute path and a relative path?" data-correct="2" data-explanation="An absolute path always starts from the root (/ on macOS/Linux, C:\ on Windows) and works regardless of your current location. A relative path is measured from your current directory and only makes sense in that context. /Users/yourname/Documents/file.html is absolute. Documents/file.html is relative (only works if you are in /Users/yourname/).">
<div data-quiz-option>Absolute paths use forward slashes; relative paths use backslashes</div>
<div data-quiz-option>Absolute paths only work on macOS; relative paths only work on Windows</div>
<div data-quiz-option>Absolute paths start from the root and always work; relative paths are measured from your current location</div>
<div data-quiz-option>Absolute paths are for files; relative paths are for folders</div>
</div>

</div>

---

## Command Reference Card

| Action | macOS / Linux / Git Bash | Windows PowerShell | Windows CMD |
|--------|-------------------------|-------------------|-------------|
| Print current directory | `pwd` | `pwd` | `cd` |
| List files | `ls` | `ls` | `dir` |
| List with hidden files | `ls -la` | `ls -Force` | `dir /a` |
| Change directory | `cd folder` | `cd folder` | `cd folder` |
| Go up one level | `cd ..` | `cd ..` | `cd ..` |
| Go home | `cd ~` | `cd ~` | `cd %USERPROFILE%` |
| Create folder | `mkdir name` | `mkdir name` | `mkdir name` |
| Create nested folders | `mkdir -p a/b/c` | `mkdir a\b\c` | `mkdir a\b\c` |
| Create file | `touch file.txt` | `ni file.txt` | `echo. > file.txt` |
| Delete file | `rm file.txt` | `rm file.txt` | `del file.txt` |
| Delete folder | `rm -r folder` | `rm -Recurse folder` | `rmdir /S /Q folder` |
| Copy file | `cp a.txt b.txt` | `cp a.txt b.txt` | `copy a.txt b.txt` |
| Move / rename | `mv old new` | `mv old new` | `move old new` |
| Print file contents | `cat file.txt` | `cat file.txt` | `type file.txt` |
| Clear screen | `clear` | `cls` | `cls` |
| Open in VS Code | `code .` | `code .` | `code .` |

---

## What's Next

You can navigate the file system, create projects, and feel at home in the terminal. In **Lesson 6**, you will install Node.js — the JavaScript runtime that powers every tool in this course, from the development server to the package manager.

- **Next Lesson:** [Lesson 6 — Installing Node.js and npm: The Engine Under the Hood](/courses/shadcn-nextjs/lessons/6-installing-nodejs-and-npm)

---

## Conclusion

The terminal is no longer a mystery. You know how to find your location, navigate the file system, create and delete files, and use the tricks that make the command line fast.

Most beginners avoid the terminal because it feels unfamiliar. But familiarity is just repetition. Every command you ran in this lesson will become automatic over the next few weeks. By the time you are building your first Next.js project, opening a terminal and typing `cd my-project && npm run dev` will feel as natural as opening a browser tab.

> *"The Lord makes firm the steps of the one who delights in him; though he may stumble, he will not fall, for the Lord upholds him with his hand."*
> — Psalm 37:23-24 (NIV)

You will mistype commands. You will navigate to the wrong folder. You will accidentally press Ctrl+C when you meant something else. This is not failure — it is learning. Every developer does this. Get comfortable being wrong quickly and correcting quickly.

---

## A Prayer for This Lesson

*Lord, thank You for the designers who built tools that give us such direct access to the capabilities of our machines.*

*For the student who feels intimidated by the blinking cursor and the empty prompt — give them courage to type their first command, and joy when it works. May the terminal become a place of confidence and speed, not anxiety.*

*Help them build the habit of precision: reading error messages carefully, checking their paths, understanding what a command does before running it. These are small disciplines that become engineering wisdom.*

*In Jesus' name, Amen.*

---

## Lesson Checklist

- [ ] I can open a terminal on my operating system
- [ ] I know which shell I am running (bash, zsh, PowerShell, etc.)
- [ ] I can navigate my file system using `cd`, `ls`/`dir`, and `pwd`
- [ ] I created the `~/projects` folder and the `my-first-website` folder inside it from the terminal
- [ ] I created three files (`index.html`, `style.css`, `script.js`) using the terminal
- [ ] I used `code .` to open that folder in VS Code from the terminal
- [ ] I practiced using Tab completion at least five times
- [ ] I know that `Ctrl + C` stops a running process
- [ ] I scored at least 4/5 on the Knowledge Check quiz above
