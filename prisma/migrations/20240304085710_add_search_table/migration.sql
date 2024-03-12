-- CreateTable
CREATE TABLE "SearchEntry" (
    "id" UUID NOT NULL,
    "sortString" TEXT NOT NULL,
    "specialistId" UUID,
    "organizationId" UUID,

    CONSTRAINT "SearchEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchEntry_specialistId_key" ON "SearchEntry"("specialistId");

-- CreateIndex
CREATE UNIQUE INDEX "SearchEntry_organizationId_key" ON "SearchEntry"("organizationId");

-- AddForeignKey
ALTER TABLE "SearchEntry" ADD CONSTRAINT "SearchEntry_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchEntry" ADD CONSTRAINT "SearchEntry_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
