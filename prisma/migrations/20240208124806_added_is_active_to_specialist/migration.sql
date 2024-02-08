/*
  Warnings:

  - Added the required column `isActive` to the `specialist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "specialist" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
