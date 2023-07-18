-- AlterTable
CREATE SEQUENCE friendship_id_seq;
ALTER TABLE "Friendship" ALTER COLUMN "id" SET DEFAULT nextval('friendship_id_seq');
ALTER SEQUENCE friendship_id_seq OWNED BY "Friendship"."id";
