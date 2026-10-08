# Project rules

Stack: Node 22+, plain JavaScript (ESM, `"type": "module"`). No dependencies — `node:test` only.
Style: 2-space indent, no semicolons, single quotes, named exports. Imports keep the `.js` extension.
Commands: `npm test` · `npm run lint`
Spec: README.md is the source of truth for `cartTotal(items, options)` in `src/cart.js`.
Tests: every rule in the spec gets its own test in `test/cart.test.js`, using `node:test` and `node:assert/strict`. One test, one reason to fail. Assert the spec, not the implementation.
Done: run `npm test` and `npm run lint` and fix any failure before reporting. Keep the diff minimal — change only what the task asks for.
Result: `cartTotal` returns a number, rounded with `Math.round`. Bad input throws `RangeError`.
Never: add or change dependencies, use `toFixed` (it returns a string), weaken or delete a test to make it pass, swallow errors with `catch {}`, touch files outside `src/` and `test/` without asking, commit `.env` or `node_modules/`.
