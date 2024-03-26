-- CreateTable
CREATE TABLE "support_focus" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "specialistId" UUID,
    "organizationId" UUID,
    "therapyId" UUID NOT NULL,

    CONSTRAINT "support_focus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RequestToSupportFocus" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_RequestToTherapy" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "request_name_key" ON "request"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RequestToSupportFocus_AB_unique" ON "_RequestToSupportFocus"("A", "B");

-- CreateIndex
CREATE INDEX "_RequestToSupportFocus_B_index" ON "_RequestToSupportFocus"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RequestToTherapy_AB_unique" ON "_RequestToTherapy"("A", "B");

-- CreateIndex
CREATE INDEX "_RequestToTherapy_B_index" ON "_RequestToTherapy"("B");

-- AddForeignKey
ALTER TABLE "support_focus" ADD CONSTRAINT "support_focus_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_focus" ADD CONSTRAINT "support_focus_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_focus" ADD CONSTRAINT "support_focus_therapyId_fkey" FOREIGN KEY ("therapyId") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToSupportFocus" ADD CONSTRAINT "_RequestToSupportFocus_A_fkey" FOREIGN KEY ("A") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToSupportFocus" ADD CONSTRAINT "_RequestToSupportFocus_B_fkey" FOREIGN KEY ("B") REFERENCES "support_focus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToTherapy" ADD CONSTRAINT "_RequestToTherapy_A_fkey" FOREIGN KEY ("A") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToTherapy" ADD CONSTRAINT "_RequestToTherapy_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
