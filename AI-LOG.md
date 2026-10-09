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
Changed: nothing in its 12 tests. After my review I updated the "Tests to write" list in brief.md (items 11–14, written by the assistant at my request) so the brief matches the final test suite; the version of the brief the assistant received for this step is commit 9e7fc6a. I also ran `git restore` on `test/cart.test.js` by mistake before committing it; the assistant rebuilt the file from the reviewed diff (same 70 added lines, 17 tests).
Rejected: nothing.
By hand: reviewed its tests against README.md and found gaps: every test used the same `options`, rounding was only tested downwards, and the free-shipping threshold was only tested with one item. I added four tests to `test/cart.test.js`: `vatRate` from options (130000), `freeShipFrom` and `shipFee` from options (110000), rounding up with `price: 1007` (31088) and the subtotal summed across items (540000). The ideas came from reviewing with the assistant; I added them. `npm test` now shows 17 red tests.

## 2026-10-08 — implement cartTotal (brief step 2)
Tool: Claude Code.
Asked for: step 2 of brief.md — implement `cartTotal` in `src/cart.js` until `npm test` is green.
Kept: the implementation as generated: validate every item first (`price < 0` and `!Number.isInteger(qty) || qty < 1` throw `RangeError`), return `0` for an empty cart, sum `price × qty`, shipping is `0` when `subtotal >= freeShipFrom`, return `Math.round(subtotal + vatRate × subtotal + shipping)`. It changed only `src/cart.js`; the tests, `package.json` and the harness files were untouched. `npm test` passes 17/17 and `npm run lint` is clean.
Changed: nothing.
Rejected: nothing. The assistant noted two things outside the spec and I accepted both: a `NaN` or non-number `price` is not blocked, because the spec only forbids a negative price and the brief says no extra validation; and `Math.round` on floating-point values was not tested near `.5`, which the spec does not define.
By hand: read `src/cart.js` line by line and mapped each rule of README.md to the code (subtotal, VAT on the subtotal only, free shipping at the threshold, empty cart, `RangeError` cases, rounded number). I also reviewed the diff against the five red flags with the assistant: no invented API, no new package, no swallowed error, no duplicated code, no test touched. I did not write any line of the implementation myself.

## 2026-10-09 — SELF_ASSESSMENT_REPORT.md
Tool: Claude Code.
Asked for: draft SELF_ASSESSMENT_REPORT.md from the teacher's template, with one row per rubric criterion and evidence taken from the repo (test names, files, commits, CI runs).
Kept: the structure, the evidence lines (commits `f333211`, `ab6c4a1`, `9e7fc6a`, `00ce349`, `1470586`, `99836cd`, test names, CI red then green) and the rest of the "What I did not manage" and "What I would do differently" sections. I asked it to shorten one bullet about testing with varied inputs.
Changed: the assistant first proposed 85 / 100 because it docked marks for things outside the rubric text. After re-reading the rubric I asked it to score against the top-band conditions, and the total became 100 / 100; its evidence was rechecked against `git log` and the CI runs.
Rejected: its first set of lower marks, because the top-band conditions of the rubric are all met.
By hand: read the whole report and deleted a few lines the assistant wrote (some items in "What I did not manage" and "What I would do differently", and part of the AI-LOG evidence) because I found them unnecessary or not fitting. I also entered my student ID and name and decided the final total that goes in the zip name.
