-- CreateTable
CREATE TABLE "_UserReadedMessages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserReadedMessages_AB_unique" ON "_UserReadedMessages"("A", "B");

-- CreateIndex
CREATE INDEX "_UserReadedMessages_B_index" ON "_UserReadedMessages"("B");

-- AddForeignKey
ALTER TABLE "_UserReadedMessages" ADD CONSTRAINT "_UserReadedMessages_A_fkey" FOREIGN KEY ("A") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserReadedMessages" ADD CONSTRAINT "_UserReadedMessages_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
