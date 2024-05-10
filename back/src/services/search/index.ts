import Elysia from "elysia";

export const SearchService = new Elysia().get(
  "/",
  () => "Hello from search service"
);
