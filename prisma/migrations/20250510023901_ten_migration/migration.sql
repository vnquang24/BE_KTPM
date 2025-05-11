/*
  Warnings:

  - You are about to drop the column `accountId` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customUserId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER', 'OWNER');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_accountId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "accountId",
ADD COLUMN     "customUserId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CustomUser" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "accountId" TEXT NOT NULL,

    CONSTRAINT "CustomUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomUser_accountId_key" ON "CustomUser"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_phone_key" ON "Account"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "CustomUser" ADD CONSTRAINT "CustomUser_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customUserId_fkey" FOREIGN KEY ("customUserId") REFERENCES "CustomUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
