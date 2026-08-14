# PRD — Phase 4: Shadow mode on live proposals

**Milestone:** Phase 4 — Shadow mode on live proposals
**Risk owner:** Development lead
**Planned duration:** ~3 weeks *(estimate)*
**Milestone exit criterion (this PRD's acceptance bar):** Shadow drafts produced for every live proposal in the window, with side-by-side comparison recorded, reviewer effort per draft measured against the ≈30-hour baseline, and the pre-committed rollback trigger (metric, threshold, window) signed off by the owner.

---

## Context

Shadow mode is the first contact with real work. The system drafts in parallel while grant writers work exactly as they do today; nothing the system produces reaches a funder, and nothing writers do changes. What is being tested is not whether the system can draft — Phase 3 established that against historic briefs — but whether the golden-set result transfers to a live brief, whether reviewers genuinely check sources when a real deadline is pressing, and whether reviewer effort is actually lower than starting blank.

**The window arithmetic does not work as planned, and this must be settled before the phase starts.** Annual volume is 18 proposals. A three-week window yields approximately **one** live proposal *(derived from the stated 18/year: 18 × 3/52 ≈ 1)*. "Shadow drafts produced for every live proposal in the window" is satisfiable by a single proposal, which is not a comparison — it is an anecdote. The independent audit named this as a fix required before or during build: reconcile the ~18 weeks of phases against the stated one-quarter pilot, and fix the Phase 4/5 windows that assume more live proposals than 18 a year supplies in three weeks.

This PRD does not resolve that itself — the resolution belongs to the bar owner and changes what the pilot can claim. It does refuse to proceed as though the arithmetic worked: the window, the expected proposal count, and what the phase can and cannot demonstrate at that count are a precondition here (P4-AC-1).

The second thing this phase carries is the **rollback trigger**, and the audit was clear that a trigger without mechanics is not a control. "Pause the system" needs an operational definition: who executes it, what happens to in-flight drafts, whether the index freezes — and, for the post-submission case, how a submitted proposal containing a bad figure gets corrected with the funder. A pause does not un-send a proposal.

## Scope

### In scope

- **Parallel drafting.** For every live proposal in the agreed window, the system produces a shadow draft from the same funder brief the writer is working to. Writers do not see the shadow draft before completing their own work, or the comparison is worthless.
- **Side-by-side comparison, recorded.** Per proposal: the writer's own draft, the system's shadow draft, and a structured comparison — sections where the shadow draft was equal or better, sections where it was worse, what the writer would have had to change.
- **Reviewer effort measurement** against the ≈30-hour per-proposal baseline *(an estimate whose provenance is recorded in Phase 0)*. Measure the time a reviewer spends taking a shadow draft to a state they would accept, using a defined and consistent method.
- **Rubric scoring of shadow drafts** under the Phase 0 protocol, so live results are comparable with the Phase 3 golden-set numbers rather than measured differently.
- **Traceability check on every shadow draft**, with results recorded exactly as in Phase 3.
- **Source-checking behaviour observation.** Whether reviewers open the source snippets behind figures at all, and how long they spend on a draft. This is the rubber-stamping signal, and it is easier to observe here — where nothing is at stake — than in Phase 5, where it matters.
- **Pre-committed rollback trigger, signed off**: for each of the three conditions, the metric, the numeric threshold, and the rolling window, carried forward from Phase 0 (P0-AC-9) and signed off by the owner before limited release.
- **Rollback mechanics** *(audit fix — load-bearing gap)*: what pausing operationally means, who executes it, what happens to in-flight drafts and to the index, and the **remediation path** for a submitted proposal found to contain a bad figure — funder notification route, who decides, what record is kept.
- **Defect logging** in the Phase 3 categories, so live and offline defects are comparable.

### Out of scope

- Any system output reaching a funder. Writers' own drafts are the real work throughout this phase.
- Writers starting from a system draft — that is Phase 5, and doing it here destroys the comparison.
- Config changes mid-window unless a defect blocks the phase. A moving configuration makes the comparison unattributable; if a change is unavoidable, it is versioned and the window is reported in two segments.
- Loosening the acceptance bar to accommodate the small live sample. The correct response to a thin sample is to say the sample was thin.

## Acceptance criteria

| # | Criterion | How it is tested |
|---|---|---|
| **P4-AC-1** | Before the window opens, the owner has recorded in writing: the window length, the expected number of live proposals within it *(derived from the stated 18/year)*, and what the phase can and cannot demonstrate at that count. *(audit fix 1)* | A signed record exists and its proposal count is arithmetically consistent with stated volume and window length. |
| **P4-AC-2** | A shadow draft was produced for **every** live proposal in the agreed window, with none skipped for convenience or deadline pressure. | Count shadow drafts against the organisation's own record of proposals started in the window; the counts match, or each omission is recorded with a reason. |
| **P4-AC-3** | A structured side-by-side comparison is recorded for every shadow draft, covering per-section outcomes and the changes the writer would have had to make. | One comparison record per shadow draft, none empty. |
| **P4-AC-4** | Writers did not see the shadow draft before completing their own draft. | Timestamps: shadow draft access follows the writer's draft completion in every case. |
| **P4-AC-5** | Reviewer effort per shadow draft is measured with a defined, documented method and reported against the ≈30-hour baseline *(both figures labeled as estimates)*. | Per-draft effort figures exist; the measurement method is written down and was applied consistently. |
| **P4-AC-6** | Every shadow draft was rubric-scored under the Phase 0 protocol, producing a live usability rate comparable with the Phase 3 result. | Scoring sheets exist under the same protocol; the two rates are reported side by side. |
| **P4-AC-7** | The traceability check ran on 100% of shadow drafts, with results recorded. | No shadow draft lacks a check result. |
| **P4-AC-8** | Reviewer source-checking behaviour is recorded per draft: whether source snippets were opened, and time spent. | Interaction record exists per draft and supports a rubber-stamping judgement. |
| **P4-AC-9** | The rollback trigger is signed off by the owner with a metric, a numeric threshold, and a rolling window for each of the three conditions. *(audit fix 3)* | Signed document; no condition expressed qualitatively. |
| **P4-AC-10** | Rollback **mechanics** are documented: who executes a pause, what happens to in-flight drafts, whether the index freezes, and how the system is restarted. *(audit fix — load-bearing gap)* | A named individual could execute the pause from the document alone. |
| **P4-AC-11** | A remediation path is documented for the post-submission case — a submitted proposal found to contain an unsourced or mis-stated figure: who is told, who decides on funder notification, and what record is kept. *(audit fix — load-bearing gap)* | The document addresses correction with the funder, not only internal pause. |
| **P4-AC-12** | Live defects are logged in the Phase 3 categories, and the live category breakdown is reported against the offline one. | Two comparable breakdowns exist. |

## Dependencies

- **Phase 3 exit in full**, including the ≥70% golden-set result, the zero-surviving-figure result, and the defect log. Shadow mode on a system that failed offline evaluation measures nothing.
- **The window decision from P4-AC-1**, which depends on the timeline reconciliation left open since Phase 0. This is the phase's hard precondition.
- **Live proposals actually occurring in the window.** At 18 a year this is not guaranteed *(derived)*; a window with no proposal produces no evidence, and the schedule cannot create one.
- **Writer and reviewer time on top of live deadline work.** Shadow mode adds effort during the period writers are least able to absorb it.
- **The Phase 0 scoring protocol**, applied unchanged, so live and offline numbers are comparable.
- **The ≈30-hour baseline's provenance**, recorded in Phase 0. If it is a recollection, the comparison is between an estimate and a measurement, and must be reported that way.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| **The window yields one proposal, and one proposal is presented as evidence.** *(derived from stated volume)* | P4-AC-1 forces the count and its limits to be written down before the window opens. Where the live sample is thin, the Phase 6 evidence must lead with the retrospective results and label the live component for what it is. Extending the window is the owner's call and trades against the quarter. |
| **Deadline pressure causes shadow drafting to be skipped** for the hardest, most informative proposals. | P4-AC-2 requires every omission to be recorded with a reason. A pattern of skipping hard cases is itself a finding. |
| **Writers see the shadow draft and anchor to it**, contaminating both the comparison and their own work. | P4-AC-4 is timestamp-testable. If it fails for a proposal, that proposal is excluded from the comparison rather than reported with a caveat. |
| **Reviewer effort is measured inconsistently** — self-reported, differently bounded per person, or including work that is not drafting. | Define and document the method before the first measurement (P4-AC-5). An unusable effort number weakens the Phase 6 decision more than a missing one. |
| **Source-checking looks genuine under observation and is not.** Nothing is at stake in shadow mode, so behaviour here may be better than in Phase 5. | Treat Phase 4's behaviour data as a ceiling, not a prediction, and re-inspect sign-off timing in Phase 5 (which its exit criterion requires). |
| **A rollback trigger is signed off without mechanics**, leaving a control that cannot be executed. | P4-AC-10 and P4-AC-11 are separate criteria from P4-AC-9 for exactly this reason. Trigger condition (a) is a post-submission event; a pause does not correct a proposal already with a funder. |
| **Live drafts perform materially worse than golden-set drafts**, on a sample too small to say why. | Report both rates and the sample sizes; use the categorised defect breakdown to point at the likely cause (retrieval miss vs grounding vs prose) rather than asserting one. |

## Open questions

1. **What window actually gets used, and does the pilot stay a quarter?** This is Phase 0 open question 1, now blocking. Options include lengthening the window, running Phase 4 and Phase 5 concurrently across different proposals, or accepting that live evidence is thin and weighting the retrospective sample accordingly.
2. **What is the minimum live sample the owner will accept as evidence** for the Phase 6 decision? Answering before the window prevents the number being rationalised afterwards.
3. **Does a shadow draft count toward the 20-proposal acceptance denominator** agreed in Phase 0, or only Phase 5 drafts? The composition agreement should already say; if it does not, close it now.
4. **Who observes source-checking behaviour, and are reviewers told they are observed?** Telling them changes the behaviour; not telling them is a decision the owner should make explicitly.
5. **What happens if a shadow draft surfaces a figure error in a proposal the writer is about to submit?** Shadow mode is meant to be inert, but suppressing a real finding to protect an experiment is not defensible. Define the escalation.
6. **Who has authority to pause the system** — the development lead, the accountable reviewer, or any grant writer? P4-AC-10 needs a name, and the fastest-acting person is usually the right one.

---

*Every duration in this document is a planning estimate, not a commitment. The ≈30-hour baseline and the derived live-proposal count are estimates, labeled as such wherever used. No benchmark, vendor requirement, or cost figure is asserted. All acceptance criteria derive from the Phase 4 exit criterion, the project acceptance bar, or a stated fix from the independent audit.*
