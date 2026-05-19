---
title: "Clone This Website: Your Complete Guide From Zero to Live"
date: 2026-01-12
author: LokiSoft Team
excerpt: A comprehensive guide taking you from absolutely nothing installed to a fully deployed, professional website on Vercel. No experience required - we'll walk through every step together.
categories: Documentation, Tutorial, Getting Started
difficulty: 3
announcement: true
featured: true
coverImage: /clone-website-cover.svg
---

# No Really, We Mean It - Take This Website!

Here at LokiSoft, we believe knowledge belongs to everyone. No paywalls. No gatekeeping. No "sign up for my $997 course to learn the secrets." The only secret is that there are no secrets - just people willing to share what they've learned.

We've all been there: staring at documentation written for people who already know everything, Googling error messages at 2 AM, wondering if we're just not cut out for this. That struggle? That's exactly where this project was born.

> *"Freely you have received; freely give."*
> — Matthew 10:8 (NIV)

Yeah, we offer services to build stuff - something has to pay the bills. But if you click that **Source** button in the navigation bar right now, you'll find the complete source code for this entire website. Free. Open. Yours to learn from, modify, and make your own.

<div data-info-box="success" data-title="Open Source Philosophy">
We don't just talk about open source - we live it. This website, our tools, our knowledge - it's all available for you to use, learn from, and build upon. Go ahead, view the source. We'll wait.
</div>

---

## Introduction

This guide will take you from "I have a computer and that's about it" to "I have a professional website live on the internet." We're not skipping steps. We're not assuming you know things. If you can follow instructions and aren't afraid to type some commands, you can do this.

By the end of this guide, you'll have:
- A fully functional, professional website
- A blog system that lets you write in Markdown
- A contact form that actually sends emails
- A comments section powered by GitHub
- CAPTCHA protection against spam bots
- Everything deployed and live on the internet - for free

Let's build something awesome together.

> *"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."*
> — Colossians 3:23 (NIV)

### What You'll Learn

- Installing all required development tools on your operating system
- Understanding what each tool does and why we need it
- Cloning and running the project locally
- Setting up third-party services (email, comments, CAPTCHA)
- Customizing the site to make it yours
- Deploying to Vercel so the world can see your creation

### Prerequisites

| Requirement | Description |
|------------|-------------|
| A Computer | Windows, Mac, or Linux - we've got you covered |
| Internet Connection | For downloading tools and deploying |
| Patience | Some steps take time, and that's okay |
| Willingness to Learn | The most important ingredient |
| Time | Set aside 1-2 hours for the complete setup |

<div data-info-box="hint" data-title="A Word of Encouragement">
If you get stuck, that's normal. Every developer - from beginners to senior engineers - gets stuck. The difference isn't intelligence; it's persistence. You've got this.
</div>

---

## Part 1: Setting Up Your Development Environment

Before we can run the website, we need to install some tools. Think of these as your digital workshop - you need the right tools before you can build anything.

Here's what we need to install:
1. **Node.js** - The engine that runs our website
2. **Git** - Version control (think "save points" for your code)
3. **A Code Editor** - Where you'll write and edit code
4. **pnpm** - A package manager (installs libraries and dependencies)

Don't worry if those terms don't mean much yet. By the end of this section, they will.

> *"The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding."*
> — Proverbs 4:7 (NIV)

---

### Windows Users: Consider WSL First!

If you're on Windows, we **strongly recommend** using WSL (Windows Subsystem for Linux). It gives you a real Linux environment inside Windows, which makes web development significantly smoother. Most tutorials, Stack Overflow answers, and documentation assume you're on Mac or Linux - with WSL, those instructions just work.

<div data-info-box="success" data-title="Why WSL?">
WSL isn't a virtual machine - it's a lightweight Linux kernel running alongside Windows. You get native Linux performance, access to all Linux tools, and you can still use VS Code and your Windows browser. It's the best of both worlds.
</div>

<div data-toggle-box="open" data-title="Installing WSL (Windows 10/11)">

1. **Enable WSL**

Open PowerShell as Administrator (right-click Start → "Windows Terminal (Admin)" or search "PowerShell" and run as admin) and run:

```powershell
wsl --install
```

This installs WSL 2 with Ubuntu as the default distribution. When it's done, **restart your computer**.

2. **Set Up Ubuntu**

After restarting, Ubuntu will launch automatically (or search for "Ubuntu" in the Start menu). The first time, it will ask you to create a username and password. This is your Linux account - it's separate from your Windows account.

<div data-info-box="hint" data-title="Password Tip">
When typing your password in Linux terminals, nothing appears on screen - no dots, no asterisks, nothing. This is normal! Just type your password and press Enter.
</div>

