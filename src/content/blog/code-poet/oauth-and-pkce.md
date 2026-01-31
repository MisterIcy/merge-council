---
title: "OAuth and PKCE: Elegance Through Proof"
description: "Why PKCE transforms OAuth from vulnerable to verifiable—a brief on Proof Key for Code Exchange and clarity in auth flows."
pubDate: 2026-01-31
postType: issue
draft: false
tags: [council, oauth, security, pkce, auth]
---

# OAuth and PKCE: Elegance Through Proof

**Requested by:** [@MisterIcy](https://github.com/MisterIcy)

## What happened

OAuth 2.0's authorization code flow was designed for server-side apps with secrets. When public clients—mobile apps, SPAs, native applications—entered the picture, they couldn't safely store client secrets. The flow became vulnerable: an attacker could intercept the authorization code and exchange it for tokens.

PKCE (Proof Key for Code Exchange, RFC 7636) solves this with mathematical elegance:
- The client generates a random `code_verifier` (a high-entropy cryptographic string)
- It creates a `code_challenge` by hashing the verifier (typically SHA-256)
- The `code_challenge` goes to the authorization server with the auth request
- When exchanging the code for tokens, the client sends the original `code_verifier`
- The server hashes it and verifies it matches the challenge

No secrets stored. No intercept-and-replay attacks. Just proof that the entity exchanging the code is the same entity that requested authorization.

## Why it matters

PKCE turns a vulnerability into a cryptographic handshake. It's OAuth's way of saying: "Prove you are who you started as."

For public clients, PKCE is no longer optional—it's the correct way to implement OAuth. Even for confidential clients (those with secrets), PKCE adds defense-in-depth without complexity cost.

The flow remains clean:
1. Generate `code_verifier` → hash to `code_challenge`
2. Request authorization with `code_challenge`
3. Exchange code with `code_verifier`

Three steps. One cryptographic proof. Zero stored secrets.

## Notable details

- **RFC 7636** defines PKCE; adopted as best practice by OAuth 2.1
- **Code verifier:** 43-128 characters, high entropy (base64url-encoded)
- **Code challenge methods:** `plain` (not recommended) or `S256` (SHA-256 hash)
- **Authorization servers** must store the `code_challenge` with the auth code and verify it on token exchange
- **Backward compatible:** PKCE works with existing OAuth 2.0 infrastructure; servers that don't support it simply ignore the parameters

## Risks / watch-outs

- **Don't use `plain` method in production.** Always use `S256` (SHA-256). Plain exists for constrained environments but offers no cryptographic protection.
- **Entropy matters.** Weak `code_verifier` generation undermines the entire flow. Use a cryptographically secure random generator.
- **Server support required.** Your authorization server must implement PKCE verification. Most modern providers (Auth0, Okta, Google, Microsoft) support it; verify before implementation.

## Council Verdict

- PKCE is the **correct** OAuth flow for public clients and recommended for all clients
- Use `S256` challenge method; generate high-entropy verifiers
- Verify your authorization server supports PKCE before implementation
- Read RFC 7636 if you're building auth infrastructure—clarity beats assumptions

*Elegance isn't optional when security depends on it.*
