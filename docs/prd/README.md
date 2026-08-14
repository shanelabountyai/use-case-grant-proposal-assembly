# PRDs — Grant proposal first-draft assembly

One PRD per milestone, written from `../prd-pack.md` against `../build-kickoff-package.md` and the audit findings in `../../CLAUDE.md`. Each PRD's acceptance bar is its milestone's exit criterion; none introduces a new bar or loosens an existing one.

| Phase | PRD | Acceptance criteria |
|---|---|---|
| 0 | [Bar lock and source inventory](phase-0-bar-lock-and-source-inventory.md) | P0-AC-1 … 12 |
| 1 | [Approved corpus and figures register](phase-1-approved-corpus-and-figures-register.md) | P1-AC-1 … 12 |
| 2 | [Thinnest scoreable draft loop](phase-2-thinnest-scoreable-draft-loop.md) | P2-AC-1 … 12 |
| 3 | [Offline evaluation and red-teaming](phase-3-offline-evaluation-and-red-teaming.md) | P3-AC-1 … 13 |
| 4 | [Shadow mode on live proposals](phase-4-shadow-mode-on-live-proposals.md) | P4-AC-1 … 12 |
| 5 | [Limited release behind mandatory review](phase-5-limited-release-behind-mandatory-review.md) | P5-AC-1 … 13 |
| 6 | [Pilot decision review](phase-6-pilot-decision-review.md) | P6-AC-1 … 12 |

## Where the audit's demanded fixes landed

The audit verdict was **SHIP WITH FIXES**. Each demanded fix is carried as an acceptance criterion, not as advice:

- **Timeline reconciliation** — P4-AC-1, P5-AC-13, P6-AC-11. Left as an open question in Phase 0 (question 1) because the resolution is the bar owner's, not the PRD's.
- **Traceability scope beyond numerals** — P1-AC-7 (register-side extraction), P2-AC-7 (draft-side parity), P2-AC-8 (derived percentages), P3-AC-8 (qualitative claims).
- **Closed-book control for base-model leakage** — P3-AC-6, with the measured ungrounded-sentence rate at P3-AC-7.
- **Overclaim corrections** — P2-AC-3 (citations are section-level, not sentence-level); "invisible to the system" and the citation-stripping "cannot" are corrected in the Phase 2 context and risk sections.
- **Measurement integrity into Phase 0** — P0-AC-4 (blinded/paired scoring, scorer minimum, agreement floor), P0-AC-9 (numeric rollback thresholds), P0-AC-10/11 (external-provider approval as a gate before ingestion).
- **Rollback mechanics, not just a trigger** — P4-AC-10 (pause mechanics), P4-AC-11 (post-submission remediation path), P5-AC-12 (mechanics exercised).

## Open questions that block, and who closes them

These recur across PRDs and are not for the builder to assume away:

1. **Timeline: ~18 weeks of phases vs a one-quarter pilot** — bar owner. Blocks Phase 4 (P4-AC-1) and Phase 5 (P5-AC-13).
2. **Golden-set assembly is unowned** — no milestone names who builds the 50–100 item set. Blocks Phase 2 (needs ≥10 briefs) and Phase 3 (needs the full set).
3. **Figure-match rule** — exact, rounded, or unit-normalised? Programme lead. Without it, P3-AC-4's pass/fail is undefined.
4. **Provenance of the ≈30-hour baseline** — bar owner. Anchors Phase 4 effort and the Phase 6 decision.
5. **Response when the inter-rater agreement floor is not met** — bar owner, before Phase 3 starts.
6. **Where the qualitative-claim control lives** — rubric line item, automated flag, or both. Phase 2 defers it; Phase 3 owns it (P3-AC-8).
