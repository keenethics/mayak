-- CreateEnum
CREATE TYPE "EventFormat" AS ENUM ('OFFLINE', 'ONLINE');

-- CreateEnum
CREATE TYPE "EventPriceFormat" AS ENUM ('FREE', 'FIXED_PRICE', 'MIN_PRICE');

-- CreateTable
CREATE TABLE "event" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventName" VARCHAR(128) NOT NULL,
    "organizerName" VARCHAR(128) NOT NULL,
    "notes" VARCHAR(350),
    "address" VARCHAR(64),
    "locationLink" TEXT,
    "price" INTEGER,
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
CREATE TABLE "_EventToEventLink" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToEventTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventLink_AB_unique" ON "_EventToEventLink"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventLink_B_index" ON "_EventToEventLink"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventTag_AB_unique" ON "_EventToEventTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventTag_B_index" ON "_EventToEventTag"("B");

-- AddForeignKey
ALTER TABLE "_EventToEventLink" ADD CONSTRAINT "_EventToEventLink_A_fkey" FOREIGN KEY ("A") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventLink" ADD CONSTRAINT "_EventToEventLink_B_fkey" FOREIGN KEY ("B") REFERENCES "event_link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTag" ADD CONSTRAINT "_EventToEventTag_A_fkey" FOREIGN KEY ("A") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTag" ADD CONSTRAINT "_EventToEventTag_B_fkey" FOREIGN KEY ("B") REFERENCES "event_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
