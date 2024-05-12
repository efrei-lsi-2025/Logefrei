import Elysia, { t } from "elysia";
import { BookingsService } from "./services/bookings";
import { HousingsService } from "./services/housings";
import { SearchService } from "./services/search";
import { UsersService } from "./services/users";

console.log(`🏭 Starting service "${Bun.env.SERVICE}"...`);

const app = new Elysia()
  .group("/api", (app) =>
    app
      .group("/bookings", (app) => app.use(BookingsService))
      .group("/housings", (app) => app.use(HousingsService))
      .group("/users", (app) => app.use(UsersService))
      .group("/search", (app) => app.use(SearchService))
  )
  .group("/internal", (app) => app)
  .listen(3000);

export type App = typeof app;
