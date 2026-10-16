import type { Section } from '../types'

export const tryWithResources: Section = {
  id: 'try-with-resources',
  title: "try-with-resources, closure and suppressed exceptions",
  scene: 'fail-resources',
  focus: 'timeline',
  slide: `## Close resources, always

Files, sockets and connections must be **closed** whether the work succeeds or fails. \`try-with-resources\` guarantees it.

### How it works
- Declare the resource in \`try ( … )\`; it must implement \`AutoCloseable\`
- \`close()\` runs when the block ends — normally **or** by exception
- Several resources close in **reverse** order of opening
- The resource variable is out of scope once it is closed

### Two failures at once
- \`write\` throws; then \`close\` throws as well
- The **primary** exception is the one from the work
- The close failure is attached as **Suppressed:**, not lost

### Why not finally?
- A hand-written \`finally\` that throws **replaces** the original failure`,
  narration:
    "Memory is reclaimed for you, but files, network sockets and database connections are not. They must be closed, whether the work in between succeeded or failed. Try-with-resources makes that automatic. You declare the resource in parentheses after try, the resource must implement AutoCloseable, and when the block ends, for any reason, its close method runs. Here the export is deliberately unlucky. Writing the row fails because the disk is full. Then closing fails too, because the buffer cannot be flushed. Follow the timeline. Open, write throws, close still runs, and close throws. Which failure should you see? The output answers it. The primary exception is the one from the actual work, disk full, and the close failure is not thrown away: it is attached underneath as suppressed, with its own trace. Older code did this by hand in a finally block, and a finally block that throws silently replaces the original exception, which hides the real cause of the problem. Prefer try-with-resources whenever you hold something that must be closed.",
}
