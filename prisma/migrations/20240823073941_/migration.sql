-- AddForeignKey
ALTER TABLE `team_invite_code` ADD CONSTRAINT `team_invite_code_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `team`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_user` ADD CONSTRAINT `team_user_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `team`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_user` ADD CONSTRAINT `team_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
