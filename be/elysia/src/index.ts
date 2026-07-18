import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => Bun.env.BE_NAME)
  .listen(Number(Bun.env.BE_PORT));

console.log(`Elysia - ${Bun.env.BE_URL}`);
