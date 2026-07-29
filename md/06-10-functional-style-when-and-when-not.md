## Functional style — when, and when not

Lambdas are a tool, not a mandate. Used well, functional style makes code shorter and more declarative; used everywhere, it makes code cryptic. This closing section is the judgement to carry: reach for functions where they *clarify*, and stay imperative where a plain loop reads better.

### Where functional style shines

- **Transformations and pipelines.** "Take these, keep the active ones, get their names, sort them" is a chain of small steps — a `filter`/`map`/`sort` pipeline reads as that sentence. Loops that *build a new collection from an old one* are the sweet spot (and where streams, next module, take over).
- **Callbacks and strategies.** "Run this when done," "sort by this rule," "retry this action" — passing behaviour inline is cleaner than a named class every time.
- **Small, pure operations.** A lambda that takes its inputs and returns a result, touching nothing else, is easy to read, test, and compose.

### Where imperative code wins

- **Complex control flow.** Multiple `break`/`continue`, early returns, interdependent branches — a plain `for` loop expresses these clearly, while forcing them into a functional chain gets contorted.
- **Side effects and mutation.** If the work is fundamentally *doing* things (updating several structures, I/O, ordering-sensitive steps), an explicit loop is honest about it. A lambda that mutates external state (`sum[0] += n`) is fighting the style.
- **Checked exceptions.** Standard functional interfaces don't declare them, so a body that throws `IOException` needs ugly try/catch inside the lambda — often a signal to use a regular loop.
- **Debugging and stack traces.** A stepped-through loop is easier to breakpoint than a deep lambda chain, and its stack traces are more legible. Matters in gnarly code.

### The golden rule: prefer pure lambdas

Whatever you choose, keep lambdas **pure** where you can — compute from inputs, return a result, avoid reaching out to mutate shared state. A pure lambda is thread-safe, testable in isolation, and composable; an effectful one loses all three. When a lambda *needs* to mutate externals, that's the strongest hint the logic wants to be an ordinary loop (or a computation that *returns* the new value instead).

### Readability is the tie-breaker

There's no prize for the most functional code — only for the clearest. Ask *"which version would the next reader understand faster?"*:

```java
// functional — clear here
List<String> names = users.stream()
    .filter(User::isActive).map(User::name).sorted().toList();

// imperative — clearer when the body is fiddly and effectful
for (var u : users) {
    if (!u.isActive()) continue;
    audit.record(u);              // side effect + control flow → a loop is honest
    ...
}
```

Neither is "better"; each fits a different job.

### The through-line to streams

This module built the pieces — lambdas, method references, the standard interfaces, capture, composition, higher-order methods. Module 07, **Streams**, assembles them into the tool you'll use most: a declarative pipeline for exactly the "transform a collection" case where functional style is strongest. Carry this section's judgement into it — streams are superb for data pipelines and easy to *over*use for everything else. The skill isn't writing functional code; it's knowing when it makes the program clearer.
