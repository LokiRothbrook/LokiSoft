---
title: "Lesson 1: How the Web Works — Browsers, Servers, and the Internet"
date: 2026-05-18
author: LokiSoft Team
excerpt: Before writing a single line of code, every developer needs to understand what actually happens when you type a URL. Discover browsers, servers, DNS, HTTP, and the roles of HTML, CSS, and JavaScript.
categories: shadcn-nextjs, Beginner, Web Fundamentals
difficulty: 1
featured: false
coverImage: /web-fundamentals-cover.svg
---

# Lesson 1: How the Web Works

> *"In the beginning was the Word, and the Word was with God, and the Word was God."*
> — John 1:1 (NIV)

---

## Introduction

Welcome, adventurer. Your quest begins here.

Before you write your first line of code, before you install a single tool, before you touch a keyboard with the intention of building something — you need to understand the world you are about to enter. Every master developer, every senior engineer, every CTO at a billion-dollar company started exactly where you are right now: on the outside, looking in, wondering what is actually happening when a web page appears on a screen.

This lesson answers that question completely. No code. No setup. Just a clear, honest map of the territory you are about to explore. Think of it as studying the layout of the dungeon before you enter it. The adventurers who take time to understand the map survive longer than the ones who charge in blind.

By the time this lesson is over, you will understand the web at a level that most casual internet users never reach. That knowledge will make *every* lesson that follows easier, because you will always know *why* you are doing what you are doing — not just *how*.

<div data-info-box="hint" data-title="No Experience Required">
This lesson assumes you know absolutely nothing about web development. If you have some background, consider it a refresher that fills in gaps you may not know you have.
</div>

### What You'll Learn

- The difference between the **Internet** and the **Web** (they are not the same thing)
- What a **browser** is and what it actually does behind the scenes
- What a **server** is and how it responds to your requests
- The **request-response cycle** — the heartbeat of every web page
- What **DNS** is and why it matters
- What **HTTP and HTTPS** mean
- The three languages of the web: **HTML, CSS, and JavaScript** and the role each one plays
- The difference between a **static website** and a **dynamic web application**

### Prerequisites

| Requirement | You Need |
|-------------|----------|
| Prior coding knowledge | None — absolute zero is perfect |
| Software to install | Nothing — just a web browser you already have |
| Time to complete | 30–45 minutes |

---

## The Internet vs The Web — They Are Not the Same Thing

Most people use the words "internet" and "web" as if they mean the same thing. They do not, and understanding the difference is your first unlock.

**The Internet** is the physical and logical infrastructure — the cables under oceans, the fiber lines buried in roads, the satellites in orbit, the wireless signals bouncing between towers, and the agreed-upon rules (called *protocols*) that allow all of these devices to talk to each other. The internet is a global network of networks. It has existed since the 1960s in various forms.

**The World Wide Web** (usually just called "the Web") is one *service* that runs *on top of* the internet. It is a system of documents and applications that you access through a browser using a specific set of rules called HTTP. The Web was invented by Tim Berners-Lee in 1989.

The analogy: **The internet is the highway system. The Web is one type of vehicle that drives on those highways.** Email, video calls, online gaming, and file transfers also run on the internet — but they are not the Web. They use the same roads but different kinds of vehicles.

<div data-info-box="info" data-title="Other Internet Services You Use Every Day">
When you send an email, that travels over the internet using a protocol called SMTP — not HTTP. When you use Discord voice chat, that uses a protocol called UDP. When you connect to a VPN, that uses yet another protocol. The internet is the foundation that all of these services share.
</div>

---

## What is a Browser? — Your Window to the Web

A **browser** is a program on your device whose entire job is to receive web content and display it to you in a human-readable way. You are almost certainly using one right now. The major browsers are:

| Browser | Made By | Engine |
|---------|---------|--------|
| Chrome | Google | Blink |
| Firefox | Mozilla | Gecko |
| Safari | Apple | WebKit |
| Edge | Microsoft | Blink |
| Brave | Brave Software | Blink |

Every browser contains several major systems working together:

1. **The Networking Layer** — sends and receives data over the internet
2. **The Rendering Engine** — reads HTML and CSS and turns them into visual pixels on your screen
3. **The JavaScript Engine** — reads and executes JavaScript code (Chrome uses V8, Firefox uses SpiderMonkey)
4. **The Storage System** — manages cookies, localStorage, and cached files
5. **The Developer Tools** — a built-in toolkit that lets developers inspect everything the browser is doing

