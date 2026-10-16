import type { Section } from '../types'

export const transactions: Section = {
  id: 'transactions',
  title: "Transactions, auto-commit, rollback and connection ownership",
  scene: 'int-transactions',
  focus: 'results',
  slide: `## All of the order, or none of it

A **transaction** groups statements so they succeed or fail **together**. JDBC connections start in **auto-commit** mode: every statement commits on its own.

### Auto-commit leaves half an order
- The header and line A-100 are inserted and committed
- Line B-200 violates \`check (qty > 0)\` and fails
- The database now holds an order with **one** of its two lines

### In a transaction
- \`setAutoCommit(false)\`, do all the work, then \`commit()\`
- On any failure, \`rollback()\` — **nothing** is left behind
- Order 18, fully valid, commits with both lines
- Keep transactions **short**: they hold locks

### Ownership
- The code that opens the connection decides commit or rollback, then closes it`,
  narration:
    "An order is a header row and several line rows, and they only make sense together. A transaction groups statements so that they all take effect or none of them do. JDBC connections start in auto-commit mode, where every statement is its own transaction and commits the moment it succeeds. Watch what that means. The header for order seventeen is inserted and committed. The first line is inserted and committed. The second line has a quantity of zero, violates the table's check constraint, and fails. The database now holds an order with only one of its two lines, a state no part of the program ever intended. Switch auto-commit off and the picture changes. All three inserts become one unit of work. When the second line fails, the code rolls back, and there is no trace of order seventeen at all. A fully valid order commits with both lines. Notice who does all this: the code that opens the connection decides whether to commit or roll back, exactly once, and then closes it.",
}
