## Collectors — grouping and joining

`reduce` folds a stream to a *single scalar*. But the most common thing you want at the end of a pipeline is a **container** — a list, a map, a report, elements bucketed by some key. That's what `collect` and the `Collectors` factory are for. If reduction answers "what's the one number," collection answers "what's the assembled result."

### `collect` — the general accumulation terminal

`collect` is a terminal that accumulates elements into a mutable container. You almost never write its low-level form by hand — instead you pass a ready-made **`Collector`** from the `java.util.stream.Collectors` factory. The everyday ones gather into collections:

```java
import static java.util.stream.Collectors.*;

List<String> list = names.stream().collect(toList());   // or the newer stream.toList()
Set<String>  set  = names.stream().collect(toSet());
String        csv = names.stream().collect(joining(", "));   // "Ada, Grace, Alan"
```

`joining` is the string specialist — `joining(", ", "[", "]")` adds a separator, prefix, and suffix in one pass, replacing a manual `StringBuilder` loop.

### `toMap` — build a lookup table

Turn a stream of objects into a `Map` by giving two functions: one that extracts the **key**, one that extracts the **value**:

```java
Map<String, Integer> byName = people.stream()
    .collect(toMap(Person::name, Person::age));   // "Ada" -> 39, ...
```

One caveat worth knowing now: if two elements produce the **same key**, `toMap` throws — you must supply a third *merge* function to say how to combine collisions (`toMap(k, v, (a, b) -> a)` keeps the first).

### `groupingBy` — the one you'll reach for constantly

The star of the section. `groupingBy` takes a **classifier** function and buckets every element by the key it returns, producing a `Map<Key, List<Element>>` — the stream equivalent of "GROUP BY":

```java
Map<Dept, List<Employee>> byDept = employees.stream()
    .collect(groupingBy(Employee::dept));
// { ENGINEERING -> [ada, alan], SALES -> [grace], ... }
```

### Downstream collectors — group, *then* summarize

The real power: `groupingBy` takes an optional **second collector** that runs on each bucket, so you rarely want the raw lists — you want a number or a shape per group. You *nest a collector inside the grouping*:

```java
Map<Dept, Long> countByDept = employees.stream()
    .collect(groupingBy(Employee::dept, counting()));           // how many per dept

Map<Dept, Double> avgSalary = employees.stream()
    .collect(groupingBy(Employee::dept, averagingDouble(Employee::salary)));

Map<Dept, List<String>> namesByDept = employees.stream()
    .collect(groupingBy(Employee::dept, mapping(Employee::name, toList())));
```

`counting`, `summingInt`, `averagingDouble`, `mapping`, `joining` — each can serve as the downstream collector, so "group by department, then count / average / list the names" is a single declarative expression. `partitioningBy(predicate)` is the special case that splits into exactly two buckets, `true` and `false`.

### Why collectors matter

A `groupingBy` with a downstream collector replaces a nest of `Map` lookups, `computeIfAbsent` calls, and accumulation loops with one line that reads like the question you're asking. This is where streams stop being a nicer `for` loop and start being a small query language over your in-memory data — and it's the most-used corner of the whole Stream API in real code.