### Peeking Behind the Curtain Right Now

You do not need to install anything to see how a web page is built. Every browser has a built-in inspector. Try it:

**Open DevTools on any website:**

| Platform | Shortcut |
|----------|----------|
| Windows / Linux | `F12` or `Ctrl + Shift + I` |
| macOS | `Cmd + Option + I` |
| All platforms | Right-click anywhere → "Inspect" |

When DevTools opens, click the **Elements** tab. You will see the raw HTML code that makes up the page you are looking at. This is exactly what we will be writing in later lessons. Do not worry if it looks complex right now — it will all make sense.

<div data-info-box="hint" data-title="View Page Source">
You can also press `Ctrl + U` (Windows/Linux) or `Cmd + Option + U` (macOS) on any page to see the raw HTML source in a new tab. This is what the browser received from the server before it processed it.
</div>

---

## What is a Server? — The Kitchen Behind the Menu

When you visit a website, your browser has to get the web page *from somewhere*. That somewhere is called a **server**.

A server is simply a computer — just like the one you are using right now — that is set up to *serve* files and data to other computers that ask for them. The word "server" describes the *role* the computer is playing, not a special type of hardware. Your laptop could be a server. In fact, later in this course you will run a server directly on your own machine during development.

The restaurant analogy makes this vivid:

```
YOU (the customer)         =   Your browser
THE MENU                   =   The URL you type
YOUR ORDER                 =   An HTTP request
THE KITCHEN                =   The server
THE FOOD THAT ARRIVES      =   The HTML, CSS, JS files
EATING THE FOOD            =   The browser rendering the page
```

When you type `https://google.com` into your browser and press Enter, your browser (the customer) places an order (an HTTP request) with Google's server (the kitchen). The server prepares a response — the HTML, CSS, JavaScript, and images that make up the Google homepage — and sends them back. Your browser then reads those files and displays the page you see.

<div data-info-box="info" data-title="Servers Never Sleep">
Unlike your laptop, real web servers run 24 hours a day, 7 days a week, 365 days a year. A company like Google operates hundreds of thousands of servers in giant buildings called data centers, spread across the world. When you search Google, you are being served by one of those machines — possibly on another continent.
</div>

---

## The Request-Response Cycle — The Heartbeat of Every Web Page

Every single thing that happens on the web follows the same basic pattern: a **client** (usually a browser) sends a **request**, and a **server** sends back a **response**. This is called the **request-response cycle**, and it is the most fundamental concept in all of web development.

Here is what happens in the roughly 200 milliseconds between pressing Enter and seeing a web page:

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE REQUEST-RESPONSE CYCLE                   │
│                                                                 │
│   YOU TYPE:  https://example.com                                │
│                                                                 │
│   1. DNS LOOKUP                                                 │
│      Browser asks: "What is the IP address of example.com?"     │
│      DNS Server replies: "93.184.216.34"                        │
│                                                                 │
│   2. TCP CONNECTION                                             │
│      Browser connects to 93.184.216.34 on port 443 (HTTPS)     │
│                                                                 │
│   3. HTTP REQUEST                                               │
│      Browser sends:  GET / HTTP/2                               │
│                       Host: example.com                         │
│                                                                 │
│   4. SERVER PROCESSES REQUEST                                   │
│      Server finds the right files to send back                  │
│                                                                 │
│   5. HTTP RESPONSE                                              │
│      Server sends:  HTTP/2 200 OK                               │
│                     Content-Type: text/html                     │
│                     [HTML content follows...]                   │
│                                                                 │
│   6. BROWSER RENDERS                                            │
│      Browser reads the HTML, requests CSS and JS files,         │
│      runs the JavaScript, and paints the page on screen         │
└─────────────────────────────────────────────────────────────────┘
```

This entire process happens every single time you visit a web page, click a link, or submit a form. The web is built on billions of these tiny conversations happening every second.

> *"A person finds joy in giving an apt reply — and how good is a timely word!"*
> — Proverbs 15:23 (NIV)

Even the server and client know what Scripture understood long ago: a well-timed, apt response is a joy. The entire web is built on this principle.

<div data-toggle-box data-title="Deep Dive: HTTP Status Codes — What the Server Says Back">

Every HTTP response includes a **status code** — a three-digit number that tells the browser whether the request succeeded and why. You have probably seen some of these already without knowing what they meant.

| Code | Meaning | When You See It |
|------|---------|-----------------|
| **200 OK** | Everything worked perfectly | Every normal page load |
| **301 Moved Permanently** | The page has a new address forever | When a site changes its URL structure |
| **302 Found** | The page is temporarily at another address | Login redirects |
| **404 Not Found** | The server cannot find what you asked for | Mistyped URLs, deleted pages |
| **403 Forbidden** | The server found it but won't let you have it | Private/locked pages |
| **500 Internal Server Error** | Something broke on the server | Server-side bugs |

As a developer, you will write code that *produces* these status codes and code that *handles* them. The 404 page you build later in this course will respond with a 404 status code.

</div>

---

## DNS — The Phone Book of the Internet

Here is a puzzle: when you type `https://google.com`, your computer does not actually know where Google is. It does not know what building, what city, or even what country Google's servers are in. All it knows is the name `google.com`. But to connect to a server, your computer needs an actual address — a numerical address called an **IP address** (e.g., `142.250.80.46`).

