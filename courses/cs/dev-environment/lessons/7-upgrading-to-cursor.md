---
title: "Lesson 7: Upgrading to Cursor — Your AI-Powered Co-Pilot"
date: 2026-05-19
author: LokiSoft Team
excerpt: Cursor is a VS Code fork with AI built directly into the editor. Learn how to install it, import your VS Code setup instantly, and use Tab autocomplete, inline editing, and the Composer agent to write code faster and smarter.
categories: shadcn-nextjs, Beginner, Dev Environment
difficulty: 1
featured: false
coverImage: /dev-environment-cover.svg
---

# Lesson 7: Upgrading to Cursor — Your AI-Powered Co-Pilot

> *"Plans fail for lack of counsel, but with many advisers they succeed."*
> — Proverbs 15:22 (NIV)

---

## Introduction

You have VS Code set up, equipped with extensions, and tuned to professional settings. Now it is time for an upgrade.

**Cursor** is a code editor built on top of VS Code — same interface, same extensions, same keybindings — but with a powerful AI layer woven throughout. Instead of switching between your editor and a chat window, the AI is right there in your coding environment, watching what you type, understanding your codebase, and offering to help at every step.

For a developer learning a new technology, this changes everything. Instead of getting stuck and waiting for a Stack Overflow answer, you can ask Cursor a question about the code in front of you and get an answer in context. Instead of writing repetitive boilerplate, Cursor finishes it for you. Instead of hunting through documentation for the right API, you describe what you want and Cursor shows you how.

<div data-info-box="warning" data-title="A Critical Lesson Before We Begin">
AI coding tools are powerful, but they can become a crutch that prevents you from actually learning. There is a right way and a wrong way to use Cursor in this course.

<strong>Wrong:</strong> Asking Cursor to write every lesson's code for you without understanding it.
<strong>Right:</strong> Writing the code yourself, using Cursor to explain things you don't understand, fix errors, and help when you are genuinely stuck.

The students who learn the most will use Cursor as a tutor and a sounding board, not as a ghostwriter. We will talk about this more in Lesson 8.
</div>

### What You'll Learn

- What Cursor is and how it differs from using a separate AI chatbot
- How to install Cursor on **Windows**, **macOS**, and **Linux**
- How to import all your VS Code settings and extensions in one click
- How **Cursor Tab** (AI autocomplete) works
- How **Cmd/Ctrl+K** (inline edit) works
- How the **Composer** multi-file agent works
- How the **Chat** panel works — and when to use each feature
- What a `.cursorrules` file is and why it matters

### Prerequisites

| Requirement | Status |
|-------------|--------|
| Lesson 4: VS Code Settings and Keybindings | ✅ Complete |
| Lesson 3: VS Code Extensions | ✅ Complete |
| VS Code fully configured | Required (so you can import to Cursor) |

---

## What is Cursor?

Cursor is a **fork of VS Code** — meaning the Cursor team took VS Code's open-source code and built on top of it. The result is an editor that:

- Looks and behaves exactly like VS Code
- Runs all the same extensions
- Uses the same keybindings
- Reads the same `settings.json`
- **And** has deep AI capabilities built natively into the editing experience

The key difference from using a standalone AI chatbot (like Claude.ai or ChatGPT in a browser tab) is **context**. Cursor knows:
- Which files are in your project
- Which file you are currently editing
- What code is on screen
- What error messages you are seeing
- The history of your recent edits

That context makes AI assistance dramatically more useful. When you ask "why is this not working?", Cursor can see the code that is not working.

---

## Installing Cursor

### macOS

