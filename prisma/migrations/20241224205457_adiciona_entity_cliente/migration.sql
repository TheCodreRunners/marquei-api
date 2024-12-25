/*
  Warnings:

  - You are about to drop the `Recording` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recording" DROP CONSTRAINT "Recording_courtId_fkey";

-- DropTable
DROP TABLE "Recording";

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "courtId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "awsKey" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
