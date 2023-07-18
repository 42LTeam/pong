-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "recv_id" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "secretO2FA" DROP NOT NULL;

-- RenameForeignKey
ALTER TABLE "Message" RENAME CONSTRAINT "user_message" TO "Message_userId_fkey";
