/*
  Warnings:

  - You are about to drop the `Clip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `awsKey` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_recordingId_fkey";

-- AlterTable
ALTER TABLE "Recording" ADD COLUMN     "awsKey" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Clip";
