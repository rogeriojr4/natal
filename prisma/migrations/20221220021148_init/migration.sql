-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhoToSend" (
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WhoToSend_senderId_key" ON "WhoToSend"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "WhoToSend_receiverId_key" ON "WhoToSend"("receiverId");

-- AddForeignKey
ALTER TABLE "WhoToSend" ADD CONSTRAINT "WhoToSend_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
