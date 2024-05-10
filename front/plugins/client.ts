import { treaty } from "@elysiajs/eden";
import type { App } from "../../back/src";

export default defineNuxtPlugin(() => {
  const client = treaty<App>(window.location.origin);

  return {
    provide: {
      client,
    },
  };
});
