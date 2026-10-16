import type { Scene } from '@graphlearning/flow'

// §7 — integration tests that run locally and repeatably: H2 in memory for JDBC, a
// com.sun.net.httpserver stub for HTTP. JUnit 6.1.3, Surefire 3.5.4, Maven 3.9.11, JDK 25.0.2.
export const intTesting: Scene = {
  id: 'int-testing',
  title: 'Integration boundaries, test evidence and failure diagnosis',
  flow: 'TB',
  nodes: [
    {
      id: 'setup',
      label: 'Real protocols, local stand-ins',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'h2', label: 'H2 in memory', sub: 'real JDBC, real SQL', pattern: 'storage', icon: 'database' },
        { id: 'stub', label: 'HttpServer stub', sub: 'real HTTP, chosen replies', pattern: 'external', icon: 'server' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'PriceClientTest.java — excerpt',
      label: `stub.createContext("/prices/", ex -> {
    boolean known = ex.getRequestURI().getPath().endsWith("/A-100");
    ex.sendResponseHeaders(known ? 200 : 503, ...);   // "1250" / "unknown"
});
@Test void unsuccessfulStatusBecomesDomainFailure() {
    var e = assertThrows(PriceUnavailable.class,
                         () -> client.unitCents("Z-999"));
    assertEquals("Z-999: HTTP 503", e.getMessage());
}`,
    },
    {
      id: 'report',
      kind: 'code',
      filename: 'mvn test',
      label: `Tests run: 2, Failures: 0 -- in shop.OrderRepositoryTest
    savedOrderCanBeReadBack, duplicateIdIsRejectedByTheDatabase
Tests run: 2, Failures: 0 -- in shop.PriceClientTest
    readsPriceFromService, unsuccessfulStatusBecomesDomainFailure
BUILD SUCCESS`,
    },
  ],
  edges: [
    { source: 'setup', target: 'code' },
    { source: 'code', target: 'report', label: 'run' },
  ],
}
