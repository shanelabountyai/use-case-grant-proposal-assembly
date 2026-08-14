# PRD — Phase 0: Bar lock and source inventory

**Milestone:** Phase 0 — Bar lock and source inventory
**Risk owner:** Development lead (bar owner), with grant writers
**Planned duration:** ~2 weeks *(estimate)*
**Milestone exit criterion (this PRD's acceptance bar):** Written rubric defining 'usable starting point' signed off by the grant writers; source inventory complete with named owners and a documented revision to the data-readiness picture after hand inspection; the 20-proposal sample composition agreed in writing.

---

## Context

The project acceptance bar has two halves that fail differently: grant writers rate **≥70% of drafts as a 'usable starting point' across 20 proposals**, and **zero unsourced statistics** — every number traceable to an approved source. Neither half is measurable today. "Usable starting point" is a phrase, not a rubric. "20 proposals" is a denominator the organisation cannot supply from live volume alone, because annual volume is 18. And the three source sets have been scored 4/5 for data readiness without anyone having opened the files.

Phase 0 exists to convert both halves of the bar into something that can be scored, and to find out what the corpus actually contains before three weeks of ingestion work is committed to it. Nothing is built in this phase.

The independent audit (verdict: SHIP WITH FIXES) demanded three additions land here specifically, and this PRD carries them as acceptance criteria rather than as advice:

1. **Measurement integrity** — blinded or paired usability scoring, a minimum number of independent scorers, and an inter-rater agreement floor, recorded alongside the rubric. As written, grant writers author the rubric, act as the reviewers in the queue, score the usability sample, and are the beneficiaries of the tool. The ≥70% figure is measurable in name but contaminated in practice.
2. **Numeric rollback thresholds** — governance currently says usability falling "materially below" the bar triggers a pause. That is not a threshold.
3. **External-provider data-handling approval as a gate** — this appears in Governance and in the assumption list but is not an exit criterion of any phase. Phase 1 ingests the entire approved corpus; if approval fails afterwards, that work is stranded.

These are tightenings of the exit criterion, not new bars, and each traces to a stated audit fix.

## Scope

### In scope

- **Rubric authoring.** A written rubric operationalising 'usable starting point': named dimensions (structure present, funder priorities addressed, house voice recognisable, less rewriting than starting blank), a scale, and a per-draft pass threshold. Drafted with the grant writers, not for them.
- **Rubric calibration on existing material.** Apply the draft rubric to historic hand-written first drafts to prove it discriminates and to compute inter-rater agreement before any system output exists.
- **Scoring protocol.** How drafts are presented to scorers (blinded or paired), how many independent scorers, the agreement floor, and the documented procedure when agreement falls below it.
- **Sample composition agreement.** The exact split of the 20-proposal denominator between retrospective golden-set cases and live pilot proposals, in writing, signed by the owner.
- **Source inventory.** One record per source set (boilerplate library; five years of submitted proposals with funded/declined outcomes; annual impact reports) naming an owner, the authoritative location, the access method, approximate document count, and formats present.
- **Hand inspection.** Read a real sample from each source set. Record what was found — near-duplicate boilerplate versions, missing outcome tags, figures in image-only tables, documents whose approval status is unclear.
- **Documented revision to data readiness.** Restate the 4/5 score with reasons, in whichever direction the evidence points.
- **Numeric rollback thresholds.** For each of the three pre-committed trigger conditions, a metric, a threshold, and a rolling window, signed off by the owner.
- **External-provider data-handling decision.** Recorded as approved / refused / approved-with-conditions, with the conditions named.
- **Naming.** The accountable individuals behind every role this plan uses: bar owner, programme lead (figures-register owner), accountable reviewer, per-source owners.

### Out of scope

- Any ingestion, conversion, chunking, indexing, or embedding work — that is Phase 1, and it is deliberately gated behind the data-handling decision recorded here.
- Any prompting, retrieval, or draft generation — Phase 2.
- Assembling the golden set itself. Phase 0 agrees the *composition* of the 20-proposal acceptance sample; assembling 50–100 scored golden-set items is separate work (see Open questions — it is currently unowned).
- Validating the ≈30-hour per-proposal drafting baseline. Phase 0 records where the figure came from; Phase 4 uses it.
- Any change to the acceptance bar itself. Phase 0 makes the bar operational; it does not renegotiate it.

## Acceptance criteria

Each criterion is independently testable and traces to the milestone exit criterion or to a named audit fix.

| # | Criterion | How it is tested |
|---|---|---|
| **P0-AC-1** | A rubric document exists defining 'usable starting point' with named dimensions, a scale per dimension, and an explicit per-draft pass/fail threshold. | The document exists in the repo; a reader who was not present can apply it to a draft without asking a clarifying question. |
| **P0-AC-2** | The rubric is signed off by the grant writers, with identities and date recorded. | Sign-off block present and names real individuals, not a role. |
| **P0-AC-3** | The rubric has been applied to at least 5 historic hand-written first drafts by at least 2 scorers independently, and the resulting inter-rater agreement is recorded. | Scoring sheets exist; agreement statistic computed and written down. |
| **P0-AC-4** | A scoring protocol document states: the blinding or pairing method, the minimum number of independent scorers per draft, the inter-rater agreement floor as a number, and the documented procedure when agreement falls below that floor. *(audit fix 3)* | Each of the four elements is present and numeric where a number is called for. |
| **P0-AC-5** | The composition of the 20-proposal acceptance sample is agreed in writing: retrospective count plus live count summing to 20, with the selection rule for each. | Signed document; the two counts sum to 20; the rule would let a third party reproduce the selection. |
| **P0-AC-6** | A source inventory exists covering all three source sets, each row carrying a named individual owner, authoritative location, access method, approximate document count, and formats present. | No row has an unnamed owner or an unresolved location. |
| **P0-AC-7** | A hand-inspection record exists per source set, listing documents actually opened and what was found, including any conversion-hostile material (image-only tables, scanned pages) and any documents whose approval status could not be determined. | Record names specific documents, not categories. |
| **P0-AC-8** | The data-readiness picture is restated with reasons, superseding the provisional 4/5 score. | A revised score with written justification referencing P0-AC-7 findings. |
| **P0-AC-9** | Numeric rollback thresholds are recorded for each of the three pre-committed trigger conditions — unsourced figure reaching a submitted proposal; usability rate falling below a stated level; reviewer sign-off timing falling below a stated duration — each with a metric, a threshold, and a rolling window, signed off by the owner. *(audit fix 3)* | No condition is expressed in words like "materially below"; each carries a number and a window. |
| **P0-AC-10** | The external model provider's onward data-handling terms have been reviewed and a decision recorded (approved / refused / approved-with-conditions) by the named owner, with conditions listed. *(audit fix 3)* | Decision document exists and is dated before any corpus content is processed externally. |
| **P0-AC-11** | No corpus content has been transmitted to an external model provider prior to P0-AC-10 being satisfied. | Attestation by the builder; no external calls in the repo history carrying corpus content before that date. |
| **P0-AC-12** | Every role the plan relies on is mapped to a named individual: bar owner, programme lead, accountable reviewer, and one owner per source set. | Role-to-name table with no blanks. |

## Dependencies

- **Grant writers' time**, for rubric authoring and the calibration scoring in P0-AC-3. This is the phase's critical path; if writers cannot commit hours, Phase 0 does not complete.
- **Programme lead availability**, to be named as figures-register owner and to speak to which impact-report figures are final versus draft.
- **Read access to all three source sets** in their authoritative locations.
- **Whoever can approve external data handling** — this may sit outside the project team, and the approval route should be identified in week 1 rather than discovered in week 2 *(estimate: this is the most likely single cause of Phase 0 overrunning)*.
- **A set of historic hand-written first drafts** usable for rubric calibration under P0-AC-3.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| **Rater independence cannot be fully achieved.** The grant writers are the only people who know what a usable draft looks like, and there are few of them. Blinding may be partially defeatable — writers may recognise their own prose. | Use paired scoring (system draft alongside a hand-started draft, source hidden) rather than relying on blinding alone; record known limits of the blinding in the protocol rather than claiming independence the design cannot deliver. Consider a programme lead as an additional scorer for structural dimensions. |
| **Rubric is written loosely enough that ≥70% is unfalsifiable.** A rubric where everything passes measures nothing. | P0-AC-3 requires calibration on historic drafts, which will include drafts the writers would not call usable. If the rubric passes all of them, it is not discriminating and must be revised before sign-off. |
| **Hand inspection reveals the corpus is materially worse than 4/5** — undated boilerplate variants, figures only in scanned tables, no reliable funded/declined tagging. | This is the expected outcome, not the failure case. Phase 0 is scheduled ahead of ingestion precisely so the Phase 1 estimate can be revised on evidence. The revision is recorded under P0-AC-8, not absorbed silently. |
| **External-provider approval is refused or conditioned late in the phase**, stranding the schedule. | Identify the approval route in week 1. If refusal is plausible, establish what a self-hosted or on-premise path would require before Phase 1 begins — noting the plan asserts no vendor requirement and none should be invented here. |
| **The 20-proposal denominator gets quietly renegotiated at the end of the pilot.** The audit flagged this as the acceptance bar's soft spot. | P0-AC-5 fixes the split in writing and under sign-off at the start, so any later change is a visible amendment rather than a reinterpretation. |
| **Naming individuals surfaces that no one owns the figures register.** | Better surfaced now than in Phase 1. If no programme lead can own it, that is a Phase 1 blocker and should escalate to the bar owner immediately. |

## Open questions

These are unresolved and must not be filled in by assumption.

1. **Timeline reconciliation.** The phase durations sum to ~18 weeks *(estimate)* against a stated one-quarter pilot. The audit named this as a fix required before or during build. Which gives — the phase count, the phase durations, or the quarter? This is a decision for the bar owner and it changes what Phase 4 and Phase 5 can be expected to produce.
2. **Golden-set assembly is unowned.** Evaluation calls for 50–100 scored golden-set items; Phase 2 needs at least 10 briefs; Phase 3 runs the full set. No milestone names who assembles it or when. Assign it, or Phase 2 will start with nothing to run against.
3. **Where does the ≈30-hour per-proposal baseline come from?** It anchors the Phase 4 effort comparison and the Phase 6 decision. If it is a recollection rather than a measurement, say so and label it an estimate everywhere it is used.
4. **What happens if the inter-rater agreement floor is not met after revision?** Does the pilot proceed with human scoring and a wider sample, pause, or accept a lower-confidence result? Decide before Phase 3, not during it.
5. **Who can score usability besides the grant writers?** If the answer is "no one", the independence gap is a permanent limitation of the evidence and should be stated as such in the Phase 6 decision rather than discovered there.
6. **Are declined proposals in scope for corpus admission**, and if so, does the funded/declined tag exist reliably in the source material, or does someone have to reconstruct it? Phase 1 depends on the answer.

---

*Every duration in this document is a planning estimate, not a commitment. No benchmark, vendor requirement, or cost figure is asserted. This PRD derives its acceptance criteria from the Phase 0 exit criterion and the independent audit's stated fixes; it does not introduce a new bar or loosen an existing one.*
