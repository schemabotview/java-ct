import type { Section } from '../types'

export const staticAndLifetime: Section = {
  id: 'static-and-lifetime',
  title: "Instance and static members, object lifetime and reachability",
  scene: 'obj-static',
  focus: 'item-one',
  slide: `## Static members and lifetime

**Instance** members belong to each object; **static** members belong to the class and are shared by all its objects.

### One counter, many ids
- \`created\` is static — one value, incremented by every constructor
- \`id\` is per object — \`a\` got 1, \`b\` got 2
- Static state is effectively **global**: use it sparingly

### When does an object end?
- An object stays alive while it is **reachable** from running code
- \`a = null\` drops the last reference to item 1
- Item 1 is now **eligible** for garbage collection — not instantly freed

### What GC is not
- Not a timer, and not a way to close files or connections
- Release external resources explicitly — chapter 5`,
  narration:
    "Fields and methods come in two kinds. Instance members belong to each object, so every LineItem has its own id. Static members belong to the class itself, so there is exactly one created counter, shared by every LineItem, and each constructor increments it. The first item gets id one, the second id two, and the counter reads two. Static state is convenient, but it behaves like a global variable, visible and changeable from everywhere, so keep it rare. Now, how long does an object live? As long as running code can still reach it through some chain of references. When we set a to null, nothing refers to the first item any more. It becomes unreachable, and therefore eligible for garbage collection. Eligible is the important word. The collector reclaims memory when it decides to, not at that line. And it only manages memory. It will not close a file, a socket or a database connection for you, which is why chapter five handles those explicitly.",
}
