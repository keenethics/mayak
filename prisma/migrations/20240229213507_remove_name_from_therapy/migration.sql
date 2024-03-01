/*
  Warnings:

  - You are about to drop the column `name` on the `therapy` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "therapy_name_key";

-- AlterTable
ALTER TABLE "therapy" DROP COLUMN "name";
