import { db, eq } from '$all/drizzle';
import { card } from '$all/drizzle/schema';
import { Polar } from "@polar-sh/sdk";
import { validateEvent } from "@polar-sh/sdk/webhooks";

export const polar = new Polar({
  accessToken: process.env.POLAR_TOKEN!,
  server: process.env.ENVIRONMENT === `prod` ? `production` : `sandbox`
});

const POLAR_SECRET = process.env.POLAR_SECRET!;

export async function checkoutUrlCreate({ custIpAddy, productId, userEmail, userId }: {
  productId: string,
  userId: string,
  userEmail: string,
  custIpAddy?: string
}) {
  return (await polar.checkouts.create({
    customerEmail: userEmail,
    customerIpAddress: custIpAddy,
    externalCustomerId: userId,
    products: [productId],
  })).url;
}

export async function portalUrlCreate({ userId }: { userId: string }) {
  return (await polar.customerSessions.create({ externalCustomerId: userId })).customerPortalUrl;
}

export async function polarWebhookHandle({ headers, rawBody }: {
  headers: Record<string, string>,
  rawBody: string | Buffer,
}) {
  const ev = validateEvent(rawBody, headers, POLAR_SECRET);
  const d = ev.data as any;
  const orderk = d.subscriptionId ?? d.id;
  const productk = d.productId;
  const userId = d.customer?.externalId;
  if (!(orderk && productk && userId)) return;

  async function upsert(productk: string, status: `active` | `inactive`) {
    await db.insert(card).values({
      orderk,
      productk,
      status,
      userId
    }).onConflictDoUpdate({
      target: [card.orderk, card.userId],
      set: { productk, status }
    });
  }

  switch (ev.type) {
    case `order.paid`:
    case `subscription.updated`: {
      await upsert(productk, `active`);
      break;
    }
    
    case `subscription.revoked`: {
      await upsert(productk, `inactive`);
      break;
    }
  }
}