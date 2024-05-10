import Elysia, { t } from "elysia";
import { BackgroundService } from "./services/background";
import { BookingsService } from "./services/bookings";
import { HousingsService } from "./services/housings";
import { SearchService } from "./services/search";
import { UsersService } from "./services/users";

const main = () => {
  console.log(`🏭 Starting service "${Bun.env.SERVICE}"...`);
  let service;

  switch (Bun.env.SERVICE) {
    case "background":
      service = BackgroundService;
      break;
    case "bookings":
      service = BookingsService;
      break;
    case "housings":
      service = HousingsService;
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

  new Elysia().use(service).listen(3000);
};

main();
