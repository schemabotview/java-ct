## Modeling data with the right type

Module 02 gave you *classes*. But a plain class is a blunt instrument — it can model anything, which means it tells the reader nothing about *what kind* of thing you have. Modern Java gives you sharper tools, each of which encodes an intent the compiler can then enforce. Choosing the right one is half of good design.

### Four shapes of data

Ask one question about the thing you're modelling — *how many valid values are there, and can they change?* — and the answer points to a type:

- **A fixed, known set of values** → an **`enum`**. There are exactly seven days, three states, four suits. An enum makes that set closed and named: `Status.ACTIVE`, not the string `"active"` or the magic number `1`.
- **An immutable bundle of values** → a **`record`**. A point is *just* an x and a y; a money amount is *just* an amount and a currency. A record says "this is plain data" in one line, and generates the boilerplate.
- **A closed family of variants** → a **sealed type**. A payment is *exactly one of* card, cash, or transfer — no more. A sealed interface names that family so the compiler knows it's complete.
- **An open-ended thing with identity and changing state** → an ordinary **`class`**. A `BankAccount` has a lifecycle, mutates, and no fixed set of instances. This is the general case from module 02.

### Why encoding intent pays off

Reach for the strongest type the data allows, and the compiler starts working *for* you:

- **Illegal states become unrepresentable.** If `Suit` is an enum, there is no way to hold an invalid suit — you never validate it, because a bad value can't exist.
- **The reader learns from the type.** `record Point(int x, int y)` tells you immutable data at a glance; `sealed interface Shape` tells you the variants are finite. The type *documents* the design.
- **Exhaustiveness gets checked.** With enums and sealed types, a `switch` over every case needs no `default` — and if you add a new variant later, the compiler flags every `switch` that forgot to handle it. That's a refactor the compiler drives for you.

### The trap: modelling everything as a plain class (or a String)

The common smell is a `String status` that's really one of five values, or an `int type` that's really an enum, or a mutable class for what is plainly immutable data. Each throws away a guarantee — now you're validating strings, writing `equals` by hand, and hunting the one place that set an illegal value.

### Where this module goes

We'll take each tool in turn: **enums** (constants, then enums that carry state and behaviour), **records** (the one-liner, then customising and validating them), **sealed types** (closing a family), and the feature that makes them sing together — **pattern matching**, including record **destructuring** and exhaustive `switch`. We close on the **built-in annotations** that let you talk to the compiler. The through-line: *let the type carry the meaning, and let the compiler enforce it.*
