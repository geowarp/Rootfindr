/*
  Warnings:

  - You are about to drop the column `dependentVariableId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `independentVariableId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variableId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_dependentVariableId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_independentVariableId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "dependentVariableId",
DROP COLUMN "independentVariableId",
ADD COLUMN     "variableId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_variableId_fkey" FOREIGN KEY ("variableId") REFERENCES "Variable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
