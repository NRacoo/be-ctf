-- DropForeignKey
ALTER TABLE "Solve" DROP CONSTRAINT "Solve_challengeId_fkey";

-- AddForeignKey
ALTER TABLE "Solve" ADD CONSTRAINT "Solve_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
