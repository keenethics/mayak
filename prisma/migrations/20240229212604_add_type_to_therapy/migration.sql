/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `therapy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `therapy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "therapy" ADD COLUMN     "type" VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "therapy_type_key" ON "therapy"("type");
