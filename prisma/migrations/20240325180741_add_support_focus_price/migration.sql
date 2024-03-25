-- AlterTable
ALTER TABLE "support_focus" ADD COLUMN     "price" INTEGER CONSTRAINT positive_price CHECK (price >= 0);
