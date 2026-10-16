import type { Section } from '../types'

export const cancellationAndTimeouts: Section = {
  id: 'cancellation-and-timeouts',
  title: "Cancellation, interruption, deadlines and timeouts",
  scene: 'cc-cancellation',
  focus: 'timeline',
  slide: `## Stopping work you no longer need

A caller that stops **waiting** has not stopped the **work**. Java cancels threads by **interruption** — a request the task must honour.

### Timeouts bound the wait
- \`get(300, MILLISECONDS)\` throws \`TimeoutException\`
- The task keeps running after the caller gives up

### cancel(true) interrupts
- A task blocked in \`sleep\`, \`wait\` or I/O gets \`InterruptedException\`
- The cooperative task cleans up and **ends early**
- A busy loop that never checks **runs its full second** anyway

### Rules for tasks
- Let \`InterruptedException\` propagate, or restore the flag
- Never swallow it silently
- Give every external wait a **deadline**`,
  narration:
    "When a result is no longer wanted, two separate things need to stop: the caller's waiting, and the work itself. A timeout handles only the first. Calling get with three hundred milliseconds throws a TimeoutException when the time is up, but the five-second task carries on running in the background. To stop the work, cancel the future with true, which interrupts the thread running it. Interruption in Java is a request, not a command. A task blocked in sleep, wait or most I/O receives an InterruptedException, and our cooperative task responds by cleaning up and ending early. The second task is a busy loop that never checks whether it has been interrupted. Its cancel call also returns true, and the future reports itself cancelled, yet the loop runs for its full second regardless. So tasks have duties: check for interruption during long work, let InterruptedException propagate or restore the interrupt flag, and never swallow it silently. And give every wait on something external a deadline.",
}
