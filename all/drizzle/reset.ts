import { sql } from 'drizzle-orm';
import { db } from './instance';

(async () => {
  const result = await db.execute(
    sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
  );

  const tableNames = result.rows.map((row) => row.tablename);

  const dropQuery = sql.raw(
    `DROP TABLE IF EXISTS ${tableNames.map((n) => `"${n}"`).join(', ')} CASCADE;`
  );

  await db.execute(dropQuery);
})();