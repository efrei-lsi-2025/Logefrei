import Elysia from "elysia";
import { injectStorePlugin } from "../../middlewares/inject-store";

export const BackgroundService = new Elysia()
  .use(injectStorePlugin)
  .get("/", () => "Hello from background service");
