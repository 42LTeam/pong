/*
  Warnings:

  - You are about to drop the column `private` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "private",
ADD COLUMN     "privated" BOOLEAN NOT NULL DEFAULT false;
