-- CreateTable
CREATE TABLE "feedback" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(13) NOT NULL,
    "email" VARCHAR(254),
    "callAgain" BOOLEAN NOT NULL,
    "message" VARCHAR(320) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);
