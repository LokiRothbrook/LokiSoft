---
title: "Lesson 2: Installing VS Code — Your First Spellbook"
date: 2026-05-19
author: LokiSoft Team
excerpt: Every developer needs a great code editor. Learn how to download and install Visual Studio Code on Windows, macOS, and Linux, then take your first tour of the interface.
categories: shadcn-nextjs, Beginner, Dev Environment
difficulty: 1
featured: false
coverImage: /dev-environment-cover.svg
---

# Lesson 2: Installing VS Code — Your First Spellbook

> *"The heart of the discerning acquires knowledge, for the ears of the wise seek it out."*
> — Proverbs 18:15 (NIV)

---

## Introduction

Every craftsman has a primary tool. A carpenter has a workbench. A painter has a canvas and brushes. A musician has an instrument. As a developer, your primary tool is your **code editor** — and the one you will use throughout this course is **Visual Studio Code**, known by everyone simply as **VS Code**.

A code editor is where you will spend the vast majority of your working hours. It is the environment where you write code, read code, debug problems, run your applications, and talk to version control. Choosing a great editor and learning it deeply is one of the highest-return investments you can make as a developer.

VS Code, released by Microsoft in 2015, has become the world's most popular code editor by a significant margin. As of 2024, over 73% of all developers use it as their primary editor. It is free, open-source, runs on every major operating system, and has an enormous ecosystem of extensions that can do almost anything you need.

<div data-info-box="info" data-title="VS Code vs an IDE">
VS Code is technically a <strong>source code editor</strong>, not a full IDE (Integrated Development Environment). The difference: a traditional IDE like Visual Studio or IntelliJ comes bundled with everything for a specific language. VS Code starts minimal and you add exactly what you need through extensions. This makes it lightweight, fast, and flexible — perfect for web development where you use many languages and tools.
</div>

### What You'll Learn

- What VS Code is and why developers love it
- How to download and install VS Code on **Windows**, **macOS**, and **Linux**
- How to open VS Code and navigate its interface
- How to open a folder as a workspace
- How to open the built-in terminal
- How to verify your installation with a terminal command

### Prerequisites

| Requirement | Status |
|-------------|--------|
| Lesson 1: How the Web Works | ✅ Complete |
| Internet connection to download VS Code | Required |
| Admin/sudo access on your computer | Required for installation |

---

## What Makes VS Code Great?

Before you install it, here is why VS Code has earned its dominant position:

| Feature | Why It Matters |
|---------|---------------|
| Free and open-source | No license fees, ever |
| Cross-platform | Identical experience on Windows, macOS, and Linux |
| Extension marketplace | Thousands of extensions for any language or tool |
| Built-in Git | Source control baked into the editor |
| Integrated terminal | Run commands without leaving the editor |
| IntelliSense | Smart autocomplete that understands your code |
| Live Share | Collaborate in real time with other developers |
| Regular updates | Microsoft ships new features every month |

---

## Downloading VS Code

