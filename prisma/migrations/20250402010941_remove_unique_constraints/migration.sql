/*
  Warnings:

  - A unique constraint covering the columns `[id_commune]` on the table `Commune` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_district]` on the table `District` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_province]` on the table `Province` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_commune` to the `Commune` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_district` to the `District` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_province` to the `Province` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Commune_name_districtId_key";

-- DropIndex
DROP INDEX "Commune_name_key";

-- DropIndex
DROP INDEX "District_name_provinceId_key";

-- DropIndex
DROP INDEX "Province_name_key";

-- AlterTable
ALTER TABLE "Commune" ADD COLUMN     "id_commune" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "District" ADD COLUMN     "id_district" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Province" ADD COLUMN     "id_province" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Commune_id_commune_key" ON "Commune"("id_commune");

-- CreateIndex
CREATE UNIQUE INDEX "District_id_district_key" ON "District"("id_district");

-- CreateIndex
CREATE UNIQUE INDEX "Province_id_province_key" ON "Province"("id_province");
