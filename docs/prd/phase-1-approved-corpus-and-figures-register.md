# PRD — Phase 1: Approved corpus and figures register

**Milestone:** Phase 1 — Approved corpus and figures register
**Risk owner:** Programme lead (owner of the figures register)
**Planned duration:** ~3 weeks *(estimate)*
**Milestone exit criterion (this PRD's acceptance bar):** Every admitted document ingested with resolvable provenance; canonical boilerplate blocks marked; the approved figures register populated and spot-verified by the programme lead against the underlying impact reports; refresh runs as a single scripted command.

---

## Context

The traceability half of the acceptance bar — *zero unsourced statistics, every number traceable to an approved source* — is not enforced by the model. It is enforced by the **approved figures register**: a record, built in this phase, of every figure the organisation is willing to put in front of a funder, with the sentence it came from, the document it came from, and the reporting period it covers. Phase 2's automated check is only as good as this register. If a figure is missing from it, a true statement in a draft will be flagged as a gap; if a wrong figure is in it, a false statement will pass.

The second thing this phase produces is a corpus where boilerplate has one canonical version. Shared drives typically hold several near-duplicate mission statements that have drifted over years. Without canonicalisation, retrieval returns whichever variant ranks highest and the draft inherits it — a silent, untraceable quality problem that no citation check would catch, because every variant has a resolvable source.

Sequencing is deliberate: corpus and register **before** prompting. Generation demos well and grounding does not, which is exactly why the temptation to reorder should be resisted.

**Gate:** this phase does not start until the external-provider data-handling decision from Phase 0 (P0-AC-10) is recorded. Ingesting the full corpus before that approval is what the audit called out — if approval fails afterwards, the work is stranded.

## Scope

### In scope

- **Corpus admission decisions.** For every candidate document, a recorded human decision: approved for external representation / superseded / excluded — with the deciding individual and date. Declined proposals are admitted but tagged, because their *language* remains reusable while their outcome framing must not be treated as validated.
- **Conversion with layout and table fidelity.** PDF and Word to text, preserving tables and figure captions. Any document where conversion loses a numeric table is flagged for manual transcription rather than admitted with the loss.
- **Chunking and metadata.** Chunk on section headings, with overlap sufficient to keep a claim and its qualifier in the same chunk. Metadata per chunk: source document, document type, publication or submission year, funded/declined outcome, section role (mission / governance / past outcomes / needs statement), and a contains-numeric-claim flag.
- **The approved figures register.** Per figure: the figure itself, its surrounding sentence, the source document and location within it, and the reporting period. Populated by extraction, then spot-verified by the programme lead against the underlying impact reports.
- **Extraction beyond bare numerals** *(audit fix 2)*. The extractor covers digits, spelled-out numbers ("three thousand", "a quarter of"), percentages, currency, and date ranges used as reporting periods. Building the register against digits alone would leave the Phase 2 check with a hole it cannot close later.
- **Conflict adjudication.** Where the same figure appears with different values across sources, the programme lead adjudicates and the register records which source won and why.
- **Deduplication and canonicalisation.** Cluster near-duplicate boilerplate blocks, mark one canonical version per block, link the rest as variants.
- **Provenance enforcement in the pipeline.** A chunk without a resolvable source reference is rejected at ingestion, not indexed and left for a reviewer to notice.
- **Indexing.** Embeddings plus the metadata filters retrieval will need in Phase 2.
- **Scripted single-command refresh.** Event-driven re-ingestion of one document (new impact report, new submitted proposal, boilerplate revision) as one command from day one.

### Out of scope

- Retrieval tuning, prompting, draft composition, gap markers — Phase 2.
- Any system-initiated edit to source documents. The system reads the corpus; it never writes to it.
- Broadening the corpus beyond the three named source sets. Any additional source is a new admission decision by the named owner, not a pipeline change.
- Scheduled or continuous refresh. Data is static; refresh is event-driven by design.
- Scale or throughput engineering. Volume is small and this phase optimises for provenance fidelity.

## Acceptance criteria

| # | Criterion | How it is tested |
|---|---|---|
| **P1-AC-1** | Every document in the corpus carries a recorded admission decision (approved / superseded / excluded / admitted-and-tagged-declined) with a named decider and a date. | Query the corpus record: zero documents with a null decision or an unnamed decider. |
| **P1-AC-2** | Every indexed chunk resolves to its source: given a chunk ID, the pipeline returns the source document and the location within it, and the reference opens. | Sample at least 30 chunks at random; every one resolves to a document that opens at the stated location. Zero tolerated failures. |
| **P1-AC-3** | The pipeline rejects a chunk lacking a resolvable source reference rather than indexing it. | Inject a synthetic chunk with a broken reference; ingestion fails with an explicit error and the chunk does not appear in the index. |
| **P1-AC-4** | Documents whose conversion lost a numeric table are flagged, and no such document is admitted to the index until the loss is repaired by manual transcription or the document is excluded. | Conversion report lists flagged documents; cross-check that none of them are present in the index in unrepaired form. |
| **P1-AC-5** | Boilerplate near-duplicates are clustered and exactly one canonical version is marked per cluster, with variants linked to it. | For every cluster, exactly one canonical flag. Retrieval for a canonical block returns the canonical version, not a variant. |
| **P1-AC-6** | The approved figures register is populated, with each entry carrying figure, surrounding sentence, source document, location, and reporting period. | Zero register entries with a missing field. |
| **P1-AC-7** | Figure extraction covers digits, spelled-out numbers, percentages, currency amounts, and reporting-period date ranges. *(audit fix 2)* | A fixture set containing at least one instance of each form is extracted with no misses. |
| **P1-AC-8** | The programme lead has spot-verified a defined sample of the register against the underlying impact reports, and the verification result is recorded per checked entry. | Verification log exists, names the checker, and records pass/fail per entry. The sample size and selection rule are recorded (see Open questions — the size is not yet agreed). |
| **P1-AC-9** | Where a figure appears with conflicting values across sources, the register records the adjudicated value, the losing value(s), the adjudicating individual, and the reason. | Every conflict flagged by extraction has a corresponding adjudication record. |
| **P1-AC-10** | Corpus refresh for a single changed document runs as one scripted command, re-ingesting only that document. | Modify one source document; run the command; that document's chunks and register entries update and no other document is touched. |
| **P1-AC-11** | Every chunk carries the full metadata set (source document, type, year, funded/declined outcome, section role, contains-numeric flag). | Zero chunks with a null in any of the six fields, or an explicit recorded reason where a field genuinely does not apply. |
| **P1-AC-12** | No corpus content was processed through an external model provider before the Phase 0 data-handling decision was recorded. | Cross-check the Phase 0 decision date against the ingestion log start date. |

## Dependencies

- **Phase 0 exit, in full.** Specifically: the source inventory with named owners (P0-AC-6), the hand-inspection findings (P0-AC-7), the revised data-readiness picture (P0-AC-8), and the external-provider decision (P0-AC-10). This phase's estimate is unreliable until the hand inspection has happened.
- **Programme lead time**, for admission decisions, conflict adjudication, and the register spot-verification. This is the phase's critical path and it is not a task the builder can do alone — it is a substance judgement, not an engineering one.
- **Write access to a corpus store**, and read access to the authoritative source locations.
- **Resolution of the declined-proposal question** raised in Phase 0 open questions: whether the funded/declined tag exists reliably in the source material or must be reconstructed by hand.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| **The register is the single point of failure for the traceability bar.** A missing figure produces a false gap marker; a wrong figure produces a false pass — and a false pass is the fraud-exposure case. | Spot-verification by the programme lead (P1-AC-8) targets the false-pass direction specifically: entries are checked against the underlying impact report, not against the extraction. Figures whose verification fails are removed from the register rather than corrected in place by the builder. |
| **Resolvable is not the same as correct.** The audit flagged this precisely: a chunk can carry a working pointer to the *wrong* document and pass every automated provenance check. | State the limit plainly rather than claiming more than the invariant delivers. P1-AC-2's random sample is a correctness spot-check on top of the existence check, and reviewer sign-off remains the control of record. |
| **Extraction misses a figure form and the gap is inherited by Phase 2's check.** | P1-AC-7 fixes the covered forms with a fixture set now, while the register is being built, rather than discovering the hole during Phase 3 red-teaming. Any form found later is added to the fixture set, not patched silently. |
| **Boilerplate clustering picks the wrong canonical version** — an outdated mission statement becomes the house voice. | Canonical selection is a human decision recorded with the deciding individual, not an automatic pick by recency or ranking. |
| **Conversion silently drops a numeric table**, and the figures in it never enter the register — so drafts citing them are gap-marked forever, or worse, the model supplies them from its own priors. | P1-AC-4 blocks admission until the loss is repaired. The second half of that risk is a Phase 3 red-team case (closed-book control). |
| **Admission decisions stall on programme-lead availability**, and the builder proceeds with an unvetted corpus to keep moving. | Admission is a hard gate: P1-AC-1 permits no null decisions. If the lead is unavailable, the phase slips — which is the honest outcome, and cheaper than a draft grounded in unvetted material. |
| **Hand inspection in Phase 0 revised readiness downward**, making ~3 weeks an underestimate. | Re-estimate at the start of this phase using the P0-AC-8 revision, and record the new estimate as an estimate. Do not absorb the overrun into Phase 2. |

## Open questions

1. **What sample size and selection rule govern the register spot-verification (P1-AC-8)?** "Spot-verified" is the exit criterion's word. Every figure would be safest; a random n% is more realistic. The programme lead and bar owner should fix a number, weighted toward figures most likely to appear in drafts.
2. **What is the retention and revision policy for the register?** When a new impact report restates a prior figure, does the old entry get superseded, deleted, or kept with an end-date? Drafts citing the old figure need a defined answer.
3. **Who admits a document the programme lead is unsure about?** The plan names one adjudicator for conflicting figures but not for contested admission.
4. **Does "approved for external representation" have an existing organisational meaning** — an existing sign-off process for funder-facing material — that this should attach to rather than invent?
5. **What happens to a figure that exists only in a declined proposal?** Declined proposals are admitted with a tag, but the register's purpose is figures the organisation will stand behind. Is such a figure admissible, excluded, or admissible only with the impact report as its source?
6. **Is a chunk permitted to belong to more than one section role?** Proposal prose does not always partition cleanly, and Phase 2's retrieval filters by this field.

---

*Every duration in this document is a planning estimate, not a commitment. No benchmark, vendor requirement, or cost figure is asserted. All acceptance criteria derive from the Phase 1 exit criterion, the project acceptance bar, or a stated fix from the independent audit.*
