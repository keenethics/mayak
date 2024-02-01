/*
  Warnings:

  - You are about to drop the `Specialist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Therapy` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "FormatOfWork" AS ENUM ('OFFLINE', 'ONLINE', 'BOTH');

-- DropTable
DROP TABLE "Specialist";

-- DropTable
DROP TABLE "Therapy";

-- CreateTable
CREATE TABLE "specialists" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" VARCHAR(128) NOT NULL,
    "gender" "Gender" NOT NULL,
    "yearsOfExperience" SMALLINT,
    "formatOfWork" "FormatOfWork" NOT NULL,
    "treatmentTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price" SMALLINT NOT NULL DEFAULT 0,
    "isFreeReception" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "phone" VARCHAR(15),
    "email" VARCHAR(64),
    "website" TEXT,
    "workSchedule" VARCHAR(128),

    CONSTRAINT "specialists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialist_drafts" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" VARCHAR(128) NOT NULL,

    CONSTRAINT "specialist_drafts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specializations" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "specializations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places_of_work" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,
    "fullAddress" VARCHAR(128) NOT NULL,
    "districtId" UUID NOT NULL,
    "geo" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
    "specialistId" UUID NOT NULL,

    CONSTRAINT "places_of_work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "districts" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "therapies" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "therapies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpecialistToSpecialization" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SpecialistToTherapy" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SpecialistDraftToSpecialization" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "specializations_name_key" ON "specializations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "districts_name_key" ON "districts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "therapies_name_key" ON "therapies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToSpecialization_AB_unique" ON "_SpecialistToSpecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToSpecialization_B_index" ON "_SpecialistToSpecialization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToTherapy_AB_unique" ON "_SpecialistToTherapy"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToTherapy_B_index" ON "_SpecialistToTherapy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistDraftToSpecialization_AB_unique" ON "_SpecialistDraftToSpecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistDraftToSpecialization_B_index" ON "_SpecialistDraftToSpecialization"("B");

-- AddForeignKey
ALTER TABLE "places_of_work" ADD CONSTRAINT "places_of_work_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places_of_work" ADD CONSTRAINT "places_of_work_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToSpecialization" ADD CONSTRAINT "_SpecialistToSpecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "specialists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToSpecialization" ADD CONSTRAINT "_SpecialistToSpecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "specializations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapy" ADD CONSTRAINT "_SpecialistToTherapy_A_fkey" FOREIGN KEY ("A") REFERENCES "specialists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapy" ADD CONSTRAINT "_SpecialistToTherapy_B_fkey" FOREIGN KEY ("B") REFERENCES "therapies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistDraftToSpecialization" ADD CONSTRAINT "_SpecialistDraftToSpecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "specialist_drafts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistDraftToSpecialization" ADD CONSTRAINT "_SpecialistDraftToSpecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "specializations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
