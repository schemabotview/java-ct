import type { Section } from '../types'

export const measurement: Section = {
  id: 'measurement',
  title: "Measurement, profiling, warm-up and benchmark pitfalls",
  scene: 'jvm-measurement',
  focus: 'rounds',
  slide: `## Measure what you think you measure

The JIT optimises the **program you wrote**, not the program you meant. A naive timing loop can measure nothing at all.

### The dead-code trap
- The first loop computes \`lineCents\` and **ignores** the result
- The JIT proves the work is unused and **removes** it: 0–3 ms
- Using the result keeps the work: about **500 ms**

### Other traps
- Timing the first iterations measures the **interpreter**
- One run on one machine is weak evidence
- Make inputs vary, or constant folding removes work too

### Method
- Symptom → hypothesis → **one** change → re-measure
- Use a benchmark harness such as **JMH** for microbenchmarks`,
  narration:
    "Measuring performance on the JVM is harder than it looks, because the JIT compiler optimises the program you actually wrote, not the one you meant to test. Here are two loops doing the same arithmetic two hundred million times. In the first, the result of each call is thrown away. In the second, the results are summed and the sum is stored. The first loop takes three milliseconds, then one, then zero. That is not fast arithmetic; that is no arithmetic. The compiler proved that nothing used the results and removed the work entirely. The second loop, whose result is used, takes about half a second, which is the real cost. There are other traps too. Timing the first few iterations measures the interpreter, as the warm-up chart showed. A single run on a single machine is weak evidence. And constant inputs invite constant folding. So follow a method: start from a measured symptom, form one hypothesis, make one change, and re-measure under the same conditions. For microbenchmarks, use a harness such as JMH, which exists to defeat exactly these traps.",
}
