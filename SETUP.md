# Setup — Grant proposal first-draft assembly

This project is self-contained. Every resource below belongs to **this build
only** — nothing is shared with the Use Case Studio that scoped it or with the
sibling builds. The repo can be moved anywhere on disk, or handed to someone
else, without breaking a reference.

Sensitivity is **internal**; oversight is **required**. See "Project boundaries"
in [CLAUDE.md](CLAUDE.md) for why separation is load-bearing rather than tidy.

---

## 1. Source control — done

`shanelabountyai/grant-proposal-assembly`, private. Its own history, issues and
access list.

```bash
git remote -v          # origin → shanelabountyai/grant-proposal-assembly
```

## 2. Database

**Do this per project.** Create a Neon project named `grant-proposal-assembly`
for dev and production. Do not reuse the Studio's Neon project or a sibling
build's — the three builds carry different data sensitivities (internal here,
regulated and PII next door), and one shared database inherits the strictest
retention rule across all of them.

```bash
# Local Postgres for tests — never a cloud database in the test path.
brew install postgresql@17 && brew services start postgresql@17
createdb grant_proposal_test

# .env.test overrides ONLY the database; everything else comes from .env.local
printf 'DATABASE_URL=postgresql://%s@localhost:5432/grant_proposal_test\nDIRECT_URL=postgresql://%s@localhost:5432/grant_proposal_test\n' \
  "$(whoami)" "$(whoami)" > .env.test
```

Point the test scripts at both files, **first file wins**:

```jsonc
"test":     "dotenv -e .env.test -e .env.local -- vitest run",
"test:e2e": "dotenv -e .env.test -e .env.local -- playwright test",
"dev:test": "dotenv -e .env.test -e .env.local -- npm run dev"
```

Why local: a remote test database turns a 0.75s integration test into ~113s,
and — the bigger reason — makes infrastructure strain look exactly like flaky
tests. Locally, a failing test means the code is wrong.

Two traps worth knowing before you hit them:

- **Playwright's `webServer` needs the same env.** If it still runs `npm run dev`,
  the app under test talks to the cloud while the specs talk to localhost.
- **Migrations no longer reach the cloud dev branch as a side effect** of running
  tests. Keep a `db:migrate:all` that hits both, or dev drifts silently.

## 3. Environment

```bash
cp .env.example .env.local     # fill in; never commit
```

`.gitignore` already covers `.env` and `.env*.local`. Before this repo's first
push of any new file, confirm nothing secret is tracked:

```bash
git ls-files | grep -iE "\.env|secret|credential|\.pem$|\.key$"   # expect no output
```

**`ANTHROPIC_API_KEY` stays empty until Phase 0 clears it.** P0-AC-10 requires a
recorded external-provider data-handling decision, and P0-AC-11 asserts that no
corpus content was processed before that date. A key populated early is exactly
how that gets violated by accident.

## 4. Deploy and CI

Its own Vercel project and its own workflow — not a directory inside another
project's deployment. Provision when there is an app to deploy; there isn't yet.

## 5. Model provider

Its own key, so rotating or revoking one build's credential never touches
another's. The plan requires the provider sit behind a thin swappable interface:
capability requirements are long-context composition and instruction-following,
and no vendor is named as mandatory.

---

## Not yet decided

The application stack is an **open question**, deliberately. The plan names
capabilities, not products — a managed vector store or an embedded index, a
provider-swappable model interface, export into the format writers already edit
in. Nothing in `docs/` chooses a framework, and per this project's working
rules that makes it an open question rather than an assumption to fill in.

Decide it at Phase 2, when the thinnest scoreable draft loop needs somewhere to
run, and record the decision here.
