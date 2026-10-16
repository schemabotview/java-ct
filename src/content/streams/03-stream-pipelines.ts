import type { Section } from '../types'

export const streamPipelines: Section = {
  id: 'stream-pipelines',
  title: "Stream sources, intermediate and terminal operations, and laziness",
  scene: 'str-pipelines',
  focus: 'stages',
  slide: `## Pipelines are lazy

A stream pipeline is a **source**, zero or more **intermediate** operations, and one **terminal** operation. Nothing runs until the terminal operation asks.

### What the trace shows
- Building the pipeline prints **nothing**
- Elements travel **one at a time** through every stage
- \`findFirst\` stops as soon as C-300 matches — D-400 is never read

### Intermediate versus terminal
- \`filter\`, \`map\`, \`peek\` return a new stream: lazy
- \`findFirst\`, \`count\`, \`toList\` produce a result: they pull the data
- Use \`peek\` to observe a pipeline, never to change state

### One use only
- A stream cannot be reused: **already operated upon or closed**
- Keep the **source** and build a new pipeline each time`,
  narration:
    "A stream pipeline has three parts: a source, like a list of line items; any number of intermediate operations, like filter and map; and exactly one terminal operation, like findFirst or count. The crucial property is laziness. Building the pipeline does no work at all. The proof is in the output: the line saying the pipeline was built appears before any element has been seen, even though peek is supposed to print every element. Work starts only when a terminal operation pulls on the pipeline. Then elements travel one at a time through every stage, not stage by stage over the whole list. A-one hundred passes the filter and becomes thirty-seven fifty, which is not under two thousand. B-two hundred has a quantity of zero and is filtered out. C-three hundred becomes nineteen ninety, which matches, and findFirst stops. D-four hundred is never read. Finally, a stream can only be consumed once. Calling count on the same pipeline fails, so keep the source and build a fresh pipeline whenever you need one.",
}
