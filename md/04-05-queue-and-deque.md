## `Queue` and `Deque`

Some collections aren't about *storing* elements so much as *processing them in an order*. A **`Queue`** hands elements back in a disciplined sequence — usually **first-in, first-out (FIFO)**, like a line at a counter. A **`Deque`** ("deck," double-ended queue) is the more general tool: you can add and remove at **both ends**, which lets one type serve as a queue *and* a stack.

### `Queue` — FIFO processing

A queue has a front (where you remove) and a back (where you add). The methods come in two flavours — one that throws on failure, one that signals with a special value; **prefer the signalling forms**:

```java
Queue<Task> q = new ArrayDeque<>();
q.offer(taskA);        // add at the back  (add() throws if full)
q.offer(taskB);
q.peek();              // look at the front without removing → taskA (null if empty)
q.poll();              // remove & return the front → taskA   (null if empty)
```

`offer`/`poll`/`peek` return `null`/`false` on an empty or full queue; `add`/`remove`/`element` throw. For everyday code the non-throwing trio is safer. Queues model work pipelines, breadth-first traversal, buffering between producer and consumer.

### `Deque` — both ends, so: also a stack

A `Deque` adds the "other end," with explicit `First`/`Last` methods:

```java
Deque<Integer> d = new ArrayDeque<>();
d.addFirst(1);   d.addLast(2);
d.peekFirst();   d.peekLast();
d.pollFirst();   d.pollLast();
```

Because you can push and pop at *one* end, a `Deque` **is** a stack (last-in, first-out). It even provides `push`/`pop`/`peek` names for exactly that:

```java
Deque<Page> history = new ArrayDeque<>();
history.push(page);      // = addFirst
Page back = history.pop();   // = removeFirst — LIFO
```

### `ArrayDeque` — the one implementation to remember

**`ArrayDeque`** is the standard, high-performance implementation of both `Queue` and `Deque` — a resizable circular array, O(1) at both ends, cache-friendly. It's the right default for *both* a queue and a stack.

Two legacy classes exist for the same jobs — **avoid them**:

- **`Stack`** — an ancient class (extends `Vector`), synchronized on every operation and with a confused API. **Use `ArrayDeque` as your stack**, never `Stack`.
- **`LinkedList`** — implements `Deque` too, but with node overhead and poor cache behaviour. Prefer `ArrayDeque`.

(One caveat: `ArrayDeque` forbids `null` elements — it uses `null` internally as "empty." If you genuinely must store `null`s, that's the rare exception.)

### `PriorityQueue` — ordered by priority, not arrival

A different discipline: a **`PriorityQueue`** always hands back the **smallest** element next (by natural order or a `Comparator`), not the oldest. It's a binary heap — `offer`/`poll` are O(log n). Reach for it for "always process the highest-priority item": schedulers, Dijkstra's algorithm, "top-k" problems.

```java
Queue<Integer> pq = new PriorityQueue<>();
pq.offer(5); pq.offer(1); pq.offer(3);
pq.poll();   // 1 — the minimum, regardless of insertion order
```

The rule of thumb: **`ArrayDeque`** for FIFO queues and for stacks; **`PriorityQueue`** when order-by-priority matters. With the four collection shapes now covered, the rest of the module is the skills that cut across all of them — starting with how to iterate them safely.
