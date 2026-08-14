# PRD — Phase 6: Pilot decision review

**Milestone:** Phase 6 — Pilot decision review
**Risk owner:** Development lead (bar owner)
**Planned duration:** ~1 week *(estimate)*
**Milestone exit criterion (this PRD's acceptance bar):** Written decision by the named owner supported by usability rate, traceability defect count, reviewer effort data, and failure-category breakdown; any scope extension (budget narratives, logic models, portal formatting) recorded as a separate case rather than absorbed silently.

---

## Context

The pilot ends with a decision, made by a named person, on evidence assembled rather than remembered: **continue / narrow scope / stop**. Nothing is built in this phase. Its entire output is a document, and its whole risk is that the document tells a better story than the evidence supports.

Three specific pressures work against an honest decision, and this PRD's criteria exist to resist them:

**The denominator.** The bar is ≥70% usable across **20 proposals**. Annual volume is 18, so the sample was always going to combine retrospective golden-set cases with live drafts — agreed in writing in Phase 0 precisely so it could not be renegotiated here. The audit named this as the acceptance bar's soft spot. If live volume fell short of the agreed split, the honest report is that the denominator was not met, not a recomputed rate over whatever was available.

**Measurement contamination.** Grant writers authored the rubric, reviewed the drafts, scored the sample, and benefit from the tool. Phase 0's protocol (blinded or paired presentation, minimum independent scorers, an agreement floor) mitigates this; it does not remove it. The decision document must state how the number was produced and what it does not prove.

**Scope pressure.** A pilot that goes well invites budget narratives, logic models, and portal formatting to be absorbed as obvious next steps. Each is a separate case with its own scoring — recorded, not absorbed.

## Scope

### In scope

- **Evidence assembly** from Phases 3, 4, and 5, presented as measured rather than as summarised recollection:
  - **Usability rate** against the ≥70% bar, split by retrospective and live, each reported with its sample size and the scoring protocol used.
  - **Traceability defect count**: unsourced and mis-stated figures found, at what stage each was caught (automated check / reviewer / post-submission audit), and whether any reached a submitted proposal.
  - **Reviewer effort per draft** against the ≈30-hour baseline *(both figures labeled estimates)*, with the measurement method stated.
  - **Failure-category breakdown**: retrieval miss / grounding failure / composition weakness / formatting, offline and live side by side.
- **Statement of what the evidence does not establish** — sample sizes, rater independence limits, the untested surface (qualitative claims are controlled more weakly than figures), and the model-priors leakage rate as measured rather than as designed away.
- **Governance record**: whether the rollback trigger fired, whether rubber-stamping was observed, whether the mechanics were exercised, and whether any remediation path was used.
- **Assumption reconciliation.** Each assumption labeled in the plan is marked confirmed, refuted, or still open — corpus accessibility and completeness, grant-writer time, infrastructure modesty, register buildability without new data collection, external-provider data handling, and the traceability check's partial coverage.
- **The written decision** — continue / narrow / stop — by the named owner, with reasoning tied to the evidence above.
- **Post-pilot scope candidates recorded as separate cases**, each with its own problem statement and acceptance bar, explicitly not carried forward as pilot scope.
- **Timeline retrospective**: how the ~18 weeks of planned phases *(estimate)* played against the stated one-quarter pilot, and what that implies for any continuation.

### Out of scope

- Any build work, config change, or fix. Defects found during evidence assembly are logged for the continuation decision, not repaired to improve the numbers.
- Re-scoring drafts. If scoring was not done under the Phase 0 protocol during the pilot, that is a stated limitation, not something to correct retrospectively by re-scoring with hindsight.
- Adjusting the acceptance bar to match the result.
- Planning the next phase of work in detail. A "continue" decision opens that; it does not contain it.

## Acceptance criteria

| # | Criterion | How it is tested |
|---|---|---|
| **P6-AC-1** | A written decision — continue, narrow, or stop — exists, signed by the named owner with a date. | The document exists; the owner is a named individual, not a role. |
| **P6-AC-2** | The decision cites the usability rate against the ≥70% bar, reported separately for retrospective and live drafts, each with its sample size. | Both rates and both sample sizes appear; neither is a blended figure presented without its composition. |
| **P6-AC-3** | The report states whether the 20-proposal denominator agreed in Phase 0 was met as agreed, and if not, how it differed. *(audit — acceptance-bar soft spot)* | The Phase 0 composition agreement is compared line by line against what was actually scored. |
| **P6-AC-4** | The traceability defect count is reported with the stage at which each defect was caught, and states explicitly whether any unsourced or mis-stated figure reached a submitted proposal. | Defect log rolls up to the reported count; the submitted-proposal question is answered yes or no, not omitted. |
| **P6-AC-5** | Reviewer effort per draft is reported against the ≈30-hour baseline, with both labeled as estimates and the measurement method stated. | Figures present; method documented; baseline provenance from Phase 0 cited. |
| **P6-AC-6** | The failure-category breakdown is reported for offline and live runs side by side. | Two breakdowns in the four agreed categories, with counts. |
| **P6-AC-7** | The report contains an explicit section on what the evidence does not establish, covering at minimum: sample sizes, rater-independence limits, qualitative-claim coverage relative to figure coverage, and the measured ungrounded-sentence rate. | All four are addressed; none is replaced by a design assertion. |
| **P6-AC-8** | The governance record states whether the rollback trigger fired, whether rubber-stamping was observed in the sign-off timing inspection, whether rollback mechanics were exercised, and whether remediation was ever invoked. | Four questions, four answers. |
| **P6-AC-9** | Every assumption labeled in the plan is marked confirmed, refuted, or still open, with evidence. | The plan's assumption list is reproduced with a status against each; no blanks. |
| **P6-AC-10** | Every post-pilot scope candidate raised during the pilot is recorded as a separate case with its own problem statement and acceptance bar, and none is folded into the pilot's scope. | A candidate list exists; the decision document does not extend the pilot's own scope. |
| **P6-AC-11** | The report states how the planned phase durations compared with actual elapsed time and what that implies for a continuation. *(audit fix 1)* | Planned versus actual per phase, with both labeled as estimates where estimated. |
| **P6-AC-12** | Where the bar was not met, the report says so plainly and the decision responds to that rather than to a reinterpreted bar. | Read the result against the bar as written in Phase 0; no restatement of the threshold or denominator. |

## Dependencies

- **Phase 3, 4, and 5 exits**, with their scoring sheets, defect logs, effort measurements, audit trails, and governance records intact and retrievable.
- **The Phase 0 artefacts as the reference**: the rubric, the scoring protocol, the 20-proposal composition agreement, the numeric rollback thresholds, and the recorded provenance of the ≈30-hour baseline. These are what the result is measured against.
- **The named owner's availability** to read the evidence and decide. A decision deferred past the pilot's end leaves the system in limited release without a mandate.
- **Grant writers and the programme lead**, to contest or confirm the evidence before it is presented.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| **The denominator gets renegotiated at the end** to make the bar reachable — the audit's named soft spot. | P6-AC-3 compares actual scoring against the Phase 0 written agreement rather than against a convenient reading. The composition was fixed in writing at the start for this exact reason. |
| **The usability rate is reported blended**, hiding that the live component was thin. *(derived from stated 18/year volume)* | P6-AC-2 requires the split with sample sizes. A blended rate over an unequal mix is not the bar the plan set. |
| **Sunk cost drives "continue" regardless of evidence.** A quarter of work and a functioning system are powerful arguments that are not evidence. | The decision must cite the four required evidence types (P6-AC-2, AC-4, AC-5, AC-6) and answer P6-AC-12 directly. "Narrow" exists precisely so the choice is not binary. |
| **Contaminated scoring is reported as a clean number.** | P6-AC-7 requires the rater-independence limits to be stated in the decision document, not only in the Phase 0 protocol where the decision-maker will not see them. |
| **Scope creep is absorbed into "continue"**, so the next quarter starts with an unscored expansion. | P6-AC-10 makes each candidate a separate case. Budget narratives, logic models, and portal formatting were deliberate non-goals of the pilot and remain unscored work. |
| **Defects found during evidence assembly get quietly fixed** so the numbers improve. | Fixing is out of scope for this phase. A defect found now is evidence about the pilot, and fixing it changes what is being reported on. |
| **A "stop" decision leaves the system running.** | If the decision is stop or narrow, the Phase 4 rollback mechanics define how the system is stood down and what happens to in-flight drafts. Reference them explicitly in the decision. |

## Open questions

1. **What result constitutes "narrow" rather than "continue" or "stop"?** Defining the three outcomes' evidence signatures before reading the numbers is the cheapest guard against post-hoc reasoning — and it should have been agreed by the end of Phase 0.
2. **Who reviews the decision besides the owner?** A decision with one signature and no challenge is the same person marking their own work — the pattern the audit flagged in the scoring design.
3. **If the traceability half passed and the usability half failed** (or the reverse), how does the decision weight them? They fail differently: usability is a productivity question, traceability is a compliance one, and a single composite verdict obscures that.
4. **What happens to the corpus and figures register on a "stop"?** They have standalone value to the organisation, and discarding them alongside the system would be a real loss.
5. **Does the ≈30-hour baseline survive scrutiny?** If Phase 0 found it was a recollection, the effort comparison is between an estimate and a measurement and the decision should say so rather than report a saving.
6. **Is a continuation still a pilot?** Continuing under pilot governance (mandatory review, full audit trail, rollback trigger live) versus normalising the system are materially different decisions, and "continue" should specify which.

---

*Every duration in this document is a planning estimate, not a commitment. The ≈30-hour baseline and the derived live-proposal counts are estimates, labeled wherever used. No benchmark, vendor requirement, or cost figure is asserted. All acceptance criteria derive from the Phase 6 exit criterion, the project acceptance bar, or a stated fix from the independent audit.*
