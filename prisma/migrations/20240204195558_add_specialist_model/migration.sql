-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "FormatOfWork" AS ENUM ('OFFLINE', 'ONLINE', 'BOTH');

-- CreateTable
CREATE TABLE "specialist" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(64) NOT NULL,
    "lastName" VARCHAR(64) NOT NULL,
    "surname" VARCHAR(64),
    "gender" "Gender" NOT NULL,
    "yearsOfExperience" SMALLINT,
    "formatOfWork" "FormatOfWork" NOT NULL,
    "isFreeReception" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "phone" VARCHAR(15),
    "email" VARCHAR(320),
    "website" TEXT,

    CONSTRAINT "specialist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialization" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_of_work" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "specialistId" UUID NOT NULL,

    CONSTRAINT "place_of_work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "therapy" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "therapy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nameOfClinic" VARCHAR(255),
    "fullAddress" VARCHAR(128) NOT NULL,
    "districtId" UUID NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "_AddressToPlaceOfWork" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "specialist_email_key" ON "specialist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "specialization_name_key" ON "specialization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "district_name_key" ON "district"("name");

-- CreateIndex
CREATE UNIQUE INDEX "therapy_name_key" ON "therapy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToSpecialization_AB_unique" ON "_SpecialistToSpecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToSpecialization_B_index" ON "_SpecialistToSpecialization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToTherapy_AB_unique" ON "_SpecialistToTherapy"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToTherapy_B_index" ON "_SpecialistToTherapy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToPlaceOfWork_AB_unique" ON "_AddressToPlaceOfWork"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToPlaceOfWork_B_index" ON "_AddressToPlaceOfWork"("B");

-- AddForeignKey
ALTER TABLE "place_of_work" ADD CONSTRAINT "place_of_work_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToSpecialization" ADD CONSTRAINT "_SpecialistToSpecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToSpecialization" ADD CONSTRAINT "_SpecialistToSpecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapy" ADD CONSTRAINT "_SpecialistToTherapy_A_fkey" FOREIGN KEY ("A") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapy" ADD CONSTRAINT "_SpecialistToTherapy_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToPlaceOfWork" ADD CONSTRAINT "_AddressToPlaceOfWork_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToPlaceOfWork" ADD CONSTRAINT "_AddressToPlaceOfWork_B_fkey" FOREIGN KEY ("B") REFERENCES "place_of_work"("id") ON DELETE CASCADE ON UPDATE CASCADE;
