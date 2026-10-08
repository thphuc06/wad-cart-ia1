# AI-LOG.md

## 2026-10-08 — harness: CLAUDE.md
Tool: Claude Code.
Asked for: set up the harness — write the project rules file (CLAUDE.md) for this repo, following everything the teacher specified (slides and rubric).
Kept: the stack, style, spec pointer, tests, result and never lines as drafted.
Changed: asked it to add `npm run lint` to Commands so the file stays right once the lint gate exists, and to add a "Done" line: run `npm test` and `npm run lint`, fix failures, keep the diff minimal.
Rejected: telling the assistant to "check the diff" as part of the tests rule. Reading the diff is my job, not the assistant's (Validate: "You read every line and can explain it").
By hand: Read every line of CLAUDE.md and checked it against package.json, README.md. I did not write any line myself; the lint command and the "Done" line were added at my request.
