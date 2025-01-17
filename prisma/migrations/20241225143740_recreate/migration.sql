/*
  Warnings:

  - Made the column `email` on table `verificationtoken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `verificationtoken` MODIFY `email` VARCHAR(191) NOT NULL;
