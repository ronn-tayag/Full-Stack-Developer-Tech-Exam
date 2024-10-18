/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Addres" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "balance" TEXT NOT NULL,

    CONSTRAINT "Addres_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Addres_address_key" ON "Addres"("address");
