/*
  Warnings:

  - You are about to drop the `_AddressToPlaceOfWork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `place_of_work` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specialistId` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AddressToPlaceOfWork" DROP CONSTRAINT "_AddressToPlaceOfWork_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToPlaceOfWork" DROP CONSTRAINT "_AddressToPlaceOfWork_B_fkey";

-- DropForeignKey
ALTER TABLE "place_of_work" DROP CONSTRAINT "place_of_work_specialistId_fkey";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "specialistId" UUID NOT NULL;

-- DropTable
DROP TABLE "_AddressToPlaceOfWork";

-- DropTable
DROP TABLE "place_of_work";

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
