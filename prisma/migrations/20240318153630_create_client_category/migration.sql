-- CreateTable
CREATE TABLE "client_category" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(64) NOT NULL,

    CONSTRAINT "client_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientCategoriesOnSpecialists" (
    "specialistId" UUID NOT NULL,
    "clientCategoryId" UUID NOT NULL,
    "isWorkingWith" BOOLEAN NOT NULL,

    CONSTRAINT "ClientCategoriesOnSpecialists_pkey" PRIMARY KEY ("specialistId","clientCategoryId")
);

-- CreateTable
CREATE TABLE "ClientCategoriesOnOrganizations" (
    "organizationId" UUID NOT NULL,
    "clientCategoryId" UUID NOT NULL,
    "isWorkingWith" BOOLEAN NOT NULL,

    CONSTRAINT "ClientCategoriesOnOrganizations_pkey" PRIMARY KEY ("organizationId","clientCategoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_category_title_key" ON "client_category"("title");

-- AddForeignKey
ALTER TABLE "ClientCategoriesOnSpecialists" ADD CONSTRAINT "ClientCategoriesOnSpecialists_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientCategoriesOnSpecialists" ADD CONSTRAINT "ClientCategoriesOnSpecialists_clientCategoryId_fkey" FOREIGN KEY ("clientCategoryId") REFERENCES "client_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientCategoriesOnOrganizations" ADD CONSTRAINT "ClientCategoriesOnOrganizations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientCategoriesOnOrganizations" ADD CONSTRAINT "ClientCategoriesOnOrganizations_clientCategoryId_fkey" FOREIGN KEY ("clientCategoryId") REFERENCES "client_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
