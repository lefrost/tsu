import { Elysia } from "elysia";

const app = new Elysia()
  .get(`/`, () => `${Bun.env.NAME} BE`)
  .listen(Number(Bun.env.BE_PORT));

console.log(`Elysia - ${Bun.env.BE_URL}`);
