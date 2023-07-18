/*
  Warnings:

  - You are about to drop the column `acceptedAt` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `acceptorId` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `initiatorId` on the `Friendship` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_acceptorId_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_initiatorId_fkey";

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "acceptedAt",
DROP COLUMN "acceptorId",
DROP COLUMN "createdAt",
DROP COLUMN "initiatorId";

-- CreateTable
CREATE TABLE "UserFriendship" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "friendshipId" INTEGER NOT NULL,
    "acceptedAt" TIMESTAMP(3),

    CONSTRAINT "UserFriendship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFriendship" ADD CONSTRAINT "UserFriendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFriendship" ADD CONSTRAINT "UserFriendship_friendshipId_fkey" FOREIGN KEY ("friendshipId") REFERENCES "Friendship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
