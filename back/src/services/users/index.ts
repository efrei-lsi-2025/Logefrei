import Elysia from "elysia";

export const UsersService = new Elysia().get(
  "/",
  () => "Hello from users service"
);
