# PRD — Phase 3: Offline evaluation and red-teaming

**Milestone:** Phase 3 — Offline evaluation and red-teaming
**Risk owner:** Builder, with grant writers as scorers
**Planned duration:** ~3 weeks *(estimate)*
**Milestone exit criterion (this PRD's acceptance bar):** Golden-set run shows the usability rubric meeting the ≥70% bar on the human-scored sample and no unsourced or mis-stated figure surviving to a finished draft; every red-team failure mode tested with findings added to the golden set; defect log broken out by category with fixes attributed to specific config versions.

---

## Context

This is where the acceptance bar is actually tested, offline, before any live proposal is exposed to the system. Both halves are measured, and they are measured separately because they fail differently: usability is a human judgement over a sample, traceability is an automated gate over every draft.

Three things make this phase harder than "run the eval":

**The scorers are not independent.** Grant writers author the rubric, will be the reviewers in the queue, will score the usability sample, and are the tool's intended beneficiaries. The Phase 0 scoring protocol (blinded or paired presentation, a minimum number of independent scorers, an inter-rater agreement floor) exists to make the ≥70% number mean something. This phase must execute that protocol as written, not a convenient version of it.

**Numbers are not the whole compliance exposure.** The stated requirement is that *funder representations must be accurate*. The design controls figures. An unsourced qualitative claim — "our programme is the largest in the region", "outcomes improved year over year" — passes every automated gate and reaches the reviewer as confident prose. Phase 2 deliberately deferred this; Phase 3 owns it.

**The model carries its own knowledge.** Corpus admission scopes retrieval, not the model's priors. Without a closed-book control case, "grounded in approved sources" is an assertion about the design rather than a measured property of the output.

## Scope

### In scope

- **Full golden-set run** against the current prompt/config version, covering routine cases (familiar funder, standard sections), known edge cases (an unusual funder priority with no close precedent; a section where boilerplate is thin), and deliberately hard cases (a funder asking for outcome data the organisation only partly has; a priority that invites overclaiming).
- **Traceability check scored pass/fail per draft**, over every draft in the run.
- **Human rubric scoring on the sample**, executed under the Phase 0 protocol — blinded or paired presentation, the agreed minimum number of independent scorers, inter-rater agreement computed and compared against the recorded floor.
- **Ungrounded-sentence measurement** *(audit fix 2)*. A measured rate, not an assertion, of sentences making a factual claim not supported by the section's retrieved chunks.
- **Qualitative-claim control** *(audit fix 2)*. A rubric line item, an automated flag for superlative and comparative claims, or both — decided and implemented here, then scored across the golden set.
- **Red-teaming the enumerated failure modes**, each tested deliberately:
  1. Prompts inviting overclaiming ("describe our strongest outcomes").
  2. Funder briefs asking for data the organisation lacks.
  3. Figures from **declined** proposals presented as achieved results.
  4. Stale figures from an older impact report presented as current.
  5. Two reporting periods blended into one sentence.
  6. **Closed-book control** *(audit fix 2)*: retrieval deliberately returns nothing for a section; the output must be a gap marker, not fluent invention.
  7. **Derived-figure evasion**: a percentage computed from register figures but present in none.
- **Defect categorisation** into retrieval miss (the right fact existed and was not retrieved), grounding failure (retrieved text contradicted by the draft), composition weakness (accurate but unusable prose), and formatting. Each category has a different fix.
- **Fix-by-category**, with each fix attributed to a specific config version and re-run against the golden set.
- **Promotion of red-team findings into permanent golden-set items**, so a fixed failure cannot silently return.

### Out of scope

- Any live proposal. Phase 4 is the first exposure to live work.
- The review queue as a workflow surface — Phase 5.
- Changing the acceptance bar. If the bar is not met, that is a finding to carry into the Phase 6 decision, not a threshold to adjust.
- **LLM-as-judge as the scoring mechanism.** It may be trialled to scale the rubric *later*, and only after judge–human agreement is measured on a subsample. Agreement is an empirical result, not an assumption. Given low volume, human scoring is the default and is affordable.
- Reviewer-effort measurement against the ≈30-hour baseline — Phase 4.

## Acceptance criteria

| # | Criterion | How it is tested |
|---|---|---|
| **P3-AC-1** | The full golden set has been run against a named prompt/config version, and every run is recorded with that version. | Run log covers the whole set; no run without a config version. |
| **P3-AC-2** | The usability rubric, applied under the Phase 0 scoring protocol, shows ≥70% of drafts in the human-scored sample rated a 'usable starting point'. | Scoring sheets; the rate is computed from them and meets or exceeds 70%. |
| **P3-AC-3** | The scoring was executed under the Phase 0 protocol as written: the agreed blinding or pairing method, at least the agreed minimum number of independent scorers per draft, and computed inter-rater agreement meeting the recorded floor. *(audit fix 3)* | Compare the executed protocol against P0-AC-4 point by point; any deviation is recorded with the reason and its effect on the result. |
| **P3-AC-4** | No unsourced or mis-stated figure survives to a finished draft anywhere in the golden-set run. | Every draft's check result is pass; independently, a manual audit of a sample of drafts finds no figure the check missed. |
| **P3-AC-5** | Every one of the seven enumerated red-team failure modes has been tested deliberately, with the test case, the observed behaviour, and the verdict recorded. | Seven test records exist; none is marked untested or deferred. |
| **P3-AC-6** | The closed-book control case produces a gap marker rather than invented content when retrieval returns nothing for a section. *(audit fix 2)* | Force empty retrieval for a section; the output contains the gap marker and no factual claim about the organisation. |
| **P3-AC-7** | The ungrounded-sentence rate is measured across the golden set and recorded as a number. *(audit fix 2)* | A stated rate with the counting method documented — not a claim that the design prevents ungrounded sentences. |
| **P3-AC-8** | A control for unsupported qualitative claims exists (rubric line item, automated flag, or both) and has been applied across the golden set, with results recorded. *(audit fix 2)* | The control is defined in writing; scoring or flagging output exists for every draft in the run. |
| **P3-AC-9** | Figures originating from declined proposals are not presented as achieved outcomes in any draft. | Red-team case 3 records the behaviour; the golden-set run is audited specifically for this pattern. |
| **P3-AC-10** | Every defect found is logged with a category (retrieval miss / grounding failure / composition weakness / formatting), and the log reports counts by category. | The defect log has no uncategorised entries and produces a category breakdown. |
| **P3-AC-11** | Every fix is attributed to a specific config version, and the golden set was re-run after that version was applied. | For each fix: a config version identifier and a post-fix run result. |
| **P3-AC-12** | Every red-team finding has been promoted to a permanent golden-set item. | The golden set after this phase contains one item per red-team finding. |
| **P3-AC-13** | If LLM-as-judge was used at all, judge–human agreement was measured on a subsample and reported; it did not replace human scoring for the P3-AC-2 result. | Agreement figure reported, or an explicit record that no judge was used. |

## Dependencies

- **Phase 2 exit**: the working draft loop, the traceability check with parity extraction and derived-figure flagging, gap-marker rendering, and versioned config.
- **The full golden set** — 50–100 scored items, assembled and covering routine, edge, and hard cases. Ownership of assembly remains open across the milestone list (raised in Phase 0 and Phase 2). This phase cannot start without it.
- **The Phase 0 scoring protocol and rubric**, signed off, including the numeric agreement floor.
- **Grant-writer scoring time.** If their availability collapses, evaluation stalls before the build does — this is a labeled assumption in the plan, and this phase is where it bites.
- **Programme-lead availability** to adjudicate whether a flagged figure is genuinely wrong or a register gap.
- **The figure-match rule** left open in Phase 2 (exact vs rounded vs unit-normalised). Without it, P3-AC-4's pass/fail is not well defined.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| **The ≥70% result is contaminated by rater incentive.** Writers score a tool built for them, against a rubric they wrote. | Execute the Phase 0 protocol exactly, and record deviations rather than absorbing them (P3-AC-3). Where blinding is imperfect — writers may recognise their own prose — say so in the result rather than reporting a clean number. Report the pairing comparison (system draft vs hand-started draft) alongside the raw rate. |
| **Fixing to the golden set rather than to the failure.** Iterating config until the set passes produces a number that does not transfer to live proposals. | Fix by *category*, not by case (P3-AC-10, P3-AC-11). A fix that moves one case and no others in its category is suspect. Hold out a portion of the set from the tuning loop if the set is large enough — decide the split before the first run, not after seeing results. |
| **The bar is met on the golden set and fails live.** Historic briefs are systematically easier: the outcome is known and the material demonstrably existed. | This is why Phase 4 exists and why the acceptance sample mixes retrospective and live cases (agreed in Phase 0). Report the golden-set result as a golden-set result. |
| **The qualitative-claim control is defined so loosely it flags nothing.** | Test it against deliberately planted claims from red-team case 1, not only against organic output. |
| **Red-teaming becomes a demonstration that the system passes** rather than an attempt to break it. | Each case is written to specify the *failure* being sought and what output would constitute a failure, before it is run. |
| **Defect volume exceeds the ~3-week estimate**, particularly if hand inspection in Phase 0 revised the corpus picture downward. | Re-estimate at phase start on the Phase 1 outcome. Categorised defect counts make it visible whether the problem is corpus (retrieval miss), grounding, or prose — and the first two are not fixed by more evaluation time. |
| **Inter-rater agreement falls below the floor** and there is no agreed response. | Phase 0 open question 4 must be closed before this phase starts. |

## Open questions

1. **What is the human-scored sample size within the golden set?** The bar is ≥70% "across 20 proposals" and the golden set is 50–100 items. Which items are human-scored, and how do they relate to the 20-proposal denominator agreed in Phase 0?
2. **Is there a held-out portion of the golden set?** If the whole set drives tuning, the final number is a training figure. Decide the split before the first run.
3. **How is the ungrounded-sentence rate counted?** Per sentence, per factual claim, or per section? The method must be fixed before the number means anything, and the same method must be reusable in Phase 5.
4. **Who adjudicates a flagged figure that turns out to be correct but absent from the register?** That is a Phase 1 register gap, not a draft defect, and it should be routed to the register owner rather than logged as a grounding failure.
5. **What is the pass rule for a draft that contains gap markers?** A draft with visible, honest gaps may well be a usable starting point. If gap markers automatically fail a draft on the rubric, the system is penalised for the behaviour the compliance requirement demands.
6. **Does the timeline reconciliation (Phase 0 open question 1) shorten this phase?** Evaluation is the phase most likely to be compressed under schedule pressure, and it is the one that produces the evidence the whole pilot decision rests on.

---

*Every duration in this document is a planning estimate, not a commitment. No benchmark, vendor requirement, or cost figure is asserted. All acceptance criteria derive from the Phase 3 exit criterion, the project acceptance bar, or a stated fix from the independent audit.*
