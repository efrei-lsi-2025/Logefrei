/*
  Warnings:

  - The values [Available,Occupied] on the enum `HousingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "HousingAvailabilityStatus" AS ENUM ('Available', 'Occupied');

-- AlterEnum
BEGIN;
CREATE TYPE "HousingStatus_new" AS ENUM ('Draft', 'Published', 'Withdrawn');
ALTER TABLE "Housing" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Housing" ALTER COLUMN "status" TYPE "HousingStatus_new" USING ("status"::text::"HousingStatus_new");
ALTER TYPE "HousingStatus" RENAME TO "HousingStatus_old";
ALTER TYPE "HousingStatus_new" RENAME TO "HousingStatus";
DROP TYPE "HousingStatus_old";
ALTER TABLE "Housing" ALTER COLUMN "status" SET DEFAULT 'Draft';
COMMIT;

-- AlterTable
ALTER TABLE "Housing" ADD COLUMN     "availabiltyStatus" "HousingAvailabilityStatus";
