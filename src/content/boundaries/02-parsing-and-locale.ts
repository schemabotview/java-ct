import type { Section } from '../types'

export const parsingAndLocale: Section = {
  id: 'parsing-and-locale',
  title: "Parsing, formatting, regular expressions and locale",
  scene: 'bnd-parsing',
  focus: 'locale',
  slide: `## Parsing is a contract

Turning text into values requires a **format**. Locale, patterns and strict parsers decide what counts as valid.

### Locale changes meaning
- German reads \`1.234,50\` as **1234.5**
- US reads the same text as **1.234** — it stops at the comma, silently
- Formatting differs too: \`1.234,50\` vs \`1,234.50\`

### Patterns state the format
- \`([A-Z]-\\d{3}),(\\d+),(\\d+)\` — sku, cents, quantity
- Lower-case skus and decimal prices are **rejected**, not guessed
- Groups then extract each field

### Strictness is a feature
- \`parseInt(" 3")\` fails; trim at the boundary, deliberately
- Machine formats use a fixed locale, such as \`Locale.ROOT\``,
  narration:
    "Every time text becomes a value, some format decides what is valid, and if you do not choose that format explicitly, the platform chooses for you. Locale is the clearest example. A German number parser reads one point two three four comma five zero as one thousand two hundred and thirty-four point five. A US parser reads the same characters, treats the point as a decimal separator, stops at the comma, and returns one point two three four, with no error. Formatting differs in the same way. So for data exchanged between machines, fix the locale. A regular expression is a compact way to write down the format of a line. This pattern says: an upper-case letter, a dash and three digits, then whole cents, then a quantity. Lines that do not fit are rejected rather than guessed at, and the groups extract each field once a line matches. Java's own parsers are strict too. parseInt refuses a leading space. That strictness is useful: trim deliberately, at the boundary, so you know when input was messy.",
}
