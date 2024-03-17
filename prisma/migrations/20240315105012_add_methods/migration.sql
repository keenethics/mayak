-- CreateTable
CREATE TABLE "psychology_method" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(128) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "psychology_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychotherapy_method" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(128) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "psychotherapy_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PsychologyMethodToSpecialist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_PsychotherapyMethodToSpecialist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "psychology_method_title_key" ON "psychology_method"("title");

-- CreateIndex
CREATE UNIQUE INDEX "psychotherapy_method_title_key" ON "psychotherapy_method"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_PsychologyMethodToSpecialist_AB_unique" ON "_PsychologyMethodToSpecialist"("A", "B");

-- CreateIndex
CREATE INDEX "_PsychologyMethodToSpecialist_B_index" ON "_PsychologyMethodToSpecialist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PsychotherapyMethodToSpecialist_AB_unique" ON "_PsychotherapyMethodToSpecialist"("A", "B");

-- CreateIndex
CREATE INDEX "_PsychotherapyMethodToSpecialist_B_index" ON "_PsychotherapyMethodToSpecialist"("B");

-- AddForeignKey
ALTER TABLE "_PsychologyMethodToSpecialist" ADD CONSTRAINT "_PsychologyMethodToSpecialist_A_fkey" FOREIGN KEY ("A") REFERENCES "psychology_method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PsychologyMethodToSpecialist" ADD CONSTRAINT "_PsychologyMethodToSpecialist_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PsychotherapyMethodToSpecialist" ADD CONSTRAINT "_PsychotherapyMethodToSpecialist_A_fkey" FOREIGN KEY ("A") REFERENCES "psychotherapy_method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PsychotherapyMethodToSpecialist" ADD CONSTRAINT "_PsychotherapyMethodToSpecialist_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
