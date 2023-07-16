/*
  Warnings:

  - You are about to drop the column `private` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `privated` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "private",
ADD COLUMN     "privated" BOOLEAN NOT NULL;
