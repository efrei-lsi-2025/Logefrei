/*
  Warnings:

  - Made the column `housingId` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_housingId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "housingId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_housingId_fkey" FOREIGN KEY ("housingId") REFERENCES "Housing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
