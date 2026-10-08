# AI-LOG.md

## 2026-10-08 — harness: CLAUDE.md, lint script, CI workflow
Tool: Claude Code.
Asked for: set up the harness — the project rules file (CLAUDE.md), a lint gate in package.json and a GitHub Actions workflow that runs lint and tests on every push, following everything the teacher specified (slides and rubric).
Kept: the CLAUDE.md stack, style, spec pointer, tests, result and never lines as drafted; the `lint` script and `.github/workflows/ci.yml` as first generated (lint step, then test step, on push, Node 22).
Changed: asked it to add `npm run lint` to the CLAUDE.md Commands and a "Done" line (run `npm test` and `npm run lint`, fix failures, keep the diff minimal). For lint I chose `node --check` on `src/cart.js` and `test/cart.test.js`: it adds no dependency, but it only checks syntax, so it is a weak gate.
Rejected: telling the assistant to "check the diff" in the tests rule — reading the diff is my job, not the assistant's (Validate: "You read every line and can explain it"). ESLint/Prettier for lint — a devDependency, while the spec says "dependencies: none"; I may ask the teacher.
By hand: Read every line of CLAUDE.md and checked it against package.json, README.md. I did not write any line myself; the lint command and the "Done" line were added at my request, and manual check after that.
## 2026-10-08 — brief.md for cartTotal
Tool: Claude Code.
Asked for: write the brief for `cartTotal` from the spec (slides and README) and the teacher's brief checklist (files it may touch, contract, error cases, "no dependencies"), detailed enough for an assistant to write the tests and the implementation.
Kept: the scope, contract, error cases, worked example, the list of 10 tests, "Done when" and the two-step "How to work" (tests first, then implementation) as drafted. This includes the assistant's choices where the spec is silent: `price: 0` allowed, `Math.round` on the final total, validate every item before computing, no extra validation.
Changed: after checking the teacher's five red flags, asked for one more line in "Must not invent": only real APIs, no second copy of logic, never swallow errors.
Rejected: nothing — I accepted the draft after reading it.
By hand: compared brief.md against README.md to make sure the logic is correct. I did not write any line of the brief myself.

## 2026-10-08 — tests for cartTotal (brief step 1)
Tool: Claude Code.
Asked for: step 1 of brief.md only — write the tests for `cartTotal` in `test/cart.test.js`, run `npm test`, and stop for review.
Kept: the 12 tests it wrote, as written (result is a number, result is an integer, empty cart, subtotal equal to / just below / above `freeShipFrom`, rounding with `price: 1001`, negative price, `qty` 0 / -1 / 1.5, `price: 0`). It left the starter test untouched and changed only `test/cart.test.js`. `npm test` was red for all 13 tests, which is expected before the implementation.
Changed: nothing in its 12 tests. After my review I updated the "Tests to write" list in brief.md (items 11–14, written by the assistant at my request) so the brief matches the final test suite; the version of the brief the assistant received for this step is commit 9e7fc6a.
Rejected: nothing.
By hand: reviewed its tests against README.md and found gaps: every test used the same `options`, rounding was only tested downwards, and the free-shipping threshold was only tested with one item. I added four tests to `test/cart.test.js`: `vatRate` from options (130000), `freeShipFrom` and `shipFee` from options (110000), rounding up with `price: 1007` (31088) and the subtotal summed across items (
540000). The ideas came from reviewing with the assistant; I added them. `npm test` now shows 17 red tests.