3. **Update Ubuntu**

Run these commands to make sure everything is up to date:

```bash
sudo apt update && sudo apt upgrade -y
```

**Step 4: Access Your Files**

- Your Windows files are at `/mnt/c/Users/YourName/`
- Your Linux home folder is at `~` (or `/home/yourusername/`)
- We recommend keeping your projects in your Linux home folder for better performance

**You're done!** From now on, your **terminal** is the Ubuntu app. For installing command-line tools like Node.js and Git, you'll follow the **Linux** instructions in this guide. For GUI applications like VS Code, you'll still install the regular Windows version, and we'll show you how to connect it to WSL.

</div>

<div data-info-box="info" data-title="Not Using WSL?">
If you prefer to use native Windows (PowerShell/CMD), that's totally fine! We've included Windows-specific instructions for everything. Just expand the "Windows (Native)" sections instead.
</div>

---

### Installing Node.js

Node.js is a JavaScript runtime - basically, it's the engine that powers our website. Without it, nothing works. It's like trying to drive a car without an engine. Let's fix that.

<div data-info-box="info" data-title="Which Version?">
We need Node.js version 18 or higher. The LTS (Long Term Support) version is recommended - it's the stable, battle-tested release.
</div>

<div data-toggle-box data-title="Windows Installation">

**Option 1: Direct Download (Easiest)**

