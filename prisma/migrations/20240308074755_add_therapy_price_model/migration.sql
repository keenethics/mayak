-- CreateTable
CREATE TABLE "therapy_price" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "therapyId" UUID NOT NULL,
    "price" INTEGER NOT NULL CONSTRAINT positive_price CHECK (price >= 0),

    CONSTRAINT "therapy_price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpecialistToTherapyPrice" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToTherapyPrice_AB_unique" ON "_SpecialistToTherapyPrice"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToTherapyPrice_B_index" ON "_SpecialistToTherapyPrice"("B");

-- AddForeignKey
ALTER TABLE "therapy_price" ADD CONSTRAINT "therapy_price_therapyId_fkey" FOREIGN KEY ("therapyId") REFERENCES "therapy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapyPrice" ADD CONSTRAINT "_SpecialistToTherapyPrice_A_fkey" FOREIGN KEY ("A") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToTherapyPrice" ADD CONSTRAINT "_SpecialistToTherapyPrice_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy_price"("id") ON DELETE CASCADE ON UPDATE CASCADE;
