-- CreateEnum
CREATE TYPE "EventFormat" AS ENUM ('OFFLINE', 'ONLINE');

-- CreateEnum
CREATE TYPE "EventPriceFormat" AS ENUM ('FREE', 'FIXED_PRICE', 'MIN_PRICE');

-- CreateTable
CREATE TABLE "event" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(128) NOT NULL,
    "organizerName" VARCHAR(128) NOT NULL,
    "notes" VARCHAR(350),
    "address" VARCHAR(128),
    "locationLink" TEXT,
    "price" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "linkId" UUID,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "format" "EventFormat" NOT NULL,
    "priceType" "EventPriceFormat" NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_link" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "label" VARCHAR(30) NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "event_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_tag" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "event_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToEventTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "event_link_label_link_key" ON "event_link"("label", "link");

-- CreateIndex
CREATE UNIQUE INDEX "event_tag_name_key" ON "event_tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventTag_AB_unique" ON "_EventToEventTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventTag_B_index" ON "_EventToEventTag"("B");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "event_link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTag" ADD CONSTRAINT "_EventToEventTag_A_fkey" FOREIGN KEY ("A") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTag" ADD CONSTRAINT "_EventToEventTag_B_fkey" FOREIGN KEY ("B") REFERENCES "event_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
