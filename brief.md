# Brief — cartTotal

Task: implement `cartTotal(items, options)` in `src/cart.js` and write its tests in `test/cart.test.js`. Plain JavaScript, no dependencies.

Read `CLAUDE.md` and `README.md` first. Follow `CLAUDE.md`.

## Scope
- You may touch: `src/cart.js`, `test/cart.test.js`.
- You must not touch: `package.json`, `CLAUDE.md`, `README.md`, `.github/`, `AI-LOG.md`, `brief.md`.
- Keep the existing test `the example from the slides`. Add tests, do not edit or delete it.

## Contract
- `items`: array of `{ name, price, qty }`. `options`: `{ vatRate, freeShipFrom, shipFee }`.
- `subtotal` = sum of `price × qty`.
- VAT = `vatRate × subtotal`. VAT applies to the subtotal only, not to shipping.
- Shipping = `0` when `subtotal >= freeShipFrom` (compare the subtotal before VAT; equal counts as free), otherwise `shipFee`.
- Return `subtotal + VAT + shipping` as a **number**, rounded to the whole đồng with `Math.round`. Never `toFixed`.
- Empty cart (`items.length === 0`): return `0`, no VAT, no shipping.

## Error cases
- A negative `price` throws `RangeError`.
- A `qty` that is not a positive integer (`0`, `-1`, `1.5`) throws `RangeError`.
- Validate every item before computing anything.
- `price` of `0` is allowed.
- Do not add other validation or other options. Behaviour the spec does not list is not tested.

## Worked example
`[{ name: 'Áo thun', price: 180000, qty: 2 }, { name: 'Sổ tay', price: 45000, qty: 1 }]` with `{ vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }` returns `467400`.
(subtotal 405000 + VAT 32400 + shipping 30000.)

## Tests to write
Assert the spec, not the implementation: no mocks, no checking of intermediate values. One test, one reason to fail. Use `node:test` and `node:assert/strict`. Use `assert.throws(..., RangeError)` for errors.
1. The worked example returns `467400`.
2. The result is a number (`typeof` is `'number'`) and an integer.
3. Empty cart returns `0`.
4. Subtotal exactly equal to `freeShipFrom` charges no shipping: one item `price: 500000, qty: 1` with the example options returns `540000`.
5. Subtotal just below the threshold charges `shipFee`: one item `price: 499999, qty: 1` returns `569999`.
6. Subtotal above the threshold charges no shipping.
7. Rounding to the whole đồng: one item `price: 1001, qty: 1` returns `31081`.
8. A negative price throws `RangeError`.
9. `qty: 0`, `qty: -1` and `qty: 1.5` each throw `RangeError` (one test each).
10. `price: 0` does not throw.

## Done when
- `npm test` is green and `npm run lint` is clean.
- Every test above exists and would fail if its rule broke.
- The diff touches only `src/cart.js` and `test/cart.test.js`.

## Must not invent
Libraries, new options, extra exports, helper files, validation beyond the error cases above.
Only use real APIs: `node:test`, `node:assert/strict`, built-ins you are sure exist. No second copy of logic that already exists. Never swallow errors.

## How to work
Two steps, one at a time:
1. Write the tests first. Run `npm test` and show that they fail for the right reason. Stop and wait for review.
2. Then implement `cartTotal` until `npm test` is green.

When you report, list what you changed and anything you were unsure about.
