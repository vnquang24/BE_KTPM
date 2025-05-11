/*
  Warnings:

  - You are about to drop the `Commune` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coordinate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DataField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DataFieldOnDisaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DisasterType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmergencyLevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PriorityLevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RescueType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RescueTypeOnDisaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommuneToDisaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DisasterToDistrict` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DisasterToProvince` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DisasterToZone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermissionToUserGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToUserGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Commune" DROP CONSTRAINT "Commune_districtId_fkey";

-- DropForeignKey
ALTER TABLE "DataFieldOnDisaster" DROP CONSTRAINT "DataFieldOnDisaster_dataFieldId_fkey";

-- DropForeignKey
ALTER TABLE "DataFieldOnDisaster" DROP CONSTRAINT "DataFieldOnDisaster_disasterId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_userId_fkey";

-- DropForeignKey
ALTER TABLE "Disaster" DROP CONSTRAINT "Disaster_coordinateId_fkey";

-- DropForeignKey
ALTER TABLE "Disaster" DROP CONSTRAINT "Disaster_disasterTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Disaster" DROP CONSTRAINT "Disaster_emergencyLevelId_fkey";

-- DropForeignKey
ALTER TABLE "Disaster" DROP CONSTRAINT "Disaster_priorityLevelId_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_coordinatesId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_disasterId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_userId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "RescueTypeOnDisaster" DROP CONSTRAINT "RescueTypeOnDisaster_disasterId_fkey";

-- DropForeignKey
ALTER TABLE "RescueTypeOnDisaster" DROP CONSTRAINT "RescueTypeOnDisaster_rescueTypeId_fkey";

-- DropForeignKey
ALTER TABLE "RescueTypeOnDisaster" DROP CONSTRAINT "RescueTypeOnDisaster_unitId_fkey";

-- DropForeignKey
ALTER TABLE "_CommuneToDisaster" DROP CONSTRAINT "_CommuneToDisaster_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommuneToDisaster" DROP CONSTRAINT "_CommuneToDisaster_B_fkey";

-- DropForeignKey
ALTER TABLE "_DisasterToDistrict" DROP CONSTRAINT "_DisasterToDistrict_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisasterToDistrict" DROP CONSTRAINT "_DisasterToDistrict_B_fkey";

-- DropForeignKey
ALTER TABLE "_DisasterToProvince" DROP CONSTRAINT "_DisasterToProvince_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisasterToProvince" DROP CONSTRAINT "_DisasterToProvince_B_fkey";

-- DropForeignKey
ALTER TABLE "_DisasterToZone" DROP CONSTRAINT "_DisasterToZone_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisasterToZone" DROP CONSTRAINT "_DisasterToZone_B_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUserGroup" DROP CONSTRAINT "_PermissionToUserGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUserGroup" DROP CONSTRAINT "_PermissionToUserGroup_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserToUserGroup" DROP CONSTRAINT "_UserToUserGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToUserGroup" DROP CONSTRAINT "_UserToUserGroup_B_fkey";

-- DropTable
DROP TABLE "Commune";

-- DropTable
DROP TABLE "Coordinate";

-- DropTable
DROP TABLE "DataField";

-- DropTable
DROP TABLE "DataFieldOnDisaster";

-- DropTable
DROP TABLE "Device";

-- DropTable
DROP TABLE "Disaster";

-- DropTable
DROP TABLE "DisasterType";

-- DropTable
DROP TABLE "District";

-- DropTable
DROP TABLE "EmergencyLevel";

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "PriorityLevel";

-- DropTable
DROP TABLE "Province";

-- DropTable
DROP TABLE "RefreshToken";

-- DropTable
DROP TABLE "RescueType";

-- DropTable
DROP TABLE "RescueTypeOnDisaster";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserGroup";

-- DropTable
DROP TABLE "Zone";

-- DropTable
DROP TABLE "_CommuneToDisaster";

-- DropTable
DROP TABLE "_DisasterToDistrict";

-- DropTable
DROP TABLE "_DisasterToProvince";

-- DropTable
DROP TABLE "_DisasterToZone";

-- DropTable
DROP TABLE "_PermissionToUserGroup";

-- DropTable
DROP TABLE "_UserToUserGroup";

-- DropEnum
DROP TYPE "MediaType";

-- DropEnum
DROP TYPE "PermissionName";

-- DropEnum
DROP TYPE "PermissionType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "dateOfBirth" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "ranking" TEXT,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "ranking" TEXT,
    "location" TEXT NOT NULL,
    "fieldDescription" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubField" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "ranking" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "haveToPayFirst" BOOLEAN NOT NULL,
    "subfieldDescription" TEXT,
    "fieldId" TEXT NOT NULL,

    CONSTRAINT "SubField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "date" TIMESTAMP(3) NOT NULL,
    "beginTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "payDate" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "status" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "subfieldId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL,
    "text" TEXT,
    "bookingId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_accountId_key" ON "Owner"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_bookingId_key" ON "Review"("bookingId");

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubField" ADD CONSTRAINT "SubField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_subfieldId_fkey" FOREIGN KEY ("subfieldId") REFERENCES "SubField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
