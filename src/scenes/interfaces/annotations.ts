import type { Scene } from '@graphlearning/flow'

// §7 — an annotation is metadata; something else must read it. Retention decides whether the runtime
// can, and the module system decides how far reflection reaches. Real JDK 25.0.2 output.
export const ifcAnnotations: Scene = {
  id: 'ifc-annotations',
  title: 'Annotations, retention and reflection boundaries',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Ann.java',
      label: `@Retention(RetentionPolicy.RUNTIME) @interface Audited {}
@interface Draft {}                    // default: CLASS retention
@Audited @Draft class Refund { private int cents = 499; }

Refund.class.isAnnotationPresent(Audited.class)   // true
Refund.class.isAnnotationPresent(Draft.class)     // false
Field f = Refund.class.getDeclaredField("cents");
f.setAccessible(true);  f.getInt(new Refund());   // 499`,
    },
    {
      id: 'consumers',
      label: 'Who reads an annotation',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'javac-reads', label: 'javac', sub: '@Override is checked', pattern: 'service', icon: 'circlecheck' },
        { id: 'processor', label: 'Processors', sub: 'generate code at build', pattern: 'network', icon: 'gears' },
        { id: 'runtime-reads', label: 'Reflection', sub: 'RUNTIME retention only', pattern: 'user', icon: 'search' },
      ],
    },
    {
      id: 'limits',
      kind: 'code',
      filename: 'two refusals',
      label: `@Override int cent() { ... }      // typo for cents()
  error: method does not override or implement a method
         from a supertype

String.class.getDeclaredField("value").setAccessible(true)
  InaccessibleObjectException: module java.base does not
  "opens java.lang" to unnamed module`,
    },
  ],
  edges: [
    { source: 'code', target: 'consumers' },
    { source: 'consumers', target: 'limits', label: 'boundaries' },
  ],
}
