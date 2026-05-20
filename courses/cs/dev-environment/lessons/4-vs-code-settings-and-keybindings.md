---
title: "Lesson 4: VS Code Settings and Keybindings — Mastering Your Tools"
date: 2026-05-19
author: LokiSoft Team
excerpt: A properly configured VS Code saves hours every week. Learn the essential settings, the perfect settings.json configuration, and the keyboard shortcuts that professional developers have memorized.
categories: shadcn-nextjs, Beginner, Dev Environment
difficulty: 1
featured: false
coverImage: /dev-environment-cover.svg
---

# Lesson 4: VS Code Settings and Keybindings — Mastering Your Tools

> *"If the ax is dull and its edge unsharpened, more strength is needed, but skill will bring success."*
> — Ecclesiastes 10:10 (NIV)

---

## Introduction

You now have VS Code installed and equipped with the right extensions. There is one more step before you are ready to write your first line of code: **configuration**.

A default VS Code installation is usable, but it is not optimized. Without the right settings, you will manually format code that should format automatically. You will squint at a font that should be crystal clear. You will click with a mouse for actions that should take one keystroke. Small friction, multiplied across hundreds of hours of work, becomes enormous wasted time and energy.

This lesson fixes all of that. By the end, your VS Code will:
- Automatically format every file on save using Prettier
- Use a font designed specifically for code, with ligatures that make symbols clearer
- Have a theme that is comfortable for long sessions
- Give you keyboard shortcuts that professional developers have muscle-memorized

This lesson does not just tell you *what* to configure. It tells you *why* each setting matters, so that if a future project needs different settings, you understand the tradeoffs.

<div data-info-box="hint" data-title="Settings Sync">
If you enabled Settings Sync in Lesson 3, any changes you make here will automatically be synced to your other machines. Configure it once — have it everywhere.
</div>

### What You'll Learn

- The two ways to edit VS Code settings (UI and JSON)
- Every essential setting and exactly what it does
- The complete `settings.json` configuration for this course
- Theme and font recommendations
- Every keyboard shortcut a professional web developer uses daily
- How to customize or add your own keybindings

### Prerequisites

| Requirement | Status |
|-------------|--------|
| Lesson 3: VS Code Extensions | ✅ Complete |
| Prettier extension installed | Required for Format on Save |

---

## Two Ways to Edit Settings

VS Code settings can be edited in two ways and it is important to understand both.

### The Settings UI

The easiest way to explore settings. Open it with:

| Platform | Shortcut |
|----------|----------|
| Windows / Linux | `Ctrl + ,` (comma) |
| macOS | `Cmd + ,` (comma) |

The Settings UI shows every available setting with a description, a search box, and visual controls (checkboxes, dropdowns, text boxes). It is great for discovering settings you did not know existed.

### settings.json

Under the hood, every setting is stored as JSON in a file called `settings.json`. Editing this file directly is faster and more precise than the UI, and it is trivially easy to copy your configuration to a new machine or share it with teammates.

**To open settings.json:**
1. Open the Command Palette: `Ctrl + Shift + P` / `Cmd + Shift + P`
2. Type `Open User Settings JSON`
3. Select **Preferences: Open User Settings (JSON)**

This opens a JSON file where each setting is a key-value pair.

<div data-info-box="info" data-title="User Settings vs Workspace Settings">
<strong>User settings</strong> apply to every project on your machine — the global defaults. <strong>Workspace settings</strong> are stored in a <code>.vscode/settings.json</code> file inside your project folder and override user settings for that project only. For this course, we configure user settings. Some projects you work on professionally may have their own workspace settings that your team shares.
</div>

---

## Choosing a Theme

Before anything else, pick a theme you can live with. You will be looking at this for thousands of hours.

VS Code comes with several built-in themes. To switch themes:
1. Press `Ctrl + K, Ctrl + T` (Windows/Linux) or `Cmd + K, Cmd + T` (macOS)
2. A picker appears with a live preview as you arrow through the options

**Highly recommended themes (all free, installed via the Extensions panel):**

