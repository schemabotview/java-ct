import type { Section } from '../types'

export const branchingAndSwitch: Section = {
  id: 'branching-and-switch',
  title: "Conditions, branching and switch",
  scene: 'val-branching',
  focus: 'switch-expr',
  slide: `## Conditions and switch

A **condition** is a \`boolean\` expression; branching runs one path and skips the others. Choose the form by how many paths there are.

### if / else
- Free shipping at 50.00: 3 items cost 4249, 4 items ship free
- Boundaries matter: \`>=\` and \`>\` differ at exactly 5000

### switch expression
- Many outcomes from one value, written with \`->\` arrows
- It **yields a value**, so every path must produce one
- \`case "EU", "UK"\` groups labels; \`default\` covers the rest
- An **enum** switch covering every constant needs no \`default\`

### The older switch statement
- Colon labels **fall through** without \`break\`
- \`code == 1\` prints \`one\`, \`two\` and \`other\``,
  narration:
    "Branching is how a program chooses between paths. An if statement tests one boolean condition. Here, orders of fifty pounds or more ship free. Three items come to forty-two forty-nine with shipping; four items reach exactly five thousand cents, so the shipping drops to zero. Look carefully at that boundary. Greater-than-or-equal and greater-than give different answers at exactly five thousand, and boundaries are where requirements and code most often disagree. When one value selects among many outcomes, a switch expression is clearer. Each case uses an arrow, several labels can share a case, and default catches everything else. Because it is an expression, it yields a value, and the compiler insists that every path produces one. You will also meet the older switch statement, with colons. Its trap is fall-through. Without a break, execution runs straight on into the next case, so a code of one prints one, two and other. The arrow form never falls through, which is why it is the better default.",
}
