/*
  Warnings:

  - Added the required column `ipAddress` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastActive` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "ipAddress" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastActive" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
