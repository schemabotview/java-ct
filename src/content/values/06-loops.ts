import type { Section } from '../types'

export const loops: Section = {
  id: 'loops',
  title: "Loops, termination, break and continue",
  scene: 'val-loops',
  focus: 'trace',
  slide: `## Loops and termination

A loop repeats a body **while a condition holds**. Correctness lives in three places: the start, the condition and the step.

### Trace it, row by row
- \`i\` starts at \`0\` and the loop runs while \`i < prices.length\`
- \`continue\` skips the rest of one iteration — the zero-quantity line
- \`break\` leaves the loop entirely — reserved here for invalid prices
- After the last row, \`i\` is \`3\`, the test fails and the loop **terminates**

### The classic off-by-one
- \`i <= prices.length\` runs one extra time
- Index \`3\` does not exist in a length-3 array, so the JVM throws

### Checks worth doing
- Empty input runs zero times; will the condition **eventually** be false?`,
  narration:
    "A loop repeats its body as long as a condition stays true, and almost every loop bug lives in one of three places: where it starts, what it tests, and how it steps. The table on the left is a trace, one row per pass through the body. On the first pass, i is zero, the quantity is three, and the running total becomes thirty-seven fifty. On the second pass, the quantity is zero, so continue skips straight to the next iteration and the total does not change. On the third pass we add twenty-four hundred. Then i becomes three, the test i less than three is false, and the loop ends. Break, by contrast, would leave the loop entirely; here it guards against a negative price. Now change less-than into less-than-or-equal. The loop runs one extra time, asks for index three of a three-element array, and the JVM throws an index out of bounds exception. Always ask two more questions: what happens with empty input, and will the condition eventually become false?",
}
