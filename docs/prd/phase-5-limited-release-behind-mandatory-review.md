# PRD — Phase 5: Limited release behind mandatory review

**Milestone:** Phase 5 — Limited release behind mandatory review
**Risk owner:** Accountable reviewer (grant writer), with development lead
**Planned duration:** ~3 weeks *(estimate)*
**Milestone exit criterion (this PRD's acceptance bar):** Live drafts sustain the ≥70% usable rating and no unsourced figure reaches a submitted proposal across the release window; audit trail complete and reconstructable for every draft; reviewer sign-off timing inspected for rubber-stamping.

---

## Context

This is the first phase where the system's output becomes real work. Writers start from a system draft instead of a blank page. Everything the system produces still passes the mandatory review queue before it can reach a funder-facing document — that is a launch condition, not a phase-two nicety, and it is where the fraud-exposure risk becomes a person's signature rather than a system property.

Three commitments define this phase:

**No bypass.** There is no auto-send path, no trusted-funder exception, and no deadline-pressure override. If a deadline forces a shortcut, the shortcut is writing by hand — not skipping review.

**Named accountability.** One accountable reviewer signs off each draft, recorded with identity and timestamp. The sign-off attests explicitly that every figure was checked against its cited source. The automated traceability check reduces the chance of an unsupported figure surviving; it does not eliminate it, and the reviewer's sign-off remains the control of record.

**Sign-off timing is a governance metric, not a performance metric.** A reviewer approving drafts faster than plausible source-checking allows is a governance failure even when the outputs happen to be correct. The exit criterion requires this to be inspected, and Phase 4's observations set the comparison.

The same window arithmetic that constrains Phase 4 constrains this phase: at 18 proposals a year, a three-week release window yields approximately one live proposal *(derived from the stated 18/year: 18 × 3/52 ≈ 1)*. "Live drafts sustain the ≥70% usable rating" cannot be assessed on a sample of one. The reconciliation left open since Phase 0 has to be settled before this window opens.

## Scope

### In scope

- **Limited release.** An agreed, named set of writers and proposals uses system drafts as their real starting point.
- **The review queue as a working surface.** Drafts land with inline citations, the list of flagged gaps, the traceability check result, and one-click access to the source snippet behind each cited claim. It sits where writers already work rather than being a separate tool to remember.
- **Mandatory review enforcement.** Nothing exits to a funder-facing document without a recorded reviewer action. No bypass path exists in the system, and none is added under deadline pressure.
- **Sign-off attestation.** The reviewer's action explicitly attests that each figure was checked against its cited source, and is recorded with identity and timestamp.
- **Full audit trail per draft**: the funder brief, retrieved chunk IDs, prompt and config version, the generated draft, the traceability check result, reviewer identity, reviewer edits, and final sign-off — retained so the organisation can reconstruct months later where any submitted number came from.
- **Sign-off timing inspection.** Time between draft arrival and sign-off, and time spent with source snippets open, compared against the Phase 4 observations and against the pre-committed rubber-stamping threshold.
- **Continued rubric scoring** under the Phase 0 protocol, so the live rate is comparable with Phase 3 and Phase 4.
- **Continued traceability checking** on every draft, with results recorded.
- **Citation stripping as an explicit post-review step**, so a draft cannot be cleaned of internal markers before review, and reviewed drafts do not carry markers onward by accident.
- **Live operation of the rollback trigger and mechanics** signed off in Phase 4, including the remediation path if a bad figure reaches a submitted proposal.

### Out of scope

- Wider rollout beyond the agreed release set. That follows the Phase 6 decision.
- Budget narratives, logic models, funder-portal formatting or submission — post-pilot scope candidates, recorded rather than absorbed.
- Any change to the mandatory review requirement.
- System-initiated writes to the approved corpus. Corpus changes remain admission decisions with a named owner.
- Enforcement of document handling after export. Once a draft is exported into the writer's own editor, the system has no control over it; the review queue is the control, and this limit is stated rather than papered over.

## Acceptance criteria

| # | Criterion | How it is tested |
|---|---|---|
| **P5-AC-1** | Across the release window, the live usability rate meets or exceeds 70% under the Phase 0 scoring protocol, reported with the sample size. | Scoring sheets; rate computed and reported alongside n. |
| **P5-AC-2** | No unsourced or mis-stated figure reaches a submitted proposal during the window. | Post-submission audit of every submitted proposal in the window against the approved figures register; zero findings. Any finding triggers the P4-AC-11 remediation path. |
| **P5-AC-3** | Every draft has a complete audit trail: brief, retrieved chunk IDs, prompt/config version, draft, check result, reviewer identity, reviewer edits, and sign-off. | Sample drafts at random; each of the eight elements is present and retrievable. |
| **P5-AC-4** | The audit trail is reconstructable after the fact: for any figure in any submitted proposal, the source document and location can be produced from the record alone. | Pick figures at random from submitted proposals; trace each back to source using only the audit trail. |
| **P5-AC-5** | No draft reached a funder-facing document without a recorded reviewer sign-off. | Cross-check exported documents against sign-off records; zero unmatched. |
| **P5-AC-6** | The system contains no bypass path — no auto-send, no trusted-funder exception, no deadline override. | Code and configuration review; attempt to export an unreviewed draft and confirm it is refused. |
| **P5-AC-7** | Each sign-off records the reviewer's identity, a timestamp, and an explicit attestation that figures were checked against cited sources. | Inspect sign-off records; all three elements present, attestation not defaulted. |
| **P5-AC-8** | Sign-off timing is inspected against the rubber-stamping threshold pre-committed in Phase 0/4, and the inspection result is recorded. | A written inspection referencing the numeric threshold and the observed timings, with a judgement. |
| **P5-AC-9** | The traceability check ran on 100% of drafts in the window and every result is recorded. | No draft without a check result. |
| **P5-AC-10** | Citation stripping occurs only after sign-off, and a draft cannot have its citations removed before review. | Attempt to strip citations pre-review; the action is unavailable. Confirm post-review stripping is a deliberate, separate step. |
| **P5-AC-11** | Reviewers could reach the source snippet behind a cited claim directly from the queue, and usage of that affordance is recorded. | Interaction data exists per draft; the affordance resolves to the snippet, not just the document. |
| **P5-AC-12** | The rollback mechanics were exercised at least once — as a live event or a rehearsed drill — and the result recorded. | A record showing the pause executed, in-flight drafts handled as documented, and restart performed. |
| **P5-AC-13** | The release window, the set of writers, and the proposals in scope were agreed in writing before the window opened, with the expected proposal count stated. *(audit fix 1)* | A signed record whose count is consistent with stated annual volume and window length. |

## Dependencies

- **Phase 4 exit in full**, especially the signed rollback trigger (P4-AC-9), the rollback mechanics (P4-AC-10), and the remediation path (P4-AC-11). Limited release without executable rollback mechanics puts a person's signature behind a control that cannot be pulled.
- **Timeline reconciliation** (open since Phase 0). The three-week window yields roughly one proposal *(derived)*; the release window and the acceptance denominator have to be reconciled before this phase can produce assessable evidence.
- **A named accountable reviewer per draft**, with the authority to refuse sign-off under deadline pressure. Naming the role is Phase 0 work; exercising it is this phase's real test.
- **The review queue surface built and placed where writers already work.**
- **Phase 0's 20-proposal sample composition**, which determines how many of these live drafts count toward the acceptance bar.
- **Audit-trail retention capacity and policy**, sufficient for reconstruction months later.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| **Rubber-stamping under deadline pressure.** The reviewer is often the same person as the writer, working to the deadline the tool is supposed to relieve. Fast approval is the path of least resistance. | Sign-off timing is inspected against a pre-committed numeric threshold (P5-AC-8), and rubber-stamping is a rollback trigger in its own right — a governance failure even when outputs are correct. Source-snippet interaction data (P5-AC-11) distinguishes reading from clicking. |
| **A bad figure reaches a submitted proposal.** This is the fraud-exposure case and it is post-submission — pausing the system does not retract a proposal. | The remediation path (P4-AC-11) defines who is told, who decides on funder notification, and what is recorded. P5-AC-2's audit is run against submitted proposals, not only against drafts. |
| **The sample is too small for the ≥70% claim to mean anything.** *(derived from stated volume)* | P5-AC-13 records the expected count before the window. Report the live rate with its n, and let the Phase 0 composition agreement — not a retrospective reinterpretation — decide how live and retrospective evidence combine. |
| **Reviewer trust decays in either direction.** Too many gap markers and the queue is treated as noise; too few and the check is trusted beyond what it delivers. | Track gap-marker rate and reviewer override rate per draft. Restate plainly, in the queue itself, that the check reduces rather than eliminates the risk and that sign-off is the control of record. |
| **A bypass appears informally** — a writer copies draft text out of the queue before review. | P5-AC-6 tests the system's paths; the informal path is a governance matter, addressed by the no-shortcut rule and by the audit trail showing which submitted text has no sign-off behind it. |
| **Audit trail is complete but not reconstructable** — records exist, but tracing a figure back requires the builder. | P5-AC-4 tests reconstruction as a task performed from the record alone, by someone who did not build it. |
| **Unsupported qualitative claims reach funders.** Automated gates cover figures; the compliance exposure is representations generally. | The qualitative-claim control defined in Phase 3 (P3-AC-8) carries into the review queue as a rubric line item the reviewer applies. Its coverage is weaker than the figures path and should be described as such. |
| **A live defect prompts a mid-window config change**, making the window unattributable. | Version any change and report the window in segments; do not silently re-baseline. |

## Open questions

1. **What is the release window, and how many proposals will it actually contain?** Blocking, and unresolved since Phase 0.
2. **What numeric sign-off duration counts as implausibly fast?** Phase 0 was to record it; Phase 4's observations inform it. Without a number, P5-AC-8's inspection is an opinion.
3. **Can the accountable reviewer be the same person who wrote the funder brief?** Self-review is the weakest form of the control, and at this team size it may be unavoidable — in which case say so and record it as a limitation of the evidence.
4. **What is the retention period for the audit trail?** "Months later" is the stated reconstruction requirement; grant-compliance retention obligations may be longer and may already exist in the organisation's policies.
5. **Does a live draft that fails the traceability check get sent back to the system or fixed by hand?** Both are legitimate; the audit trail must distinguish them, since a hand-fixed figure has different provenance from a retrieved one.
6. **Who removes a writer or proposal from the release set** if things go wrong mid-window, and does that count as a partial rollback under the Phase 4 mechanics?
7. **What is the escalation if the accountable reviewer refuses sign-off and the deadline is that day?** The governance answer is that the shortcut is writing by hand — confirm the owner will hold that line before it is tested.

---

*Every duration in this document is a planning estimate, not a commitment. The derived live-proposal count is an estimate, labeled wherever used. No benchmark, vendor requirement, or cost figure is asserted. All acceptance criteria derive from the Phase 5 exit criterion, the project acceptance bar, or a stated fix from the independent audit.*