| Theme | Style | Extension ID |
|-------|-------|-------------|
| **One Dark Pro** | Dark, popular, easy on eyes | `zhuangtongfa.material-theme` |
| **Dracula Official** | Dark purple, high contrast | `dracula-theme.theme-dracula` |
| **GitHub Dark** | Dark, matches GitHub's UI | `github.github-vscode-theme` |
| **Catppuccin** | Pastel dark, very readable | `catppuccin.catppuccin-vsc` |
| **Night Owl** | Dark, designed by an a11y expert | `sdras.night-owl` |

Install any of these from the Extensions panel just like the extensions in Lesson 3. Once installed, use the theme picker to activate it.

<div data-info-box="hint" data-title="Light Themes Are Fine">
Many developers prefer light themes, especially in brightly lit rooms. GitHub Light and Solarized Light are excellent choices. Do not let anyone tell you dark mode is required — use what is comfortable for your eyes.
</div>

---

## Choosing a Font

The default VS Code font varies by OS (Consolas on Windows, Menlo on macOS, DejaVu Sans Mono on Linux). All of these are readable, but there are dedicated programming fonts that are cleaner and support **ligatures** — where multi-character symbols like `=>`, `!==`, and `>=` render as single elegant glyphs.

**Recommended programming fonts (all free):**

| Font | Ligatures | Download |
|------|-----------|----------|
| **JetBrains Mono** | ✅ | jetbrains.com/lp/mono |
| **Fira Code** | ✅ | github.com/tonsky/FiraCode |
| **Cascadia Code** | ✅ | github.com/microsoft/cascadia-code |
| **Hack** | ❌ | sourcefoundry.org/hack |

**Installing a font:**

**Linux / macOS:**
```bash
# JetBrains Mono example — download the zip from jetbrains.com,
# extract it, then:

# macOS — double-click each .ttf file and click "Install Font"

# Linux (Ubuntu/Debian)
mkdir -p ~/.local/share/fonts
cp ~/Downloads/JetBrainsMono/*.ttf ~/.local/share/fonts/
fc-cache -fv
```

**Windows:**
1. Download the font zip file
2. Extract it
3. Select all `.ttf` files
4. Right-click → **Install for all users**

After installing the font, set it in VS Code's settings (shown in the settings.json section below).

---

## The Essential Settings

Here is every setting you need to configure, explained individually before we put them all together.

### Format on Save

```json
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode"
```

**What it does:** Every time you press save (`Ctrl+S` / `Cmd+S`), VS Code automatically runs Prettier on the current file. Your code is always consistently formatted without any extra effort.

**Why it matters:** This is the single most valuable setting in this entire lesson. Inconsistent indentation and formatting cause countless merge conflicts and make code harder to read. Format on Save eliminates the problem before it starts.

### Auto Save

```json
"files.autoSave": "onFocusChange"
```

**What it does:** Automatically saves the current file whenever you click away from it — switching tabs, switching applications, or clicking in the terminal.

**Why it matters:** You will never lose work to a forgotten save. Combined with Format on Save, this means your files are always saved and always formatted. Some developers prefer `"afterDelay"` with a short delay (e.g., 1000ms) — both approaches work well.

### Tab Size and Indentation

```json
"editor.tabSize": 2,
"editor.detectIndentation": false
```

**What it does:** Sets the number of spaces per indentation level to 2, and disables VS Code's habit of guessing the indentation from file content. Two-space indentation is the standard in the JavaScript/TypeScript/React ecosystem.

### Word Wrap

```json
"editor.wordWrap": "on"
```

**What it does:** Long lines wrap to the next line instead of going off-screen. You never have to scroll horizontally.

### Minimap

```json
"editor.minimap.enabled": false
```

**What it does:** Hides the minimap — the bird's-eye view of code on the right side of the editor. Personal preference, but disabling it gives you more horizontal space for your code.

### Cursor Style and Blinking

```json
"editor.cursorBlinking": "smooth",
"editor.cursorSmoothCaretAnimation": "on"
```

**What it does:** A purely cosmetic setting that makes the cursor animate smoothly rather than blink abruptly. Genuinely makes the editor feel more polished.

### Bracket Pair Colorization

```json
"editor.bracketPairColorization.enabled": true,
"editor.guides.bracketPairs": "active"
```

**What it does:** Matching brackets are colored the same color (the opening `{` and its closing `}` share a color), and a vertical line connects them. This makes nested code dramatically easier to read.

### File Explorer Configuration

