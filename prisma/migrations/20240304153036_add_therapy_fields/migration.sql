/*
  Warnings:

  - You are about to drop the column `name` on the `therapy` table. All the data in the column will be lost.
  - Added the required column `description` to the `therapy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `therapy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `therapy` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "therapy_name_key";

-- AlterTable
ALTER TABLE "therapy" DROP COLUMN "name",
ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "imagePath" VARCHAR(255) NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "title" VARCHAR(128) NOT NULL,
ADD COLUMN     "type" VARCHAR(64);
