import Elysia from "elysia";

export const BackgroundService = new Elysia().get(
  "/",
  () => "Hello from background service"
);
