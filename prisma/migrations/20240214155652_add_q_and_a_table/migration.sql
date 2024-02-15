-- CreateTable
CREATE TABLE "qa" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDraft" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL DEFAULT '',
    "priority" SMALLINT,

    CONSTRAINT "qa_pkey" PRIMARY KEY ("id")
);
