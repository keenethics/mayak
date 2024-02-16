-- CreateTable
CREATE TABLE "faq" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL DEFAULT '',
    "priority" SMALLINT,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);
