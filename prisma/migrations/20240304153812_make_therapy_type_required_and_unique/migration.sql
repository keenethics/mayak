/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `therapy` will be added. If there are existing duplicate values, this will fail.
  - Made the column `type` on table `therapy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "therapy" ALTER COLUMN "type" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "therapy_type_key" ON "therapy"("type");
