# Grant proposal first-draft assembly

Build project scoped by the AI Use-Case Studio. The decision is made and
independently audited — this repo executes it. Do not re-scope or re-score
the case here; if the premise looks wrong, say so rather than quietly
redesigning around it.

## The case

- **Verdict:** BUILD — composite 80/100 (Quick win)
- **Problem:** The development team rewrites the same organizational boilerplate — mission, governance, past outcomes — for every funder, reshaped to each funder's priorities. Deadlines get missed for lack of drafting hours, not lack of fit.
- **Users:** Grant writers and the programme leads who supply the substance.
- **Acceptance bar:** Grant writers rate ≥70% of drafts as 'usable starting point' across 20 proposals; zero unsourced statistics — every number traceable to an approved source.
- **Data:** The boilerplate library, five years of submitted proposals with funded/declined outcomes, and the annual impact reports. — documents, small, sensitivity **internal**, static
- **Constraints:** latency batch · oversight **required** · Funder representations must be accurate; fabricated outcome figures would be a fraud exposure, not just an error.

## The plan

**Architecture:** Direct prompting grounded with RAG over reference material (task shape: generate)

Grant proposal first-draft assembly is a Quick win (composite 80) and clears the build threshold, so we proceed to a one-quarter pilot. The build is a grounded drafting assistant: an approved-source corpus (boilerplate library, five years of submitted proposals with funded/declined outcomes, annual impact reports) is chunked and indexed with provenance metadata; retrieval pulls the relevant mission, governance, and outcome material; direct prompting composes a funder-shaped first draft. Two things define success and shape every design choice: grant writers must rate ≥70% of drafts as a 'usable starting point' across 20 proposals, and every statistic in a draft must be traceable to an approved source. Because a fabricated outcome figure is a fraud exposure rather than a cosmetic error, the numeric-claim path is deliberately narrowed — figures are surfaced as retrieved, cited snippets rather than freely generated prose, and unsupported numbers are stripped or flagged rather than smoothed over. Every draft passes a mandatory human review queue before it leaves the system; that is a launch condition, not a phase-two nicety. Batch latency and low task volume (18 proposals a year) mean throughput engineering is not the problem — corpus quality, citation discipline, and reviewer trust are. Scope is held to the thinnest loop that can be scored against the acceptance bar before any expansion into budget narratives, logic models, or funder-portal formatting.

### Milestones

- **Phase 0 — Bar lock and source inventory** — Confirm the acceptance bar operationally with the owner and grant writers, agree how the 20-proposal sample will be composed (retrospective plus live), inventory and hand-inspect the three source sets, and name owners.  
  _Exit:_ Written rubric defining 'usable starting point' signed off by the grant writers; source inventory complete with named owners and a documented revision to the data-readiness picture after hand inspection; the 20-proposal sample composition agreed in writing.
- **Phase 1 — Approved corpus and figures register** — Stand up the ingestion pipeline, make corpus admission decisions, deduplicate boilerplate, and build the approved figures register that the traceability bar depends on.  
  _Exit:_ Every admitted document ingested with resolvable provenance; canonical boilerplate blocks marked; the approved figures register populated and spot-verified by the programme lead against the underlying impact reports; refresh runs as a single scripted command.
- **Phase 2 — Thinnest scoreable draft loop** — Section-wise retrieval plus prompting producing a cited first draft, with the automated traceability check and gap markers in place. No scope beyond what the bar measures.  
  _Exit:_ End-to-end draft generated for at least 10 golden-set briefs with inline citations, and the automated traceability check running on every draft with gap markers rendered rather than numerals silently dropped; prompts and config under version control.
- **Phase 3 — Offline evaluation and red-teaming** — Run the full golden set against both halves of the bar, red-team the enumerated failure modes, categorise defects, and fix by category.  
  _Exit:_ Golden-set run shows the usability rubric meeting the ≥70% bar on the human-scored sample and no unsourced or mis-stated figure surviving to a finished draft; every red-team failure mode tested with findings added to the golden set; defect log broken out by category with fixes attributed to specific config versions.
- **Phase 4 — Shadow mode on live proposals** — System drafts in parallel while writers work as they do today; compare outputs, measure reviewer effort, and check that source-checking behaviour is genuine rather than rubber-stamped.  
  _Exit:_ Shadow drafts produced for every live proposal in the window, with side-by-side comparison recorded, reviewer effort per draft measured against the ≈30-hour baseline, and the pre-committed rollback trigger (metric, threshold, window) signed off by the owner.
