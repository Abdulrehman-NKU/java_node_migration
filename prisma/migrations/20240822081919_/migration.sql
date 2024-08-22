-- AddForeignKey
ALTER TABLE `project_user` ADD CONSTRAINT `project_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
