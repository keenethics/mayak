-- CreateTable
CREATE TABLE "client_categories" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(64) NOT NULL,

    CONSTRAINT "client_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_categories_title_key" ON "client_categories"("title");
