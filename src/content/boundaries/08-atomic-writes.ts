import type { Section } from '../types'

export const atomicWrites: Section = {
  id: 'atomic-writes',
  title: "Closure, partial writes, atomic replacement and failure recovery",
  scene: 'bnd-atomic',
  focus: 'outcomes',
  slide: `## Never leave half a file

A write that fails part-way can leave a file that is **neither old nor new**. Write somewhere else first, then **move** into place in one step.

### Writing directly
- Opening \`orders.csv\` for writing **truncates** it immediately
- The failure on row three leaves two new rows — the old data is gone

### Temp file, then atomic move
- Write all rows to a temp file in the **same directory**
- On success, \`ATOMIC_MOVE\` replaces the target in one step
- On failure, delete the temp file; \`orders.csv\` is **intact**

### What it does not promise
- Atomic is not **durable**: force data to disk too
- The move must stay on one filesystem, or it fails
- Readers never see half a file`,
  narration:
    "Writing a file feels like a single action, but it is many small ones, and a failure can strike in the middle. Write the new orders straight into orders dot csv, and the moment the file is opened for writing, its old contents are truncated. When the third row fails, the file holds two new rows and nothing else. The old data is gone, and the new data is incomplete: a file that is neither the old version nor the new one. The safer pattern writes everything to a temporary file first, in the same directory as the target. Only when every row has been written successfully does it move the temporary file over the target, asking for an atomic move, so other readers see either the complete old file or the complete new one, never a mixture. If anything fails, the temporary file is deleted and the original is untouched, exactly as the table shows. Two limits remain. An atomic move is not the same as durable storage after a power cut, and it only works within one filesystem.",
}
