import { type Context, Elysia, t } from 'elysia';

export const edge = new Elysia();

// todo: bunqueue
// import { jobAdd, jobMake } from '$all/bunqueue';

// todo: drizzle
// import { db, eq } from '$all/drizzle';
// import * as schema from '$all/drizzle/schema';

// todo: kafka
// import { msgAdd, msgsListen } from '$all/kafka';

// todo: r2
// import { fileAdd, fileAddUrlGet, fileDel, fileGet, fileGetUrlGet, fileHeadGet, filesGet } from '$all/r2';