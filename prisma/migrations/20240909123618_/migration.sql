-- AlterTable
ALTER TABLE `config_template` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `cut_data` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `data_record` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `data_record_item` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `point_data` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project` ALTER COLUMN `last_update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project_ar_config` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project_ar_config_0902` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project_ar_image` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project_batch` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project_callout_config` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project_scene` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project_tag` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project_vr_config` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `project_vr_config_0902` ALTER COLUMN `update_time` DROP DEFAULT;

-- AlterTable
ALTER TABLE `rect_data` ALTER COLUMN `update_time` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `cut_data` ADD CONSTRAINT `cut_data_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `project_image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `point_data` ADD CONSTRAINT `point_data_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `project_image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rect_data` ADD CONSTRAINT `rect_data_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `project_image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
