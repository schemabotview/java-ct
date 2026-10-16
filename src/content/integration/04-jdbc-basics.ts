import type { Section } from '../types'

export const jdbcBasics: Section = {
  id: 'jdbc-basics',
  title: "JDBC, drivers, connections, prepared values and result mapping",
  scene: 'int-jdbc',
  focus: 'injection',
  slide: `## JDBC: SQL from Java

**JDBC** is the standard API; a **driver** speaks one database's protocol. You get a \`Connection\`, run statements, and map rows to objects.

### The basic shape
- \`DriverManager.getConnection(url, user, password)\`
- \`PreparedStatement\` with \`?\` placeholders; \`setString\`, \`setInt\`
- Walk the \`ResultSet\` and build a **record** per row
- Close everything with try-with-resources
- The driver jar must be on the **runtime** classpath

### Values must be bound, never concatenated
- Concatenated, \`nobody' or '1'='1\` returns **every** order
- As a bound parameter, the same text matches **nothing**

### Names cannot be bound
- Column and table names are not values
- Check them against an **allow-list** before building SQL`,
  narration:
    "JDBC is Java's standard interface to relational databases, and a driver translates it into one particular database's protocol. Here the database is H2, running in memory inside the same process. The shape of the code is always similar. Get a connection, prepare a statement with question marks where values will go, bind each value with a typed setter, run the query, and walk the result set, turning each row into a record. Every one of those objects holds resources, so all of them sit in try-with-resources. Now the security point. Suppose a customer name arrives from a web form, and the code builds the SQL by gluing the text into the query string. A malicious input closes the quote and adds or one equals one, and the query returns every order in the table. Bind the same text as a parameter and the database treats it purely as a value, so it matches nothing. Parameters work only for values, though. A column name used for sorting cannot be bound, so check it against an allow-list before it ever reaches the SQL.",
}
