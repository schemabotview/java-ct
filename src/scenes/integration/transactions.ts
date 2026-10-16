import type { Scene } from '@graphlearning/flow'

// §5 — an order header and two lines, where the second line violates a CHECK constraint. In
// auto-commit mode the half-order stays; in a transaction it rolls back. Real H2 2.3.232 / JDK 25.0.2.
export const intTransactions: Scene = {
  id: 'int-transactions',
  title: 'Transactions, auto-commit, rollback and connection ownership',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Tx.java — lines.qty has check (qty > 0)',
      label: `c.setAutoCommit(false);
try {
    placeOrder(c, 17, {"A-100", "B-200"}, {3, 0});   // B-200 qty 0 fails
    c.commit();
} catch (SQLException e) {
    c.rollback();
}`,
    },
    {
      id: 'results',
      kind: 'table',
      label: 'Rows left after the failed order',
      headers: ['mode', 'orders', 'lines'],
      values: [
        ['auto-commit (default true)', '1', '1 — half an order'],
        ['setAutoCommit(false) + rollback', '0', '0'],
        ['order 18, all valid, commit', '1', '2'],
      ],
    },
    {
      id: 'ownership',
      label: 'Who owns the connection owns the transaction',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'open', label: 'Open', sub: 'from a pool, per unit of work', pattern: 'service', icon: 'plug' },
        { id: 'decide', label: 'Decide', sub: 'commit or rollback, once', pattern: 'service', icon: 'circlecheck' },
        { id: 'return', label: 'Return', sub: 'close in try-with-resources', pattern: 'service', icon: 'dooropen' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'results', label: 'run' },
    { source: 'results', target: 'ownership' },
  ],
}
