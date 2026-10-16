import type { Scene } from '@graphlearning/flow'

// §1 — a static initializer that fails on bad configuration: the first use throws
// ExceptionInInitializerError, every later use NoClassDefFoundError. -Xlog:class+load shows the
// nested class loading only when first used. Real JDK 25.0.2 output, paths trimmed.
export const jvmClassLoading: Scene = {
  id: 'jvm-class-loading',
  title: 'Class loading, linking, initialisation and runtime identity',
  flow: 'TB',
  nodes: [
    {
      id: 'phases',
      label: 'A class goes through three steps, on first use',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'load', label: 'Load', sub: 'find bytes, define class', pattern: 'storage', icon: 'file' },
        { id: 'link', label: 'Link', sub: 'verify, prepare', pattern: 'service', icon: 'link' },
        { id: 'init', label: 'Initialise', sub: 'run static initialisers', pattern: 'warn', icon: 'power' },
      ],
      edges: [
        { source: 'load', target: 'link' },
        { source: 'link', target: 'init' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'Init.java — tax.rates defaults to "GB=20,DE=x19"',
      label: `static class TaxTable {
    static final Map<String, Integer> RATES = load();
    static Map<String, Integer> load() {   // runs at initialisation
        ... Integer.parseInt("x19") ...
    }
}
for (int attempt = 1; attempt <= 2; attempt++)
    System.out.println(TaxTable.RATES);`,
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'java -Xlog:class+load=info -cp out Init',
      label: `[0.032s][info][class,load] Init source: file:.../out/
main started; TaxTable not loaded yet
[0.033s][info][class,load] Init$TaxTable source: file:.../out/
attempt 1: java.lang.ExceptionInInitializerError
    cause: java.lang.NumberFormatException:
           For input string: "x19"
attempt 2: java.lang.NoClassDefFoundError:
           Could not initialize class Init$TaxTable`,
    },
    {
      id: 'diagnose',
      kind: 'table',
      label: 'Two NoClassDefFoundErrors, two causes',
      headers: ['message', 'meaning'],
      values: [
        ['… caused by ClassNotFoundException', 'not on the classpath (chapter 9)'],
        ['Could not initialize class …', 'present; its initialiser failed earlier'],
      ],
    },
  ],
  edges: [
    { source: 'output', target: 'diagnose', label: 'tell them apart' },
    { source: 'phases', target: 'code', label: 'the third step fails' },
    { source: 'code', target: 'output', label: 'run' },
  ],
}