```json
"explorer.confirmDelete": false,
"explorer.confirmDragAndDrop": false
```

**What it does:** Removes the "are you sure?" confirmation dialog when deleting or moving files in the Explorer. If you accidentally delete something, `Ctrl+Z` undoes it anyway.

### Terminal Configuration

```json
"terminal.integrated.fontSize": 14,
"terminal.integrated.fontFamily": "JetBrains Mono, monospace"
```

**What it does:** Sets a readable font size and applies your chosen font to the integrated terminal as well.

### JavaScript and TypeScript Configuration

```json
"javascript.updateImportsOnFileMove.enabled": "always",
"typescript.updateImportsOnFileMove.enabled": "always"
```

**What it does:** When you rename or move a file, VS Code automatically updates all `import` statements in your project that referenced the old path. This is a massive time-saver.

---

## Your Complete settings.json

Here is everything above in one clean `settings.json`. Open your User Settings JSON (`Ctrl+Shift+P` → `Open User Settings JSON`) and replace its contents with this:

```json
{
  // --- Editor ---
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "editor.fontFamily": "JetBrains Mono, Fira Code, Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6,
  "editor.renderWhitespace": "boundary",
  "editor.linkedEditing": true,

  // --- Files ---
  "files.autoSave": "onFocusChange",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,

  // --- Explorer ---
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,

  // --- Terminal ---
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.fontFamily": "JetBrains Mono, monospace",
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.linux": "bash",

  // --- JavaScript / TypeScript ---
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.preferences.importModuleSpecifier": "relative",

  // --- Git ---
  "git.autofetch": true,
  "git.confirmSync": false,

  // --- Prettier ---
  "prettier.singleQuote": true,
  "prettier.semi": false,
  "prettier.trailingComma": "es5",
  "prettier.printWidth": 80
}
```

<div data-info-box="info" data-title="About the Prettier Settings">
The Prettier settings at the bottom define your code style: single quotes instead of double quotes, no semicolons at the end of lines (the modern JS convention), trailing commas where valid, and a line width of 80 characters. These match the conventions used in most Next.js and React projects. You can change them to your preference, but being consistent matters more than which style you choose.
</div>

<div data-toggle-box data-title="Understanding 'editor.linkedEditing': true">

`"editor.linkedEditing": true` is a built-in VS Code feature (not an extension) that does exactly what the Auto Rename Tag extension does — it renames matching HTML/JSX opening and closing tags simultaneously.

You might wonder: since you have the Auto Rename Tag extension AND this setting, which one handles the renaming? The answer is: both will try to, which can cause the tag to be renamed twice. There are two ways to handle this:

**Option A:** Keep both. Most of the time they play nicely together and having both is redundant but harmless.

**Option B:** Disable the Auto Rename Tag extension and rely solely on `linkedEditing`. This is the cleaner approach since it uses a built-in VS Code feature rather than a third-party extension.

For this course, we keep the extension installed because it is widely used and recommended, but be aware of this interaction if you ever see tags being double-renamed.

</div>

---

## Keyboard Shortcuts — Your Speed Multiplier

Keyboard shortcuts are where good developers become fast developers. Every time you reach for the mouse to do something that has a keyboard shortcut, you lose about 2 seconds. That is thousands of seconds per year. More importantly, the interruption breaks your concentration.

You do not need to memorize all of these at once. Read through them now to know they exist, then return to this table whenever you catch yourself doing something slowly.

> *"A person finds joy in giving an apt reply — and how good is a timely word!"*
> — Proverbs 15:23 (NIV)

The fastest shortcut is the one already at your fingertips.

### Universal Shortcuts (same on all platforms, Ctrl = Cmd on macOS)

