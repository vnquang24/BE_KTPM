/*
  Warnings:

  - Added the required column `unitOfTime` to the `SubField` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Account_email_key";

-- DropIndex
DROP INDEX "Account_phone_key";

-- AlterTable
ALTER TABLE "SubField" ADD COLUMN     "unitOfTime" TEXT NOT NULL;
