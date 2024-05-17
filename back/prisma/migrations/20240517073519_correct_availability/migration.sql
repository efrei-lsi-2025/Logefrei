/*
  Warnings:

  - You are about to drop the column `availabiltyStatus` on the `Housing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Housing" DROP COLUMN "availabiltyStatus",
ADD COLUMN     "availabilityStatus" "HousingAvailabilityStatus";