**Step 1 — Download:**
Go to [cursor.com](https://cursor.com) and click **Download for Mac**. This downloads a `.dmg` file.

**Step 2 — Install:**
Open the `.dmg` file. Drag **Cursor** into your **Applications** folder.

**Step 3 — First launch:**
Open Cursor from your Applications folder. If macOS shows a Gatekeeper warning, right-click → Open → Open.

**Step 4 — Add the `cursor` command to PATH:**
Just like VS Code, you need to add the terminal command manually on macOS:
1. Open the Command Palette: `Cmd + Shift + P`
2. Search for and run: **Shell Command: Install 'cursor' command in PATH**

Now you can open any folder in Cursor from the terminal:
```bash
cursor .
```

---

### Windows

**Step 1 — Download:**
Go to [cursor.com](https://cursor.com) and click **Download for Windows**. This downloads a `.exe` installer.

**Step 2 — Install:**
Run the installer. Accept the default options. Cursor adds itself to PATH automatically.

**Step 3 — Verify:**
Open a new PowerShell window and run:
```powershell
cursor --version
```

---

### Linux

**Step 1 — Download:**
Go to [cursor.com](https://cursor.com) and click **Download**. Choose the **Linux** option — this downloads an `.AppImage` file.

**Step 2 — Make it executable:**
```bash
chmod +x ~/Downloads/cursor-*.AppImage
```

**Step 3 — Run it:**
```bash
~/Downloads/cursor-*.AppImage
```

**Step 4 — Optional — move to a permanent location:**
```bash
sudo mv ~/Downloads/cursor-*.AppImage /usr/local/bin/cursor
```

Now `cursor .` works from any terminal.

<div data-info-box="hint" data-title="Cursor Updates Automatically">
Cursor checks for updates on launch and updates itself automatically. You will always be on the latest version without any manual intervention.
</div>

---

## Importing Your VS Code Setup

The single best thing about Cursor is that you do not start from scratch. On first launch, Cursor offers to import everything from VS Code — all your extensions, all your settings, all your keybindings, all your themes.

**When Cursor opens for the first time**, it shows a setup wizard. Click **Import from VS Code** (or **Import extensions and keybindings**).

That is it. Every extension from Lesson 3 is now in Cursor. Every setting from Lesson 4 is now in Cursor. Your theme, your font, your keybindings — all imported.

**If you missed the first-launch wizard:**
1. Open the Command Palette (`Cmd/Ctrl + Shift + P`)
2. Search for `Import VS Code Settings`
3. Run the command

---

## Cursor Tab — AI Autocomplete

**Cursor Tab** is the AI autocomplete system. It goes far beyond the basic word-completion most editors offer. It understands the *intent* of your code and suggests entire lines, blocks, or even complete functions.

### How it works

As you type, Cursor Tab shows a grey ghost suggestion of what it thinks comes next. Press `Tab` to accept it. Press `Escape` (or just keep typing) to dismiss it and continue on your own.

```typescript
// You type:
function calculateTotal(items: CartItem[])

// Cursor Tab suggests (shown in grey):
{
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Press Tab to accept the entire suggestion
```

### When Cursor Tab is most useful

- Completing repetitive patterns (CSS property groups, similar component structures)
- Writing boilerplate (TypeScript interfaces, switch cases, error handling)
- Completing import statements
- Filling in the obvious second half of a function you started

### When to dismiss Cursor Tab

- When the suggestion is wrong — just keep typing your own code
- When you are in a learning exercise and want to write it yourself
- When you do not understand what the suggestion is doing

<div data-info-box="hint" data-title="Cursor Tab Keyboard Shortcut">
Press <code>Tab</code> to accept the full suggestion. Press <code>Ctrl+→</code> (Windows/Linux) or <code>Cmd+→</code> (macOS) to accept just the next word of the suggestion. This lets you accept suggestions one word at a time when you are not sure about the full completion.
</div>

---

## Cmd/Ctrl+K — Inline Edit

**Cmd+K** (macOS) or **Ctrl+K** (Windows/Linux) opens an inline prompt box directly in your editor. You can describe a change in plain English and the AI edits the selected code — or generates new code at your cursor position.

### Editing existing code with K

1. Select some code
2. Press `Cmd+K` / `Ctrl+K`
3. Describe what change you want
4. Press Enter — the code is rewritten to your description
5. Review the diff and press `Accept` or `Reject`

```
You select:    function greet(name) { return "hello " + name }
You type:      rewrite using template literal and capitalize the greeting
Cursor edits:  function greet(name) { return `Hello, ${name}!` }
```

### Generating new code with K

1. Place your cursor where you want new code
2. Press `Cmd+K` / `Ctrl+K`
3. Describe what you want to generate
4. Review and accept

This is excellent for generating repetitive structures — a TypeScript interface for an API response, a form validation schema, a set of test cases.

<div data-info-box="info" data-title="Always Review What K Generates">
Inline edits are suggestions, not facts. Always read the generated code before accepting it. Cursor can generate code that looks right but has subtle bugs. Reviewing it is not optional — it is how you stay in control and keep learning.
</div>

---

## Cmd/Ctrl+L — The Chat Panel

**Cmd+L** (macOS) or **Ctrl+L** (Windows/Linux) opens the **Chat** panel — a conversation interface where you can ask questions and have a dialogue about your code.

Unlike a standalone chatbot, Cursor Chat has full context of your project. You can reference specific files, paste code snippets, and ask follow-up questions.

### Referencing context with @

In the Chat panel, `@` symbols let you attach specific context to your question:

| Symbol | What It Attaches |
|--------|-----------------|
| `@file` | A specific file from your project |
| `@folder` | An entire folder |
| `@codebase` | Your entire project (powerful for architecture questions) |
| `@docs` | Official documentation from a URL you specify |
| `@web` | A live web search result |

**Example conversations:**

```
You:  @file src/app/page.tsx Why is this component re-rendering every second?

You:  @docs https://nextjs.org/docs/app/building-your-application/routing
      How do I create a route group that shares a layout?

You:  @codebase Where do I handle authentication in this project?
```

### Best use cases for Chat

- Asking "why does this work this way?" questions
- Understanding error messages you have never seen before
- Getting a plain-English explanation of a concept
- Asking for alternatives to the approach you are taking
- Debugging — "here is the error, here is my code, what is wrong?"

---

## Cmd/Ctrl+I — Composer (Multi-File Agent)

**Cmd+I** (macOS) or **Ctrl+I** (Windows/Linux) opens **Composer** — Cursor's most powerful feature. Unlike Chat (which explains and advises), Composer can **take action**: create files, edit multiple files simultaneously, run terminal commands, and execute multi-step tasks.

### When to use Composer

- Scaffolding a new feature across multiple files
- Refactoring code that spans several components
- Setting up a new section of a project from scratch
- Making a consistent change across many files at once

### How it works

Describe what you want built in Composer, and it will:
1. Plan the steps
2. Show you what files it intends to create or edit
3. Apply the changes
4. Ask for your review before finalizing

```
You:  Create a new Contact page at /contact with a form that has
      name, email, and message fields. Use shadcn/ui Form components
      with Zod validation. The form should show a success toast on submit.

Composer: I'll create the following files:
          - app/contact/page.tsx (new)
          - app/contact/contact-form.tsx (new)
          [Preview of changes...]
```

<div data-info-box="warning" data-title="Composer Is Powerful — Use It Wisely in This Course">
Composer can build entire features with a single prompt. For the beginner sections of this course (HTML, CSS, JavaScript), avoid using Composer to write your lesson code. You need to write those yourself to actually learn them. In the advanced sections (Next.js, shadcn/ui), Composer becomes a legitimate tool in your workflow — but even then, read every line it produces.
</div>

---

## The .cursorrules File

Cursor reads a file called `.cursorrules` in the root of your project. This file tells the AI how to behave in *this specific project* — coding conventions, libraries to prefer, patterns to follow, things to avoid.

Create a `.cursorrules` file in your project root and fill it with project-specific instructions:

```
You are helping develop a Next.js 15 app with TypeScript, Tailwind CSS,
and shadcn/ui components.

Key conventions:
- Use the App Router (app/ directory) — never the pages/ directory
- Use Server Components by default; add "use client" only when needed
- All form validation uses Zod schemas
- Use shadcn/ui components instead of raw HTML form elements
- Follow the existing file structure: components/ for shared UI,
  app/ for routes
- Import paths use @/ aliases defined in tsconfig

When suggesting code:
- Always include TypeScript types — never use 'any'
- Prefer async Server Components over useEffect for data fetching
- Show the complete file, not just a snippet
```

Think of `.cursorrules` as a briefing document that gets your AI co-pilot up to speed on exactly how *this* project works.

> *"Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone."*
> — Colossians 4:6 (NIV)

Good instructions — whether to a human colleague or an AI tool — are clear, specific, and gracious. A well-written `.cursorrules` file is one of the most valuable things you can maintain in a project.

---

## Cursor Plans and Pricing

Cursor has a free tier and paid plans. Here is what you need to know:

| Plan | Cost | What You Get |
|------|------|-------------|
| **Free** | $0/month | 2,000 Tab completions/month, limited Chat and Composer uses |
| **Pro** | ~$20/month | Unlimited Tab completions, more Chat/Composer uses, faster models |
| **Business** | ~$40/user/month | Team features, admin controls, privacy mode |

For this course, **the free tier is sufficient to get started.** You may hit the monthly limits in the more intensive sections of the course — if so, you can either wait for the next month or upgrade to Pro.

<div data-info-box="hint" data-title="You Can Always Switch Back to VS Code">
Cursor and VS Code can be installed simultaneously. There is zero conflict. If you hit Cursor's free tier limits, open the same project in VS Code — all your settings and extensions are identical. Many developers use both, choosing based on the task.
</div>

---

## Choosing Which Model to Use

Cursor can use different AI models for different tasks. You can switch models in the Chat panel or Composer using the model dropdown.

| Model | Best For |
|-------|---------|
| **claude-sonnet-4-5** | High-quality code generation, complex reasoning |
| **gpt-4o** | General use, fast responses |
| **cursor-small** | Fast, simple completions (uses fewer credits) |

For the purposes of this course, use whatever the default model is — Cursor chooses a good default. The model selector matters more when you are doing advanced professional work.

---

## Knowledge Check

<div data-quiz-group data-title="Cursor — Knowledge Check">

<div data-quiz-question="What is Cursor and how does it relate to VS Code?" data-correct="2" data-explanation="Cursor is a fork of VS Code — the team took VS Code's open-source code and built AI capabilities on top of it. Because it is built on VS Code, it is compatible with all VS Code extensions, settings, themes, and keybindings. You can import your entire VS Code setup in one click.">
<div data-quiz-option>Cursor is a VS Code extension that adds AI features to VS Code</div>
<div data-quiz-option>Cursor is a completely separate editor with no relation to VS Code</div>
<div data-quiz-option>Cursor is a fork of VS Code with AI capabilities built on top of the same codebase</div>
<div data-quiz-option>Cursor is a browser-based code editor made by Microsoft</div>
</div>

<div data-quiz-question="What does pressing Tab do in Cursor when a grey suggestion is visible?" data-correct="0" data-explanation="When Cursor Tab shows a grey ghost suggestion, pressing Tab accepts the entire suggestion and inserts it at your cursor position. You can also press Ctrl+→ (Cmd+→ on Mac) to accept just one word at a time. Pressing Escape or simply continuing to type dismisses the suggestion.">
<div data-quiz-option>Accepts the AI suggestion and inserts it into your code</div>
<div data-quiz-option>Opens a menu to choose between multiple suggestions</div>
<div data-quiz-option>Indents the current line</div>
<div data-quiz-option>Opens the Composer panel</div>
</div>

<div data-quiz-question="What is the key difference between the Chat panel (Cmd+L) and Composer (Cmd+I)?" data-correct="3" data-explanation="Chat is conversational — it explains, advises, and answers questions but does NOT directly edit your files. Composer takes action — it can create new files, edit multiple files simultaneously, and execute multi-step tasks. Use Chat to understand code; use Composer to build features.">
<div data-quiz-option>Chat uses GPT-4; Composer uses Claude — they are the same feature with different models</div>
<div data-quiz-option>Chat works on individual files; Composer only works on the whole project</div>
<div data-quiz-option>Chat is free; Composer requires a paid Cursor plan</div>
<div data-quiz-option>Chat explains and advises without editing files; Composer takes direct action by creating and editing files</div>
</div>

<div data-quiz-question="What does the .cursorrules file do?" data-correct="1" data-explanation="The .cursorrules file lives in the root of your project and provides project-specific instructions to the AI. It tells Cursor about your coding conventions, preferred libraries, file structure, things to avoid, and how to format suggestions. It is essentially a briefing document that keeps the AI aligned with how your specific project works.">
<div data-quiz-option>It lists the VS Code extensions that Cursor should install for this project</div>
<div data-quiz-option>It provides project-specific instructions and coding conventions to the AI</div>
<div data-quiz-option>It configures which AI model Cursor uses for Tab completions</div>
<div data-quiz-option>It is a lock file that records which version of Cursor the project was built with</div>
</div>

</div>

---

## What's Next

Cursor is installed and you understand its core features. In **Lesson 8**, you will go deeper — learning the complete Cursor workflow, the best AI keybindings, and most importantly, *when* to use AI assistance and *when* to work without it.

- **Next Lesson:** [Lesson 8 — Cursor Extensions and Workflow Tips: Leveling Up Your Environment](/courses/shadcn-nextjs/lessons/8-cursor-workflow-tips)

---

## Conclusion

You now have one of the most powerful development setups available to any developer anywhere in the world — and it runs on your laptop, for free. VS Code + Cursor + the extensions from Lesson 3 is the same setup that professional engineers at top companies use.

The AI co-pilot is a tool. Like every tool, its value depends on the skill and wisdom of the person using it. A hammer in the hands of someone who does not understand carpentry will build something crooked. In the hands of a craftsman, it builds something beautiful.

Learn the craft first. Use the tool wisely.

> *"Where there is no guidance, a people falls, but in an abundance of counselors there is safety."*
> — Proverbs 11:14 (ESV)

---

## A Prayer for This Lesson

*Lord, we are living in a remarkable time. Tools that did not exist five years ago can now help us write code, explain concepts, and build things faster than ever before.*

*Help this student use these tools with wisdom — not as a shortcut around learning, but as an accelerant for understanding. May they use AI to go deeper, not to stay shallow. May they develop the discernment to know when a suggestion is right and when it is subtly wrong.*

*Guard them against the temptation to generate code they do not understand. That path leads to debt — technical and intellectual. Instead, may every use of AI make them more capable, not more dependent.*

*In Jesus' name, Amen.*

---

## Lesson Checklist

- [ ] Cursor is installed and opens correctly
- [ ] I imported my VS Code settings and extensions into Cursor
- [ ] I can open a folder in Cursor from the terminal with `cursor .`
- [ ] I understand what Cursor Tab does and how to accept or dismiss suggestions
- [ ] I know the shortcut to open the Chat panel (`Cmd/Ctrl + L`)
- [ ] I know the shortcut to open Composer (`Cmd/Ctrl + I`)
- [ ] I know the shortcut for inline edit (`Cmd/Ctrl + K`)
- [ ] I understand what a `.cursorrules` file does
- [ ] I scored at least 3/4 on the Knowledge Check quiz above
