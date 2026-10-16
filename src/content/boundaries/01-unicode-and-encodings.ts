import type { Section } from '../types'

export const unicodeAndEncodings: Section = {
  id: 'unicode-and-encodings',
  title: "Unicode, UTF-16 char values, code points and encodings",
  scene: 'bnd-unicode',
  focus: 'latin1',
  slide: `## Characters, code units, bytes

"How long is this text?" has **three** honest answers in Java, and decoding bytes needs a fourth fact: the **charset**.

### One string, three lengths
- \`length()\` counts UTF-16 **chars**: 7 — the gift emoji takes two
- \`codePointCount\` counts Unicode **characters**: 6
- UTF-8 **bytes**: 10 — é takes two, the emoji four
- \`charAt\` can return half a character: a **surrogate**
- Iterate with \`codePoints()\` when characters matter

### Bytes need a charset
- "Café" written as UTF-8 is five bytes
- Decoded as UTF-8: four chars, equal to the original
- Decoded as ISO-8859-1: **CafÃ©**, five chars, no error

### Rule
- Name the charset at every boundary: \`StandardCharsets.UTF_8\``,
  narration:
    "Text looks simple until it crosses a boundary. Ask how long the string Café followed by a gift emoji is, and Java gives three different honest answers. The length method counts UTF-16 code units, the sixteen-bit chars Java strings are made of, and the emoji needs two of them, so the answer is seven. Counting code points, which are actual Unicode characters, gives six. And encoded as UTF-8 for a file or a network, it takes ten bytes, because the accented e takes two and the emoji takes four. Even charAt can mislead: position five holds only half of the emoji, a surrogate. Now write Café to a file in UTF-8. On disk it is five bytes. Read those bytes back as UTF-8 and you get the original four characters. Read the very same bytes as ISO eight-eight-five-nine-one and you get C a f, A tilde, copyright sign: five characters, garbled, and no error of any kind. The defence is to name the charset explicitly at every boundary, every time.",
}
