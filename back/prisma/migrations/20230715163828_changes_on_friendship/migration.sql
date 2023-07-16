/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Friendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `acceptedAt` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "updatedAt",
ADD COLUMN     "acceptedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");
