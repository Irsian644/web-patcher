# Security Audit — TheWebPatcher

**Date:** 2026-06-29
**Auditor role:** Senior application security engineer
**Scope:** Full codebase, build output, public files, headers, env/config.

---

## 0. What this application actually is (threat model)

TheWebPatcher is a **static, prerendered, client-only marketing site** (React +
Vite + `vite-react-ssg`, deployed to Vercel as static HTML/JS/CSS).

**It has no:** backend, API routes, database, server-side code, authentication,
user accounts, sessions, cookies, file uploads, payment processing, or any
endpoint that accepts and stores user input. The only "input" is outbound links
to Instagram; the only third-party runtime code is optional analytics.

This is the decisive fact for the audit. Whole categories from a generic
security checklist **do not apply because the attack surface does not exist**:

| Checklist area | Status | Why |
|---|---|---|
| Authentication / authorization | **N/A** | No auth, no accounts, no private routes. |
| IDOR / resource ownership | **N/A** | No resources, no user-scoped data, no IDs. |
| SQL / NoSQL injection | **N/A** | No database, no queries. |
| CSRF | **N/A** | No state-changing server endpoints, no cookies. |
| Sessions / JWT / cookie flags | **N/A** | No sessions or cookies are set. |
| Server-side input validation | **N/A** | No server receives input. |
| File upload safety | **N/A** | No upload functionality. |
| Payments / webhook signatures | **N/A** | No payments, no webhooks. |
| DB permissions / public buckets | **N/A** | No database or object storage. |

Claiming to "fix" these would be security theater. They are listed here
explicitly so the absence is a **documented, reasoned decision**, not an
oversight. If a backend, form handler, or payments are added later, re-audit
those areas — see "Future work" below.

---

## Second-pass (adversarial) findings — 2026-06-29

A second, attacker-mindset pass inspected the **actual shipped `dist/`
artifact** (not the source) and probed routes/headers. Three real issues were
found and fixed; the rest of the first-pass conclusions held.

### FIXED — Build manifests leaked the builder's local path (Medium, info disclosure)
- **Found:** `dist/.vite/manifest.json` and `dist/.vite/ssr-manifest.json` were
  shipped and publicly reachable (HTTP 200 at `/.vite/ssr-manifest.json`). The
  SSR manifest contained the builder's **absolute local path**
  (`C:/Users/elida/OneDrive/Desktop/web-patcher/...`), exposing the OS username
  and full project layout, plus a complete map of the source-module graph —
  classic reconnaissance fuel.
- **Fix:** Set `build.manifest=false` / `build.ssrManifest=false` in
  `vite.config.js`, and added `scripts/postbuild.mjs` (run in `npm run build`)
  that deletes `dist/.vite` and strips any stray `.map` files. **Verified:** no
  `C:/Users` string and no `.vite` dir remain anywhere in `dist/`.

### FIXED — Personal email published & harvestable (Low, PII/spam)
- **Found:** the owner's real personal Gmail was emitted in plaintext in
  `index.html`, `about.html`, `contact.html`, the JS bundle, and three JSON-LD
  nodes — trivially scraped by spam harvesters.
- **Fix:** Removed the email entirely from the contact page, all schema nodes,
  and `src/seo/site.js`. Contact is now **Instagram-only** (matches the brand).
  **Verified:** zero occurrences of the address in `dist/`.

### FIXED — No branded 404 / unknown-path handling (Low, hardening + UX)
- **Found:** no `dist/404.html`, so unknown paths fell to Vercel's generic 404.
- **Fix:** Added a `/404` route prerendered to `dist/404.html` (Vercel serves it
  for unmatched paths automatically). It is `noindex,nofollow` and excluded from
  the sitemap. The React wildcard route still covers client-side bad navigations.

### Verified NOT vulnerable (probed, not assumed)
- **Path traversal / sensitive-file access** — `/.env`, `/.git/config`,
  `/package.json`, `/src/...`, `/../etc/passwd`, `%2e%2e` encodings: none of
  these files exist in `dist/` (confirmed by filesystem check), so Vercel cannot
  serve them. `vite preview` returning 200 for them is a dev-server SPA-fallback
  artifact, **not** the production behavior (Vercel serves only `dist/`).
- **CORS** — N/A. Static host, no API, no `Access-Control-Allow-Origin` is set
  (correct). There is no cross-origin endpoint to misconfigure.
- **Error/stack-trace leakage** — no server, so no server errors. Unknown paths
  render the static 404; no stack traces or framework internals are exposed.
