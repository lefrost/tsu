import { Elysia } from "elysia";

const app = new Elysia()
  .get(`/`, () => `${process.env.NAME} BE`)
  .listen(Number(process.env.BE_PORT));

console.log(`Elysia - ${process.env.BE_URL}`);
