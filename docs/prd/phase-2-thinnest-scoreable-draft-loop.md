# PRD — Phase 2: Thinnest scoreable draft loop

**Milestone:** Phase 2 — Thinnest scoreable draft loop
**Risk owner:** Builder
**Planned duration:** ~3 weeks *(estimate)*
**Milestone exit criterion (this PRD's acceptance bar):** End-to-end draft generated for at least 10 golden-set briefs with inline citations, and the automated traceability check running on every draft with gap markers rendered rather than numerals silently dropped; prompts and config under version control.

---

## Context

This is the first phase that generates anything. It builds the thinnest loop that can be *scored* against the acceptance bar — funder brief in, cited first draft out, traceability check run, gaps marked — and nothing beyond it. The milestone description is explicit: no scope beyond what the bar measures.

Two design commitments carry the compliance weight, and both are structural rather than promptable:

**Figures are retrieved, not generated.** A sentence containing a figure is checked against the approved figures register built in Phase 1. A figure with no match is not smoothed over and not silently deleted — deletion would leave fluent prose with a hole the reviewer cannot see. It is replaced with a visible `[FIGURE NEEDED — no approved source]` marker so the gap arrives as a gap.

**Section-wise composition.** Each required section gets its own retrieval call, scoped by section role. This keeps grounding tight and, more importantly, makes a failure attributable to one section rather than to "the draft".

Two claims from the original architecture are corrected here, per the audit:

- The design binds **section-level** retrieval sets, not sentence-level provenance. Citations tell a reviewer which chunks were available to the model when a section was written. They do not prove a given sentence came from a given chunk. The UI wording and the source appendix must say what is true.
- "Anything not admitted to this corpus is invisible to the system" is false for a prompting-plus-RAG design. Corpus admission scopes *retrieval*; it does not gate the generating model's own parametric knowledge. That is a real leakage path, it is tested in Phase 3, and the check built here is what makes the test meaningful.

## Scope

### In scope

- **Structured funder-brief intake.** A form, not free chat: funder priorities, required sections, word limits per section. The same fields are present every run so a run is reproducible.
- **Section-wise retrieval.** One retrieval call per required section, filtered on section role plus the metadata filters Phase 1 produced (prefer funded proposals; prefer impact-report figures over proposal restatements; exclude outcome data older than an agreed cutoff).
- **Composition over retrieved chunks.** Prompting that composes each section from the retrieved material, instructed to emit a gap marker rather than supply a fact that is not in the retrieved chunks.
- **Citation binding.** Every section carries the chunk IDs retrieved for it; the draft renders inline citation markers plus a source appendix resolving each to its document.
- **Automated traceability check.** Extract every figure from the draft and match it against the approved figures register — matching value *and* reporting period, since a right number attached to the wrong year is a misrepresentation. Runs on every draft, in evaluation and in production.
- **Extraction parity with the register** *(audit fix 2)*. The draft-side extractor covers the same forms as the register-side extractor built in Phase 1: digits, spelled-out numbers, percentages, currency, and reporting-period ranges. It additionally flags **model-derived percentages** — a percentage computed from two register figures rather than retrieved as one — because such a figure has no source entry and would otherwise fail open.
- **Gap-marker rendering.** Unmatched or mismatched figures are replaced with `[FIGURE NEEDED — no approved source]`; mismatches additionally record the register value the check expected. The draft carries a list of flagged gaps.
- **Version control for prompts, retrieval parameters, chunking rules, and the rubric**, in the same repository as code, so any metric movement in Phase 3 is attributable to a specific change.
- **Run record per draft.** Brief, retrieved chunk IDs, prompt/config version, generated draft, check result. This is the substrate the Phase 5 audit trail extends.
- **Export** into the format the writers already edit in, with citations as visible inline markers plus a source appendix.

### Out of scope

- Budget-table generation, logic models, funder-portal formatting or submission. Post-pilot candidates only.
- Chat-style open-ended revision loops.
- Any system-initiated write to the approved corpus.
- The review queue as a product surface — Phase 5. Phase 2 produces drafts and check results; the human checkpoint is not yet a workflow.
- Throughput, latency, or cost optimisation. Latency is batch and volume is 18 proposals a year.
- Any qualitative-claim check. Deliberately deferred to Phase 3, where the rubric line item is defined and red-teamed (see Open questions).

## Acceptance criteria

| # | Criterion | How it is tested |
|---|---|---|
| **P2-AC-1** | An end-to-end draft is generated for at least 10 golden-set briefs, each produced from a structured brief with no manual intervention between submission and draft. | 10 run records exist, each with a brief, a draft, and a check result. |
| **P2-AC-2** | Every section of every generated draft carries the chunk IDs retrieved for it, and every cited chunk ID resolves to a source document that opens. | Walk all citations across the 10 drafts; zero unresolvable IDs. |
| **P2-AC-3** | The source appendix and any UI text describe citations as section-level retrieval sets, not as sentence-level provenance. *(audit fix 2 — overclaim correction)* | Read the rendered output; no wording asserts that a specific sentence derives from a specific chunk. |
| **P2-AC-4** | The automated traceability check runs on 100% of generated drafts and its result is recorded with the draft. | No draft in the run record lacks a check result. |
| **P2-AC-5** | A figure with no matching register entry is rendered as `[FIGURE NEEDED — no approved source]` in the draft body — never deleted, never left as prose. | Inject a brief that elicits an unsupported figure; the marker appears at the point of the claim. Additionally: no draft in the 10-brief run contains an unmatched figure rendered as ordinary prose. |
| **P2-AC-6** | A figure whose value or reporting period differs from its register entry is flagged as a mismatch, distinct from the no-source case, and the expected register value is recorded. | Craft a case where the draft states a right figure against the wrong year; the check flags it and names the expected period. |
| **P2-AC-7** | The draft-side extractor covers digits, spelled-out numbers, percentages, currency, and reporting-period ranges, matching Phase 1's register-side coverage. *(audit fix 2)* | The Phase 1 fixture set, applied to draft text, is extracted with no misses. |
| **P2-AC-8** | A percentage or ratio that does not appear in the register but could have been derived from register figures is flagged as derived rather than passed. *(audit fix 2)* | Construct a draft asserting a percentage computable from two register entries but present in neither; the check flags it. |
| **P2-AC-9** | Prompts, retrieval parameters, chunking rules, and the rubric are in version control, and every run record names the config version it used. | Given a run record, check out that version and reproduce the configuration. |
| **P2-AC-10** | Re-running a golden-set brief against the same config version produces a draft whose citation set and check result are reproducible. | Re-run 3 briefs; retrieved chunk sets and check outcomes match. *(Prose may vary; the grounding and the check result are what must be stable.)* |
| **P2-AC-11** | Each required section in the brief produces a correspondingly scoped retrieval call, and retrieval for one section cannot satisfy another. | Inspect the run record: one retrieval set per section, each carrying its section-role filter. |
| **P2-AC-12** | The exported document renders citations as visible inline markers plus a source appendix, in the format writers already edit in. | Open an export in the writers' own tool; markers and appendix are present and legible. |

## Dependencies

- **Phase 1 exit, in full.** The register (P1-AC-6), extraction coverage (P1-AC-7), canonical boilerplate marking (P1-AC-5), and the metadata filters this phase's retrieval depends on. A draft loop built over an unvetted corpus is the failure mode this case cannot afford.
- **At least 10 golden-set briefs, assembled and available.** This is a hard dependency and it is currently unowned across the whole milestone list — see Open questions. Phase 2 cannot complete without it.
- **The agreed section taxonomy** (mission / governance / past outcomes / needs statement) reconciled against what funders actually require, from the Phase 0 source inspection.
- **The external-provider decision from Phase 0**, since composition sends retrieved corpus content to a model.
- **Access to the writers' editing format**, for the export step.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| **The model supplies a fact from its own priors rather than from retrieval**, and it is fluent enough that the reviewer accepts it. Corpus admission does not gate parametric knowledge. | The gap-marker behaviour is built here so it can be *tested* in Phase 3 with a closed-book case (retrieval deliberately returns nothing; the output must be a marker, not invention). Phase 2's job is to make that testable; it does not claim to have solved leakage. |
| **The traceability check fails open on a figure form it does not recognise.** | P2-AC-7 and P2-AC-8 fix the covered forms against Phase 1's fixture set, including the derived-percentage case that would otherwise pass silently. Any new form found in Phase 3 is added to the fixture set. |
| **Gap markers become so frequent that writers ignore them or strip them wholesale.** | Track gap-marker rate per draft in the run record from the first run. A high rate is a corpus signal (Phase 1) or a retrieval signal, not a reason to loosen the check. |
| **Silent numeral deletion creeps in** as a "cleaner output" improvement. | P2-AC-5 tests for it directly. Deletion is the specific behaviour the exit criterion forbids. |
| **Scope creep into revision loops, budget tables, or portal formatting**, because they demo well. | The milestone description forbids scope beyond what the bar measures. Any such request is recorded as a post-pilot scope candidate for the Phase 6 decision, not absorbed. |
| **Section-level citations are read by reviewers as sentence-level proof**, producing false confidence. | P2-AC-3 fixes the wording. This is a limitation to state, not a gap to close within this phase. |
| **Citations are stripped before review** rather than after it. The plan's original wording claimed a draft "cannot" reach a funder with markers embedded; the system loses control at export, so that claim does not hold. | Make stripping a deliberate, separate step that happens after review. State the residual risk honestly: once exported to the writer's own editor, the system has no enforcement, and the mandatory review queue in Phase 5 is the actual control. |

## Open questions

1. **Who assembles the golden set, and when?** Phase 2 needs at least 10 briefs; evaluation calls for 50–100 scored items in Phase 3. No milestone owns this. It is the single most likely cause of Phase 2 not completing on estimate.
2. **What counts as a match for a figure?** Exact string, rounded equivalence ("1,240" vs "over 1,200"), or unit-normalised? Rounding is normal grant prose and an over-strict check will bury reviewers in false gaps, while a loose one defeats the bar. The programme lead should set the rule.
3. **What is the recency cutoff for outcome data**, and is it one cutoff or per section role?
4. **Where does the qualitative-claim check live?** The audit requires one. Options: a rubric line item scored by humans (Phase 0/3), an automated flag for superlatives and comparatives, or both. Phase 2 defers it deliberately; Phase 3 must not.
5. **What does the model do when retrieval returns material that is relevant but thin** — compose a weak section, or emit a section-level gap marker? The behaviour should be decided rather than emerging from prompt wording.
6. **Which model provider and configuration?** The plan requires long-context composition and instruction-following behind a swappable interface, and asserts no vendor requirement. The choice must not be invented here; it follows the Phase 0 data-handling decision.
7. **Word limits are per section in the brief — what happens when grounded material cannot fill the limit?** Padding is a grounding risk; the honest behaviour is a short section plus a gap note.

---

*Every duration in this document is a planning estimate, not a commitment. No benchmark, vendor requirement, or cost figure is asserted. All acceptance criteria derive from the Phase 2 exit criterion, the project acceptance bar, or a stated fix from the independent audit.*
