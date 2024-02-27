-- CreateEnum
CREATE TYPE "DaysOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- DropIndex
DROP INDEX "specialist_email_key";

-- CreateTable
CREATE TABLE "day_of_work" (
    "id" UUID NOT NULL,
    "dayOfWeek" "DaysOfWeek" NOT NULL,
    "timeRanges" TEXT[],

    CONSTRAINT "day_of_work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DayOfWorkToSpecialist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_DayOfWorkToOrganization" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DayOfWorkToSpecialist_AB_unique" ON "_DayOfWorkToSpecialist"("A", "B");

-- CreateIndex
CREATE INDEX "_DayOfWorkToSpecialist_B_index" ON "_DayOfWorkToSpecialist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DayOfWorkToOrganization_AB_unique" ON "_DayOfWorkToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_DayOfWorkToOrganization_B_index" ON "_DayOfWorkToOrganization"("B");

-- AddForeignKey
ALTER TABLE "_DayOfWorkToSpecialist" ADD CONSTRAINT "_DayOfWorkToSpecialist_A_fkey" FOREIGN KEY ("A") REFERENCES "day_of_work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayOfWorkToSpecialist" ADD CONSTRAINT "_DayOfWorkToSpecialist_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayOfWorkToOrganization" ADD CONSTRAINT "_DayOfWorkToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "day_of_work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayOfWorkToOrganization" ADD CONSTRAINT "_DayOfWorkToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
