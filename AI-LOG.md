# AI-LOG.md

## 2026-10-08 — harness: CLAUDE.md, lint script, CI workflow
Tool: Claude Code.
Asked for: set up the harness — the project rules file (CLAUDE.md), a lint gate in package.json and a GitHub Actions workflow that runs lint and tests on every push, following everything the teacher specified (slides and rubric).
Kept: the CLAUDE.md stack, style, spec pointer, tests, result and never lines as drafted; the `lint` script and `.github/workflows/ci.yml` as first generated (lint step, then test step, on push, Node 22).
Changed: asked it to add `npm run lint` to the CLAUDE.md Commands and a "Done" line (run `npm test` and `npm run lint`, fix failures, keep the diff minimal). For lint I chose `node --check` on `src/cart.js` and `test/cart.test.js`: it adds no dependency, but it only checks syntax, so it is a weak gate.
Rejected: telling the assistant to "check the diff" in the tests rule — reading the diff is my job, not the assistant's (Validate: "You read every line and can explain it"). ESLint/Prettier for lint — a devDependency, while the spec says "dependencies: none"; I may ask the teacher.
By hand: Read every line of CLAUDE.md and checked it against package.json, README.md. I did not write any line myself; the lint command and the "Done" line were added at my request. <fill in after your review of the lint script and ci.yml>
