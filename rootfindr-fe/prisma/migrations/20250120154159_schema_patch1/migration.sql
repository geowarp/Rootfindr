/*
  Warnings:

  - You are about to drop the column `variableId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `dependentVariableId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independentVariableId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_variableId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "variableId",
ADD COLUMN     "dependentVariableId" INTEGER NOT NULL,
ADD COLUMN     "independentVariableId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Variable" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_dependentVariableId_fkey" FOREIGN KEY ("dependentVariableId") REFERENCES "Variable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_independentVariableId_fkey" FOREIGN KEY ("independentVariableId") REFERENCES "Variable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
