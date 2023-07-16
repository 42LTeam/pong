/*
  Warnings:

  - The primary key for the `Channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_count` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `user_1` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the `Friends` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message_Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message_Private` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_1_id` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE channel_id_seq;
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_pkey",
DROP COLUMN "id_count",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('channel_id_seq'),
ADD CONSTRAINT "Channel_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE channel_id_seq OWNED BY "Channel"."id";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "user_1",
ADD COLUMN     "user_1_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Friends";

-- DropTable
DROP TABLE "Message_Channel";

-- DropTable
DROP TABLE "Message_Private";

-- CreateTable
CREATE TABLE "Friendship" (
    "id" INTEGER NOT NULL,
    "user_1_id" INTEGER NOT NULL,
    "user_2" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blocked" (
    "id" INTEGER NOT NULL,
    "user_1_id" INTEGER NOT NULL,
    "user_2" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blocked_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_channel_admin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_channel_blocked" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_channel_user" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_id_key" ON "Friendship"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Blocked_id_key" ON "Blocked"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_channel_admin_AB_unique" ON "_channel_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_channel_admin_B_index" ON "_channel_admin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_channel_blocked_AB_unique" ON "_channel_blocked"("A", "B");

-- CreateIndex
CREATE INDEX "_channel_blocked_B_index" ON "_channel_blocked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_channel_user_AB_unique" ON "_channel_user"("A", "B");

-- CreateIndex
CREATE INDEX "_channel_user_B_index" ON "_channel_user"("B");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user_1_id_fkey" FOREIGN KEY ("user_1_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocked" ADD CONSTRAINT "Blocked_user_1_id_fkey" FOREIGN KEY ("user_1_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_user_1_id_fkey" FOREIGN KEY ("user_1_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "user_message" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channel_admin" ADD CONSTRAINT "_channel_admin_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channel_admin" ADD CONSTRAINT "_channel_admin_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channel_blocked" ADD CONSTRAINT "_channel_blocked_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channel_blocked" ADD CONSTRAINT "_channel_blocked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channel_user" ADD CONSTRAINT "_channel_user_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_channel_user" ADD CONSTRAINT "_channel_user_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
