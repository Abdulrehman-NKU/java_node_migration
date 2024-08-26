/*
  Warnings:

  - Made the column `update_time` on table `config_template` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `cut_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `data_record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `data_record_item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `point_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `project_ar_config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `project_ar_config_0902` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `project_ar_image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `project_batch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `project_callout_config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `project_tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `project_vr_config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `project_vr_config_0902` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `rect_data` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `config_template` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `cut_data` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `data_record` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `data_record_item` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `point_data` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project_ar_config` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project_ar_config_0902` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project_ar_image` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project_batch` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project_callout_config` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project_scene` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project_tag` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project_vr_config` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project_vr_config_0902` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `rect_data` MODIFY `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
