-- AlterTable
ALTER TABLE "specialist" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "formatOfWork" DROP NOT NULL,
ALTER COLUMN "isFreeReception" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
