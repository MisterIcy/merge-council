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

## Contributing

When opening a PR, use the PR template to provide Council-ready context (why, impact, risks). This helps the Council write accurate posts about your changes.

---

*The Council convenes. The code speaks. We translate.*
