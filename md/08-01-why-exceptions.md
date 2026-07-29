## Why exceptions

Every method so far has quietly assumed the happy path — the file exists, the number parses, the list isn't empty. Real programs live in a world where those assumptions break, and the question every language must answer is: *when something goes wrong deep inside a call, how does the code that can fix it find out?* Java's answer is **exceptions** — a channel for error information that is separate from a method's normal return value, and that cannot be silently ignored.

### The old way, and why it rots

Before exceptions, the standard trick was to make failure part of the return value — a special sentinel, or an error code the caller was trusted to check:

```java
int result = parse(input);
if (result == -1) { /* was -1 an error, or a valid answer? */ }
```

Two things rot here. First, the error and the real answer share one channel, so a valid `-1` is indistinguishable from failure. Second — and worse — **nothing forces the check.** Forget the `if`, and the bad value flows on, corrupting everything downstream until it fails somewhere far from the cause. The signal and the recovery drift apart, which is exactly what makes such bugs miserable to trace.

### The exception model: a separate channel that can't be dropped

An exception splits error reporting off from the return value entirely. When a method hits a situation it can't handle, it **throws** — abandons its normal flow and hands an exception object up the call stack. The runtime unwinds method after method, each one abandoned, until it finds a **`catch`** that's prepared to handle that type — or the program stops:

```java
try {
    int n = Integer.parseInt(input);   // may throw NumberFormatException
    process(n);                        // skipped entirely if the parse throws
} catch (NumberFormatException e) {
    System.out.println("not a number: " + input);
}
```

The return value carries only the real answer; the error travels its own path. And the key virtue: an unhandled exception doesn't quietly continue — it **stops the program with a report**, so a failure is loud and immediate, not a corrupt value drifting downstream.

### The stack trace: a map back to the cause

When an exception goes unhandled, Java prints a **stack trace** — the exact chain of method calls that led to the failure, innermost first:

```
Exception in thread "main" java.lang.NumberFormatException: For input string: "abc"
    at java.base/java.lang.Integer.parseInt(Integer.java:...)
    at Billing.applyDiscount(Billing.java:42)   <-- your code, the real starting point
    at Billing.main(Billing.java:11)
```

That trace is the single most useful debugging artifact in Java: it names the failure, the input that caused it, and the precise line — so you read *down* to the deepest frame in *your* code and start there. Learning to read a stack trace is learning to debug Java.

### What this module covers

Exceptions are a whole discipline, and this module walks it in order. First the **model**: the `Throwable` hierarchy and the crucial split between *checked* and *unchecked* exceptions, then the `try` / `catch` / `finally` mechanics, **throwing** your own and writing **custom** exception types, and **chaining** so a low-level cause isn't lost. Then the payoff for resources — **`try-with-resources`** for guaranteed cleanup — which leads naturally into the second half of the module: **files and I/O**, the canonical place where things go wrong, handled with the modern `Path` and `Files` API. The throughline: *make failure explicit, handle it where you can, and never let it pass silently.*
