/*
  Warnings:

  - Added the required column `purchaseId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Address_userId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "purchaseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