This is where **DNS** comes in. DNS stands for **Domain Name System**, and its job is to translate human-readable domain names like `google.com` into machine-readable IP addresses.

Think of it like this: you want to call your friend. You do not memorize their phone number — you just know their name. You look up their name in your contacts and your phone finds the number. DNS is the contacts app of the internet.

```
You type:          google.com
DNS translates:    google.com  →  142.250.80.46
Browser connects:  to 142.250.80.46
```

Your computer does not ask DNS every single time, though. It caches (saves) the results for a while so future visits to the same site are faster.

<div data-info-box="info" data-title="What is an IP Address?">
An IP address is a unique numerical label assigned to every device connected to the internet. Think of it like a mailing address for your computer. IPv4 addresses look like <code>192.168.1.1</code> (four numbers, 0–255, separated by dots). The newer IPv6 addresses look like <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code> and were created because the world was running out of IPv4 addresses.
</div>

---

## HTTP and HTTPS — Speaking the Web's Language

**HTTP** stands for **HyperText Transfer Protocol**. It is the set of rules that governs how browsers and servers talk to each other. When you see `http://` at the start of a URL, it means the browser and server are communicating using these rules.

**HTTPS** is the secure version — the **S** stands for **Secure**. HTTPS encrypts the conversation between your browser and the server so that nobody in between can read or tamper with it. This matters enormously when you are entering passwords, credit card numbers, or any sensitive information.

| Feature | HTTP | HTTPS |
|---------|------|-------|
| Encryption | ❌ None — data is sent as plain text | ✅ Encrypted with TLS/SSL |
| Port | 80 | 443 |
| Address bar indicator | ⚠️ "Not Secure" warning | 🔒 Padlock icon |
| Required for | Old, simple sites | Any site with user data, login, payments |
| SEO | Penalized by Google | Preferred |

<div data-info-box="warning" data-title="Always Use HTTPS">
Every website you build in this course will use HTTPS. Vercel (the deployment platform we use) enables HTTPS automatically and for free. Never collect user data over HTTP. Modern browsers actively warn users when a site is not using HTTPS.
</div>

---

## The Three Languages of the Web

Every web page you have ever visited — every website, every web app, every online tool — is built with the same three technologies. They each play a completely different role, and understanding those roles is critical.

### HTML — The Structure (The Bones)

**HTML** (HyperText Markup Language) is the language that defines the *structure and content* of a web page. It says: here is a heading, here is a paragraph, here is an image, here is a button, here is a list. HTML does not control how things look — it only controls what things *are* and how they relate to each other.

If a web page were a house, **HTML is the frame and walls** — the structural skeleton that defines which rooms exist and how they connect.

```html
<h1>Welcome to My Website</h1>
<p>This is a paragraph of text.</p>
<button>Click Me</button>
```

This is valid HTML. It has no color, no font, no layout — just raw structure and content.

### CSS — The Style (The Paint and Furniture)

**CSS** (Cascading Style Sheets) is the language that controls *how HTML looks*. It says: make that heading blue, make that paragraph use this font, center that button, give that section a background image. CSS is entirely about visual presentation.

If HTML is the frame and walls of the house, **CSS is the paint, the flooring, the furniture, and the lighting** — everything that makes it look lived-in and beautiful.

