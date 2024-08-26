-- AddForeignKey
ALTER TABLE `project_tag` ADD CONSTRAINT `project_tag_create_id_fkey` FOREIGN KEY (`create_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_tag` ADD CONSTRAINT `project_tag_update_id_fkey` FOREIGN KEY (`update_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
