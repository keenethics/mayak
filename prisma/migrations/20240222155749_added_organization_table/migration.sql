-- CreateTable
CREATE TABLE "organization" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,
    "yearsOnMarket" SMALLINT,
    "formatOfWork" "FormatOfWork",
    "isFreeReception" BOOLEAN,
    "description" TEXT,
    "phone" VARCHAR(15),
    "email" VARCHAR(320),
    "website" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_type" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "organization_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrganizationToOrganizationType" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
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
CREATE UNIQUE INDEX "organization_type_name_key" ON "organization_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToOrganizationType_AB_unique" ON "_OrganizationToOrganizationType"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToOrganizationType_B_index" ON "_OrganizationToOrganizationType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToTherapy_AB_unique" ON "_OrganizationToTherapy"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToTherapy_B_index" ON "_OrganizationToTherapy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToOrganization_AB_unique" ON "_AddressToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToOrganization_B_index" ON "_AddressToOrganization"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationToOrganizationType" ADD CONSTRAINT "_OrganizationToOrganizationType_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToOrganizationType" ADD CONSTRAINT "_OrganizationToOrganizationType_B_fkey" FOREIGN KEY ("B") REFERENCES "organization_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapy" ADD CONSTRAINT "_OrganizationToTherapy_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapy" ADD CONSTRAINT "_OrganizationToTherapy_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToOrganization" ADD CONSTRAINT "_AddressToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToOrganization" ADD CONSTRAINT "_AddressToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
