/*
  Warnings:

  - You are about to drop the column `accepted` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `user_1_id` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `user_2` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `user_1_id` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `user_1_score` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `user_2` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `user_2_score` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the `Blocked` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_channel_admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_channel_blocked` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_channel_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `acceptorId` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initiatorId` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blocked" DROP CONSTRAINT "Blocked_user_1_id_fkey";

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_user_1_id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_user_1_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_channelId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "_channel_admin" DROP CONSTRAINT "_channel_admin_A_fkey";

-- DropForeignKey
ALTER TABLE "_channel_admin" DROP CONSTRAINT "_channel_admin_B_fkey";

-- DropForeignKey
ALTER TABLE "_channel_blocked" DROP CONSTRAINT "_channel_blocked_A_fkey";

-- DropForeignKey
ALTER TABLE "_channel_blocked" DROP CONSTRAINT "_channel_blocked_B_fkey";

-- DropForeignKey
ALTER TABLE "_channel_user" DROP CONSTRAINT "_channel_user_A_fkey";

-- DropForeignKey
ALTER TABLE "_channel_user" DROP CONSTRAINT "_channel_user_B_fkey";

-- DropIndex
DROP INDEX "Friendship_id_key";

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "accepted",
DROP COLUMN "created_at",
DROP COLUMN "user_1_id",
DROP COLUMN "user_2",
ADD COLUMN     "acceptorId" INTEGER NOT NULL,
ADD COLUMN     "initiatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "created_at",
DROP COLUMN "user_1_id",
DROP COLUMN "user_1_score",
DROP COLUMN "user_2",
DROP COLUMN "user_2_score";

-- DropTable
DROP TABLE "Blocked";

-- DropTable
DROP TABLE "Channel";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "_channel_admin";

-- DropTable
DROP TABLE "_channel_blocked";

-- DropTable
DROP TABLE "_channel_user";

-- CreateTable
CREATE TABLE "UserMatch" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "UserMatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserMatch" ADD CONSTRAINT "UserMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMatch" ADD CONSTRAINT "UserMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_acceptorId_fkey" FOREIGN KEY ("acceptorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
