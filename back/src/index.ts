import Elysia from "elysia";
import { parseArgs } from "util";

const {
  values: { service },
} = parseArgs({
  args: Bun.argv,
  options: {
    service: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

const main = () => {
  console.log(service);
  console.log("Hello Elysia");

  const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);
};

main();
