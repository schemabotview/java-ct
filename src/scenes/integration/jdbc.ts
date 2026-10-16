import type { Scene } from '@graphlearning/flow'

// §4 — JDBC with H2 2.3.232 in memory: prepared values, result mapping to a record, an injected
// string versus the same input as a parameter, and an allow-listed column name. Real JDK 25.0.2
// output.
export const intJdbc: Scene = {
  id: 'int-jdbc',
  title: 'JDBC, drivers, connections, prepared values and result mapping',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Jdbc.java',
      label: `try (Connection c = DriverManager.getConnection(
         "jdbc:h2:mem:shop", "sa", "");
     PreparedStatement q = c.prepareStatement(
         "select id, customer, total_cents"
       + " from orders where customer = ?")) {
    q.setString(1, "ada");                        // a value, bound
    try (ResultSet rs = q.executeQuery()) {
        while (rs.next()) out.add(new OrderRow(rs.getInt("id"),
                rs.getString("customer"), rs.getInt("total_cents")));
    }
}   // [OrderRow[id=17, customer=ada, totalCents=4249]]`,
    },
    {
      id: 'injection',
      kind: 'table',
      label: 'input = nobody\' or \'1\'=\'1',
      headers: ['query built by', 'rows returned'],
      values: [
        ['"… where customer = \'" + input + "\'"', '3 — every order'],
        ['"… where customer = ?" + setString(1, input)', '0'],
      ],
    },
    {
      id: 'identifiers',
      kind: 'code',
      filename: 'identifiers cannot be parameters — allow-list them',
      label: `Set<String> sortable = Set.of("id", "customer", "total_cents");
if (!sortable.contains(sortBy)) throw new IllegalArgumentException(sortBy);
"select * from orders order by " + sortBy + " desc"    // [18, 17, 19]`,
    },
  ],
  edges: [
    { source: 'code', target: 'injection', label: 'values' },
    { source: 'injection', target: 'identifiers', label: 'names' },
  ],
}