- **Dependency vulnerabilities** — `npm audit` reports a moderate + high, but
  **both are dev-server / build-time only** (esbuild dev-server SSRF, Vite
  `server.fs.deny` bypass, launch-editor). The dev server never runs in
  production; the static output is unaffected. The only fix is Vite 8 (breaking
  major); deferred deliberately. **Trigger to revisit:** any Vite upgrade, or if
  a build/runtime dependency advisory appears.

---

## 1. Vulnerabilities found & fixed (first pass)

### FIXED — Missing critical security headers (Medium)
- **Found:** `vercel.json` had `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, and a basic `Permissions-Policy`, but **no
  Content-Security-Policy, no HSTS, no Cross-Origin-Opener-Policy**, and
  `X-Frame-Options` was `SAMEORIGIN` rather than `DENY`.
- **Impact:** Without CSP, any future content/markup mistake (or a compromised
  third-party script) could execute arbitrary JS. No HSTS allowed downgrade/MITM
  on first visit.
- **Fix:** Added a strict, allowlist-based **Content-Security-Policy**
  (`default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`,
  `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`) scoped to
  exactly the hosts the app uses (Fontshare, GA/GTM, Meta Pixel) and nothing
  else; **HSTS** (`max-age=63072000; includeSubDomains; preload`);
  **Cross-Origin-Opener-Policy: same-origin**; **Cross-Origin-Resource-Policy**;
  upgraded `X-Frame-Options` to `DENY`; hardened `Permissions-Policy`
  (also disables `browsing-topics`/FLoC). See `vercel.json`.

### FIXED — JSON-LD `</script>` breakout (Low, defense-in-depth)
- **Found:** Structured data was emitted with raw `JSON.stringify`. The data is
  static and trusted today, but a future content edit containing `</script>`
  could break out of the `<script type="application/ld+json">` tag → stored XSS.
- **Impact:** Currently not exploitable (no user input reaches it); a latent
  foot-gun for future edits.
- **Fix:** Added `safeJsonLd()` in `src/seo/Seo.jsx` that escapes `<`, `>`, and
  the U+2028/U+2029 line separators to their `\uXXXX` text form. `JSON.parse`
  still decodes them, so structured data stays valid for Google.
- **Verified:** Injected a live `</script><b>test</b>` probe into schema data,
  rebuilt, and confirmed the raw payload does **not** appear in `dist/about.html`
  while the escaped form does. Probe then removed.

### FIXED — Production build could leak source / debug info (Low)
- **Found:** `vite.config.js` did not explicitly disable source maps or strip
  `console`/`debugger`. (Vite's default is no prod source maps, but it was not
  pinned, and `console` statements were not stripped.)
- **Fix:** Set `build.sourcemap = false`, `build.minify = 'esbuild'`, and
  `esbuild.drop = ['console','debugger']`. Verified `dist/` contains **no `.map`
  files and no `console.*` calls**.

### HARDENED — Secret-safety guardrails (preventive)
- **Found:** No hardcoded secrets anywhere (good). But all env vars are
  `VITE_*`, which Vite **inlines into the public client bundle** — a classic
  vibe-coded trap where someone later adds `VITE_STRIPE_SECRET` and ships it to
  every browser.
- **Fix:** Rewrote `.env.example` with a loud warning that `VITE_`-prefixed
  values are public and secrets must never use that prefix. Expanded
  `.gitignore` to block `.env`, `*.pem/*.key/*.p12/*.pfx/*.crt`, `id_rsa*`,
  `serviceAccount*.json`, `credentials.json`, `.vercel`, etc.

### HARDENED — Private client data kept out of the repo & build (preventive)
- **Found:** Three private images sit in the repo root — an Instagram profile
  screenshot and **two real client WhatsApp conversations showing a real
  person's name**. If committed or placed in `public/`, they'd be exposed.
- **Fix:** Confirmed via `git check-ignore` that all three are git-ignored and
  are **not** in `public/` or `dist/`, so they can neither be committed nor
  shipped. Added explicit ignore rules.

---

## 2. Audited and found already-safe (no change needed)

- **No hardcoded secrets / keys / tokens / DB URLs** in `src/`, scripts, or config.
- **No `dangerouslySetInnerHTML`, `eval`, `innerHTML`, or `new Function`** anywhere.
- **All `target="_blank"` links already carry `rel="noreferrer"`** (prevents
  reverse-tabnabbing and referrer leakage). 4/4 verified.
- **No secrets in git history** — repository has no commits yet (clean slate).
- **Analytics loads third-party scripts only when an env ID is set**, deferred to
  idle, and is covered by the CSP allowlist.
- **HTTPS** is automatic and enforced on Vercel; HSTS now added on top.

---

## 3. Remaining risks (residual)

| Risk | Severity | Notes |
|---|---|---|
| CSP uses `'unsafe-inline'` for `script-src`/`style-src` | Low | Required because the page ships inline JSON-LD, the analytics bootstrap, and `vite-react-ssg` hydration/inline styles, and a **static** Vercel deploy can't generate a per-request nonce without edge middleware. The rest of the CSP (strict `default-src`, no `object-src`, `frame-ancestors 'none'`, host allowlist) still blocks the most common injection vectors. To remove `unsafe-inline`, move to Vercel Edge Middleware that injects a per-response nonce. |
| Dev-dependency advisories (esbuild/vite) | Low (dev only) | `npm audit` reports a moderate esbuild dev-server SSRF and a transitive vite advisory. These affect the **local dev server only**, not the static production output. The fix (`vite@8`) is a breaking major; deferred deliberately. Re-evaluate when upgrading Vite. |
| Third-party analytics trust | Low | GA/GTM/Meta Pixel run in the user's browser if enabled. They are reputable and CSP-scoped, but any third-party script is inherently trusted code. Only enable the ones you use. |
| No automated dependency scanning in CI | Low | Add Dependabot/`npm audit` in CI (see manual steps). |

---

## 4. Manual steps you must do before / after deploy

1. **Set the real domain** in `src/seo/site.js` → `SITE_URL` (also fixes
   canonicals/sitemap/schema). Rebuild.
2. **Never add a secret with a `VITE_` prefix.** If you add a backend or form
   handler later, put secrets in server-only env vars and read them only in
   server code.
3. **Verify headers after deploy** — run the live URL through
   <https://securityheaders.com> (expect A/A+) and confirm CSP has no console
   violations in DevTools on every page (especially with analytics enabled).
4. **Confirm the private screenshots never get committed.** They're git-ignored;
   double-check with `git status` before your first push. Consider deleting them
   from the working folder once you no longer need them.
5. **Enable HSTS preload** only once you're confident the domain will stay
   HTTPS-only (the header already requests it). Submit at
   <https://hstspreload.org> if desired.
6. **Add dependency scanning**: enable GitHub Dependabot, and add
   `npm audit --omit=dev` to CI so prod-affecting advisories surface.
7. If you add **analytics**, set only the IDs you use in Vercel env vars
   (`VITE_GA_ID` / `VITE_GTM_ID` / `VITE_META_PIXEL_ID`) — all public by design.

---

## 5. Environment variables

| Variable | Required? | Secret? | Notes |
|---|---|---|---|
| `VITE_GA_ID` | Optional | No (public) | GA4 measurement ID. Inlined into client bundle. |
| `VITE_GTM_ID` | Optional | No (public) | Google Tag Manager container ID. |
| `VITE_META_PIXEL_ID` | Optional | No (public) | Meta Pixel ID. |

There are **no secret environment variables** in this project. If that changes,
do not prefix them with `VITE_`.

---

## 6. Production security checklist

- [x] No hardcoded secrets in source or git history
- [x] No secrets shipped in client bundle (`VITE_` vars are public by design; documented)
- [x] `.env` and key/cert patterns git-ignored; `.env.example` has placeholders + warning
- [x] Private client data (screenshots) git-ignored and not in `public/`/`dist/`
- [x] Strict Content-Security-Policy (allowlist, no `object-src`, `frame-ancestors 'none'`)
- [x] HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- [x] `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, CORP
- [x] No source maps in production build
- [x] `console`/`debugger` stripped from production bundle
- [x] No `dangerouslySetInnerHTML` / `eval` / `innerHTML`
- [x] JSON-LD output escaped against `</script>` breakout (verified)
- [x] All external links use `rel="noreferrer"`
- [x] HTTPS enforced (Vercel) + HSTS
- [ ] `securityheaders.com` A+ confirmed on live domain *(do after deploy)*
- [ ] Dependabot / `npm audit` wired into CI *(manual)*
- [ ] HSTS preload submitted *(optional, after deploy)*

---

## 7. Future work (only if scope grows)

If you later add a **backend, contact form, login, or payments**, re-open the
N/A categories from §0 and implement: server-side schema validation, rate
limiting, auth + per-resource ownership checks (anti-IDOR), CSRF protection,
secure cookie flags (`HttpOnly`/`Secure`/`SameSite`), webhook signature
verification, and server-side payment-state verification. None of these are
needed for the current static site.