```css
h1 {
  color: navy;
  font-size: 2rem;
}

button {
  background-color: blue;
  color: white;
  border-radius: 8px;
}
```

### JavaScript — The Behavior (The Electricity and Plumbing)

**JavaScript** is the programming language of the web. It controls *behavior* — what happens when a user clicks a button, submits a form, scrolls the page, or types in a search box. JavaScript can update the page without reloading it, talk to servers, save data, play videos, run games, and much more.

If HTML is the walls and CSS is the paint, **JavaScript is the electricity and plumbing** — the hidden systems that make the house actually function as a place where people can live and do things.

```javascript
button.addEventListener('click', function() {
  alert('You clicked the button!');
});
```

### How They Work Together

```
┌─────────────────────────────────────────────────┐
│              A COMPLETE WEB PAGE                │
│                                                 │
│   HTML        The content and structure         │
│   ├── h1      (headings, paragraphs, images)    │
│   ├── p                                         │
│   └── button                                   │
│                                                 │
│   CSS         The visual presentation           │
│   ├── colors  (colors, fonts, layout,           │
│   ├── fonts    spacing, animations)             │
│   └── layout                                   │
│                                                 │
│   JavaScript  The behavior and interactivity    │
│   ├── events  (clicks, forms, animations,       │
│   ├── data     API calls, dynamic updates)      │
│   └── logic                                    │
└─────────────────────────────────────────────────┘
```

<div data-info-box="hint" data-title="You Will Learn All Three — In This Course">
This course teaches HTML, CSS, and JavaScript in full depth before moving on to TypeScript, React, and Next.js. Every modern web framework — including Next.js — is built on top of these three fundamentals. Understanding them is not optional background noise. It is the bedrock.
</div>

---

## Static Websites vs Dynamic Web Applications

Not all websites work the same way. There is an important distinction between two kinds of web experiences:

### Static Websites

A **static website** is one where the server sends the exact same files to every visitor. The content does not change based on who you are, when you visit, or what you have done before. The server has a folder of HTML, CSS, and JavaScript files, and it just sends them as-is.

- Fast and cheap to host
- No server-side logic required
- Great for blogs, portfolios, marketing pages, documentation

**Example:** A restaurant's menu page that lists the food items. Every visitor sees the same page.

### Dynamic Web Applications

A **dynamic web application** generates content on the fly, tailored to the specific user and moment. When you log into your email, the server does not have a pre-made HTML file for your inbox — it looks up your account in a database, retrieves your emails, builds an HTML page just for you, and sends it.

- Requires a server with programming logic
- Connected to a database
- Content changes per user, per session, per interaction
- Powers social media, e-commerce, banking, productivity tools

**Example:** Your Gmail inbox. Nobody else sees what you see. The server built that page specifically for your account at the moment you requested it.

> *"There is a time for everything, and a season for every activity under the heavens."*
> — Ecclesiastes 3:1 (NIV)

A static site delivers the same thing every time. A dynamic application delivers the right thing *at the right time for the right person*. You will build both in this course — and the final capstone project will be a fully dynamic, full-stack web application.

<div data-toggle-box data-title="Deep Dive: What is a Full-Stack Developer?">

You will hear the term "full-stack developer" a lot. Here is what it means:

**Frontend** (the client side) refers to everything the user sees and interacts with in the browser — HTML, CSS, JavaScript, React, shadcn/ui components.

**Backend** (the server side) refers to the server logic, databases, authentication, file storage, and APIs — the parts the user never directly sees but that make the application actually work.

A **full-stack developer** can build both. That is exactly what this course trains you to do. By lesson 227, you will be comfortable working across the entire stack: designing UIs with shadcn/ui on the frontend, and building database-backed server logic with Next.js and Prisma on the backend.

</div>

---

## What is a Web Application?

The term **web application** (or "web app") describes an interactive, dynamic website that behaves more like a software program than a simple document. The line between "website" and "web app" has blurred over the years, but a useful rule of thumb is:

- **Website:** You read it. (news sites, blogs, documentation)
- **Web app:** You use it. (Gmail, Figma, Notion, GitHub, Trello)

Web apps let you log in, create and save data, collaborate with others, and perform complex tasks — all without installing any software on your device. They run entirely in the browser.

Everything you build toward the end of this course — especially the capstone Task Management Dashboard — is a web application.

---

## Knowledge Check

<div data-quiz-group data-title="How the Web Works — Knowledge Check">

