import type { Scene } from '@graphlearning/flow'

// §3 — how the launcher finds classes, and the four messages that mean it could not. Real
// JDK 25.0.2 output.
export const bldClasspath: Scene = {
  id: 'bld-classpath',
  title: 'Classpath, dependencies, JARs and executable packaging',
  flow: 'TB',
  nodes: [
    {
      id: 'search',
      label: 'java -cp A:B shop.app.App — searched in order',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'launcher', label: 'Launcher', sub: 'needs shop/app/App.class', pattern: 'user', icon: 'power' },
        { id: 'cp-dir', label: 'target/classes', sub: 'a directory', pattern: 'storage', icon: 'folder' },
        { id: 'cp-jar', label: 'orders.jar', sub: 'a zip of classes', pattern: 'storage', icon: 'package' },
      ],
      edges: [
        { source: 'launcher', target: 'cp-dir', label: '1st' },
        { source: 'cp-dir', target: 'cp-jar', label: '2nd' },
      ],
    },
    {
      id: 'runs',
      kind: 'table',
      label: 'Five launches',
      headers: ['command (orders.jar = target/orders-1.0-SNAPSHOT.jar)', 'result'],
      values: [
        ['java -jar orders.jar', 'no main manifest attribute'],
        ['java -cp orders.jar shop.app.App', 'Total (cents): 4249'],
        ['jar --main-class shop.app.App …; java -jar app.jar', 'Total (cents): 4249'],
        ['java -cp target/classes shop.App', 'could not find or load main class'],
        ['java -cp partial shop.app.App', 'NoClassDefFoundError'],
      ],
    },
    {
      id: 'missing',
      kind: 'code',
      filename: 'partial = target/classes without CsvOrders.class',
      label: `Exception in thread "main" java.lang.NoClassDefFoundError: shop/io/CsvOrders
    at shop.app.App.main(App.java:18)
Caused by: java.lang.ClassNotFoundException: shop.io.CsvOrders`,
    },
  ],
  edges: [
    { source: 'search', target: 'runs' },
    { source: 'runs', target: 'missing', label: 'the last row' },
  ],
}
