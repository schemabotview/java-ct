import type { Section } from '../types'

export const failureStages: Section = {
  id: 'failure-stages',
  title: 'Compile errors, runtime failures and wrong results',
  scene: 'fp-failure-stages',
  focus: 'wrong-result',
  slide: `## Where did it go wrong?

Locate the **stage** first. Each stage fails differently and points you to a different kind of fix.

### Three stages
- **Compile time** — \`javac\` refuses; there is no class file and nothing ran
- **Run time** — the program started, then the JVM **threw an exception** with a stack trace
- **Wrong result** — no error at all, and the output is still wrong

### The quiet one is the dangerous one
- \`"Total: " + 3750 + 499\` joins text left to right and prints \`3750499\`
- Only a **known expected value** — 4249 — exposes it

### First debugging steps
- Read the **first** error, its file and its line number
- Reproduce with the smallest input, and change one thing at a time`,
  narration:
    "When something goes wrong, the first question is not what is the fix, it is which stage failed. There are three. At compile time, javac refuses to produce a class file. Here it expected a semicolon at the end of line two, and it points a caret at exactly where. Nothing has run, so nothing can have happened. At run time, the program compiled and started, and then the JVM threw an exception. The stack trace names the exception, the bad input, and the line it came from. The third stage is the dangerous one, because nothing complains. The program runs and prints a result, and the result is wrong. Once a plus sign follows a string, Java joins values as text from left to right, so three thousand seven hundred and fifty and four ninety-nine are glued together instead of added. The only defence is the habit from the very first section, a known expected value. Start every debugging session the same way: read the first error, make the smallest input that reproduces it, and change one thing at a time.",
}
