/*
  Warnings:

  - You are about to drop the `_OrganizationToTherapy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToTherapy" DROP CONSTRAINT "_OrganizationToTherapy_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToTherapy" DROP CONSTRAINT "_OrganizationToTherapy_B_fkey";

-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "therapyId" UUID;

-- DropTable
DROP TABLE "_OrganizationToTherapy";

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_therapyId_fkey" FOREIGN KEY ("therapyId") REFERENCES "therapy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
