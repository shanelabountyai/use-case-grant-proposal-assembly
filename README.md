# Grant proposal first-draft assembly

BUILD · 80/100 · audit: SHIP WITH FIXES

## Start here

1. Open this folder in Claude Code.
2. Paste **Step 0** from [docs/prd-pack.md](docs/prd-pack.md) to load the shared context.
3. Work through the 7 milestone prompts, saving each PRD to `docs/prd/`.

`CLAUDE.md` carries the case, plan, audit findings, and the rules for this project — it loads automatically.

## What this is

Grant proposal first-draft assembly is a Quick win (composite 80) and clears the build threshold, so we proceed to a one-quarter pilot. The build is a grounded drafting assistant: an approved-source corpus (boilerplate library, five years of submitted proposals with funded/declined outcomes, annual impact reports) is chunked and indexed with provenance metadata; retrieval pulls the relevant mission, governance, and outcome material; direct prompting composes a funder-shaped first draft. Two things define success and shape every design choice: grant writers must rate ≥70% of drafts as a 'usable starting point' across 20 proposals, and every statistic in a draft must be traceable to an approved source. Because a fabricated outcome figure is a fraud exposure rather than a cosmetic error, the numeric-claim path is deliberately narrowed — figures are surfaced as retrieved, cited snippets rather than freely generated prose, and unsupported numbers are stripped or flagged rather than smoothed over. Every draft passes a mandatory human review queue before it leaves the system; that is a launch condition, not a phase-two nicety. Batch latency and low task volume (18 proposals a year) mean throughput engineering is not the problem — corpus quality, citation discipline, and reviewer trust are. Scope is held to the thinnest loop that can be scored against the acceptance bar before any expansion into budget narratives, logic models, or funder-portal formatting.