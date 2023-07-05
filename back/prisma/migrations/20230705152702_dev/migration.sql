/*
  Warnings:

  - The primary key for the `Friends` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_count` on the `Friends` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_count` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `text` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_pkey",
DROP COLUMN "id_count",
ADD CONSTRAINT "Friends_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "id_count",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "xp" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friends_id_key" ON "Friends"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");
