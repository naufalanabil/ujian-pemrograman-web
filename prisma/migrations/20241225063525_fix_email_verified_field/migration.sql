/*
  Warnings:

  - You are about to drop the column `emalVerified` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `emalVerified`,
    ADD COLUMN `emailVerified` VARCHAR(191) NULL;
