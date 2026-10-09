# Self-assessment — IA#1

Submitted by: 24127505 — Trần Hoàng Phúc

Total I claim: 100 / 100

| Criterion | Max | I claim | Evidence |
|---|---|---|---|
| Behaviour | 30 | 30 | Every rule of the top band holds. `npm test` passes 17/17 and CI is green on commit `99836cd`. Worked example returns 467400 as a number: tests "the example from the slides", "the result is a number", "the result is an integer"; `Math.round` is used, never `toFixed`. Free shipping at the threshold: "a subtotal equal to freeShipFrom charges no shipping", "a subtotal just below freeShipFrom charges shipFee", "a subtotal above freeShipFrom charges no shipping". Empty cart returns 0: "an empty cart returns 0 with no VAT and no shipping". `RangeError` for a negative price and a non-integer quantity: "a negative price throws RangeError", "qty 0 throws RangeError", "qty -1 throws RangeError", "qty 1.5 throws RangeError". |
| Tests | 20 | 20 | `test/cart.test.js`, commit `00ce349`: `npm test` passes and covers the worked example, the empty cart, the free-shipping threshold (equal, below, above, and summed across items) and both `RangeError` cases. Each test asserts one spec rule through `cartTotal` only: no mocks, no checks of the implementation, one reason to fail. Extra tests check that `vatRate`, `freeShipFrom` and `shipFee` come from `options` and that rounding goes up. |
| Harness | 20 | 20 | A rules file a stranger can follow: `CLAUDE.md`, commit `f333211`, with stack, style, commands (`npm test`, `npm run lint`), the tests rule, a done rule and a "Never" list. A working gate: `npm test` plus `npm run lint` (`node --check`) in `package.json`. CI on push: `.github/workflows/ci.yml`, commit `ab6c4a1`, running lint then test; it ran red at `ab6c4a1` and `1470586` before the implementation and green at `99836cd`. |
| Brief | 15 | 15 | `brief.md`, first committed in `9e7fc6a` before any code was generated: the files it may touch (`src/cart.js`, `test/cart.test.js`) and must not touch, the contract, the error cases, the worked example, "no dependencies", "Must not invent" and a two-step "How to work". Test cases 11–14 were added in `1470586` so it matches the final test suite. |
| AI-LOG.md | 15 | 15 | `AI-LOG.md`: one entry per task (harness, lint and CI, brief, tests, implementation), each saying the tool, what I asked for, what I kept, changed and rejected, and what I did by hand.|

## What I did not manage

- A `NaN` or non-number `price` is not blocked: `cartTotal` returns `NaN`, or coerces a numeric string. The README only forbids a negative price and the brief says no extra validation, so I left it, but I have no test for it and `qty` is checked more strictly than `price`.
- The assistant wrote all of `src/cart.js` and 12 of the 17 tests. I read every line and mapped each README rule to the code, but I wrote none of the implementation myself.

## What I would do differently

- Commit right after each step. I ran `git restore` on `test/cart.test.js` before committing it and lost the uncommitted tests; I had to rebuild the file from the reviewed diff.
- Ask in the brief for each rule to be tested with varied inputs (different `options`, prices, quantities, several items). The first tests reused the same values, so a hardcoded implementation could pass; I added four tests by hand to fix this.
- Try the failure cases (`qty: 0`, `qty: 1.5`, `price: -1`) by hand and write them in the log as I go.
