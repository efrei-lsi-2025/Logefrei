import { t, Elysia, error, NotFoundError } from "elysia";
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
  .get(
    "/:id",
    async ({ params }) => {
      const housing = await HousingsService.getHousing(params.id);
      if (!housing) throw new NotFoundError(`Housing with id ${params.id} not found`);
      return housing;
    },
    {
      params: t.Object({ id: t.String() }),
      response: "HousingDTO"
    }
  )
  .post(
    "/",
    async ({ body }) => await HousingsService.createHousing(body),
    {
      body: "HousingCreationDTO",
      response: "HousingDTO"
    }
  );
