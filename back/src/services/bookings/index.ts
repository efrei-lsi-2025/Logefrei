import Elysia from "elysia";
import { userRegisterPlugin } from "../../middlewares/user-register";
import { injectStorePlugin } from "../../middlewares/inject-store";

export const BookingsController = new Elysia()
  .use(injectStorePlugin)
  .use(userRegisterPlugin)
  .get(
    "/",
    ({ user: { name }, store: { service } }) =>
      `Hello from ${service} service ${name} ! `
  );
