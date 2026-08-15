import { Redis } from '@upstash/redis';

const redis = new Redis({
  token: process.env.UPSTASH_TOKEN,
  url: process.env.UPSTASH_URL
});

// tba: upstash usage