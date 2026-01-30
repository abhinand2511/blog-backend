/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageAlt` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Blog` table. All the data in the column will be lost.
  - The `id` column on the `Blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[sanityId]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sanityId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Made the column `author` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pkey",
DROP COLUMN "imageAlt",
DROP COLUMN "imageUrl",
ADD COLUMN     "image" JSONB,
ADD COLUMN     "sanityId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "author" SET NOT NULL,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_sanityId_key" ON "Blog"("sanityId");
