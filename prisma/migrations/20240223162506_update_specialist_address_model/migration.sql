/*
  Warnings:

  - You are about to drop the `_AddressToPlaceOfWork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `place_of_work` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AddressToPlaceOfWork" DROP CONSTRAINT "_AddressToPlaceOfWork_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToPlaceOfWork" DROP CONSTRAINT "_AddressToPlaceOfWork_B_fkey";

-- DropForeignKey
ALTER TABLE "place_of_work" DROP CONSTRAINT "place_of_work_specialistId_fkey";

-- DropTable
DROP TABLE "_AddressToPlaceOfWork";

-- DropTable
DROP TABLE "place_of_work";

-- CreateTable
CREATE TABLE "_AddressToSpecialist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToSpecialist_AB_unique" ON "_AddressToSpecialist"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToSpecialist_B_index" ON "_AddressToSpecialist"("B");

-- AddForeignKey
ALTER TABLE "_AddressToSpecialist" ADD CONSTRAINT "_AddressToSpecialist_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToSpecialist" ADD CONSTRAINT "_AddressToSpecialist_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
