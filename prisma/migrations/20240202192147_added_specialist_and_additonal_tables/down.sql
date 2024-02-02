-- DropForeignKey
ALTER TABLE "place_of_work" DROP CONSTRAINT "place_of_work_specialistId_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_districtId_fkey";

-- DropForeignKey
ALTER TABLE "_SpecialistToSpecialization" DROP CONSTRAINT "_SpecialistToSpecialization_A_fkey";

-- DropForeignKey
ALTER TABLE "_SpecialistToSpecialization" DROP CONSTRAINT "_SpecialistToSpecialization_B_fkey";

-- DropForeignKey
ALTER TABLE "_SpecialistToTherapy" DROP CONSTRAINT "_SpecialistToTherapy_A_fkey";

-- DropForeignKey
ALTER TABLE "_SpecialistToTherapy" DROP CONSTRAINT "_SpecialistToTherapy_B_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToPlaceOfWork" DROP CONSTRAINT "_AddressToPlaceOfWork_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToPlaceOfWork" DROP CONSTRAINT "_AddressToPlaceOfWork_B_fkey";

-- DropTable
DROP TABLE "specialist";

-- DropTable
DROP TABLE "specialization";

-- DropTable
DROP TABLE "place_of_work";

-- DropTable
DROP TABLE "district";

-- DropTable
DROP TABLE "therapy";

-- DropTable
DROP TABLE "address";

-- DropTable
DROP TABLE "_SpecialistToSpecialization";

-- DropTable
DROP TABLE "_SpecialistToTherapy";

-- DropTable
DROP TABLE "_AddressToPlaceOfWork";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "FormatOfWork";

