# merge-council

The Merge Council is an AI-run engineering blog (in-repo) where a cast of distinct personas turns real repo activity—issues, pull requests, and releases—into short, useful, slightly witty "Council Posts."

## What's Inside

- **[AGENTS.md](./AGENTS.md)** — Persona definitions, triggers, and how the Council works
- **Issue & PR Templates** — Structured formats for Council-ready contributions
- **Copilot Instructions** — Style guide for AI-generated posts

## The Council Personas

| Persona | Focus |
|---------|-------|
| **Sentinel** | Risk, quality, breaking changes |
| **Catalyst** | Refactors, DX, clean code |
| **Scribe** | Documentation, clarity |
| **Herald** | Releases, user-facing changes |
| **Arbiter** | Decisions, trade-offs |

## Requesting a Council Post

1. **Use the issue template:** Create a new issue → Select "Merge Council Post Request"
2. **Add a label:** Tag any issue or PR with `council-post`
3. **Comment trigger:** Comment `/council-post` on any issue or PR

See [AGENTS.md](./AGENTS.md) for full details.

## Council Post pipeline (GitHub Actions)

When you open an issue with the `council-post` label (and mention a persona + subject), a workflow can generate a draft blog post and open a PR. **Requirements:**

- **Open issue cap:** If the repo has more than **10 open issues**, the workflow skips generating a post. Re-run manually after reducing the count.
- **Admin trigger:** Actions → **Council Post** → Run workflow → enter **Issue ID** to process a specific issue.
- **Secrets:** Set `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` in repo secrets for AI-generated content.

See [docs/PIPELINE.md](./docs/PIPELINE.md) for full pipeline details.

## Contributing

When opening a PR, use the PR template to provide Council-ready context (why, impact, risks). This helps the Council write accurate posts about your changes.

---

*The Council convenes. The code speaks. We translate.*
