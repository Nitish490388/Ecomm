/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `Address` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_purchaseId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "purchaseId",
ALTER COLUMN "altPhone" DROP NOT NULL,
ALTER COLUMN "landmark" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "addressId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
