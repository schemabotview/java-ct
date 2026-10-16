import type { Section } from '../types'

export const annotationsAndReflection: Section = {
  id: 'annotations-and-reflection',
  title: "Annotations, retention and reflection boundaries",
  scene: 'ifc-annotations',
  focus: 'runtime-reads',
  slide: `## Annotations and reflection

An **annotation** is metadata attached to code. It does nothing by itself; a **consumer** — the compiler, a processor or the runtime — gives it an effect.

### Retention decides who can see it
- \`@Audited\` is \`RUNTIME\`: reflection finds it — **true**
- \`@Draft\` defaults to \`CLASS\`: kept in the file, invisible at run time — **false**
- \`@Override\` is read by **javac**, which rejects the typo \`cent()\`

### Reflection reads structure at run time
- Fields, methods and annotations, by name
- \`setAccessible\` opens our own private field: 499
- Test runners and frameworks find methods this way

### It has boundaries
- \`java.base\` does not **open** \`java.lang\`, so \`String.value\` stays closed
- Prefer plain calls the compiler can check`,
  narration:
    "An annotation is a label on a piece of code, and on its own it does nothing at all. Something has to read it. Sometimes that is the compiler: at-Override asks javac to confirm the method really overrides one, so the typo cent, without the s, becomes a compile error instead of a silent new method. Sometimes it is an annotation processor that generates code during the build. And sometimes it is the running program, through reflection. Here, retention matters. Audited is marked for runtime retention, so reflection can see it. Draft has the default retention, which keeps it in the class file but hides it from the running program, so the same query says false. Reflection can also look up fields by name and, for our own class, even read a private one. But it is not a universal skeleton key. Java's module system decides what is open to reflection, and java dot base does not open java dot lang, so String's internal array stays out of reach.",
}
