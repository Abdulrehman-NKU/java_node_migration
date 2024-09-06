/*
  Warnings:

  - Made the column `file_url` on table `project_image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `file_name` on table `project_image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `new_file_name` on table `project_image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `project_image` MODIFY `file_url` VARCHAR(255) NOT NULL,
    MODIFY `file_name` VARCHAR(255) NOT NULL,
    MODIFY `new_file_name` VARCHAR(255) NOT NULL,
    MODIFY `status` INTEGER NOT NULL DEFAULT 1,
    MODIFY `height` INTEGER NULL DEFAULT 0,
    MODIFY `width` INTEGER NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `project_image` ADD CONSTRAINT `project_image_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