<div data-quiz-question="What is the difference between the Internet and the World Wide Web?" data-correct="2" data-explanation="The Internet is the physical and logical infrastructure (cables, satellites, protocols) that connects computers worldwide. The Web is one service that runs ON TOP of the internet — it's the system of pages and apps accessed through a browser using HTTP. Email, gaming, and voice calls also use the internet but are not the Web.">
<div data-quiz-option>They are the same thing — just two names for the same network</div>
<div data-quiz-option>The Internet is newer than the Web</div>
<div data-quiz-option>The Internet is the global infrastructure; the Web is one service that runs on top of it</div>
<div data-quiz-option>The Web includes email, gaming, and all internet services</div>
</div>

<div data-quiz-question="What does a browser's rendering engine do?" data-correct="1" data-explanation="The rendering engine reads HTML and CSS and converts them into the visual pixels you see on screen. Without a rendering engine, HTML would just be raw text. Different browsers use different engines: Chrome uses Blink, Firefox uses Gecko, Safari uses WebKit.">
<div data-quiz-option>It sends HTTP requests to the server</div>
<div data-quiz-option>It reads HTML and CSS and turns them into visual pixels on screen</div>
<div data-quiz-option>It runs JavaScript code</div>
<div data-quiz-option>It stores your browsing history</div>
</div>

<div data-quiz-question="What is a server?" data-correct="3" data-explanation="A server is a computer set up to respond to requests from other computers by serving files and data. The word 'server' describes the role it is playing, not special hardware. Your own laptop could technically act as a server — and during development in this course, it will!">
<div data-quiz-option>A special type of hardware that can only be bought from major tech companies</div>
<div data-quiz-option>The physical internet cables that carry data around the world</div>
<div data-quiz-option>A program that translates domain names into IP addresses</div>
<div data-quiz-option>A computer set up to respond to requests by serving files and data to other computers</div>
</div>

<div data-quiz-question="What does DNS do?" data-correct="0" data-explanation="DNS (Domain Name System) translates human-readable domain names like 'google.com' into machine-readable IP addresses like '142.250.80.46'. Without DNS, you would have to memorize IP addresses to visit websites — which would be like having to memorize everyone's phone number instead of storing their name in your contacts.">
<div data-quiz-option>Translates domain names like google.com into IP addresses like 142.250.80.46</div>
<div data-quiz-option>Encrypts the connection between your browser and the server</div>
<div data-quiz-option>Manages your browser's saved passwords</div>
<div data-quiz-option>Controls how fast data travels across the internet</div>
</div>

<div data-quiz-question="What is the main difference between HTTP and HTTPS?" data-correct="2" data-explanation="HTTPS encrypts the communication between your browser and the server using TLS (Transport Layer Security), so no one in the middle can read or tamper with the data. HTTP sends everything as plain text, which is dangerous for any site handling passwords or personal data. All modern sites should use HTTPS.">
<div data-quiz-option>HTTPS is faster than HTTP</div>
<div data-quiz-option>HTTP is newer than HTTPS</div>
<div data-quiz-option>HTTPS encrypts the connection; HTTP sends data as plain text</div>
<div data-quiz-option>They are identical — HTTPS just has an extra letter for branding</div>
</div>

<div data-quiz-question="Which language is responsible for the VISUAL APPEARANCE of a web page — colors, fonts, spacing, and layout?" data-correct="1" data-explanation="CSS (Cascading Style Sheets) controls how a web page looks. HTML defines the structure and content (what things ARE). JavaScript controls behavior (what things DO). CSS is the 'paint and furniture' layer — purely visual presentation.">
<div data-quiz-option>HTML</div>
<div data-quiz-option>CSS</div>
<div data-quiz-option>JavaScript</div>
<div data-quiz-option>HTTP</div>
</div>

<div data-quiz-question="What is the key characteristic of a DYNAMIC web application compared to a static website?" data-correct="3" data-explanation="Dynamic web applications generate content on the fly based on who the user is, what they have done, and what data exists in a database. Your Gmail inbox is unique to you — the server builds it specifically for your account at the moment you request it. Static sites send the same pre-made files to everyone.">
<div data-quiz-option>Dynamic web apps load faster than static websites</div>
<div data-quiz-option>Dynamic web apps do not require a browser to use</div>
<div data-quiz-option>Dynamic web apps are always more expensive to build</div>
<div data-quiz-option>Dynamic web apps generate content tailored to the specific user, session, or data from a database</div>
</div>

