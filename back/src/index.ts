import Elysia from "elysia";

const main = () => {
  console.log(process.env.SERVICE);

  const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);
};

main();