| Action | Windows / Linux | macOS |
|--------|----------------|-------|
| **Command Palette** | `Ctrl + Shift + P` | `Cmd + Shift + P` |
| **Quick Open file** | `Ctrl + P` | `Cmd + P` |
| **Save file** | `Ctrl + S` | `Cmd + S` |
| **Undo** | `Ctrl + Z` | `Cmd + Z` |
| **Redo** | `Ctrl + Shift + Z` | `Cmd + Shift + Z` |
| **Find in file** | `Ctrl + F` | `Cmd + F` |
| **Find in all files** | `Ctrl + Shift + F` | `Cmd + Shift + F` |
| **Find and replace** | `Ctrl + H` | `Cmd + H` |
| **Toggle sidebar** | `Ctrl + B` | `Cmd + B` |
| **Toggle terminal** | `` Ctrl + ` `` | `` Ctrl + ` `` |
| **New terminal** | `` Ctrl + Shift + ` `` | `` Ctrl + Shift + ` `` |
| **Close tab** | `Ctrl + W` | `Cmd + W` |
| **Reopen closed tab** | `Ctrl + Shift + T` | `Cmd + Shift + T` |
| **Switch between tabs** | `Ctrl + Tab` | `Ctrl + Tab` |
| **Go to specific tab** | `Ctrl + 1/2/3...` | `Cmd + 1/2/3...` |
| **Split editor** | `Ctrl + \` | `Cmd + \` |

### Code Editing Shortcuts

| Action | Windows / Linux | macOS |
|--------|----------------|-------|
| **Format document** | `Shift + Alt + F` | `Shift + Option + F` |
| **Comment/uncomment line** | `Ctrl + /` | `Cmd + /` |
| **Duplicate line down** | `Shift + Alt + ↓` | `Shift + Option + ↓` |
| **Move line up/down** | `Alt + ↑ / ↓` | `Option + ↑ / ↓` |
| **Delete entire line** | `Ctrl + Shift + K` | `Cmd + Shift + K` |
| **Add cursor above/below** | `Ctrl + Alt + ↑ / ↓` | `Cmd + Option + ↑ / ↓` |
| **Select all occurrences** | `Ctrl + Shift + L` | `Cmd + Shift + L` |
| **Select next occurrence** | `Ctrl + D` | `Cmd + D` |
| **Go to line number** | `Ctrl + G` | `Ctrl + G` |
| **Indent line** | `Tab` | `Tab` |
| **Unindent line** | `Shift + Tab` | `Shift + Tab` |
| **Expand selection** | `Shift + Alt + →` | `Shift + Option + →` |

### Navigation Shortcuts

| Action | Windows / Linux | macOS |
|--------|----------------|-------|
| **Go to definition** | `F12` | `F12` |
| **Peek definition** | `Alt + F12` | `Option + F12` |
| **Go back** | `Alt + ←` | `Ctrl + -` |
| **Go forward** | `Alt + →` | `Ctrl + Shift + -` |
| **Go to beginning of file** | `Ctrl + Home` | `Cmd + ↑` |
| **Go to end of file** | `Ctrl + End` | `Cmd + ↓` |
| **Go to beginning of line** | `Home` | `Cmd + ←` |
| **Go to end of line** | `End` | `Cmd + →` |
| **Select entire line** | `Ctrl + L` | `Cmd + L` |

<div data-info-box="hint" data-title="The Two Shortcuts That Matter Most">
If you only memorize two shortcuts right now, make them these:

<strong>Ctrl/Cmd + Shift + P</strong> — The Command Palette. When you do not know the shortcut for something, open the Command Palette and type what you want to do. It will find the command.

<strong>Ctrl/Cmd + P</strong> — Quick Open. When you know the name of a file but do not want to navigate the file tree to find it, press this and start typing the filename. Fuzzy search finds it instantly.
</div>

---

## The Multi-Cursor Superpower

One feature deserves special attention because it is not obvious but saves enormous time once you know about it.

**Multi-cursor editing** lets you place your cursor in multiple places at once and type — every cursor produces the same text simultaneously. This is incredibly powerful for repetitive edits.

**Common multi-cursor workflows:**

**1. Select all occurrences of the selected text:**
Select a word → `Ctrl + Shift + L` (Windows/Linux) / `Cmd + Shift + L` (macOS)
Every instance of that word gets a cursor. Type the replacement and all are updated at once.

**2. Add a cursor manually:**
`Alt + Click` anywhere to add a cursor at that position.

**3. Add cursors above and below:**
`Ctrl + Alt + ↑/↓` (Windows/Linux) / `Cmd + Option + ↑/↓` (macOS)

**4. Select the next occurrence of the current selection:**
`Ctrl + D` / `Cmd + D` — each press selects the next match. When all are selected, typing replaces all of them.

---

## Customizing Keybindings

If you want to change a keybinding or add a new one, VS Code makes it easy.

**To open the Keybindings editor:**
1. Press `Ctrl + Shift + P` / `Cmd + Shift + P`
2. Type `Open Keyboard Shortcuts`
3. Select **Preferences: Open Keyboard Shortcuts**

Search for any command by name. Click the pencil icon to change its keybinding.

**To edit keybindings as JSON:**
1. Open Command Palette → **Preferences: Open Keyboard Shortcuts (JSON)**
2. This opens `keybindings.json`

Example — adding a keybinding to open a new terminal with `Ctrl + Shift + N`:

```json
[
  {
    "key": "ctrl+shift+n",
    "command": "workbench.action.terminal.new"
  }
]
```

<div data-toggle-box data-title="Useful Custom Keybindings to Consider">

Here are some popular custom keybindings worth considering. Add any of these to your `keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+n",
    "command": "workbench.action.terminal.new",
    "when": "terminalFocus"
  },
  {
    "key": "ctrl+shift+w",
    "command": "workbench.action.terminal.kill",
    "when": "terminalFocus"
  },
  {
    "key": "alt+z",
    "command": "editor.action.toggleWordWrap"
  }
]
```

These add a shortcut to create a new terminal tab, kill the current terminal, and toggle word wrap — all without leaving the keyboard.

</div>

---

## Printing Your Settings

Here is your full configuration at a glance — the settings and the keyboard shortcuts you will use every single day:

```
OPEN COMMAND PALETTE:    Ctrl/Cmd + Shift + P
QUICK OPEN FILE:         Ctrl/Cmd + P
TOGGLE TERMINAL:         Ctrl + `
FORMAT DOCUMENT:         Shift + Alt/Option + F
COMMENT/UNCOMMENT:       Ctrl/Cmd + /
DUPLICATE LINE:          Shift + Alt/Option + ↓
MOVE LINE UP/DOWN:       Alt/Option + ↑/↓
SELECT NEXT OCCURRENCE:  Ctrl/Cmd + D
SELECT ALL OCCURRENCES:  Ctrl/Cmd + Shift + L
GO TO DEFINITION:        F12
```

