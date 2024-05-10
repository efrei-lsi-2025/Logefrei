import Elysia from "elysia";
import { userRegisterPlugin } from "../../middlewares/user-register";
import { injectStatePlugin } from "../../middlewares/inject-state";

export const BookingService = new Elysia()
  .use(injectStatePlugin)
  .use(userRegisterPlugin)
  .get(
    "/",
    ({ user: { name }, store: { service } }) =>
      `Hello from ${service} service ${name} ! `
  );
