## Values, types and the type system

Java is **statically typed**: every variable has a type fixed at compile time, and the compiler checks — before the program ever runs — that you only ever do type-appropriate things with it. Assign a `String` where an `int` is expected and the code simply won't compile. That up-front checking is Java's core safety promise, and it starts with knowing the two families of types.

### The two families

**Primitive types** hold a raw value directly — a number or a bit, no object wrapper. There are eight, but you'll use four constantly:

- `int` — a 32-bit whole number (the everyday integer)
- `long` — a 64-bit whole number, for values too big for `int`
- `double` — a 64-bit floating-point number (the everyday decimal)
- `boolean` — `true` or `false`

The other four round out the set: `byte`, `short` (smaller integers), `float` (smaller decimal), and `char` (a single character). A primitive variable *is* its value.

**Reference types** are everything else — objects. A reference variable doesn't hold the object; it holds a **reference** (a handle) to an object that lives on the heap. `String`, arrays, and every class you'll ever write are reference types:

```java
int count = 42;                 // count IS 42
String name = "Ada";            // name POINTS AT a String on the heap
```

That distinction drives a lot of Java's behaviour — how values are copied, how equality works, and why a reference can be `null` (pointing at nothing) while a primitive never can.

### Literals — writing values down

```java
int    n    = 100;
long   big  = 9_000_000_000L;   // underscores for readability; L makes it a long
double pi   = 3.14;
boolean ok  = true;
char   grade= 'A';              // single quotes, one character
String city = "Mumbai";         // double quotes, text
```

Note the small rules: a `long` literal needs an `L`, `char` uses single quotes and `String` double, and you can drop `_` into long numbers to read them.

### Wrapper types and autoboxing

Every primitive has an object twin — `int`↔`Integer`, `double`↔`Double`, `boolean`↔`Boolean`. You need these when a slot demands an *object* rather than a primitive (collections are the big example — a `List<Integer>`, never a `List<int>`). Java converts between the two automatically, called **autoboxing**:

```java
List<Integer> nums = new ArrayList<>();
nums.add(42);          // int 42 auto-boxed into an Integer
int first = nums.get(0);   // Integer auto-unboxed back to int
```

Convenient, but not free: a wrapper is a heap object, and an unboxed `null` throws. Prefer primitives for plain arithmetic; reach for wrappers only where an object is required.

### Why static typing earns its keep

The compiler catches whole categories of mistakes before you run — misspelled fields, wrong argument types, impossible conversions. Your editor can autocomplete and refactor precisely because it knows every expression's type. The cost is naming types; the payoff is errors surfaced at compile time instead of at 3 a.m. in production.
