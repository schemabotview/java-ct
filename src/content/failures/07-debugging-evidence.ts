import type { Section } from '../types'

export const debuggingEvidence: Section = {
  id: 'debugging-evidence',
  title: "Debuggers, logging, assertions and limitations of evidence",
  scene: 'fail-evidence',
  focus: 'ea-run',
  slide: `## Gathering evidence

When behaviour surprises you, collect **evidence** before changing code. Each tool shows a different slice of what happened.

### Assertions
- \`assert\` documents an assumption the code relies on
- **Disabled by default** — the first run prints 5625, a 150 % discount
- \`java -ea\` enables them, and the same input fails loudly
- Never use \`assert\` to validate external input

### Logging
- \`System.Logger\` records what ran, with values, without a debugger
- Choose levels so production logs stay readable

### Debuggers
- Pause at a breakpoint, inspect variables, step line by line
- Evidence from one run shows **that** run — not every input`,
  narration:
    "When a program surprises you, resist the urge to change code straight away. Gather evidence first, and know what each kind of evidence can and cannot tell you. An assertion states an assumption inside the code: here, that a discount percentage lies between zero and one hundred. But assertions are disabled by default. Run the program normally and a hundred-and-fifty percent discount sails through, printing fifty-six twenty-five. Run it with the e-a flag and the same input fails immediately with the assumption's own message. That is why assertions are for catching your own mistakes during development, never for checking input from users or files, which must be validated every time. Logging records what actually ran, with real values, which is often the only evidence available from a production system. A debugger lets you pause at a breakpoint, inspect variables and step through line by line. All three share one limitation. Evidence from a run describes that run, with that input, not every possible one.",
}
