import type { Section } from '../types'

export const locksAndInvariants: Section = {
  id: 'locks-and-invariants',
  title: "Synchronisation, locks, condition waiting and protected invariants",
  scene: 'cc-locks',
  focus: 'runs',
  slide: `## Locks protect invariants

An **invariant** that spans several fields — available plus reserved equals 100 — needs **mutual exclusion**. Making each field visible is not enough.

### volatile is not atomic
- Each read and write of \`available\` is visible to all threads
- But check-then-act takes **several** steps
- Runs 3 and 4 told **101** customers yes for 100 units

### synchronized
- One thread at a time runs \`reserve\` on that object
- Check and update happen together: exactly **100**, every run
- Every method touching the invariant must use the **same** lock

### Waiting for a condition
- \`Condition.await\` releases the lock while waiting
- Always re-check in a **while** loop after waking`,
  narration:
    "Some rules span several fields at once. Our stock has a hundred units, and at every moment, available plus reserved must equal one hundred. Making each field volatile ensures every thread sees the latest value of each field, but reserving a unit is a sequence: check that something is available, then decrement available, then increment reserved. Between the check and the update, another thread can do the same check. With a thousand customers on eight threads, most runs came out right, which is exactly what makes this dangerous. Runs three and four told a hundred and one customers yes. The synchronized version allows only one thread at a time into reserve on that object, so the check and the update happen together, and the answer is a hundred on every run. Every method that touches the invariant must use the same lock, or the protection has a hole. Sometimes a thread must wait until the invariant allows progress, such as an empty shelf being restocked. A Condition releases the lock while waiting, and the waiting code re-checks in a loop after it wakes.",
}
