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

## Before the first build session

```bash
cp .env.example .env.local     # add the Neon DATABASE_URL / DIRECT_URL
npm install                    # if node_modules is missing
npm run db:status              # confirms both test and dev reachable
npm test                       # green (nothing to test yet, but the wiring works)
```

## The six open questions that block real work

From `docs/prd/README.md` — these belong to the bar owner and programme lead, not to the builder, and assuming them away is the failure mode this project was audited for:

1. **Timeline** — ~18 weeks of phases against a one-quarter pilot. Blocks Phase 4 and 5.
2. **Golden-set assembly is unowned** — no milestone builds the 50–100 item set. Blocks Phase 2 (needs ≥10 briefs) and Phase 3.
3. **Figure-match rule** — exact, rounded, or unit-normalised? Without it Phase 3's pass/fail is undefined.
4. **Provenance of the ≈30-hour baseline** — anchors Phase 4 effort and the Phase 6 decision.
5. **Response if inter-rater agreement misses the floor** — needed before Phase 3.
6. **Where the qualitative-claim control lives** — Phase 2 defers it; Phase 3 owns it.

Phase 1 (approved corpus and figures register) is the least blocked of the build phases, which is why it's the natural first target — but note its own gate: **it must not start until the Phase 0 external-provider decision is recorded.**
