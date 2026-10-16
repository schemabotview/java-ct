import type { Section } from '../types'

export const futuresAndComposition: Section = {
  id: 'futures-and-composition',
  title: "Futures, CompletableFuture and composing results and failures",
  scene: 'cc-futures',
  focus: 'combine',
  slide: `## Compose, don't block

\`CompletableFuture\` describes **what to do when results arrive**, so independent work can overlap without a thread waiting on each step.

### Running in parallel
- Price (200 ms) and stock (300 ms) start **at the same time**
- \`thenCombine\` runs when **both** finish: about 300 ms, not 500
- Each stage is a small function of earlier results

### Failures travel too
- The MARS shipping quote throws inside the pipeline
- Dependent stages are skipped; the failure flows on
- \`exceptionally\` recovers with a fallback: **−1**

### Getting the value out
- \`join()\` rethrows as \`CompletionException\` — read its **cause**
- Choose the executor deliberately; the default is a shared pool`,
  narration:
    "A Future lets you wait for one result. A CompletableFuture lets you describe what should happen when results arrive, which means independent pieces of work can overlap without a thread sitting idle at each step. Looking up the price takes about two hundred milliseconds and checking stock about three hundred. They do not depend on each other, so both start at once with supplyAsync. thenCombine runs a function as soon as both have finished, and the whole quote is ready in about three hundred milliseconds, not five hundred. Failures travel through the same pipeline. Asking for a shipping quote to Mars throws, and every stage that depends on that result is skipped, carrying the failure forward instead. exceptionally catches it at the end and supplies a fallback value of minus one. If you call join on the failed future directly, the original exception arrives wrapped in a CompletionException, so always look at its cause. One more decision deserves attention: unless you pass an executor, these stages run on a shared pool.",
}
