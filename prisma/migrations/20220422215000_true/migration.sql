/*
  Warnings:

  - You are about to drop the column `sucess` on the `Guess` table. All the data in the column will be lost.
  - Added the required column `success` to the `Guess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Guess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guess" DROP COLUMN "sucess",
ADD COLUMN     "success" BOOLEAN NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
