/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secretO2FA` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "secretO2FA" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Chat";

-- CreateTable
CREATE TABLE "Friends" (
    "id_count" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,
    "user_1" INTEGER NOT NULL,
    "user_2" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id_count")
);

-- CreateTable
CREATE TABLE "Match" (
    "id_count" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,
    "user_1" INTEGER NOT NULL,
    "user_2" INTEGER NOT NULL,
    "user_1_score" INTEGER NOT NULL,
    "user_2_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id_count")
);

-- CreateTable
CREATE TABLE "Message" (
    "id_count" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "channel" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id_count")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id_count" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id_count")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
