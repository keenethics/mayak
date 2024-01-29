-- CreateTable
CREATE TABLE "Specialist" (
    "id" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Specialist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Therapy" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Therapy_pkey" PRIMARY KEY ("id")
);