1. Go to [nodejs.org](https://nodejs.org/)
2. Click the big green **LTS** button (it should say 20.x.x or higher)
3. Run the downloaded `.msi` installer
4. Click "Next" through the wizard, accepting the defaults
5. **Important:** Check the box that says "Automatically install the necessary tools" when prompted
6. Click "Install" and wait for it to finish
7. Restart your computer (seriously, do this)

**Option 2: Using winget (If you're feeling fancy)**

Open PowerShell as Administrator and run:

```powershell
winget install OpenJS.NodeJS.LTS
```

**Verify Installation:**

Open a **new** Command Prompt or PowerShell window and type:

```powershell
node --version
```

You should see something like `v20.11.0` (or higher). If you see an error, restart your computer and try again.

</div>

<div data-toggle-box data-title="macOS Installation">

**Option 1: Direct Download**

1. Go to [nodejs.org](https://nodejs.org/)
2. Click the **LTS** button (look for the macOS installer)
3. Open the downloaded `.pkg` file
4. Follow the installation wizard
5. Open Terminal (search for it in Spotlight with Cmd+Space)

**Option 2: Using Homebrew (Recommended for developers)**

If you don't have Homebrew installed yet, open Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install Node.js:

```bash
brew install node@20
```

**Verify Installation:**

Open Terminal and type:

```bash
node --version
```

You should see something like `v20.11.0` or higher.

</div>

<div data-toggle-box data-title="Linux Installation">

The installation varies by distribution. Here are the most common ones:

**Ubuntu/Debian:**

```bash
# Update package list
sudo apt update

# Install Node.js from NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

**Fedora:**

```bash
sudo dnf install nodejs
```

**Arch Linux:**

```bash
sudo pacman -S nodejs npm
```

**Using nvm (Works on any distro - Recommended):**

nvm (Node Version Manager) lets you easily switch between Node versions:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal, then:
nvm install 20
nvm use 20
```

**Verify Installation:**

```bash
node --version
```

You should see `v20.x.x` or higher.

</div>

<div data-info-box="warning" data-title="Version Check">
If `node --version` shows anything lower than `v18.0.0`, you'll need to upgrade. The website uses features that require Node.js 18 or higher.
</div>

---

### Installing Git

Git is version control software. It tracks changes to your code, lets you undo mistakes, and is essential for downloading (cloning) projects from GitHub. Every professional developer uses Git.

<div data-toggle-box="open" data-title="Windows Installation">

**Option 1: Git for Windows (Recommended)**

1. Go to [git-scm.com](https://git-scm.com/)
2. Click "Download for Windows"
3. Run the installer
4. **Important settings during installation:**
   - Choose "Git from the command line and also from 3rd-party software"
   - Choose "Use Visual Studio Code as Git's default editor" (if you're using VS Code)
   - Choose "Override the default branch name" and type `main`
   - Accept defaults for everything else
5. Complete the installation

**Option 2: Using winget**

```powershell
winget install Git.Git
```

**Verify Installation:**

Open a **new** Command Prompt or PowerShell:

```powershell
git --version
```

You should see something like `git version 2.43.0`.

**Configure Git (Required):**

Tell Git who you are (this shows up in your commit history):

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

</div>

<div data-toggle-box data-title="macOS Installation">

**Option 1: Xcode Command Line Tools (Usually pre-installed)**

Open Terminal and type:

```bash
git --version
```

If Git isn't installed, macOS will prompt you to install the Xcode Command Line Tools. Click "Install" and wait.

**Option 2: Using Homebrew**

```bash
brew install git
```

**Verify Installation:**

```bash
git --version
```

**Configure Git:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

</div>

<div data-toggle-box data-title="Linux Installation">

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install git
```

**Fedora:**

```bash
sudo dnf install git
```

**Arch Linux:**

```bash
sudo pacman -S git
```

**Verify Installation:**

```bash
git --version
```

**Configure Git:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

</div>

---

### Installing a Code Editor

You need somewhere to edit code. While you *could* use Notepad, that's like using a butter knife to cut a steak. Let's get you a proper tool.

**We recommend Visual Studio Code (VS Code)** - it's free, powerful, and what most developers use. If you're looking for an editor with more powerful AI features built-in from the ground up, you might also want to check out **Cursor IDE**, which is a fork of VS Code with some impressive capabilities. For this guide, we'll stick with standard VS Code.

<div data-info-box="info" data-title="WSL Users, Read This!">
Even if you're using WSL, you will install VS Code on **Windows**, not Linux. Follow the **Windows Installation** instructions below, which include a special section for connecting VS Code to WSL.
</div>

<div data-toggle-box="open" data-title="Windows Installation">

**For both native Windows and WSL users, you'll install VS Code on Windows itself, not inside Linux.**

1. Go to [code.visualstudio.com](https://code.visualstudio.com/)
2. Click the big blue "Download for Windows" button.
3. Run the installer.
4. **Crucial:** On the "Select Additional Tasks" screen, make sure to check these boxes:
   - "Add 'Open with Code' action to Windows Explorer file context menu"
   - "Add 'Open with Code' action to Windows Explorer directory context menu"
   - **"Add to PATH"** (This is required for both native PowerShell and WSL integration)
5. Complete the installation.

<div data-toggle-box="open" data-title="Extra Step for WSL Users (The Magic Part)">

VS Code's real power on Windows comes from its deep integration with WSL. This is how you connect them.

1.  **Install the WSL Extension:** Open VS Code. It should automatically detect that you have WSL and prompt you to install the recommended "WSL" extension. Click "Install" on that prompt.
    - If you don't see the prompt, open the Extensions view (the four squares icon on the left sidebar, or press `Ctrl+Shift+X`), search for `WSL`, and install the official extension from Microsoft.
2.  **Open a Project from Linux:** Now for the workflow you'll use every day. Open your **Ubuntu terminal** (not PowerShell). `cd` into your project directory (e.g., `cd ~/Projects/lokisoft`). Then type the following command and press Enter:

    ```bash
    code .
    ```

3.  **Connected!** VS Code will launch on your Windows desktop, but it will be remotely connected to the Linux filesystem inside WSL. The built-in terminal in VS Code (`Ctrl+\``) will be your Ubuntu shell. You get the best of both worlds: a fast Windows GUI and a complete Linux development backend.

<div data-info-box="hint" data-title="How to know it's working?">
Look at the bottom-left corner of VS Code. You should see a green button that says `>< WSL: Ubuntu`. This confirms you are connected to your WSL environment.
</div>

From now on, opening projects by typing `code .` from your Ubuntu terminal should be your standard practice.

</div>

<div data-info-box="info" data-title="For Native Windows Users (CMD/PowerShell)">
You're all set! Because you checked "Add to PATH", you can open a project by navigating to its folder in PowerShell or Command Prompt and typing `code .`. Alternatively, you can right-click the folder in File Explorer and choose "Open with Code".
</div>

</div>

<div data-toggle-box data-title="macOS Installation">

1. Go to [code.visualstudio.com](https://code.visualstudio.com/)
2. Click "Download for Mac"
3. Open the downloaded `.zip` file
4. Drag **Visual Studio Code** to your Applications folder
5. Open VS Code, then press `Cmd+Shift+P` and type "shell command"
6. Select "Shell Command: Install 'code' command in PATH"

Now you can type `code .` in Terminal to open the current folder in VS Code!

</div>

<div data-toggle-box data-title="Linux Installation">

**Ubuntu/Debian:**

```bash
# Download the .deb package from code.visualstudio.com
# Or use snap:
sudo snap install code --classic
```

**Fedora:**

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code
```

**Arch Linux:**

```bash
# From AUR
yay -S visual-studio-code-bin
```

</div>

<div data-toggle-box data-title="Supercharge Your Editor: Recommended VS Code Extensions">

A plain code editor is good, but with extensions, it becomes a powerhouse tailored to your workflow. These are the extensions we use and recommend. You can install them by clicking the Extensions icon (looks like four squares) in the VS Code sidebar and searching for the name or ID.

<div data-info-box="hint" data-title="Don't Install Everything at Once!">
We've broken these down by category. Start with the "General Productivity" and "JavaScript & Frontend" extensions. You can install the Rust-related ones later when you decide to explore that part of the ecosystem.
</div>

### General Productivity & UI

These improve the overall editing experience, no matter the language.

- **Code Spell Checker** (`streetsidesoftware.code-spell-checker`): Catches spelling mistakes in your comments and strings. You'll be surprised how many typos it finds.
- **Error Lens** (`usernamehw.errorlens`): Makes errors and warnings much more visible by highlighting the entire line and printing the message inline.
- **GitLens — Git supercharged** (`eamodio.gitlens`): Upgrades the built-in Git features. See who last changed a line of code (`git blame`), browse repository history, and much more.
- **Material Icon Theme** (`PKief.material-icon-theme`): Provides beautiful, distinct icons for different file and folder types, making your file explorer much easier to scan.
- **Path IntelliSense** (`christian-kohler.path-intellisense`): Autocompletes file paths and names in your code.
- **Todo Tree** (`Gruntfuggly.todo-tree`): Finds all `TODO` and `FIXME` comments in your project and displays them in a dedicated panel. Helps you keep track of what needs doing.
- **WSL** (`ms-vscode-remote.remote-wsl`): **Essential for Windows users following our WSL guide.** This is the extension that connects VS Code to your Linux environment.

### JavaScript & Frontend Development

Must-haves for working with Next.js, React, and TypeScript.

- **ESLint** (`dbaeumer.vscode-eslint`): Integrates the ESLint linter directly into the editor. It will find and often automatically fix problems in your code based on the project's rules.
- **Prettier - Code formatter** (`esbenp.prettier-vscode`): The most popular code formatter. Set it to "format on save" and never worry about inconsistent indentation or spacing again.
- **Import Cost** (`wix.vscode-import-cost`): Displays the file size of imported libraries right next to the import line. Crucial for keeping your app fast and lightweight.
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Gives you intelligent autocompletion for Tailwind classes, and even shows you the underlying CSS for each class.
- **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`): A massive time-saver. Type `rfce` in a new file and hit enter to get a complete React functional component skeleton.
- **Auto Rename Tag** (`formulahendry.auto-rename-tag`): When you rename an opening HTML tag, it automatically renames the matching closing tag.
- **Color Highlight** (`naumovs.color-highlight`): Underlines or highlights CSS color values with the color itself, so you can see it at a glance.
- **Pretty TypeScript Errors** (`yoavbls.pretty-ts-errors`): Transforms ugly, multi-line TypeScript errors into a much more readable and cleanly presented format.

### Future-Proofing: Rust & Tauri

We plan to add tutorials for building native desktop apps with Rust and Tauri. When you're ready to dive in, these extensions will be your best friends.

- **rust-analyzer** (`rust-lang.rust-analyzer`): The official language server for Rust. It provides incredibly powerful code completion, type information, and error checking that make writing Rust a joy. It is the single most important extension for Rust development.
- **Even Better TOML** (`tamasfe.even-better-toml`): The Rust ecosystem uses `.toml` files for configuration (like `package.json` in the Node world). This gives you syntax highlighting and validation for them.
- **CodeLLDB** (`vadimcn.vscode-lldb`): A native debugger that allows you to set breakpoints and step through your compiled Rust code. Essential for hunting down complex bugs.
- **Tauri** (`tauri-apps.tauri-vscode`): Provides commands and JSON schema validation for Tauri's configuration files, simplifying the process of building desktop apps.

</div>

---

### Installing pnpm

pnpm is a package manager - it downloads and manages all the libraries our project needs. It's faster and more efficient than npm (which comes with Node.js).

<div data-info-box="info" data-title="Why pnpm?">
pnpm uses a clever system to save disk space and install packages faster. It's becoming the standard for modern projects. Plus, it's what we use, so the instructions will match exactly.
</div>

**This command works on all operating systems:**

Open your terminal (Command Prompt/PowerShell on Windows, Terminal on Mac/Linux) and run:

```bash
npm install -g pnpm
```

**Verify Installation:**

```bash
pnpm --version
```

You should see something like `8.15.0` or higher.

<div data-info-box="success" data-title="Checkpoint!">
Let's verify everything is installed. Run these commands and make sure none of them give errors:

```bash
node --version    # Should show v18.x.x or higher
git --version     # Should show git version 2.x.x
pnpm --version    # Should show 8.x.x or higher
```

All good? Amazing! You've just set up a professional development environment. That's a huge accomplishment - many people give up before getting this far. But not you!
</div>

> *"Commit to the Lord whatever you do, and he will establish your plans."*
> — Proverbs 16:3 (NIV)

---

## Part 2: Getting the Website Running Locally

Now for the exciting part - let's get this website running on your computer!

### Step 1: Clone the Repository

"Cloning" means downloading a copy of the code from GitHub to your computer.

1. **Choose where to put the project**

   Create a folder for your coding projects. I recommend something like:
   - Windows: `C:\Users\YourName\Projects`
   - Mac/Linux: `~/Projects`

2. **Open your terminal in that location**

   **Windows:** Open File Explorer, navigate to your Projects folder, right-click, and select "Open in Terminal" (or "Open PowerShell window here")

   **Mac:** Open Terminal, then type `cd ~/Projects` (create the folder first with `mkdir ~/Projects` if it doesn't exist)

   **Linux:** Same as Mac - `cd ~/Projects`

3. **Clone the repository**

```bash
git clone https://github.com/LokiRothbrook/lokisoft.git
```

You'll see Git downloading the files. When it's done, you'll have a new `lokisoft` folder.

4. **Enter the project directory**

```bash
cd lokisoft
```

### Step 2: Install Dependencies

The project uses dozens of libraries (called "dependencies"). pnpm will download all of them:

```bash
pnpm install
```

This might take a minute or two. You'll see a progress bar as packages download.

<div data-info-box="warning" data-title="Got Errors?">
If you see errors about permissions, try:
- **Windows:** Run PowerShell as Administrator
- **Mac/Linux:** Don't use `sudo` with pnpm - if you get permission errors, there's likely an issue with your Node.js installation
</div>

### Step 3: Set Up Environment Variables

The website needs some configuration to work properly. We store sensitive information (like API keys) in a special file called `.env.local`.

1. **Copy the example file:**

```bash
# Windows (PowerShell)
Copy-Item env.example .env.local

# Mac/Linux
cp env.example .env.local
```

2. **Open `.env.local` in VS Code:**

```bash
code .env.local
```

You'll see something like this:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=YourSiteName

# Contact Form (Resend)
RESEND_API_KEY=
CONTACT_EMAIL=
RESEND_DOMAIN=

# Comments (Giscus)
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=

# CAPTCHA (Cloudflare Turnstile)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

For now, just update the site name:

```bash
NEXT_PUBLIC_SITE_NAME=My Awesome Site
```

We'll fill in the rest later. The site will work without them - you just won't have the contact form, comments, or CAPTCHA yet.

### Step 4: Start the Development Server

The moment of truth! Run:

```bash
pnpm dev
```

You should see:

```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Ready in Xs
```

Open your browser and go to **http://localhost:3000**

<div data-info-box="success" data-title="You Did It!">
If you see the website loading, congratulations! You're running a professional Next.js website on your own computer. That's genuinely impressive - take a moment to appreciate what you've accomplished!
</div>

The development server has **hot reloading** - when you change code, the browser automatically refreshes. Try editing `app/page.tsx` and watch the magic happen!

> *"The one who gets wisdom loves life; the one who cherishes understanding will soon prosper."*
> — Proverbs 19:8 (NIV)

---

## Part 3: Setting Up Third-Party Services

To get all features working, we need to set up three services:
1. **Resend** - For the contact form to send emails
2. **Cloudflare Turnstile** - To protect against spam bots
3. **Giscus** - For blog post comments

All of these are **free** for personal/small projects.

---

### Setting Up Resend (Contact Form)

Resend is an email service that sends emails from your contact form to your inbox.

<div data-toggle-box="open" data-title="Resend Setup Steps">

**Step 1: Create an Account**

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" and create an account
3. Verify your email address

**Step 2: Add and Verify Your Domain**

1. In the Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain name (e.g., `yourdomain.com`)
4. Resend will give you DNS records to add to your domain
5. Add these records in your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
6. Click **Verify** in Resend once the records are added

<div data-info-box="info" data-title="Don't Have a Domain Yet?">
No worries! For testing, Resend lets you send to your own email address without domain verification. You can set up the domain later when you're ready to go live.
</div>

**Step 3: Generate an API Key**

1. Go to **API Keys** in the Resend dashboard
2. Click **Create API Key**
3. Give it a name (like "LokiSoft Website")
4. Copy the key - you'll only see it once!

**Step 4: Update Your .env.local**

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=your-personal-email@gmail.com
RESEND_DOMAIN=yourdomain.com
```

- `RESEND_API_KEY` - The key you just copied
- `CONTACT_EMAIL` - Where contact form submissions get sent
- `RESEND_DOMAIN` - Your verified domain (or leave blank for testing)

</div>

---

### Setting Up Cloudflare Turnstile (CAPTCHA)

Turnstile protects your contact form from spam bots. It's like reCAPTCHA but more privacy-friendly and less annoying for users.

<div data-toggle-box="open" data-title="Turnstile Setup Steps">

**Step 1: Create a Cloudflare Account**

1. Go to [cloudflare.com](https://www.cloudflare.com)
2. Sign up for a free account
3. You don't need to add a website - we just need Turnstile

**Step 2: Set Up Turnstile**

1. In the Cloudflare dashboard, find **Turnstile** in the sidebar
2. Click **Add Site**
3. Enter a site name (e.g., "My Website")
4. For **Domain**, enter `localhost` for testing (add your real domain later)
5. Choose **Widget Mode**: "Managed" is recommended
6. Click **Create**

**Step 3: Get Your Keys**

After creation, you'll see:
- **Site Key** - Public, goes in your frontend
- **Secret Key** - Private, stays on your server

**Step 4: Update Your .env.local**

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxx
```

<div data-info-box="hint" data-title="Testing Keys">
Cloudflare provides test keys that always pass or always fail. Useful for development:
- Always passes: Site Key `1x00000000000000000000AA`, Secret Key `1x0000000000000000000000000000000AA`
- Always fails: Site Key `2x00000000000000000000AB`, Secret Key `2x0000000000000000000000000000000AB`
</div>

</div>

---

### Setting Up Giscus (Comments)

Giscus turns GitHub Discussions into a comment system for your blog. Readers can comment using their GitHub accounts.

<div data-toggle-box="open" data-title="Giscus Setup Steps">

**Step 1: Fork or Create Your Repository**

You need a public GitHub repository with Discussions enabled.

1. If you haven't already, [create a GitHub account](https://github.com)
2. Either:
   - Fork the LokiSoft repository to your account, OR
   - Create a new public repository for your site

**Step 2: Enable Discussions**

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll down to **Features**
4. Check the box for **Discussions**
5. Go to the **Discussions** tab and create a category called "Blog Comments"

**Step 3: Install the Giscus App**

1. Go to [github.com/apps/giscus](https://github.com/apps/giscus)
2. Click **Install**
3. Choose your repository
4. Authorize the app

**Step 4: Configure Giscus**

1. Go to [giscus.app](https://giscus.app)
2. Enter your repository name (e.g., `yourusername/your-repo`)
3. Choose mapping: **pathname** (recommended)
4. Choose your Discussion category: **Blog Comments**
5. Scroll down - Giscus will generate your configuration

**Step 5: Update Your .env.local**

The Giscus website will show you values like this:

```javascript
data-repo="yourusername/your-repo"
data-repo-id="R_kgDOxxxxxx"
data-category="Blog Comments"
data-category-id="DIC_kwDOxxxxxx"
```

Add them to your `.env.local`:

```bash
NEXT_PUBLIC_GISCUS_REPO=yourusername/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Blog Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxx
```

</div>

<div data-info-box="success" data-title="Services Complete!">
Restart your development server (`Ctrl+C` then `pnpm dev`) to load the new environment variables. Your contact form, CAPTCHA, and comments should now all work!
</div>

> *"Plans fail for lack of counsel, but with many advisers they succeed."*
> — Proverbs 15:22 (NIV)

---

## Part 4: Making It Your Own

Now let's transform this from "the LokiSoft website" into "YOUR website."

### Update the Site Configuration

The main site settings are in `lib/data/site.ts`:

```typescript
export const siteConfig = {
  name: "Your Site Name",
  description: "Your site description",
  url: "https://yoursite.com",
  // ... more settings
};
```

### Update Branding

**Logo:** Edit `components/ui/neon-logo.tsx` or replace with your own logo component.

**Colors:** All theme colors are in `app/globals.css`. Look for the `:root` section:

```css
:root {
  --neon-pink: #ec4899;
  --neon-purple: #a855f7;
  --neon-blue: #3b82f6;
  --neon-cyan: #22d3ee;
}
```

### Update Services and Products

Your offerings are defined in:
- `lib/data/services.ts` - Services you offer
- `lib/data/products.ts` - Products you sell

Edit these files to reflect your business!

### Update Content Pages

Key pages to customize:
- `app/page.tsx` - Homepage
- `app/about/page.tsx` - About page
- `lib/data/homepage.ts` - Homepage content configuration
- `lib/data/about.ts` - About page content configuration

### Add Your First Blog Post

Create a new file in `posts/` with a `.md` extension:

```markdown
---
title: "My First Post"
date: 2026-01-20
author: Your Name
excerpt: A brief description of your post.
categories: General
difficulty: 1
---

# Hello World!

This is my first blog post. Exciting times!
```

That's it - your post will automatically appear on the blog page!

---

## Part 5: Deploying to Vercel

Time to show the world what you've built! Vercel is the company behind Next.js and offers the easiest deployment experience.

<div data-toggle-box="open" data-title="Step-by-Step Vercel Deployment">

**Step 1: Push Your Code to GitHub**

If you forked the repo, you're already set. If not:

1. Create a new repository on [github.com](https://github.com)
2. Push your code:

```bash
git remote set-url origin https://github.com/yourusername/your-repo.git
git add .
git commit -m "Initial commit - my awesome website"
git push -u origin main
```

**Step 2: Create a Vercel Account**

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub** (easiest option)
4. Authorize Vercel to access your GitHub

**Step 3: Import Your Project**

1. Click **Add New** → **Project**
2. Find your repository and click **Import**
3. Vercel will detect it's a Next.js project automatically

**Step 4: Configure Environment Variables**

Before deploying, add your environment variables:

1. Expand the **Environment Variables** section
2. Add each variable from your `.env.local` file:
   - `NEXT_PUBLIC_SITE_URL` → Your production URL (e.g., `https://yoursite.vercel.app`)
   - `NEXT_PUBLIC_SITE_NAME` → Your site name
   - `RESEND_API_KEY` → Your Resend API key
   - `CONTACT_EMAIL` → Your email
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` → Your Turnstile site key
   - `TURNSTILE_SECRET_KEY` → Your Turnstile secret key
   - `NEXT_PUBLIC_GISCUS_REPO` → Your Giscus repo
   - `NEXT_PUBLIC_GISCUS_REPO_ID` → Your Giscus repo ID
   - `NEXT_PUBLIC_GISCUS_CATEGORY` → Your Giscus category
   - `NEXT_PUBLIC_GISCUS_CATEGORY_ID` → Your Giscus category ID

<div data-info-box="warning" data-title="Important!">
Update your Cloudflare Turnstile settings to include your Vercel domain (e.g., `yoursite.vercel.app`) or it won't work in production!
</div>

**Step 5: Deploy!**

Click **Deploy** and wait. Vercel will:
1. Clone your repository
2. Install dependencies
3. Build your project
4. Deploy to their global edge network

In about 1-2 minutes, you'll get a URL like `https://your-project.vercel.app`

**Your website is now live on the internet!**

</div>

<div data-info-box="success" data-title="Custom Domain">
Want to use your own domain instead of `.vercel.app`? Go to your project settings on Vercel, click **Domains**, and add your custom domain. Vercel provides free SSL certificates automatically!
</div>

### Automatic Deployments

Here's the beautiful part: every time you push code to GitHub, Vercel automatically deploys it. Edit a blog post, push to GitHub, and it's live in minutes. No manual deployment needed.

```bash
# Make a change, commit, and push
git add .
git commit -m "Added new blog post"
git push
```

Vercel does the rest!

---

## Part 6: Troubleshooting

Things don't always go smoothly. Here are solutions to common problems:

<div data-toggle-box data-title="Error: Node.js version too old">

**Symptoms:** Errors mentioning Node.js version or syntax errors on modern JavaScript

**Solution:**
1. Check your version: `node --version`
2. If below v18, upgrade Node.js using the instructions earlier in this guide
3. If using nvm: `nvm install 20 && nvm use 20`

</div>

<div data-toggle-box data-title="Error: pnpm install fails">

**Symptoms:** Errors during dependency installation

**Solution:**
1. Delete `node_modules` folder and `pnpm-lock.yaml`
2. Run `pnpm install` again
3. If still failing, try `pnpm install --force`

</div>

<div data-toggle-box data-title="Error: Port 3000 already in use">

**Symptoms:** Can't start dev server, port conflict

**Solution:**

Windows:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
lsof -i :3000
kill -9 <PID>
```

Or use a different port: `PORT=3001 pnpm dev`

</div>

<div data-toggle-box data-title="Environment variables not working">

**Symptoms:** Features like contact form don't work, variables seem empty

**Solution:**
1. Make sure the file is named exactly `.env.local` (not `.env`)
2. Restart the dev server after changing env variables
3. Variables starting with `NEXT_PUBLIC_` are exposed to the browser
4. Other variables are server-side only

</div>

<div data-toggle-box data-title="Contact form not sending emails">

**Symptoms:** Form submits but no email arrives

**Solution:**
1. Check your Resend dashboard for failed sends
2. Verify your domain is verified in Resend (or use test mode)
3. Check the `CONTACT_EMAIL` is correct
4. Look at browser console for errors

</div>

<div data-toggle-box data-title="Vercel deployment fails">

**Symptoms:** Build errors on Vercel

**Solution:**
1. Check the build logs in Vercel dashboard
2. Make sure it builds locally first: `pnpm build`
3. Verify all environment variables are set in Vercel
4. Check that your Node.js version matches (set in package.json or Vercel settings)

</div>

---

## What's Next?

Congratulations! You now have a professional website deployed to the internet. Here's where to go from here:

### Immediate Next Steps

- [ ] Customize all content to reflect your brand
- [ ] Add your own blog posts
- [ ] Update the services and products pages
- [ ] Share your site with the world!

### Coming Soon: Self-Hosting Guide

While Vercel is fantastic (and free!), some of you may want complete control over your infrastructure. Maybe you have a home server, a VPS, or just want to learn more about deployment.

**We're working on a comprehensive self-hosting guide** that will cover:
- Docker containerization
- Nginx reverse proxy setup
- SSL certificates with Let's Encrypt
- Automatic deployments with GitHub Actions
- Database backups and maintenance
- Performance optimization

Stay tuned - we'll announce it on the blog and update this post with a link when it's ready!

<div data-info-box="hint" data-title="Get Notified">
Follow us on GitHub or check back regularly for the self-hosting guide. It's going to be thorough - the same "assume nothing" approach we took here.
</div>

### Learn More

- **[Markdown Features Guide](/blog/example-post)** - Learn all the cool things you can do in blog posts
- **[Post Writing Template](/blog/optimized-post)** - A template for writing engaging content
- **[Next.js Documentation](https://nextjs.org/docs)** - Deep dive into the framework

---

## Conclusion

You've done something remarkable today. You went from "I have a computer" to "I have a professional website live on the internet." That's not a small thing. That's a genuine skill that many people pay thousands to learn.

More importantly, you proved to yourself that you can figure things out. Every developer started exactly where you are now - staring at a blank screen, wondering if they could do it. And now you've done it.

Keep building. Keep learning. Don't be afraid to break things (that's how we learn). And remember: every expert was once a beginner who refused to give up.

> *"And let us not grow weary of doing good, for in due season we will reap, if we do not give up."*
> — Galatians 6:9 (ESV)

The code is free. The knowledge is free. What you build with it? That's up to you.

---

## A Prayer for Builders

*Lord, thank You for the opportunity to create and build. Thank You for communities that share knowledge freely and help each other grow.*

*Bless everyone who uses this resource. Give them wisdom as they learn, patience when they struggle, and joy when they succeed. Help them build things that serve others well.*

*May our work honor You - whether it's code, content, or connections. Use what we create to help others and make the world a little better.*

*When the bugs seem endless and the errors make no sense, remind us that every challenge is an opportunity to grow. Help us persevere.*

*In Jesus' name, Amen.*

---

## Complete Setup Checklist

Track your progress from zero to deployed:

### Development Environment
- [ ] Node.js 18+ installed and verified
- [ ] Git installed and configured
- [ ] VS Code (or preferred editor) installed
- [ ] pnpm installed globally

### Project Setup
- [ ] Repository cloned
- [ ] Dependencies installed with pnpm
- [ ] Environment file created (.env.local)
- [ ] Development server running

### Third-Party Services
- [ ] Resend account created
- [ ] Resend API key generated
- [ ] Cloudflare account created
- [ ] Turnstile site and keys configured
- [ ] GitHub Discussions enabled
- [ ] Giscus app installed
- [ ] Giscus configuration added to .env.local

### Customization
- [ ] Site name and description updated
- [ ] Branding colors customized
- [ ] Logo updated
- [ ] About page content changed
- [ ] Services/Products updated
- [ ] First blog post created

### Deployment
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables configured in Vercel
- [ ] Turnstile domain updated for production
- [ ] Successfully deployed

<div data-info-box="success" data-title="You've Got This!">
Building your own website might seem daunting at first, but you've already taken the biggest step - getting started. Every checkbox you complete is progress. Every error you solve makes you stronger. Keep going!
</div>

---

*Have questions? Found an error in this guide? Open an issue on [GitHub](https://github.com/LokiRothbrook/LokiSoft) or reach out through our [contact page](/contact). We're here to help!*
