import { user } from '$all/betterauth/schema';
import { bigint, pgTable, text, timestamp, uuid, unique } from 'drizzle-orm/pg-core';

export const card = pgTable(`card`, {
  id: uuid(`id`).defaultRandom().primaryKey(),
  userId: text(`user_id`).notNull().references(() => user.id, { onDelete: `cascade` }),
  orderk: text(`orderk`).notNull(), // for recurring-type products, orderk is the subscription id
  productk: text(`productk`).notNull(),
  created: bigint(`created`, { mode: `number` }).notNull().$defaultFn(() => Date.now()),
  status: text(`status`).$type<`active` | `inactive`>().default(`active`).notNull(),
  updated: bigint(`updated`, { mode: `number` }).notNull().$defaultFn(() => Date.now()).$onUpdate(() => Date.now())
}, table => [unique().on(table.orderk, table.userId)]);

export * from '$all/betterauth/schema';
