/*
  Warnings:

  - The primary key for the `team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `team` table. All the data in the column will be lost.
  - Added the required column `id` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `team_invite_code` DROP FOREIGN KEY `team_invite_code_team_id_fkey`;

-- DropForeignKey
ALTER TABLE `team_user` DROP FOREIGN KEY `team_user_team_id_fkey`;

-- AlterTable
ALTER TABLE `team` DROP PRIMARY KEY,
    DROP COLUMN `Id`,
    ADD COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `team_invite_code` ADD CONSTRAINT `team_invite_code_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_user` ADD CONSTRAINT `team_user_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
