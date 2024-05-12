-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_housingId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "housingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_housingId_fkey" FOREIGN KEY ("housingId") REFERENCES "Housing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
