-- AlterEnum
ALTER TYPE "PermissionName" ADD VALUE 'RescueTypeOnDisaster';

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "ipAddress" DROP NOT NULL,
ALTER COLUMN "lastActive" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;
