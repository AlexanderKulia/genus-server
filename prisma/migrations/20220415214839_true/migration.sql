/*
  Warnings:

  - Added the required column `sucess` to the `Guess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `success` to the `Search` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guess" ADD COLUMN     "sucess" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Search" ADD COLUMN     "success" BOOLEAN NOT NULL;
