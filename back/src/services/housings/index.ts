import Elysia from "elysia";
import { userRegisterPlugin } from "../../middlewares/user-register";
import { injectStorePlugin } from "../../middlewares/inject-store";
import { HousingsService } from "./service";
import { HousingModels } from "./models";

export const HousingsController = new Elysia()
  .use(injectStorePlugin)
  .use(userRegisterPlugin)
  .use(HousingModels)
  .get(
    "/",
    async () => await HousingsService.getHousings()
  )
  .post(
    "/",
    async ({ body }) => await HousingsService.createHousing(body),
    {
      body: "HousingCreationDTO",
      response: "HousingDTO"
    }
  );
