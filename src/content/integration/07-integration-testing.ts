import type { Section } from '../types'

export const integrationTesting: Section = {
  id: 'integration-testing',
  title: "Integration boundaries, test evidence and failure diagnosis",
  scene: 'int-testing',
  focus: 'code',
  slide: `## Test the boundary, locally

Unit tests with fakes check your logic. **Integration tests** check that your code and a real protocol agree — and they can still run on any machine.

### Local stand-ins, real protocols
- **H2 in memory**: real JDBC and SQL, a fresh schema per test
- An **HttpServer stub**: real HTTP, with replies the test chooses
- No shared environment, no network, no flaky neighbours

### What these tests prove
- A saved order reads back as 4249
- A duplicate id is rejected **by the database**
- A 503 becomes a \`PriceUnavailable\` with a clear message

### What they do not
- H2 is not your production database — run a smaller suite against the real one`,
  narration:
    "Unit tests with fakes check your own logic. Integration tests check something different: that your code and a real protocol agree about what happens at the boundary. They do not need a shared test server or a network to do it. For the database, H2 runs in memory, so each test gets a fresh schema, real JDBC and real SQL, in milliseconds. For HTTP, the JDK's small built-in server becomes a stub: it speaks genuine HTTP, but the test decides exactly what it replies, including the awkward cases. These four tests, run by Maven, show what that buys. A saved order reads back as forty-two forty-nine. Saving the same id twice is rejected by the database's own primary key, not by code we wrote. And when the price service answers five hundred and three, the client turns it into a domain failure with a message a person can act on. Be honest about the limits too. H2 is not your production database, and a stub is not the real service. Keep a smaller suite that runs against the real things before a release.",
}
