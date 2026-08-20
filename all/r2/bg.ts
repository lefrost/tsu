import { jobMake, jobRun } from '$all/bunqueue';
import { db, eq, getTableConfig, is, isNotNull, PgTable, schema } from '$all/drizzle';

export function stalesDelInit() {
  jobRun({
    dat: {},
    interval: 60 * 60 * 1000, // 60 mins
    job: jobMake({
      fn: async () => {
        const fileCols = Object.values(schema)
          .filter(tab => is(tab, PgTable))
          .flatMap(tab =>
            getTableConfig(tab).columns
            .filter(col => col.name.endsWith(`Filek`))
            .map(col => ({ col, tab })));

        const fileks = new Set(
          (await Promise.all(fileCols
            .map(({ col, tab }) =>
              db.select({ filek: col as any })
                .from(tab)
                .where(isNotNull(col as any)
              ))
          )).flat().map(row => row.filek)
        );

        let contToken;
        do {
          const { ks, nextToken } = await filesGet({ contToken });
          await Promise.all(
            ks.filter(({ k }) =>
              !fileks.has(k)).map(({ k }) => fileDel({ k })
            )
          );
          contToken = nextToken;
        } while (contToken);
      },
      k: `r2StalesDel`,
      size: 1
    }),
    k: `r2StalesDelRun`,
  });
}