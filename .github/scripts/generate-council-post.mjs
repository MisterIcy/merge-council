#!/usr/bin/env node
/**
 * Council Post flow: no OpenAI/Anthropic in CI.
 *
 * When an issue is created with the council-post label, the Council Post workflow
 * assigns the issue to Copilot. Copilot writes the post and opens a PR.
 *
 * This script is kept for reference or local use (e.g. building frontmatter).
 * To add a post via Copilot: open an issue using the "Merge Council Post Request"
 * template, add the council-post label, and assign it to Copilot (or let the
 * workflow assign it).
 */

// Optional: local helpers for frontmatter/slug if you write posts manually
function slugify(text) {
  return text
    .replace(/^\[Council Post\]\s*/i, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
