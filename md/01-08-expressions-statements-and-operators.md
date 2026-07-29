## Expressions, statements and operators

Two words describe almost everything you write inside a method. An **expression** produces a *value* — `2 + 2`, `price * qty`, `name.length()`. A **statement** performs an *action* and doesn't itself produce a value — an assignment, an `if`, a loop, a method call on its own line. You build programs by computing values with expressions and then *doing something* with them in statements.

```java
int total = price * qty;   // (price * qty) is an expression; the whole line is a statement
```

### The operators you compute with

**Arithmetic** — `+ - * / %`. Two traps worth burning in now:

- **Integer division truncates.** `7 / 2` is `3`, not `3.5` — both operands are `int`, so the result is an `int` and the fraction is thrown away. Make one side a `double` (`7.0 / 2`) to get `3.5`.
- **`%` is the remainder.** `7 % 2` is `1`. The classic use is `n % 2 == 0` to test for even.

**Comparison** — `== != < > <= >=` — each produces a `boolean`. For primitives `==` compares values. For **objects, `==` compares references** (are these the *same* object?), which is almost never what you want — use `.equals()` to compare contents. `"a" + "b" == "ab"` can surprise you; `.equals` never does. (Module 02 goes deep on this.)

**Logical** — `&&` (and), `||` (or), `!` (not) — combine booleans, and the first two **short-circuit**: `a && b` never evaluates `b` if `a` is already `false`. That's what makes `s != null && s.isEmpty()` safe — the null check guards the call.

**Assignment** — `=`, plus the compound forms `+= -= *= /= %=`. And `++` / `--` increment or decrement by one.

### `+` does double duty

With numbers, `+` adds. With a `String` on either side, `+` **concatenates**, converting the other operand to text:

```java
int age = 30;
String msg = "age: " + age;   // "age: 30" — the int becomes "30"
```

Handy, but watch left-to-right evaluation: `1 + 2 + "!"` is `"3!"`, while `"!" + 1 + 2` is `"!12"`.

### Precedence, and the ternary expression

Operators bind in a fixed order — `*` and `/` before `+` and `-`, arithmetic before comparison, comparison before `&&`/`||`. When in doubt, **add parentheses**; they cost nothing and remove all ambiguity for the reader.

Finally, the one operator that *is* an expression you can assign from — the **ternary** `condition ? a : b`, a compact if/else that yields a value:

```java
String label = score >= 50 ? "pass" : "fail";
```

Reach for it when both branches just produce a value; use a full `if` statement when either branch actually *does* something.
