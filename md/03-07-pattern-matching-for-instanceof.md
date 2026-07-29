## Pattern matching for `instanceof`

For decades, testing an object's type in Java meant an awkward three-step dance: check with `instanceof`, then cast to that type, then use it. The check and the cast repeated the type name, and the cast could drift out of sync with the check. **Pattern matching for `instanceof`** (final since Java 16) folds all three into one.

### The old ceremony, and the new form

```java
// before — test, cast, use; the type name written twice
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// after — a type pattern binds the variable when the test passes
if (obj instanceof String s) {
    System.out.println(s.length());   // s is already a String here
}
```

`String s` is a **type pattern**. If `obj` is a `String`, the test is `true` *and* `s` is bound to it, already cast — no separate cast line, no repeated type, no chance of the two disagreeing. It reads as "if `obj` is a `String`, call it `s`."

### Flow scoping — where the binding is visible

The clever part is *where* `s` exists: exactly where the compiler can prove the match succeeded. This is **flow scoping**, and it follows the logic of your code:

```java
if (obj instanceof String s && s.length() > 3) {   // s is in scope after &&, because &&
    ...                                             // only evaluates the right if the left was true
}

if (!(obj instanceof String s)) {
    return;          // didn't match
}
s.length();          // s IS in scope here — reaching this line proves the match

if (obj instanceof String s || s.isEmpty()) { }     // WON'T compile — s not guaranteed after ||
```

The binding is available precisely when it's safe and nowhere it isn't — the compiler tracks it for you. Note the `&&` case in particular: it's why a `null` check or a type test followed by `&&` and a use of the binding is completely safe.

### Why it matters beyond the tidiness

Removing the cast removes a real class of bug — the check and the cast can no longer specify different types. But the deeper reason it's here is that this same *type pattern* is the building block for the far more powerful **pattern matching in `switch`** (next section) and **record patterns** that destructure data (section 09). Learning it in the small `instanceof` case first means the `switch` version will feel like nothing new.

### A note on where to reach for it

Pattern matching makes type tests clean, but it doesn't make them *good design*. A method built from a ladder of `if (x instanceof A a) … else if (x instanceof B b) …` is often begging to be a polymorphic method (module 02) or an exhaustive `switch` over a **sealed** type. Use `instanceof` patterns for genuine boundaries — parsing untyped input, interop, an `equals` implementation — and prefer dispatch or a sealed `switch` when you're branching over a family *you* control. That's exactly the case the next section handles.
