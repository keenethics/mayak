-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('PSY_CENTER', 'HOSPITAL', 'SOCIAL_SERVICE');

-- CreateTable
CREATE TABLE "organization" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "yearsOnMarket" SMALLINT,
    "formatOfWork" "FormatOfWork" NOT NULL,
    "isFreeReception" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "phone" VARCHAR(15),
    "email" VARCHAR(320),
    "website" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrganizationToTherapy" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AddressToOrganization" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToTherapy_AB_unique" ON "_OrganizationToTherapy"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToTherapy_B_index" ON "_OrganizationToTherapy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToOrganization_AB_unique" ON "_AddressToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToOrganization_B_index" ON "_AddressToOrganization"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapy" ADD CONSTRAINT "_OrganizationToTherapy_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapy" ADD CONSTRAINT "_OrganizationToTherapy_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToOrganization" ADD CONSTRAINT "_AddressToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToOrganization" ADD CONSTRAINT "_AddressToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
