/*
  Warnings:

  - You are about to drop the column `problemId` on the `submission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_problemId_fkey";

-- AlterTable
ALTER TABLE "submission" DROP COLUMN "problemId",
ADD COLUMN     "output" TEXT NOT NULL DEFAULT '';
