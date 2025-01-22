-- CreateTable
CREATE TABLE "HypothesisTest" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "statisticalMethodId" INTEGER NOT NULL,
    "result" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HypothesisTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatisticalMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatisticalMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StatisticalMethod_name_key" ON "StatisticalMethod"("name");

-- CreateIndex
CREATE INDEX "VariableEvent_projectId_idx" ON "VariableEvent"("projectId");

-- CreateIndex
CREATE INDEX "VariableEvent_variableId_idx" ON "VariableEvent"("variableId");

-- CreateIndex
CREATE INDEX "VariableEvent_userId_idx" ON "VariableEvent"("userId");

-- AddForeignKey
ALTER TABLE "HypothesisTest" ADD CONSTRAINT "HypothesisTest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HypothesisTest" ADD CONSTRAINT "HypothesisTest_statisticalMethodId_fkey" FOREIGN KEY ("statisticalMethodId") REFERENCES "StatisticalMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
