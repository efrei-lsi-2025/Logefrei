declare module "bun" {
  interface Env {
    SERVICE: "background" | "bookings" | "housings" | "users" | "search";
  }
}
