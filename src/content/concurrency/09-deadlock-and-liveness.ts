import type { Section } from '../types'

export const deadlockAndLiveness: Section = {
  id: 'deadlock-and-liveness',
  title: "Deadlocks, starvation, liveness and diagnostic timelines",
  scene: 'cc-deadlock',
  focus: 'dump',
  slide: `## When nothing moves

Correct results are not enough; work must also **make progress**. A **deadlock** is the purest liveness failure: every thread waits for another, forever.

### The cycle
- \`checkout\` locks inventory, then wants payments
- \`refund\` locks payments, then wants inventory
- Each holds what the other needs; both are **BLOCKED**

### Reading the evidence
- \`jstack <pid>\` prints every thread's state and stack
- The JVM detects the cycle: **Found one Java-level deadlock**
- It names who holds what and who waits for what

### Prevention
- Acquire locks in **one global order**
- Hold locks briefly; use \`tryLock\` with a timeout
- Starvation and livelock: threads run but never finish`,
  narration:
    "Concurrent code can produce the right answer and still fail, by never producing an answer at all. Liveness is the property that work keeps making progress, and a deadlock is its purest failure. The checkout thread locks the inventory, pauses, and then asks for the payments lock. The refund thread locks payments, pauses, and then asks for inventory. Each now holds exactly what the other needs, and both wait forever. There is no exception and no log message; the program simply stops moving. The evidence comes from a thread dump. Running jstack against the process prints every thread's state and stack. Both threads are blocked on an object monitor, and the JVM goes further: it detects the cycle, prints found one Java-level deadlock, and spells out which thread holds which lock and which lock each is waiting for. Prevention is mostly discipline: acquire locks in one global order everywhere, hold them as briefly as possible, and use tryLock with a timeout where you cannot. Starvation and livelock are cousins, where threads run but never finish.",
}
