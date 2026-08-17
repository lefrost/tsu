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
  const userId = d.customer?.externalId;

  switch (ev.type) {
    case `order.paid`: {
      // tba
      break;
    }
    case `subscription.active`: {
      // tba
      break;
    }
    case `subscription.canceled`: {
      // tba
      break;
    }
    case `subscription.past_due`: {
      // tba
      break;
    }
    case `subscription.revoked`: {
      // tba
      break;
    }
    case `subscription.updated`: {
      // tba
      break;
    }
  }
}