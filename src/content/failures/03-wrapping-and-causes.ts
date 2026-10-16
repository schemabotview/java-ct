import type { Section } from '../types'

export const wrappingAndCauses: Section = {
  id: 'wrapping-and-causes',
  title: "Catching, rethrowing, wrapping and preserving causes",
  scene: 'fail-wrapping',
  focus: 'wrap-out',
  slide: `## Translate, but keep the cause

A low-level failure often means something different one layer up. **Wrap** it in an exception that speaks the caller's language — and pass the original as the **cause**.

### Wrapping
- \`IOException\` becomes \`OrderImportException("cannot import orders.csv", e)\`
- The trace shows both: the domain message, then **Caused by:** the real reason
- The caller handles one meaningful type, not every library failure

### Swallowing
- \`catch (Exception e) { return 0; }\` turns a missing file into "0 orders"
- No trace, no message, and a **wrong answer** that looks valid

### Where to catch
- Catch where you can **do something**: retry, report, or choose a fallback`,
  narration:
    "Exceptions are often thrown at a low level, in terms the higher levels do not care about. The order importer's callers think in orders, not in file systems. So the importer catches the IOException and throws its own OrderImportException, with a message about importing orders, and, crucially, with the original exception passed in as the cause. Look at the output. The top of the trace speaks the caller's language: cannot import orders dot csv. Then comes caused by, with the real reason, no such file, and its own frames. Nothing was lost. The bottom example is what to avoid. It catches every exception and returns zero. The missing file is now indistinguishable from a file that genuinely contains no orders. There is no trace, no message, and the result looks perfectly valid while being wrong. So catch an exception only where you can actually do something about it: retry, report it properly, or choose a deliberate fallback. Everywhere else, let it travel, or wrap it with its cause.",
}
