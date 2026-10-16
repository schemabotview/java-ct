import type { Scene } from '@graphlearning/flow'

// §2 — the standard Maven layout of the order app, what `mvn package` puts in the jar, and a
// resource read from the classpath with a -D override. Real Maven 3.9.11 / JDK 25.0.2 output.
export const bldLayout: Scene = {
  id: 'bld-layout',
  title: 'Source, test and resource layout',
  flow: 'TB',
  nodes: [
    {
      id: 'tree',
      label: 'Where each file lives',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'src',
          kind: 'code',
          filename: 'source tree',
          label: `pom.xml
src/main/java/shop/app/App.java
src/main/java/shop/domain/LineItem.java
src/main/java/shop/domain/Order.java
src/main/java/shop/domain/Totals.java
src/main/java/shop/io/CsvOrders.java
src/main/resources/shop.properties
src/main/resources/sample-order.csv
src/test/java/shop/domain/OrderTest.java`,
        },
        {
          id: 'jar',
          kind: 'code',
          filename: 'jar tf target/orders-1.0-SNAPSHOT.jar',
          label: `META-INF/MANIFEST.MF
shop.properties
shop/app/App.class
shop/io/CsvOrders.class
shop/domain/Totals.class
shop/domain/LineItem.class
shop/domain/Order.class
sample-order.csv
META-INF/maven/shop/orders/pom.xml
META-INF/maven/shop/orders/pom.properties
                    # no test classes`,
        },
      ],
    },
    {
      id: 'resources',
      kind: 'code',
      filename: 'config from the classpath, overridable at launch',
      label: `App.class.getResourceAsStream("/shop.properties")  // shippingCents=499
System.getProperty("shop.shippingCents",
                   config.getProperty("shippingCents"))

# orders.jar = target/orders-1.0-SNAPSHOT.jar
$ java -cp orders.jar shop.app.App
Total (cents): 4249
$ java -Dshop.shippingCents=0 -cp orders.jar shop.app.App
Total (cents): 3750`,
    },
  ],
  edges: [{ source: 'tree', target: 'resources', label: 'packaged, then run' }],
}
