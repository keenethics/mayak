-- CreateTable
CREATE TABLE "method" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(128) NOT NULL,
    "description" TEXT,
    "specializationId" UUID NOT NULL,

    CONSTRAINT "method_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "method_title_key" ON "method"("title");

-- AddForeignKey
ALTER TABLE "method" ADD CONSTRAINT "method_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specialization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
