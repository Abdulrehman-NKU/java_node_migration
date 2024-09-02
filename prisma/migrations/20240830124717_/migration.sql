-- AddForeignKey
ALTER TABLE `role_fun_api` ADD CONSTRAINT `role_fun_api_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_fun_api` ADD CONSTRAINT `role_fun_api_fun_api_id_fkey` FOREIGN KEY (`fun_api_id`) REFERENCES `fun_api`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
