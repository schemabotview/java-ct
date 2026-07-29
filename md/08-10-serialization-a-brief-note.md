## Serialization — a brief note

The module closes on a topic to understand mostly so you can *avoid its worst form*. **Serialization** is turning an object into a stream of bytes you can store or send, and **deserialization** is rebuilding the object from those bytes. Java has had a built-in mechanism for this since day one — and its native form is now considered a historical mistake. This section explains it, then points you at what to use instead.

### What serialization is for

Any time an object must outlive the program's memory — saved to a file, cached to disk, sent across a network — it has to become bytes and later come back. That round trip is serialization out, deserialization in. The *need* is permanent and everywhere; only the *mechanism* is in question.

### Java's built-in mechanism — and why to avoid it

Mark a class `implements Serializable` (a marker interface with no methods) and the JVM can write and read its object graph automatically via `ObjectOutputStream` / `ObjectInputStream`:

```java
class Account implements Serializable { ... }        // opts in
// out: oos.writeObject(account);   in: (Account) ois.readObject();
```

It looks effortless, and that is the trap. Native Java serialization has deep, well-documented problems:

- **A security catastrophe.** `readObject` can construct *arbitrary* types from incoming bytes, bypassing constructors — the root of a long line of remote-code-execution exploits. **Never deserialize untrusted data** with it; that single rule has been the source of countless breaches. The Java architects themselves have called it a mistake and are working to remove it.
- **A fragility trap.** The binary format is tied to your class's private fields. Change the class and old bytes may fail to load; a hidden `serialVersionUID` field silently governs compatibility. It couples your on-disk format to your internal implementation.
- **Not portable.** The format is Java-only — useless for talking to a system written in anything else.

### What to use instead

For virtually every real need — config, APIs, storage, messaging — reach for a **text or explicit binary format** and a dedicated library, not `Serializable`:

- **JSON** via Jackson or Gson — human-readable, universal, the default for web APIs.
- **Other formats** as the need dictates: YAML for config, Protocol Buffers or Avro for compact, schema'd, cross-language binary.

These serialize a *deliberate* representation you control, decoupled from your private fields, readable by any language, and free of the arbitrary-construction security hole:

```java
String json = mapper.writeValueAsString(account);        // Jackson: object -> JSON text
Account a   = mapper.readValue(json, Account.class);      // JSON text -> object
```

### The takeaway

Know that `Serializable` exists — you'll meet it in older codebases and should recognize the `serialVersionUID` and `transient` keywords when you do. But for anything new: **prefer a modern, explicit format (JSON and friends), and never deserialize untrusted input with Java's native mechanism.** It's the fitting end to a module about handling failure safely — because the most important thing to know about built-in serialization is *when not to use it.*

That closes module 08. You now have the full discipline of failure: exceptions as an un-ignorable channel, the checked/unchecked split, `try`/`catch`/`finally` and its modern successor `try-with-resources`, chaining that preserves the cause — and the `Path`/`Files` API where those ideas meet the disk, streaming the filesystem with the same pipelines you learned in module 07.
