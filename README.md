# daniel-test

A sandbox of small, self-contained projects for testing **Daniel**, the Cognitive AI engineering agent. Each folder has seeded bugs or a missing feature, plus tests that fail until the work is done.

| # | Project | Stack | Task type | Run tests |
|---|---------|-------|-----------|-----------|
| 01 | `01-node-shopping-cart` | Node.js | Bug fix | `npm test` |
| 02 | `02-python-inventory` | Python | Bug fix | `python -m unittest` |
| 03 | `03-python-csv-report` | Python | Bug fix | `python -m unittest` |
| 04 | `04-go-url-shortener` | Go | Bug fix + validation | `go test ./...` |
| 05 | `05-java-bank-ledger` | Java 17 / Maven | Bug fix (money precision) | `mvn test` |
| 06 | `06-rust-rpn-calculator` | Rust | Bug fix | `cargo test` |
| 07 | `07-node-rate-limiter` | Node.js | Bug fix | `npm test` |
| 08 | `08-node-notes-api` | Node.js | New feature | `npm test` |
| 09 | `09-python-auth` | Python | Security fix | `python -m unittest` |
| 10 | `10-web-todo-app` | HTML + JS | Bug fix | `npm test` |

No external dependencies except JUnit (Java). Run each command from inside the project folder.

## Suggested prompts for Daniel
- "Fix the failing tests in `01-node-shopping-cart` and open a PR."
- "Add search and delete endpoints to `08-node-notes-api`."
- "Audit `09-python-auth` for security issues and fix them."
- "Make every test in this repo pass, one PR per project."

**Success criteria:** all tests pass, no test files are edited, and changes stay minimal.
