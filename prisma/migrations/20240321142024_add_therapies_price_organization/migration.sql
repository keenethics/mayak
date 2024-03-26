-- AlterTable
ALTER TABLE "therapy_price" ADD COLUMN     "organizationId" UUID;

-- AddForeignKey
ALTER TABLE "therapy_price" ADD CONSTRAINT "therapy_price_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
