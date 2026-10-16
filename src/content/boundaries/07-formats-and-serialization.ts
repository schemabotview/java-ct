import type { Section } from '../types'

export const formatsAndSerialization: Section = {
  id: 'formats-and-serialization',
  title: "CSV, JSON, schema choices and Java serialization boundaries",
  scene: 'bnd-formats',
  focus: 'serial',
  slide: `## Formats and their parsers

Data formats look simple until real data arrives. Use a **parser that implements the format**, and treat native Java deserialization as a security boundary.

### CSV is not split(",")
- A quoted comma turns three fields into **four**
- Quotes, escaped quotes and line breaks need a real CSV library
- Write down the **schema**: field order, types, units, encoding

### JSON
- Not built into the JDK — choose and pin a library

### Native serialization
- \`ObjectInputStream\` can construct **any** serializable class it is sent
- Never read it from untrusted sources without an **allow-list** filter
- \`Csv$LineItem;!*\` admits one class; anything else is **REJECTED**`,
  narration:
    "Data formats look easy until real data arrives. Comma-separated values seem to need nothing more than splitting on commas, but a product called Mug comma large, written properly in quotes, splits into four fields instead of three, with the quotes left dangling in the middle. Quotes, escaped quotes and line breaks inside fields all need a parser that actually implements the format, so use a CSV library, and write down the schema: field order, types, units and encoding. JSON is similar, with the added point that the JDK does not include a JSON parser, so you choose a library, pin its version, map the data into records, and validate it like any other input. Java also has its own native serialization. It is convenient, but reading it is dangerous, because an object input stream will construct whatever serializable classes the incoming bytes name. Never read it from an untrusted source without an allow-list filter. Here, a filter admits only LineItem, and anything else is rejected before it is built.",
}
