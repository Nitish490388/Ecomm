/*
  Warnings:

  - You are about to drop the column `picture` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `urlName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_productId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserTokens" DROP CONSTRAINT "UserTokens_userId_fkey";

-- DropIndex
DROP INDEX "Product_urlName_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "picture",
DROP COLUMN "urlName";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "UserTokens";

-- CreateTable
CREATE TABLE "Images" (
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("publicId")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
