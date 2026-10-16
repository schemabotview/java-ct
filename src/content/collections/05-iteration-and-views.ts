import type { Section } from '../types'

export const iterationAndViews: Section = {
  id: 'iteration-and-views',
  title: "Iteration, mutation, views and fail-fast limitations",
  scene: 'col-views',
  focus: 'sublist',
  slide: `## Iteration and views

Changing a collection's **structure** while iterating over it breaks the iteration. And some collections are **views** that share storage with another.

### Removing while iterating
- A for-each loop that calls \`remove\` throws \`ConcurrentModificationException\`
- \`removeIf\` does the same job safely: \`[3, 2, 1]\`
- Fail-fast is **best effort** — a detection aid, not a guarantee

### Views write through
- \`subList(0, 2)\` is a window onto the same array
- \`set(0, 99)\` on the view changes \`qty\` itself
- \`values()\`, \`keySet()\` and \`entrySet()\` are views of a map
- Copy a view when you need it to stay still

### Not about threads
- Fail-fast iterators do **not** make collections thread-safe — chapter 10`,
  narration:
    "Two behaviours of collections catch people out. The first is modification during iteration. A for-each loop walks the list with an iterator, and if the loop body removes an element, the iterator detects that the list changed underneath it and throws a ConcurrentModificationException. The name mentions concurrency, but there is only one thread here. The safe way to remove matching elements is removeIf, which does the walk and the removal together. Note that this detection is best effort: it helps you find bugs, but you cannot rely on it to catch every one. The second behaviour is views. subList does not copy anything. It returns a window onto the same underlying storage, so setting element zero through the window changes the original list to ninety-nine. A map's values, keys and entries are views too, which is why removing zeros from stock dot values removes those entries from the map itself. Finally, none of this makes a collection safe to share between threads; that is chapter ten's subject.",
}
