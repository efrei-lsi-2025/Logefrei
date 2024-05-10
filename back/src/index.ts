import Elysia, { t } from "elysia";
import { BackgroundService } from "./services/background";
import { BookingService } from "./services/booking";
import { HousingService } from "./services/housing";
import { SearchService } from "./services/search";
import { UsersService } from "./services/users";

const main = () => {
  console.log(`🏭 Starting service "${Bun.env.SERVICE}"...`);
  let service;

  switch (Bun.env.SERVICE) {
    case "background":
      service = BackgroundService;
      break;
    case "booking":
      service = BookingService;
      break;
    case "housing":
      service = HousingService;
      break;
    case "users":
      service = UsersService;
      break;
    case "search":
      service = SearchService;
      break;
    default:
      throw new Error("Unknown service");
  }

  new Elysia()
    .guard(
      {
        headers: t.Object({
          "x-authentik-email": t.String(),
          "x-authentik-name": t.String(),
        }),
      },
      (app) => app.use(service)
    )
    .listen(3000);
};

main();
