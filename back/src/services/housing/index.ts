import Elysia from "elysia";

export const HousingService = new Elysia().get(
  "/",
  () => "Hello from housing service"
);
