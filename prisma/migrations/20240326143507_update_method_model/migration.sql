/*
  Warnings:

  - You are about to drop the `_RequestToSupportFocus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RequestToTherapy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `support_focus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RequestToSupportFocus" DROP CONSTRAINT "_RequestToSupportFocus_A_fkey";

-- DropForeignKey
ALTER TABLE "_RequestToSupportFocus" DROP CONSTRAINT "_RequestToSupportFocus_B_fkey";

-- DropForeignKey
ALTER TABLE "_RequestToTherapy" DROP CONSTRAINT "_RequestToTherapy_A_fkey";

-- DropForeignKey
ALTER TABLE "_RequestToTherapy" DROP CONSTRAINT "_RequestToTherapy_B_fkey";

-- DropForeignKey
ALTER TABLE "support_focus" DROP CONSTRAINT "support_focus_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "support_focus" DROP CONSTRAINT "support_focus_specialistId_fkey";

-- DropForeignKey
ALTER TABLE "support_focus" DROP CONSTRAINT "support_focus_therapyId_fkey";

-- DropTable
DROP TABLE "_RequestToSupportFocus";

-- DropTable
DROP TABLE "_RequestToTherapy";

-- DropTable
DROP TABLE "request";

-- DropTable
DROP TABLE "support_focus";

-- CreateTable
CREATE TABLE "therapy_price" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "therapyId" UUID NOT NULL,
    "price" INTEGER NOT NULL,
    "organizationId" UUID,

    CONSTRAINT "therapy_price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpecialistToTherapy" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SpecialistToTherapyPrice" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToTherapy" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToTherapy_AB_unique" ON "_SpecialistToTherapy"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToTherapy_B_index" ON "_SpecialistToTherapy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToTherapyPrice_AB_unique" ON "_SpecialistToTherapyPrice"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToTherapyPrice_B_index" ON "_SpecialistToTherapyPrice"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToTherapy_AB_unique" ON "_OrganizationToTherapy"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToTherapy_B_index" ON "_OrganizationToTherapy"("B");

-- AddForeignKey
ALTER TABLE "therapy_price" ADD CONSTRAINT "therapy_price_therapyId_fkey" FOREIGN KEY ("therapyId") REFERENCES "therapy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "therapy_price" ADD CONSTRAINT "therapy_price_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapy" ADD CONSTRAINT "_SpecialistToTherapy_A_fkey" FOREIGN KEY ("A") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapy" ADD CONSTRAINT "_SpecialistToTherapy_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapyPrice" ADD CONSTRAINT "_SpecialistToTherapyPrice_A_fkey" FOREIGN KEY ("A") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapyPrice" ADD CONSTRAINT "_SpecialistToTherapyPrice_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy_price"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapy" ADD CONSTRAINT "_OrganizationToTherapy_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapy" ADD CONSTRAINT "_OrganizationToTherapy_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
