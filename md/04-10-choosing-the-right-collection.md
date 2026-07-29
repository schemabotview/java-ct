## Choosing the right collection

You've met all the pieces; this section is the decision procedure that ties them together. In practice, picking a collection is two quick questions — *what shape of access do I need?* then *what ordering (if any)?* — and a small set of defaults that are right most of the time.

### Step 1 — what shape of access?

Start from how you'll *use* the data, not how you'll store it:

- **A sequence I index into, or that keeps order / duplicates** → **`List`**.
- **Membership / uniqueness — "is this in the set?"** → **`Set`**.
- **Look a value up by a key** → **`Map`**.
- **Process in order — FIFO, or stack, or by priority** → **`Deque`** / **`PriorityQueue`**.

That single question eliminates most of the framework immediately.

### Step 2 — what ordering do I need?

Within `Set` and `Map`, the *implementation* is chosen entirely by the ordering you want:

- **Don't care about order** → **`HashSet` / `HashMap`** — the fast O(1) default.
- **Remember insertion order** → **`LinkedHashSet` / `LinkedHashMap`**.
- **Keep sorted / need range queries** → **`TreeSet` / `TreeMap`** (O(log n)).

For a `List`, the choice is nearly always **`ArrayList`**; for a queue or stack, nearly always **`ArrayDeque`**.

### The defaults, in one breath

Reach for these unless you have a specific reason not to:

- **List → `ArrayList`**
- **Set → `HashSet`**
- **Map → `HashMap`**
- **Queue / Stack → `ArrayDeque`**
- **Priority order → `PriorityQueue`**
- **Enum keys/elements → `EnumMap` / `EnumSet`**

Most production code is these six. The `Linked`/`Tree` variants are deliberate upgrades for when order or sorting matters.

### The cost cheat-sheet

Knowing the rough complexity keeps you from picking a structure that's quietly O(n):

- **`ArrayList`** — `get`/`set` O(1); add-at-end O(1) amortised; insert/remove middle O(n).
- **`HashMap` / `HashSet`** — `get`/`put`/`add`/`contains` O(1) average (needs good `hashCode`).
- **`TreeMap` / `TreeSet`** — those same operations O(log n), but *sorted* + range queries.
- **`ArrayDeque`** — O(1) at both ends.
- **`PriorityQueue`** — `offer`/`poll` O(log n); `peek` O(1).

### Don't forget the cross-cutting habits

The choice of type is only half of using collections well — the module's other lessons apply on top:

- **Program to the interface** (`List`, not `ArrayList`) in fields, parameters, and returns.
- **Prefer immutable** — `List.of`/`Map.of` for fixed data, `copyOf` for snapshots — and **copy at boundaries**.
- Ensure elements/keys have **correct `equals`/`hashCode`** (make value types **records**) and **keep keys immutable**.
- Use **`removeIf`** to delete while iterating; **`merge`/`computeIfAbsent`** for map updates; a **`Comparator`** for ad-hoc orderings.

The mental model to walk away with: *access shape picks the interface, ordering picks the implementation, and the defaults (`ArrayList` / `HashMap` / `HashSet` / `ArrayDeque`) are right until a concrete requirement says otherwise.* That closes Collections — module 05, Generics, explains the `<…>` that has been quietly making all of this type-safe.