<div data-quiz-question="In the request-response cycle, what HTTP status code means the request was completely successful?" data-correct="0" data-explanation="200 OK is the standard status code for a successful HTTP request. The server found what was asked for and returned it successfully. 404 means 'not found,' 500 means a server-side error occurred, and 301 means the resource has permanently moved to a new URL.">
<div data-quiz-option>200 OK</div>
<div data-quiz-option>404 Not Found</div>
<div data-quiz-option>500 Internal Server Error</div>
<div data-quiz-option>301 Moved Permanently</div>
</div>

</div>

---

## Key Concepts Summary

| Concept | What It Is | Why It Matters |
|---------|-----------|----------------|
| The Internet | Global network of networks — cables, satellites, protocols | The physical infrastructure everything else runs on |
| The Web | A service running on the internet, accessed via browsers using HTTP | Where web development lives |
| Browser | A program that requests, receives, and renders web content | Your users live here |
| Server | A computer that responds to requests with files or data | Where your code runs in production |
| Request-Response Cycle | Client sends request → server sends response | The fundamental pattern of the web |
| DNS | Translates domain names to IP addresses | How `google.com` becomes a real address |
| HTTP / HTTPS | The protocol browsers and servers use to communicate | HTTPS = encrypted = required for all real apps |
| HTML | Defines structure and content | The skeleton of every web page |
| CSS | Defines visual presentation | The style of every web page |
| JavaScript | Defines behavior and interactivity | The life of every web page |
| Static website | Same files served to every visitor | Blogs, portfolios, marketing pages |
| Dynamic web app | Content generated per user from a database | Gmail, GitHub, Trello — and your capstone |

---

## What's Next

You now have the map. You understand the territory. In **Lesson 2**, you will install VS Code — your code editor, the environment where all of your development work will happen. It is the first real tool you will add to your adventurer's belt.

- **Next Lesson:** [Lesson 2 — Installing VS Code: Your First Spellbook](/courses/shadcn-nextjs/lessons/2-installing-vs-code)

---

## Conclusion

You have taken the first step. The web is no longer a black box — it is a system you understand. Browsers, servers, DNS, HTTP, HTML, CSS, JavaScript: these are not mysteries. They are tools, and tools can be learned.

Every expert developer still carries this mental model with them every day. When something breaks, they ask: "Is this a client-side problem or a server-side problem? Is this an HTML issue, a CSS issue, or a JavaScript issue?" The map you have in your head right now is the same map they use.

God designed a world that runs on communication — on one party speaking and another receiving and responding. The web mirrors that in a small way. Billions of tiny conversations, happening every second, knitting the world together.

> *"How beautiful on the mountains are the feet of those who bring good news, who proclaim peace, who bring good tidings, who proclaim salvation."*
> — Isaiah 52:7 (NIV)

The web exists to carry information to people who need it. As a developer, you will one day use these tools to carry *your* message — to build things that help, inform, connect, and serve. That work matters. Start learning it with that purpose in mind.

---

## A Prayer for the Journey Ahead

*Lord, thank You for the incredible gift of the mind You have given each student who has opened this lesson today.*

*We stand at the beginning of something big. The concepts feel large and the road feels long, but we trust that You are the one who gives wisdom generously to all who ask (James 1:5). We ask now for that wisdom — clarity to understand, patience to learn slowly without frustration, and perseverance to keep going when it gets hard.*

*May the skills gained in this course be used to build things that matter — tools that help people, platforms that serve communities, and work that reflects craftsmanship and character.*

*Guide every student on this path. Let them see that every concept that seems confusing today will click tomorrow, and that every expert they admire once started exactly where they are now.*

*In Jesus' name, Amen.*

---

## Lesson Checklist

Before moving on to Lesson 2, confirm you can answer these from memory:

- [ ] I can explain the difference between the Internet and the Web
- [ ] I can describe what a browser does (in at least three sentences)
- [ ] I can explain the request-response cycle from typing a URL to seeing a page
- [ ] I can describe what DNS does and why it is needed
- [ ] I can explain the difference between HTTP and HTTPS
- [ ] I know what HTML, CSS, and JavaScript are each responsible for
- [ ] I can explain the difference between a static website and a dynamic web app
- [ ] I scored at least 6/8 on the Knowledge Check quiz above
