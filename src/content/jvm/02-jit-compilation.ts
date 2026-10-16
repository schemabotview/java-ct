import type { Section } from '../types'

export const jitCompilation: Section = {
  id: 'jit-compilation',
  title: "Interpretation, JIT compilation and implementation-specific optimisation",
  scene: 'jvm-jit',
  focus: 'warmup',
  slide: `## Fast later, not at first

HotSpot starts by **interpreting** bytecode, watches what runs often, and **compiles** hot methods to native code while the program runs.

### The measured warm-up
- Batch 1: about **4,000 µs** — interpreted, being profiled
- From batch 10: about **500 µs** — compiled, eight times faster
- \`-Xint\` never compiles: about **7,000 µs** every batch

### What the compilation log shows
- \`lineCents\` compiled at tier 3 (C1), then tier 4 (C2)
- The tier-3 version is retired: **made not entrant**
- \`%\` marks on-stack replacement inside a running loop
- Compiled code can be **deoptimised** if its assumptions break

### Treat details as implementation-specific
- Tiers, thresholds and flags are HotSpot's — not the Java language's`,
  narration:
    "The JVM does not run your bytecode the same way from start to finish. HotSpot, the usual implementation, begins by interpreting it, watching which methods run often and what types and branches they actually see. Hot methods are then compiled to native machine code in the background, while the program keeps running. The chart shows that happening. Each point is the time for one batch of two hundred thousand calls to the line-pricing method. The first batch takes about four thousand microseconds. By the tenth batch the same work takes about five hundred, eight times faster, with no change to the code. Run with dash X int, which forbids compilation, and every batch stays around seven thousand. The compilation log explains the drop: the method is compiled first by the quick C1 compiler at tier three, then by the optimising C2 compiler at tier four, after which the earlier version is retired. The percent sign marks on-stack replacement, compiling a loop while it is running. All of these details belong to HotSpot, not to the Java language.",
}
