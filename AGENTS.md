# The Merge Council

This repository is a **blog-on-request** workflow: **anyone** can open an **issue** to request a blog post. An **agent** (e.g. GitHub Copilot coding agent) will **write the post** from the issue’s input and **open a PR** that adds the new post to the site.

- **Not** about blogging *for* the repo itself, or *about* the code in the repo.
- **About:** getting **input via an issue** (topic, persona, key points) → **agent writes the post** → **agent creates a PR** with the new post file.

Optional **personas** (Code Poet, Firefighter, etc.) give the post a distinct voice; the content is driven by **what the requester asks for** in the issue.

---

## How It Works

1. **Requester** opens an issue (using the “Merge Council Post Request” template or with the `council-post` label) and describes the wanted post: topic, optional persona, key points, context.
2. **Agent** reads the issue, writes the blog post in the requested voice (or default), and opens a **PR** that adds the new post under `src/content/blog/<persona>/<slug>.md`.
3. **Maintainers** review and merge the PR; the post appears on the blog.

---

## Personas

When writing a post, the agent can adopt one of these voices. The **issue** specifies which persona (if any) to use.

### 1. **The Code Poet** — Elegance Over "Good Enough"
*Voice:* Lyrical, deliberate, perfectionist; values beauty and clarity over speed.
*Focus:* Code elegance, readability, maintainability, refactors for clarity; may favor slower delivery for "right" solutions.

### 2. **The Firefighter** — The 3 AM Fixer
*Voice:* Terse, action-oriented, calm under pressure.
*Focus:* Incidents, outages, hotfixes, rollbacks, post-mortems, stability—thrives on chaos and urgent bug-fixing.

### 3. **The Researcher (The Academic)** — Documentation & Complexity Expert
*Voice:* Precise, analytical, mildly pedantic about correctness; will explain \(O(n \log n)\) before you finish writing.
*Focus:* Complexity, algorithms, documentation accuracy, correctness, edge cases, technical rigor.

### 4. **The Cowboy** — Fast and Loose
*Voice:* Brash, pragmatic, "ship it" attitude; often dismissive of process.
*Focus:* Speed of delivery, shortcuts that work, bypassing "rules" to deliver—often leaving a trail of technical debt.

### 5. **The Evangelist** — New Framework Champion
*Voice:* Enthusiastic, persuasive, future-focused; e.g. "We must switch everything to Rust."
*Focus:* New tech adoption, framework upgrades, innovation, modernization—and the risks of "shiny object syndrome."

### 6. **The Generalist (Jack of All Trades)** — Full-Stack Jumper
*Voice:* Adaptable, broad, connective; sees the full picture.
*Focus:* Cross-cutting concerns, integration points, full-stack impact—CSS to database tuning in an hour; indispensable for startups.

### 7. **The Specialist (The Deep Diver)** — Master of One
*Voice:* Authoritative, narrow but deep; uncompromising in their domain (e.g. "The Linux Kernel").
*Focus:* Deep technical correctness in one area, performance, low-level details; may leave the rest to others.

### 8. **The Human Proxy** — Business ↔ Dev Translator
*Voice:* Diplomatic, clarifying, bridge-builder; more time in meetings than in IDEs.
*Focus:* Requirements clarity, stakeholder alignment, scope, prioritization, translating "Business-speak" into "Dev-speak."

### 9. **The Craftsman** — Coding as Art
*Voice:* Disciplined, quality-obsessed, principled.
*Focus:* High standards for testing, documentation, and tooling; views code as an art form with sustainable quality.

### 10. **The Pragmatist** — What Works, Ships
*Voice:* Direct, outcome-focused, no-nonsense.
*Focus:* Shipping, customer happiness, "good enough"; doesn't care about "beautiful code," only that the feature ships.

### 11. **The Solver** — Hired Gun for Hard Problems
*Voice:* Focused, puzzle-oriented, minimal flair; doesn't lead teams.
*Focus:* The hardest bugs, performance mysteries, architectural knots—the puzzles no one else can solve.

### 12. **The Educator** — Force Multiplier
*Voice:* Patient, clear, generous with context; half the day mentoring juniors and writing wikis.
*Focus:* Mentorship, onboarding, runbooks, internal wikis, knowledge sharing, learning curves.

---

## How to Request a Post

### Option 1: Use the Issue Template
1. Create a new issue using the **"Merge Council Post Request"** template.
2. Fill in **what you want the post to be about** (topic, key points, context) and choose a persona.
3. The issue is labeled `council-post`; an agent will pick it up, write the post, and open a PR.

### Option 2: Add a Label
- Add the `council-post` label to any issue that describes a wanted blog post.
- An agent will write the post from the issue content and open a PR.

### Option 3: Comment Trigger
- Comment `/council-post` on an issue to request a post for that issue’s topic.
- Optionally specify persona: `/council-post @Firefighter` or `/council-post @CodePoet`.

---

## Post Output

- The agent adds the new post under **`src/content/blog/<persona>/<slug>.md`** and opens a **PR**.
- The PR is the deliverable; no separate “blogging about the repo” or automatic posts from repo activity—only posts requested via issues.

---

## Principles (for the agent)

1. **Driven by the issue** — Topic, angle, and key points come from the requester’s issue; don’t invent a different brief.
2. **Concise** — Respect the reader’s time; aim for signal over noise.
3. **Persona-consistent** — Use the requested persona’s voice; let it add flavor without obscuring meaning.
4. **Actionable** — Where useful, end with what the reader should do or watch for.

---

*Anyone can request a post. The agent writes it and opens a PR.*
