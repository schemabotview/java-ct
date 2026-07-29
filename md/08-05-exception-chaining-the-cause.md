## Exception chaining — the `cause`

Real code is layered. A low-level `SQLException` fires deep in a data-access method, but the caller of your *service* shouldn't have to know about SQL — they want a `UserLookupException`. The temptation is to catch the low-level one and throw your own. Do it naively and you **destroy the evidence**; done right, exception chaining lets you translate the exception *and* keep the original as its **cause**.

### The problem: a translated exception that loses the trail

```java
try {
    return db.query(sql);
} catch (SQLException e) {
    throw new UserLookupException("lookup failed");   // BUG: e is discarded
}
```

The new exception reads cleanly at the service layer — but the `SQLException`, with the real reason (timeout? bad column? constraint?) and its stack trace, is **gone**. You've swapped a useful error for a vague one and thrown away the debugging trail.

### The fix: pass the cause

Every exception can wrap another. Pass the original as a second constructor argument — the **cause** — and the chain is preserved:

```java
try {
    return db.query(sql);
} catch (SQLException e) {
    throw new UserLookupException("lookup failed for " + id, e);   // e is the cause
}
```

For this to work, your custom exception needs a constructor that accepts a `Throwable` and forwards it to `super`:

```java
public UserLookupException(String msg, Throwable cause) {
    super(msg, cause);      // Throwable stores the cause for you
}
```

(You can also chain after the fact with `initCause(e)`, but a cause-constructor is cleaner.)

### What you get: "Caused by:" in the stack trace

A chained exception prints **both** stories — your high-level message on top, then the original underneath, linked by `Caused by:`:

```
UserLookupException: lookup failed for 42
    at UserService.find(UserService.java:31)
Caused by: java.sql.SQLException: connection timed out
    at ...jdbc...
    at UserService.find(UserService.java:29)
```

You read it top-down as a narrative: *the lookup failed — because the SQL query failed — because the connection timed out.* The abstraction stays clean at the top **and** the root cause is one glance away. This is the whole payoff of chaining.

### The discipline of translation

Chaining is half of a broader habit sometimes called **exception translation**: catch a low-level exception at a layer boundary and re-throw one that fits the layer's vocabulary, *carrying the cause*. Two rules make it work:

- **Always pass the cause.** Catching and re-throwing without the original is the single most common way real debugging information gets destroyed. If you catch-and-rethrow, chain — every time.
- **Translate at boundaries, don't over-wrap.** Wrap when you're genuinely raising the abstraction level (data layer → service layer). Don't re-wrap the same exception at every frame; that just deepens the "Caused by:" ladder without adding meaning.

### The anti-pattern to retire

The worst thing you can do to an exception is nothing — the **swallowed exception**:

```java
catch (SQLException e) { }   // silence: the failure vanished, no trace at all
```

An empty catch block turns a loud, traceable failure into an invisible one, and it is a leading cause of "impossible" bugs. At minimum log it; better, handle or chain it. The rule from section 01 holds all the way down: never let a failure pass silently.
