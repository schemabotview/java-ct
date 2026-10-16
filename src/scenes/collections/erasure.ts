import type { Scene } from '@graphlearning/flow'

// §3 — type arguments are erased at run time; a raw type switches the compiler's checks off, and the
// failure surfaces later, at a cast the programmer never wrote. Real JDK 25.0.2 output.
export const colErasure: Scene = {
  id: 'col-erasure',
  title: 'Erasure, raw types and heap pollution',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Erasure.java',
      label: `List<String> skus = new ArrayList<>();
List<Integer> qs = new ArrayList<>();
skus.getClass() == qs.getClass()     // true: both ArrayList

List raw = skus;              // raw type: checks switched off
raw.add(42);                  // heap pollution — no error here
String first = skus.get(0);   // line 10 — fails here`,
    },
    {
      id: 'timeline',
      kind: 'memory',
      label: 'Cause and failure are far apart',
      slots: [
        { at: 'compile', name: 'warning: [unchecked]', note: 'only with -Xlint' },
        { at: 'line 8', name: 'raw.add(42)', note: 'succeeds' },
        { at: 'line 9', name: 'size 1', note: 'looks fine' },
        { at: 'line 10', name: 'hidden cast to String', note: 'throws' },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `Exception in thread "main" java.lang.ClassCastException:
  class java.lang.Integer cannot be cast to class java.lang.String
    at Erasure.main(Erasure.java:10)`,
    },
  ],
  edges: [
    { source: 'code', target: 'timeline' },
    { source: 'timeline', target: 'output' },
  ],
}
