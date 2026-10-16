import type { Scene } from '@graphlearning/flow'

// §1 — a generic repository and method, inference, and two boxing surprises. Real JDK 25.0.2
// output: Integer caches -128..127, so 127 == 127 but 128 != 128; List<Integer>.remove(1) is the
// index overload.
export const colGenerics: Scene = {
  id: 'col-generics',
  title: 'Generic classes, methods, inference and boxing',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Generic.java',
      label: `static class Repository<T> {
    private final Map<String, T> byId = new HashMap<>();
    void save(String id, T item) { byId.put(id, item); }
    Optional<T> find(String id) {
        return Optional.ofNullable(byId.get(id));
    }
}
Repository<LineItem> lines = new Repository<>();   // T = LineItem
LineItem found = lines.find("17-1").orElseThrow(); // no cast

static <T> T firstOr(List<T> items, T fallback) { ... }
firstOr(List.of(), "none")                         // T inferred: String`,
    },
    {
      id: 'parts',
      label: 'What the type parameter buys',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'checked', label: 'Checked', sub: 'wrong types fail to compile', pattern: 'service', icon: 'shieldcheck' },
        { id: 'no-casts', label: 'No casts', sub: 'find returns a LineItem', pattern: 'service', icon: 'circlecheck' },
        { id: 'reuse', label: 'Reuse', sub: 'one class, any element', pattern: 'service', icon: 'repeat' },
      ],
    },
    {
      id: 'boxing',
      kind: 'code',
      filename: 'boxing — generics hold objects, not int',
      label: `Integer a = 127, b = 127, c = 128, d = 128;
(a == b) (c == d) c.equals(d)     →  true false true
List<Integer> qs = [3, 1, 2];  qs.remove(1);  →  [3, 2]   // index 1`,
    },
  ],
  edges: [
    { source: 'code', target: 'parts' },
    { source: 'parts', target: 'boxing', label: 'the cost' },
  ],
}
