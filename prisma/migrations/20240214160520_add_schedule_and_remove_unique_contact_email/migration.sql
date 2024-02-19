-- CreateEnum
CREATE TYPE "DaysOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- DropIndex
DROP INDEX "specialist_email_key";

-- CreateTable
CREATE TABLE "day_of_work" (
    "id" UUID NOT NULL,
    "specialistId" UUID NOT NULL,
    "dayOfWeek" "DaysOfWeek" NOT NULL,
    "timeRanges" TEXT[],

    CONSTRAINT "day_of_work_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "day_of_work" ADD CONSTRAINT "day_of_work_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
