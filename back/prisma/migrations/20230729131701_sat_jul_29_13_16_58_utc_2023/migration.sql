/*
  Warnings:

  - Added the required column `targetId` to the `UserFriendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserFriendship" DROP CONSTRAINT "UserFriendship_senderId_fkey";

-- AlterTable
ALTER TABLE "UserFriendship" ADD COLUMN     "targetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserFriendship" ADD CONSTRAINT "UserFriendship_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
