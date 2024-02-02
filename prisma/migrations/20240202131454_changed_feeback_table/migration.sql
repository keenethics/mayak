/*
  Warnings:

  - You are about to drop the column `callAgain` on the `feedback` table. All the data in the column will be lost.
  - Added the required column `callMe` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "callAgain",
ADD COLUMN     "adminNotes" VARCHAR(350),
ADD COLUMN     "callMe" BOOLEAN NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(320);
