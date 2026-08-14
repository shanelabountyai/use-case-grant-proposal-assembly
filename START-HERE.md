# Start here — new session

Open **this folder** in its own Claude Code window (`cd ~/Documents/Claude/Projects/use-case-grant-proposal-assembly && claude`). `CLAUDE.md` loads automatically, so the case, plan, audit findings and working rules are already in context.

Recommended model: **Opus** — this build's compliance exposure is fraud (a fabricated outcome figure in a funder submission), and Phase 1's figures register is the control that prevents it. Drop to Sonnet for mechanical work once a phase's design is settled.

---

## Paste this to begin

```text
Read CLAUDE.md, SETUP.md, and docs/prd/README.md before doing anything.

This is a build project scoped and independently audited by the AI Use-Case
Studio. The decision is made — do not re-score or re-scope the case. If the
premise looks wrong, say so rather than quietly redesigning around it.

Current state: scaffold only. The stack is installed (npm workspaces, Next 16,
Prisma + Postgres, vitest/Playwright) and prisma/schema.prisma has NO MODELS on
purpose — the entities come from the milestones. All seven phase PRDs are
written in docs/prd/ with numbered, testable acceptance criteria.

Nothing has been built yet. Phase 0 is human coordination work (rubric,
source inventory, sign-offs) and Phase 1 is the first phase with code.

Before you propose anything, tell me:
1. Which acceptance criteria in the phase we pick are blocked by the open
   questions listed in docs/prd/README.md, and which can proceed regardless.
2. What you'd build first in Phase 1 and what its one runnable check is.

Rules that are not negotiable here:
- Every acceptance criterion traces to a milestone exit criterion or the
  project acceptance bar. Don't invent new bars, don't loosen existing ones.
- Mark every estimate as an estimate. No invented benchmarks, vendor
  requirements, or ROI figures — a second model audited this plan for exactly
  that and its findings are in CLAUDE.md.
- If something isn't in CLAUDE.md or docs/, it's an open question, not an
  assumption to fill in.
- Oversight is required and sensitivity is internal. Check any design change
  against both.
- ANTHROPIC_API_KEY must stay empty until the Phase 0 external-provider
  data-handling decision is recorded (P0-AC-10/11). Do not process corpus
  content through a model before then.
```

---

## What's true right now

| | |
|---|---|
| Verdict | BUILD · 80/100 · audit: SHIP WITH FIXES |
| Acceptance bar | ≥70% of drafts rated 'usable starting point' across 20 proposals; zero unsourced statistics |
| PRDs | All 7 written — `docs/prd/` |
| Code | Scaffold only; no models, no features |
| Database | Local test DB `grant_proposal_test` exists; Neon project created — `.env.local` needs its URLs |

## Neon and local Postgres

This build has **its own Neon project**, named `use-case-grant-proposal-assembly`. Never point it at the Studio's or a sibling build's — the three carry different data sensitivities, and one shared database inherits the strictest retention rule across all of them. See "Project boundaries" in CLAUDE.md.

### 1. Two connection strings, not one

Neon console → your project → **Connect**. You need *both*, and they differ by one substring:

| | Host | Goes in | Used for |
|---|---|---|---|
| **Pooled** | contains `-pooler` | `DATABASE_URL` | the app at runtime |
| **Direct** | same host, no `-pooler` | `DIRECT_URL` | Prisma migrations |

Serverless functions open many short-lived connections, which is what the pooler exists to absorb. Migrations need a real session and will hang or fail against the pooler — that mismatch is the single most common Neon-plus-Prisma failure, and it surfaces as a migration that never returns rather than as a clear error.

Both strings need `?sslmode=require`.

### 2. Write them in

```bash
cp .env.example .env.local
```

```bash
# .env.local — real values, never committed (.env*.local is gitignored)
DATABASE_URL="postgresql://USER:PASSWORD@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

`.env.example` documents names only and stays that way. Production values belong in the Vercel project's env vars, not in any file here.

### 3. Local Postgres for tests — already set up

```bash
# Already done: database created and .env.test written.
psql -lqt | grep grant_proposal_test
```

`.env.test` overrides **only** the database; every other secret falls through to `.env.local`, because `dotenv -e .env.test -e .env.local` takes the **first** file's value. Tests never touch Neon — a remote test database turns a 0.75s integration test into 113s and makes infrastructure strain look exactly like flaky tests.

### 4. Confirm both halves

```bash
npm install            # if node_modules is missing
npm run db:status      # test (local) AND dev (Neon) — both must answer
npm test               # the guard proves tests still point at localhost
```

- `db:status:dev` fails → check `DIRECT_URL` is the **non-pooled** host and that `sslmode=require` is present.
- `npm test` starts failing "is local, never remote" → `.env.local` has leaked into the test path. Check the dotenv ordering; first file wins.
- Neither has migrations to report yet: `schema.prisma` has no models on purpose.

**`ANTHROPIC_API_KEY` stays empty for now.** P0-AC-10 requires the external-provider data-handling decision to be recorded first, and P0-AC-11 asserts no corpus content was processed before that date. A key populated early is how that gets violated by accident.


## The six open questions that block real work

From `docs/prd/README.md` — these belong to the bar owner and programme lead, not to the builder, and assuming them away is the failure mode this project was audited for:

1. **Timeline** — ~18 weeks of phases against a one-quarter pilot. Blocks Phase 4 and 5.
2. **Golden-set assembly is unowned** — no milestone builds the 50–100 item set. Blocks Phase 2 (needs ≥10 briefs) and Phase 3.
3. **Figure-match rule** — exact, rounded, or unit-normalised? Without it Phase 3's pass/fail is undefined.
4. **Provenance of the ≈30-hour baseline** — anchors Phase 4 effort and the Phase 6 decision.
5. **Response if inter-rater agreement misses the floor** — needed before Phase 3.
6. **Where the qualitative-claim control lives** — Phase 2 defers it; Phase 3 owns it.

Phase 1 (approved corpus and figures register) is the least blocked of the build phases, which is why it's the natural first target — but note its own gate: **it must not start until the Phase 0 external-provider decision is recorded.**