Print this out, put it on your desk, and refer to it until the shortcuts are muscle memory. Most developers find that after two to three weeks of conscious effort, the shortcuts become automatic.

---

## Knowledge Check

<div data-quiz-group data-title="VS Code Settings and Keybindings — Knowledge Check">

<div data-quiz-question="What does 'editor.formatOnSave: true' do, and which extension must be installed for it to work correctly?" data-correct="2" data-explanation="formatOnSave tells VS Code to run the configured formatter every time you press Ctrl+S / Cmd+S. For JavaScript, TypeScript, HTML, and CSS, the formatter is Prettier. Without Prettier installed and set as the defaultFormatter, formatOnSave will either do nothing or use a different (possibly wrong) formatter.">
<div data-quiz-option>It saves a backup copy of your file on every save; no extension needed</div>
<div data-quiz-option>It runs ESLint to fix code errors on save; ESLint must be installed</div>
<div data-quiz-option>It runs Prettier to format your code on every save; Prettier must be installed</div>
<div data-quiz-option>It uploads the file to GitHub on every save; GitLens must be installed</div>
</div>

<div data-quiz-question="What is the keyboard shortcut to open the Command Palette?" data-correct="1" data-explanation="Ctrl+Shift+P on Windows/Linux and Cmd+Shift+P on macOS opens the Command Palette. This is the single most important shortcut in VS Code — if you don't know the shortcut for something, the Command Palette lets you search for any command by name and execute it directly.">
<div data-quiz-option>Ctrl/Cmd + P</div>
<div data-quiz-option>Ctrl/Cmd + Shift + P</div>
<div data-quiz-option>Ctrl/Cmd + Shift + X</div>
<div data-quiz-option>F1 (only on Windows)</div>
</div>

<div data-quiz-question="What is the difference between User Settings and Workspace Settings in VS Code?" data-correct="3" data-explanation="User Settings are global — they apply to every project on your machine. Workspace Settings are stored in a .vscode/settings.json file inside a specific project folder and override User Settings for that project only. Teams often use Workspace Settings to enforce consistent formatting or linting rules across all contributors.">
<div data-quiz-option>User Settings are read-only; Workspace Settings can be edited</div>
<div data-quiz-option>User Settings only apply to HTML and CSS files; Workspace Settings apply to all files</div>
<div data-quiz-option>They are identical — just two names for the same settings file</div>
<div data-quiz-option>User Settings apply to every project on your machine; Workspace Settings apply only to a specific project folder</div>
</div>

