import type { Scene } from '@graphlearning/flow'

// §2 — what a lambda may capture, the error when it may not, and the four method-reference forms.
// Real JDK 25.0.2 output.
export const strCaptures: Scene = {
  id: 'str-captures',
  title: 'Method references, captured variables and effectively final bindings',
  flow: 'TB',
  nodes: [
    {
      id: 'error',
      kind: 'code',
      filename: 'reassigned, then captured',
      label: `int shipping = 499;
shipping = 0;
totals.replaceAll(t -> t + shipping);
// error: local variables referenced from a lambda expression
//        must be final or effectively final`,
    },
    {
      id: 'ok',
      kind: 'code',
      filename: 'captured value vs captured reference',
      label: `int shipping = 499;                          // never reassigned
totals.replaceAll(t -> t + shipping);        // [4249, 2297]

List<String> log = new ArrayList<>();        // final reference…
Runnable record = () -> log.add("priced");   // …to mutable state
record.run(); record.run();                  // [priced, priced]`,
    },
    {
      id: 'refs',
      kind: 'table',
      label: 'Four kinds of method reference',
      headers: ['form', 'example', 'result'],
      values: [
        ['static', 'Integer::parseInt', '"4249" → 4249'],
        ['any instance', 'String::length', '"A-100" → 5'],
        ['this instance', 'log::size', '→ 2'],
        ['constructor', 'StringBuilder::new', '"x" → x'],
      ],
    },
  ],
  edges: [
    { source: 'error', target: 'ok', label: 'fix' },
    { source: 'ok', target: 'refs', label: 'shorthand' },
  ],
}
