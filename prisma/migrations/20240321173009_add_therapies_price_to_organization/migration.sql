-- CreateTable
CREATE TABLE "_OrganizationToTherapyPrice" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToTherapyPrice_AB_unique" ON "_OrganizationToTherapyPrice"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToTherapyPrice_B_index" ON "_OrganizationToTherapyPrice"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapyPrice" ADD CONSTRAINT "_OrganizationToTherapyPrice_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapyPrice" ADD CONSTRAINT "_OrganizationToTherapyPrice_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy_price"("id") ON DELETE CASCADE ON UPDATE CASCADE;
