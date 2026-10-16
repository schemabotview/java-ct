import type { Section } from '../types'

export const jfrAndDumps: Section = {
  id: 'jfr-and-dumps',
  title: "JFR, thread dumps, heap evidence and diagnostic costs",
  scene: 'jvm-jfr',
  focus: 'recording',
  slide: `## Evidence from a running JVM

The JDK ships tools that observe a program **from outside** its code. Each answers a different question, and none is free.

### Three kinds of evidence
- **JFR** — timed events: GC pauses, allocation, CPU samples
- **Thread dumps** — what every thread is doing right now
- **Heap evidence** — histograms and dumps of live objects

### Reading a recording
- The summary counts events: 7 garbage collections
- Printing one event shows it in full: a 6.40 ms G1 pause
- The hot-methods view ranks where CPU samples landed

### Costs
- A 0.1 s program took 0.5 s while recording
- Most of that is start-up; measure it **in your own** service`,
  narration:
    "When a program misbehaves in production, you usually cannot add print statements and redeploy. The JDK provides tools that observe a running JVM from the outside, and each answers a different question. JDK Flight Recorder records timed events: garbage collections, allocations, CPU samples, locks and much more. A thread dump, from jstack or jcmd, shows what every thread is doing at one moment, which is how we found the deadlock in chapter ten. Heap evidence, from a class histogram or a full heap dump, shows what is alive, which is how we found the leak. Here we recorded the garbage-producing program with the profile settings. jfr summary counts the events by type: allocation samples, seven garbage collections, a handful of execution samples. jfr print shows one collection in full, a six point four millisecond G1 pause. And the hot-methods view ranks where the CPU samples landed. Evidence has a cost. This tenth-of-a-second program took about half a second with recording on, mostly start-up. Measure the overhead in your own setting before relying on it.",
}
