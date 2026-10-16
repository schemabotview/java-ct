import type { Scene } from '@graphlearning/flow'

// §6 — JUnit Jupiter 6.1.3 run by maven-surefire-plugin 3.5.4 under Maven 3.9.11 on JDK 25.0.2.
// The failing run is real: the test's own expectation (5948) was miscalculated; the code's 6047 is
// right — a red test is evidence to examine, not a verdict on the code.
export const failTests: Scene = {
  id: 'fail-tests',
  title: 'Unit tests, boundary cases and test doubles',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'src/test/java/shop/OrderTest.java — condensed',
      label: `class OrderTest {
    private final PricingPolicy flat =
        line -> line.unitCents() * line.quantity();         // fake

    @Test void totalAddsLinesAndShipping() {
        Order order = new Order(499, flat);
        order.add(new LineItem("A-100", 1250, 3));
        assertEquals(4249, order.totalCents());
    }
    @Test void emptyOrderCostsOnlyShipping() {
        assertEquals(499, new Order(499, flat).totalCents());
    }
    @Test void zeroQuantityIsRejected() {
        assertThrows(IllegalArgumentException.class,
                     () -> new LineItem("A-100", 1250, 0));
    }
}`,
    },
    {
      id: 'runs',
      label: 'mvn test',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'green',
          kind: 'code',
          filename: 'passing',
          label: `[INFO] Running shop.OrderTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS`,
        },
        {
          id: 'red',
          kind: 'code',
          filename: 'after adding a B-200 check',
          label: `[ERROR] OrderTest.totalAddsLinesAndShipping:16
  after adding B-200 ==> expected: <5948> but was: <6047>
[INFO] BUILD FAILURE`,
        },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'runs' }],
}
