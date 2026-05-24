/*
  Warnings:

  - The primary key for the `Problems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `pid` column on the `Problems` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Testcase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Testcase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `submission` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `problemId` on the `Testcase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `problemId` on the `submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Testcase" DROP CONSTRAINT "Testcase_problemId_fkey";

-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_problemId_fkey";

-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_userId_fkey";

-- AlterTable
ALTER TABLE "Problems" DROP CONSTRAINT "Problems_pkey",
DROP COLUMN "pid",
ADD COLUMN     "pid" SERIAL NOT NULL,
ADD CONSTRAINT "Problems_pkey" PRIMARY KEY ("pid");

-- AlterTable
ALTER TABLE "Testcase" DROP CONSTRAINT "Testcase_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "problemId",
ADD COLUMN     "problemId" INTEGER NOT NULL,
ADD CONSTRAINT "Testcase_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "submission" DROP CONSTRAINT "submission_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "problemId",
ADD COLUMN     "problemId" INTEGER NOT NULL,
ADD CONSTRAINT "submission_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problems"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testcase" ADD CONSTRAINT "Testcase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problems"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;
