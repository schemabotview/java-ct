import type { Section } from '../types'

export const exceptionsAndTraces: Section = {
  id: 'exceptions-and-traces',
  title: "Exceptions, propagation, stack traces and Error boundaries",
  scene: 'fail-traces',
  focus: 'stack',
  slide: `## Exceptions propagate

When code **throws**, the current method stops. If it does not catch the exception, its caller stops too — all the way up until something catches it or the thread ends.

### Reading a stack trace
- First line: the exception **type** and its **message**
- Top frame: where it was **thrown** — \`LineItem.<init>\`, line 3
- Each frame below: who **called** the one above
- Your own code's frames are the ones to read first
- Long traces: look for the **first** frame from your package

### Exception versus Error
- \`Exception\` — a condition a program may reasonably handle
- \`Error\` — the JVM itself is in trouble: \`StackOverflowError\`, \`OutOfMemoryError\`
- Catching an Error rarely leaves the program in a trustworthy state`,
  narration:
    "When something goes wrong, Java creates an exception object and throws it. The current method stops immediately. If it has no handler for that exception, its caller stops too, and so on, up the chain of calls, until something catches it or there is nothing left and the thread ends. Our order line with a quantity of zero shows the whole journey. The LineItem constructor throws, parseLine does not catch it, checkout does not catch it, main does not catch it, and the program prints a stack trace. Learn to read one from the top. The first line names the exception type and the message. The next line is where it was thrown, the constructor at line three. Each line below is the method that called the one above it, with its own line number. Frames from your own code are usually the place to start. Finally, notice the contrast at the bottom. A stack overflow is an Error, not an Exception. Errors mean the JVM itself is in trouble, and programs should rarely try to carry on after one.",
}
