/*
  Warnings:

  - The primary key for the `UserChannel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exited` on the `UserChannel` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `UserChannel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserChannel" DROP CONSTRAINT "UserChannel_pkey",
DROP COLUMN "exited",
DROP COLUMN "isAdmin",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "isBlocked" SET DEFAULT false,
ADD CONSTRAINT "UserChannel_pkey" PRIMARY KEY ("id");
