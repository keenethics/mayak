/*
  Warnings:

  - Added the required column `latitude` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "latitude" REAL NOT NULL,
ADD COLUMN     "longitude" REAL NOT NULL;
