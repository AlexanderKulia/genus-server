/*
  Warnings:

  - You are about to drop the column `word` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[text]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `text` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Word_word_key";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "word",
ADD COLUMN     "text" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");
