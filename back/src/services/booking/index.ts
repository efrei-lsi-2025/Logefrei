import Elysia from "elysia";
import { createOrGetUser } from "../../middlewares/user-register";

export const BookingService = new Elysia()
  .resolve(({ headers }) => {
    if (!headers["x-authentik-name"] || !headers["x-authentik-email"]) {
      return Promise.reject("User not authenticated");
    }
    return createOrGetUser(
      headers["x-authentik-name"],
      headers["x-authentik-email"]
    );
  })
  .get("/", ({ name }) => `Hello from booking service ${name} ! `);
