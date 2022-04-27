/*
  Warnings:

  - Added the required column `genus` to the `Guess` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genus" AS ENUM ('der', 'die', 'das');

-- AlterTable
ALTER TABLE "Guess" ADD COLUMN     "genus" "Genus" NOT NULL;