<div data-quiz-question="What keyboard shortcut lets you place cursors on multiple lines simultaneously so you can edit them all at once?" data-correct="0" data-explanation="Ctrl+Alt+Up/Down (Windows/Linux) or Cmd+Option+Up/Down (macOS) adds a cursor above or below the current cursor position. You can also Alt+Click (Option+Click on Mac) anywhere to add a cursor at that position. Multi-cursor editing is one of the most powerful productivity features in VS Code.">
<div data-quiz-option>Ctrl+Alt+↑/↓ (Windows/Linux) or Cmd+Option+↑/↓ (macOS)</div>
<div data-quiz-option>Ctrl+Shift+L on all platforms</div>
<div data-quiz-option>Ctrl+D on all platforms</div>
<div data-quiz-option>Shift+Click to place cursors on all lines between two positions</div>
</div>

<div data-quiz-question="What does the 'javascript.updateImportsOnFileMove.enabled': 'always' setting do?" data-correct="2" data-explanation="When you rename or move a file in your project, this setting tells VS Code to automatically find and update every import statement that referenced the old path. Without this, you would need to manually hunt down and fix every import after a rename — a tedious and error-prone process in large projects.">
<div data-quiz-option>It automatically imports JavaScript modules as you type</div>
<div data-quiz-option>It prevents you from moving JavaScript files to avoid broken imports</div>
<div data-quiz-option>When you rename or move a file, it automatically updates all import statements that referenced the old path</div>
<div data-quiz-option>It moves all imports to the top of the file automatically on save</div>
</div>

</div>

---

## What's Next

Your development environment is now fully configured. In **Lesson 5**, you will learn to use the Terminal — the command-line interface where you will run your development servers, install packages, manage files, and execute Git commands throughout this entire course.

- **Next Lesson:** [Lesson 5 — The Terminal: Talking to Your Computer](/courses/shadcn-nextjs/lessons/5-the-terminal)

---

## Conclusion

Your environment is not just functional — it is professional. The same `settings.json` configuration you just set up is close to what experienced developers at top companies use every day. The keyboard shortcuts you just learned are the same ones that make fast developers fast.

There is a Japanese concept called *kaizen* — continuous improvement. Your development environment is never truly finished. As you grow as a developer, you will discover new extensions, new settings, new shortcuts that fit your workflow. But the foundation you have set up today will carry you a long, long way.

> *"A wise man has great power, and a man of knowledge increases strength."*
> — Proverbs 24:5 (NIV)

Knowledge of your tools is genuine power. Not power over others — power over the problem in front of you. The developer who knows their editor deeply can solve problems faster, stay in flow longer, and do more with the same hours.

---

## A Prayer for This Lesson

*Lord, thank You for the precision and order You built into creation. In the same way, help this student build precision and order into their working environment.*

*May the habits formed in this lesson — saving often, formatting consistently, navigating efficiently — become second nature. May these small disciplines in the tool become larger disciplines in the craft: attention to detail, care for the work, and a commitment to doing things well even when no one is watching.*

*As this student's fingers learn the keyboard shortcuts and their settings.json takes shape, remind them that excellence in small things is the training ground for excellence in large ones.*

*In Jesus' name, Amen.*

---

## Lesson Checklist

- [ ] My `settings.json` is configured with the complete settings from this lesson
- [ ] Prettier is set as my default formatter and format on save is enabled
- [ ] I have installed a programming font and configured it in VS Code
- [ ] I have chosen a theme I am comfortable with
- [ ] I have opened a file, made an edit, and confirmed that Format on Save works
- [ ] I know how to open the Command Palette (`Ctrl/Cmd + Shift + P`)
- [ ] I know how to quick-open a file (`Ctrl/Cmd + P`)
- [ ] I have practiced the comment/uncomment shortcut (`Ctrl/Cmd + /`) at least five times
- [ ] I scored at least 4/5 on the Knowledge Check quiz above
