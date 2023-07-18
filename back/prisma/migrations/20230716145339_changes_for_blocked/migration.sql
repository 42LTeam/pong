/*
  Warnings:

  - You are about to drop the column `blockeeId` on the `Block` table. All the data in the column will be lost.
  - Added the required column `blockedId` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blockeeId_fkey";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "blockeeId",
ADD COLUMN     "blockedId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