- **Phase 5 — Limited release behind mandatory review** — Writers use system drafts as their real starting point, with every draft passing the review queue and full audit trail written.  
  _Exit:_ Live drafts sustain the ≥70% usable rating and no unsourced figure reaches a submitted proposal across the release window; audit trail complete and reconstructable for every draft; reviewer sign-off timing inspected for rubber-stamping.
- **Phase 6 — Pilot decision review** — Present evidence against the bar and the ≈30-hour baseline; decide continue / narrow / stop and identify the first post-pilot scope candidate if any.  
  _Exit:_ Written decision by the named owner supported by usability rate, traceability defect count, reviewer effort data, and failure-category breakdown; any scope extension (budget narratives, logic models, portal formatting) recorded as a separate case rather than absorbed silently.

## What the audit demanded

Independent critic verdict: **SHIP WITH FIXES**.

Fix these before or during build:
- Reconcile the timeline: ~18 weeks of phases against a stated one-quarter pilot, and fix Phase 4/5 windows that assume more live proposals than 18/year supplies in 3 weeks.
- Close the traceability scope hole and drop the exclusivity overclaims: extend the check beyond numerals (spelled-out figures, derived percentages, unsupported qualitative claims), add a closed-book golden-set case proving the model emits a gap marker when retrieval returns nothing, and rewrite "invisible to the system" and the sentence-level citation claim.
- Move measurement integrity into Phase 0 exit criteria: blinded/paired usability scoring with an inter-rater agreement floor, numeric rollback thresholds and window (replacing "materially below"), plus external-provider data-handling approval as a gate before corpus ingestion.

### Known gaps

- **Rater independence for the ≥70% usability bar** — Grant writers author the rubric, are the reviewers in the queue, and are the scorers of the usability sample (Phase 3 ownerOfRisk: "Builder with grant writers as scorers"). Nothing blinds them to whether a draft came from the system, and they are also the beneficiaries of the tool. The ≥70% figure is therefore measurable in name but contaminated in practice. Add blinded or paired scoring (system draft vs. hand-started draft, source hidden), a minimum number of independent scorers, and an inter-rater agreement floor recorded in Phase 0 alongside the rubric.
- **Non-numeric misrepresentation is unowned** — The compliance exposure is "Funder representations must be accurate" — not just numbers. The design controls figures only (figures register, numeral matching, gap markers). An unsourced qualitative claim ("our programme is the largest in the region", "outcomes improved year over year") passes every automated gate and reaches the reviewer as confident prose. Define a check or rubric line item for unsupported qualitative claims, and extend the numeral extractor to spelled-out numbers and model-derived percentages.
- **Base-model knowledge leakage is not addressed** — The plan asserts corpus exclusivity but never designs for the fact that the generating model carries its own priors. There is no test that the model refuses to supply facts absent from retrieved chunks — no closed-book control case in the golden set, no measurement of ungrounded-sentence rate. Add a red-team case where retrieval deliberately returns nothing for a section and assert the output is a gap marker, not fluent invention.
- **No rollback mechanics, only a rollback trigger** — Governance names conditions that "pause the system" but nothing states what pausing means operationally: are in-flight drafts recalled, is the index frozen, who executes the pause, and how does a submitted proposal containing a bad figure get corrected with the funder? Trigger (a) is a post-submission event — a remediation path, not just a pause, is required.
- **External-provider approval is an assumption with no gate** — "Confirm with the owner what onward data handling is acceptable for any external model provider before processing corpus content through it" appears in Governance and in assumptions but is not an exit criterion of any phase. Phase 1 ingests the full approved corpus; if approval fails afterwards the corpus work is stranded. Make it a Phase 0 exit criterion.

## Working rules

- Every acceptance criterion traces to a milestone exit criterion or the acceptance bar above. Don't invent new bars, don't loosen existing ones.
- Mark every estimate as an estimate. No invented benchmarks, vendor requirements, or ROI figures — a second model audited this plan for exactly that.
- If something isn't in this file or `docs/`, it's an open question, not an assumption to fill in.
- Oversight is **required** and sensitivity is **internal** — check any design change against both before proposing it.

## Layout

- `docs/prd-pack.md` — session starter + one PRD prompt per milestone. Start here.
- `docs/build-kickoff-package.md` — the full deliverable: rationale, workflow diagrams, evaluation, governance.
- `docs/prd/` — PRDs as they get written, one per milestone.

## Provenance

- Plan model: `claude-opus-5` · prompt roster `bk-2-claude` · plan v2
- Generated from case `c3a83fc6-9fc1-475f-ac4b-03739d2e0cc0`, job `9c5d15ea-df02-4076-a504-7e4c77f14819`

> Decision-support, not a guarantee. Every figure in the plan is an estimate unless traced to a source.