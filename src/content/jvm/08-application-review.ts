import type { Section } from '../types'

export const applicationReview: Section = {
  id: 'application-review',
  title: "Integrated application review and continued specialisation",
  scene: 'jvm-review',
  focus: 'core',
  slide: `## The whole application

The order program began as one printed total — **4249**. It now has a domain core, boundaries in and out, and evidence around every part.

### Review it as a lifecycle
- **In**: CSV, a price service and configuration — validated at the edge
- **Core**: invariants, interfaces and collections, with no I/O
- **Out**: transactions, atomic files and bounded worker threads
- **Evidence**: tests, a pinned build and runtime diagnostics

### Questions to ask of any change
- Which **contract** does it touch, and who relies on it?
- What happens when it **fails** half-way?
- What **evidence** will show it works in production?

### Where next
- Frameworks, algorithms, distributed systems, JVM performance, security`,
  narration:
    "This course began with a single line of output: three items at twelve fifty plus shipping, forty-two forty-nine. The same order program now has a shape worth reviewing as a whole. Work through it as a lifecycle. Data comes in across boundaries: a CSV import with an explicit charset and validation, a price service called with timeouts and safe retries, and configuration loaded from the classpath and overridden at launch. It lands in a domain core that does no I/O at all: objects that guard their invariants, interfaces for the parts that vary, and collections and streams for the arithmetic. It leaves through more boundaries: database transactions, files replaced atomically, and work spread across bounded, cancellable threads. Around all of it sits evidence: unit and integration tests, a pinned and repeatable build, and runtime diagnostics. For any change you make from here, ask three questions. Which contract does it touch? What happens if it fails half-way? And what evidence will show it works? From here, specialise: frameworks, algorithms, distributed systems, performance or security. Practical expertise grows with experience.",
}