The official VS Code download page is at **[code.visualstudio.com](https://code.visualstudio.com)**. Always download from the official site to ensure you get the genuine, unmodified version.

<div data-info-box="warning" data-title="Watch Out for Fakes">
Search engines sometimes show ads for websites that are not the official VS Code site. Always go directly to <strong>code.visualstudio.com</strong>. The official site is owned by Microsoft and is the only safe source.
</div>

---

## Installing on Windows

**Step 1 — Download the installer**

Go to [code.visualstudio.com](https://code.visualstudio.com). The site detects your OS automatically. Click the big blue **Download for Windows** button. This downloads a file named something like `VSCodeUserSetup-x64-1.XX.X.exe`.

<div data-info-box="hint" data-title="System Installer vs User Installer">
The default download is the <strong>User Installer</strong> — it installs VS Code only for your user account and does not require admin rights. The System Installer (available on the Downloads page) installs for all users on the machine and does require admin rights. For personal computers, the User Installer is fine.
</div>

**Step 2 — Run the installer**

Double-click the downloaded `.exe` file. If Windows asks "Do you want to allow this app to make changes?", click **Yes**.

**Step 3 — Accept the license and choose options**

Work through the installer screens. On the **Select Additional Tasks** screen, make sure to check:

- ✅ **Add "Open with Code" action to Windows Explorer file context menu**
- ✅ **Add "Open with Code" action to Windows Explorer directory context menu**
- ✅ **Add to PATH (requires shell restart)**

The "Add to PATH" option is critical — it lets you type `code .` in any terminal window to open VS Code in the current folder.

**Step 4 — Complete the installation**

Click **Install**, then **Finish**. VS Code will launch automatically.

**Step 5 — Verify in PowerShell or Command Prompt**

```powershell
code --version
```

You should see output like `1.89.0` followed by a commit hash and architecture. If you see this, VS Code is correctly installed and added to your PATH.

---

## Installing on macOS

**Step 1 — Download the correct version**

Go to [code.visualstudio.com](https://code.visualstudio.com) and click the dropdown arrow next to the download button. Choose:

- **Apple Silicon (M1/M2/M3/M4 chip):** Choose "Mac" → "Apple Silicon"
- **Intel Mac:** Choose "Mac" → "Intel Chip"

Not sure which you have? Click the Apple menu (top left) → **About This Mac**. If it says "Apple M1/M2/M3/M4" you have Apple Silicon. If it says "Intel Core i5/i7/i9" you have an Intel Mac.

This downloads a `.zip` file.

**Step 2 — Extract and move to Applications**

Double-click the `.zip` file to extract it. This creates a file called `Visual Studio Code.app`. Drag this file into your **Applications** folder.

<div data-info-box="warning" data-title="Do Not Run From Downloads">
Running VS Code directly from your Downloads folder will cause macOS to repeatedly ask for permissions. Always move it to Applications first.
</div>

**Step 3 — First launch (Gatekeeper bypass)**

The first time you open VS Code, macOS Gatekeeper may show a warning: *"Visual Studio Code cannot be opened because the developer cannot be verified."*

To get past this:
1. Right-click (or Control-click) on `Visual Studio Code.app` in your Applications folder
2. Click **Open**
3. Click **Open** again in the dialog that appears

After this first launch, VS Code will open normally every time.

**Step 4 — Add the `code` command to your PATH**

This is the most important setup step on macOS. Without it, you cannot open VS Code from the terminal.

1. Open VS Code
2. Press `Cmd + Shift + P` to open the **Command Palette**
3. Type `shell command` and select **Shell Command: Install 'code' command in PATH**
4. Enter your Mac password if prompted
5. Close and reopen your terminal

**Step 5 — Verify in Terminal**

```bash
code --version
```

You should see a version number. Success!

---

## Installing on Linux

Linux has several installation methods. The `.deb` and `.rpm` package approach is the most reliable.

### Ubuntu / Debian (and derivatives like Pop!\_OS, Mint)

**Method 1 — Official Microsoft repository (recommended, gets automatic updates):**

```bash
# Install dependencies
sudo apt install wget gpg

# Download and add Microsoft's GPG key
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg

# Add the VS Code repository
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'

# Update and install
sudo apt update
sudo apt install code
```

**Method 2 — Download the .deb package manually:**

Go to [code.visualstudio.com](https://code.visualstudio.com), click the dropdown, and choose **.deb**. Then:

```bash
sudo dpkg -i ~/Downloads/code_*.deb
sudo apt install -f   # fixes any missing dependencies
```

### Fedora / RHEL / CentOS

**Method 1 — Official Microsoft repository:**

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'

# On Fedora:
sudo dnf install code

# On RHEL/CentOS:
sudo yum install code
```

**Method 2 — Download the .rpm package manually:**

Go to [code.visualstudio.com](https://code.visualstudio.com), click the dropdown, and choose **.rpm**. Then:

```bash
sudo rpm -ih ~/Downloads/code_*.rpm
```

### Snap (works on any snap-enabled distro)

```bash
sudo snap install --classic code
```

### Verify installation on Linux

```bash
code --version
```

<div data-info-box="info" data-title="VS Code on ARM Linux (Raspberry Pi, etc.)">
VS Code officially supports 64-bit ARM Linux. On the download page, choose the <strong>.deb</strong> or <strong>.rpm</strong> package and select <strong>ARM 64</strong> from the architecture dropdown.
</div>

---

## A Tour of the VS Code Interface

When VS Code opens, you will see several distinct areas. Learning their names now means every tutorial, forum answer, and documentation page you read will make sense immediately.

```
┌────────────────────────────────────────────────────────────────┐
│  ┌──┐  ┌──────────────────────────────────────────────────┐   │
│  │  │  │  EDITOR AREA                                     │   │
│  │ A│  │                                                  │   │
│  │ C│  │  This is where you write your code.              │───│─ MINIMAP
│  │ T│  │  You can split this area horizontally            │   │
│  │ I│  │  or vertically to view multiple files.           │   │
│  │ V│  │                                                  │   │
│  │ I│  └──────────────────────────────────────────────────┘   │
│  │ T│  ┌──────────────────────────────────────────────────┐   │
│  │ Y│  │  PANEL (Terminal, Problems, Output)              │   │
│  │  │  │  > npm run dev                                   │   │
│  └──┘  └──────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  STATUS BAR  |  TypeScript  |  Ln 42  |  ✓ Prettier    │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

### The Activity Bar (far left column)

The icons running down the left edge are the **Activity Bar**. Each icon opens a different panel in the sidebar:

| Icon | Panel | What It Does |
|------|-------|-------------|
| 📄 | Explorer | Your project's file and folder tree |
| 🔍 | Search | Find text across all files |
| 🌿 | Source Control | Git integration |
| 🐛 | Run & Debug | Run and debug your applications |
| 🧩 | Extensions | Browse and install extensions |

### The Primary Sidebar

Clicking an Activity Bar icon opens the **Primary Sidebar** — the panel that appears to the right of the Activity Bar. The Explorer sidebar shows your project files. You can drag files here, rename them, and create new ones.

### The Editor Area

The large center area is where you write your code. You can have multiple files open as **tabs**. You can split the editor into two or more columns to see multiple files side by side — very useful when you are working with an HTML file and its CSS at the same time.

### The Panel (bottom area)

The bottom panel contains:
- **Terminal** — a full command-line terminal inside VS Code
- **Problems** — errors and warnings from your code
- **Output** — output from extensions and tools
- **Debug Console** — output from your running application

### The Status Bar (very bottom strip)

The thin colored strip at the very bottom gives you at-a-glance information: the current Git branch, any errors or warnings, the language of the current file, your cursor position (line and column), and the encoding format.

---

## Opening Your First Project Folder

VS Code works best when you open an entire **folder** as your workspace, not individual files. This lets it understand the full context of your project.

**Opening a folder:**

**Linux / macOS (Terminal):**
```bash
mkdir my-first-project
cd my-first-project
code .
```

The `code .` command tells VS Code to open the current directory (`.`) as a workspace.

**Windows (PowerShell):**
```powershell
mkdir my-first-project
cd my-first-project
code .
```

**Windows (Command Prompt):**
```cmd
mkdir my-first-project
cd my-first-project
code .
```

You can also open a folder from inside VS Code:
- Go to **File → Open Folder** (Windows / Linux)
- Go to **File → Open...** (macOS)
- Or drag a folder from your file manager onto the VS Code window

---

## Opening the Integrated Terminal

VS Code has a full terminal built right in. You never need to switch between your editor and a separate terminal window.

| Platform | Shortcut |
|----------|----------|
| Windows / Linux | `` Ctrl + ` `` (backtick — the key above Tab) |
| macOS | `` Ctrl + ` `` |
| All platforms | **View → Terminal** from the menu |
| All platforms | **Terminal → New Terminal** from the menu |

The integrated terminal opens at the bottom of the screen in the Panel area. It is a fully functional terminal — you can run any command you would run in a standalone terminal window.

> *"Commit to the Lord whatever you do, and he will establish your plans."*
> — Proverbs 16:3 (NIV)

Even something as simple as setting up your tools is worth doing with care and intention. The developers who take time to properly configure their environment are the same ones who build things that last.

---

## Knowledge Check

<div data-quiz-group data-title="Installing VS Code — Knowledge Check">

<div data-quiz-question="What is the correct term for VS Code's type of software?" data-correct="1" data-explanation="VS Code is a source code editor (or text editor for code). It is NOT a full IDE like Visual Studio or IntelliJ. The distinction matters because VS Code starts lightweight and you add capabilities through extensions, making it flexible for any language or workflow.">
<div data-quiz-option>Integrated Development Environment (IDE)</div>
<div data-quiz-option>Source code editor</div>
<div data-quiz-option>A web browser with code-editing features</div>
<div data-quiz-option>A compiler and runtime environment</div>
</div>

<div data-quiz-question="On macOS, what must you do AFTER installing VS Code before you can use the 'code .' terminal command?" data-correct="2" data-explanation="On macOS, VS Code does NOT automatically add the 'code' command to your PATH. You must manually run 'Shell Command: Install code command in PATH' from the VS Code Command Palette (Cmd+Shift+P). On Windows, checking 'Add to PATH' during installation handles this automatically.">
<div data-quiz-option>Restart your Mac</div>
<div data-quiz-option>Download a separate 'code CLI' package from the VS Code website</div>
<div data-quiz-option>Run 'Shell Command: Install code command in PATH' from the Command Palette</div>
<div data-quiz-option>Nothing — it works automatically after installation</div>
</div>

<div data-quiz-question="What does typing 'code .' in the terminal do?" data-correct="3" data-explanation="The 'code' command opens VS Code. The '.' is a Unix/Windows shorthand meaning 'the current directory.' So 'code .' tells VS Code to open the folder you are currently in as a workspace. This is the fastest way to open a project.">
<div data-quiz-option>Creates a new file called 'code' in the current directory</div>
<div data-quiz-option>Checks the current directory for code errors</div>
<div data-quiz-option>Opens the VS Code settings file</div>
<div data-quiz-option>Opens VS Code with the current directory as the workspace</div>
</div>

<div data-quiz-question="Which keyboard shortcut opens the integrated terminal in VS Code on all platforms?" data-correct="0" data-explanation="Ctrl+` (Control + backtick) opens and toggles the integrated terminal on Windows, macOS, and Linux. The backtick key is usually found in the top-left corner of the keyboard, above the Tab key. You can also open it from View → Terminal.">
<div data-quiz-option>Ctrl + ` (backtick)</div>
<div data-quiz-option>Ctrl + T</div>
<div data-quiz-option>Ctrl + Shift + T</div>
<div data-quiz-option>Alt + F4</div>
</div>

<div data-quiz-question="What is the Activity Bar in VS Code?" data-correct="1" data-explanation="The Activity Bar is the vertical strip of icons on the far left edge of the VS Code window. Each icon opens a different panel in the Primary Sidebar — Explorer (file tree), Search, Source Control (Git), Run & Debug, and Extensions. It is how you navigate between the major sections of the editor.">
<div data-quiz-option>The bottom status strip showing errors, warnings, and cursor position</div>
<div data-quiz-option>The vertical column of icons on the far left that switch between Explorer, Search, Git, and other panels</div>
<div data-quiz-option>The tab bar at the top of the editor showing open files</div>
<div data-quiz-option>The terminal panel at the bottom of the editor</div>
</div>

</div>

---

## What's Next

VS Code is installed and you have taken your first tour. In **Lesson 3**, you will supercharge it with extensions — powerful add-ons that give VS Code special abilities for web development. Think of this lesson as installing the base camp. Lesson 3 is where you stock it with supplies.

- **Next Lesson:** [Lesson 3 — VS Code Extensions: Equipping Your Spellbook](/courses/shadcn-nextjs/lessons/3-vs-code-extensions)

---

## Conclusion

Your editor is installed. That is a real milestone — the first real tool of your journey is now in your hands.

VS Code was built by a team that cared deeply about the developer experience. It shows in every detail: the speed, the flexibility, the constant improvement. The fact that it is free and available to every person on earth — a student in a village in Kenya, a self-taught developer in Brazil, a teenager in Texas — reflects something beautiful about how knowledge can be democratized.

> *"Every good and perfect gift is from above, coming down from the Father of the heavenly lights."*
> — James 1:17 (NIV)

The tools you have access to for free today would have cost tens of thousands of dollars and required university access just a generation ago. Do not take that lightly. Use them well.

---

## A Prayer for This Lesson

*Lord, thank You for the creativity of people who built tools like VS Code and made them free for the world. What a gift.*

*As this student installs their editor and takes their first steps inside it, give them a sense of wonder and excitement — not anxiety. May this tool become a comfortable, familiar place where great things are created.*

*Bless the hours they will spend here. May their code be clean, their bugs be findable, and their builds be successful. And in the moments of frustration that will inevitably come — a cryptic error, a missing semicolon, a layout that will not cooperate — remind them that every developer faces these moments. Perseverance through them is what separates those who make it from those who quit.*

*In Jesus' name, Amen.*

---

## Lesson Checklist

- [ ] VS Code is installed on my computer
- [ ] I can open VS Code from the terminal with `code .`
- [ ] I can identify the Activity Bar, Primary Sidebar, Editor Area, Panel, and Status Bar
- [ ] I know how to open the integrated terminal with Ctrl + `
- [ ] I ran `code --version` successfully in the terminal
- [ ] I scored at least 4/5 on the Knowledge Check quiz above
