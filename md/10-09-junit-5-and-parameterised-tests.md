## JUnit 5 & parameterised tests

Code you can't trust to change is code that's already dying. **Automated tests** are how you keep changing a program without breaking it: a suite you run on every edit that says, in seconds, "still works" or "you broke *this*." In Java the standard framework for writing those tests is **JUnit 5**, and this section is how it works — plus the feature that keeps test code small, parameterised tests.

### A test is a method — `@Test` and an assertion

A JUnit test is just a method marked `@Test`. Inside, you exercise your code and make **assertions** — checks that throw (failing the test) if reality doesn't match expectation. The universal shape is **arrange, act, assert**:

```java
@Test
void adds_two_numbers() {
    Calculator calc = new Calculator();   // arrange
    int sum = calc.add(2, 3);             // act
    assertEquals(5, sum);                 // assert — fails loudly if not 5
}
```

Recall from module 10's opening: JUnit *finds* these methods by scanning your classes for the `@Test` annotation via reflection — the exact mechanism from the annotations section, now doing real work.

### Assertions, exceptions, and lifecycle hooks

The assertion library covers what you need to state expectations precisely — `assertEquals`, `assertTrue`, `assertNull`, `assertThrows` for the important case of *checking that code fails correctly*:

```java
assertThrows(IllegalArgumentException.class,
             () -> account.withdraw(-5));   // a bad withdrawal MUST throw
```

For setup and cleanup, lifecycle annotations run around your tests: `@BeforeEach` / `@AfterEach` run before and after *every* test (fresh fixtures, no shared state), and `@BeforeAll` / `@AfterAll` run once for the whole class (expensive one-time setup).

### Parameterised tests — one test, many inputs

Often you want to check the *same logic* against a dozen inputs. Copy-pasting the test a dozen times is noise; a **parameterised test** runs one test method once per input, each as its own reported case:

```java
@ParameterizedTest
@ValueSource(strings = {"racecar", "level", "noon"})
void detects_palindromes(String word) {
    assertTrue(isPalindrome(word));
}
```

The input source is pluggable: `@ValueSource` for a simple list, `@CsvSource` for input-plus-expected pairs (`"12, false"`), and `@MethodSource` when the cases need code to generate. One method, broad coverage, and a failure pinpoints the *exact* input that broke.

### What makes a test worth having

The framework is easy; the discipline is the point. A good test checks **one behavior**, so a failure names the thing that broke. Its name says what it verifies (`adds_two_numbers`, not `test1`), so a red result reads like a sentence. It's **fast and deterministic** — same result every run — because a flaky test that fails at random trains you to ignore failures, which defeats the entire purpose. Write tests as you write the code, and the suite becomes the safety net that lets you refactor fearlessly.

One gap remains. Real classes don't stand alone — they depend on databases, network calls, other services — and you can't unit-test a class quickly or deterministically while it's really talking to a database. The last section closes that gap: replacing a unit's collaborators with controllable stand-ins, using **Mockito**.
