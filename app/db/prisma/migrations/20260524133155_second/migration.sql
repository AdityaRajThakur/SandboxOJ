-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('C', 'CPP', 'JAVA');

-- CreateEnum
CREATE TYPE "verdict" AS ENUM ('AC', 'WA', 'TLE');

-- CreateTable
CREATE TABLE "submission" (
    "id" TEXT NOT NULL,
    "verdict" "verdict" NOT NULL,
    "userId" TEXT NOT NULL,
    "language" "Lang" NOT NULL,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
