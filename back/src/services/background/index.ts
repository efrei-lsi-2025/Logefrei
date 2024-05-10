import Elysia from "elysia";
import { injectStatePlugin } from "../../middlewares/inject-state";

export const BackgroundService = new Elysia()
  .use(injectStatePlugin)
  .get("/", () => "Hello from background service");
