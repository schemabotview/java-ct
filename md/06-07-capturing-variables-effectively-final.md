## Capturing variables — *effectively final*

A lambda isn't sealed off from its surroundings — it can **use variables from the enclosing scope**. That's what makes callbacks useful: the lambda "remembers" the values around it when it was created. A lambda that does this is a **closure** — it *closes over* those variables. But Java places one firm rule on what it may capture.

### The rule: captured locals must be effectively final

A lambda may read a local variable from the enclosing method **only if that variable is `final` or *effectively final*** — meaning it's never reassigned after initialization:

```java
int factor = 3;                          // never reassigned → effectively final
Function<Integer, Integer> scale = n -> n * factor;   // ✅ captures factor
scale.apply(10);                         // 30

int count = 0;
Runnable r = () -> System.out.println(count);
count = 1;                               // ❌ now `count` isn't effectively final → the lambda won't compile
```

You don't have to write `final`; you just have to *treat* the variable as final. Reassign a captured local anywhere and the lambda stops compiling.

### Why the restriction exists

A lambda can **outlive** the method that created it — stored in a field, returned, run later on another thread. Java captures the variable's **value** at creation, not a live link to the stack slot (which may be gone by the time the lambda runs). Requiring effective-finality guarantees there's no confusion between "the value the lambda saw" and "a value someone changed afterward" — the captured value can't drift. (This is the same rule anonymous classes had in module 02; lambdas inherit it.)

### The workaround, and why to avoid it

You *can* smuggle mutation past the rule by capturing a mutable **container** instead of a variable — the reference stays final while its contents change:

```java
int[] sum = {0};                              // the array reference is effectively final…
list.forEach(n -> sum[0] += n);               // …but sum[0] mutates. Legal — but a smell.
```

It compiles, but it's fighting the design. Mutating shared state from a lambda is exactly what functional style is trying to move you *away* from — and it's unsafe if the lambda runs on multiple threads. The idiomatic answer is almost always to **compute a result** instead: `int total = list.stream().mapToInt(n -> n).sum();`. Reach for `AtomicInteger`/`AtomicLong` only when you genuinely need shared mutable state across threads.

### `this` means the enclosing object — a real difference from anonymous classes

One place lambdas *differ* from the anonymous classes they replaced: inside a lambda, **`this` refers to the enclosing instance**, not to the lambda itself. (In an anonymous class, `this` meant that inner object.) So a lambda can call the enclosing object's methods and read its fields directly — and, importantly, **fields are not subject to the effectively-final rule**; only *local variables* are. A lambda may freely read and even mutate an instance field, because the field lives on the object, not on the vanishing stack frame.

### The takeaway

Lambdas capture surrounding **local variables by value**, and those locals must be **effectively final** — so you never reassign one you've captured. Fields are exempt (they belong to the object), and `this` inside a lambda is the enclosing object. When you feel the urge to mutate a captured local, that's usually a signal to restructure as a computation that *returns* a value — the mindset the last two sections of this module lean into, starting with composing functions.
