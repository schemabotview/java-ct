## Mockito — testing in isolation

A `JUnit` test wants to check **one** class, but real classes lean on others — an `OrderService` calls a `PaymentGateway`, which calls a bank over the network. Test it as-is and you're really testing the network: slow, flaky, and impossible to steer into the failure cases you care about. **Mockito** solves this by letting you replace a class's collaborators with **test doubles** — fake objects you control completely — so the test exercises your unit and nothing else. This is the last tool, and the course's closing idea: isolation.

### Mocks — fakes you program

A **mock** is a stand-in that implements a dependency's interface but does whatever *you* tell it. You create one, then **stub** its methods — script what they return — with `when(...).thenReturn(...)`:

```java
PaymentGateway gateway = mock(PaymentGateway.class);       // a fake gateway
when(gateway.charge(100)).thenReturn(Result.APPROVED);     // scripted response

OrderService service = new OrderService(gateway);          // inject the fake
service.placeOrder(order);                                  // exercises ONLY OrderService
```

No bank, no network — the gateway returns exactly what the test needs, instantly and deterministically. You can also script failure: `when(gateway.charge(anyInt())).thenThrow(new TimeoutException())` lets you test how `OrderService` handles a dead payment provider, without ever having one.

### Verifying interactions

Sometimes the thing you need to check isn't a return value but a **side effect** — did the unit *call* its collaborator correctly? Mockito records every call to a mock, and `verify` asserts it happened:

```java
verify(gateway).charge(100);              // OrderService must have charged exactly 100
verify(emailer, never()).send(any());     // …and must NOT have emailed on failure
```

This is how you test behavior that has no return value — that a failed order sends *no* confirmation, that a retry fires exactly twice.

### The mindset — and the danger

Two guardrails keep mocking honest. **Mock at the boundaries** — the database, the network, the clock, the external service — not your own value objects; a `record` or a simple domain class should be used for real, not faked. And **don't over-mock**: a test that mocks everything ends up asserting that your code calls the methods you *think* it calls, verifying the implementation rather than the behavior — and it'll break on every refactor while catching no real bugs. Mock the *awkward* collaborators; use the real thing everywhere it's cheap. Mockito's own annotations (`@Mock`, `@InjectMocks`) cut the boilerplate once you lean on it.

### Closing the loop — the whole concept

That completes the course. Step back and see the arc: from your **first `main` method** and the JVM that runs it, through the **object model**, **modern types** and **collections**, **generics**, **functional Java** and **streams**, **exceptions and I/O**, **concurrency**, and finally the **runtime, build, and testing** that surround it all. The tools in this last module — the JVM's machinery, Maven or Gradle to build, JUnit and Mockito to verify — are what turn Java from a language you can *write* into software you can *ship and trust*. You now have the whole picture: not just how to write Java, but what runs it, what builds it, and how to prove it works. That's the foundation everything else — frameworks, libraries, whole ecosystems — is built on.
