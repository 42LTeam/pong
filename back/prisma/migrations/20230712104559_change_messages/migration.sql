/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `private` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "private" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Message_Channel" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "channel" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message_Private" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "recipient" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_Private_pkey" PRIMARY KEY ("id")
);
