/*
  Warnings:

  - You are about to drop the column `lasSolve` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lasSolve",
ADD COLUMN     "lastSolve" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'user';
