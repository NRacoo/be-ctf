/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Challenge_id_key" ON "Challenge"("id");
