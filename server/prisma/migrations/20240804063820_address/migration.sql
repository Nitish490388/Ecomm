/*
  Warnings:

  - Added the required column `address` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `altPhone` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landmark` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "altPhone" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "landmark" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
