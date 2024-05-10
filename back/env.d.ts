declare module "bun" {
  interface Env {
    SERVICE: "background" | "booking" | "housing" | "users" | "search";
  }
}
