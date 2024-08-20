-- CreateTable
CREATE TABLE `ar_gather_data` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `mark_type` VARCHAR(255) NULL,
    `mark_data` VARCHAR(255) NULL,
    `image_url` VARCHAR(255) NULL,
    `uuid` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baggagetrace` (
    `id` BIGINT NOT NULL,
    `baggage_id` BIGINT NULL,
    `tag10_id` VARCHAR(10) NULL,
    `source_id` VARCHAR(10) NULL,
    `source_airport` VARCHAR(10) NULL,
    `flight_date` DATE NULL,
    `flight_no` VARCHAR(10) NULL,
    `flight_id` BIGINT NULL,
    `uuid` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `config_template` (
    `id` BIGINT NOT NULL,
    `scene_id` BIGINT NOT NULL,
    `type` TINYINT NOT NULL DEFAULT 10,
    `value` TEXT NOT NULL,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_scene_id`(`scene_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cut_data` (
    `id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `image_id` BIGINT NOT NULL,
    `image_batch_relation_id` BIGINT NULL,
    `batch_id` BIGINT NULL,
    `type` INTEGER NULL,
    `all_points_x` VARCHAR(255) NULL,
    `all_points_y` VARCHAR(255) NULL,
    `name` VARCHAR(50) NULL,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `image_index`(`image_id`),
    INDEX `project_index`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_record` (
    `id` BIGINT NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_create_id`(`create_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_record_item` (
    `id` BIGINT NOT NULL,
    `data_record_id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `image_id` BIGINT NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_data_record_id`(`data_record_id`),
    INDEX `idx_image_id`(`image_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_record_log` (
    `id` BIGINT NOT NULL,
    `data_record_id` BIGINT NOT NULL,
    `data_record_item_id` BIGINT NOT NULL,
    `img_id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `relation_img_id` BIGINT NOT NULL,

    INDEX `idx_project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_record_project_relation` (
    `id` BIGINT NOT NULL,
    `data_record_id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,

    INDEX `idx_data_record_id`(`data_record_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detect` (
    `id` BIGINT NOT NULL,
    `model_version_id` BIGINT NULL,
    `project_id` BIGINT NULL,
    `file_url` VARCHAR(100) NULL,
    `status` INTEGER NULL DEFAULT 0,
    `end_time` DATETIME(0) NULL,
    `file_name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `email_config` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `email_key` VARCHAR(255) NULL,
    `company_name` VARCHAR(255) NULL,
    `account` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `email_host` VARCHAR(255) NULL,
    `port` INTEGER NOT NULL,
    `use_ssl` BIT(1) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fun_api` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL,
    `parent_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `request_mode` VARCHAR(255) NULL,
    `url` VARCHAR(255) NULL,
    `remarks` VARCHAR(255) NULL,
    `icon` VARCHAR(255) NULL,
    `category` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `model_version` (
    `id` BIGINT NOT NULL,
    `model_version` VARCHAR(45) NOT NULL,
    `number` INTEGER NOT NULL,
    `end_time` DATETIME(0) NULL,
    `train_process` INTEGER NOT NULL DEFAULT 0,
    `train_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NULL,
    `status` INTEGER NULL DEFAULT 0,
    `project_id` BIGINT NULL,
    `start_date` VARCHAR(45) NULL,
    `last_date` VARCHAR(45) NULL,
    `model_url` VARCHAR(100) NULL,
    `parent_id` BIGINT NULL,
    `describe` VARCHAR(255) NULL,
    `model_name` VARCHAR(100) NOT NULL,
    `epochs` INTEGER NULL,
    `crr_epochs` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `point_data` (
    `id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `image_id` BIGINT NOT NULL,
    `image_batch_relation_id` BIGINT NULL,
    `batch_id` BIGINT NULL,
    `type` INTEGER NULL,
    `cx` INTEGER NULL,
    `cy` INTEGER NULL,
    `name` VARCHAR(50) NULL,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_image_id`(`image_id`),
    INDEX `idx_project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `project_no` VARCHAR(255) NULL,
    `project_name` VARCHAR(255) NULL,
    `config` LONGTEXT NULL,
    `status` INTEGER NOT NULL,
    `remarks` VARCHAR(255) NULL,
    `creator_id` BIGINT NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `last_update_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `category` INTEGER NOT NULL,
    `scene_category` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_ar_config` (
    `id` BIGINT NOT NULL,
    `value` TEXT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_ar_config_0902` (
    `id` BIGINT NOT NULL,
    `screensizefactor` DECIMAL(32, 2) NOT NULL,
    `bundledownloadurl` VARCHAR(100) NULL,
    `darknessbluriteration` INTEGER NOT NULL,
    `bundlestoload` VARCHAR(1024) NOT NULL,
    `shoulddarken` INTEGER NOT NULL DEFAULT 0,
    `darknessfactor` DECIMAL(32, 2) NULL,
    `project_id` BIGINT NOT NULL,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_ar_image` (
    `id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `url` VARCHAR(128) NOT NULL,
    `text` VARCHAR(3200) NULL,
    `is_valid` BOOLEAN NOT NULL DEFAULT false,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_batch` (
    `id` BIGINT NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `project_id` CHAR(1) NOT NULL,
    `create_id` VARCHAR(32) NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` VARCHAR(32) NULL,
    `update_time` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_callout_config` (
    `id` BIGINT NOT NULL,
    `relation_id` BIGINT NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `shortcuts` VARCHAR(32) NULL,
    `type` INTEGER NOT NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 1,
    `parent_id` BIGINT NOT NULL DEFAULT 0,
    `class_id` BIGINT NOT NULL,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_class_id`(`class_id`),
    INDEX `idx_parent_id`(`parent_id`),
    INDEX `idx_relation_id`(`relation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_callout_pattern_relation` (
    `id` BIGINT NOT NULL,
    `callout_config_id` BIGINT NOT NULL,
    `pattern_id` BIGINT NOT NULL,
    `mark_type` INTEGER NOT NULL DEFAULT 0,
    `create_time` DATETIME(0) NOT NULL,

    INDEX `idx_pattern_id_callout_config_id`(`pattern_id`, `callout_config_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_config` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `project_id` BIGINT NOT NULL,
    `notes_config` TEXT NULL,
    `vr_config` TEXT NULL,
    `save_config` TEXT NULL,
    `export_config` TEXT NULL,
    `other_config` TEXT NULL,
    `via_settings` TEXT NULL,
    `via_attributes` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_image` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `project_id` BIGINT NOT NULL,
    `file_url` VARCHAR(255) NULL,
    `file_name` VARCHAR(255) NULL,
    `new_file_name` VARCHAR(255) NULL,
    `size` BIGINT NOT NULL,
    `status` INTEGER NOT NULL,
    `complete_time` DATETIME(0) NULL,
    `user_id` BIGINT NULL,
    `source_video` VARCHAR(255) NULL,
    `height` INTEGER NULL,
    `width` INTEGER NULL,

    INDEX `idx_project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_image_batch_relation` (
    `id` BIGINT NOT NULL,
    `batch_id` BIGINT NOT NULL,
    `image_id` BIGINT NOT NULL,
    `mark_type` INTEGER NOT NULL DEFAULT 0,
    `create_id` VARCHAR(32) NOT NULL,
    `create_time` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_mark_data` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `project_id` BIGINT NOT NULL,
    `data` LONGTEXT NULL,
    `file_url` VARCHAR(255) NULL,
    `file_name` VARCHAR(255) NULL,
    `new_file_name` VARCHAR(255) NULL,
    `size` BIGINT NOT NULL,
    `status` INTEGER NOT NULL,
    `tag` VARCHAR(255) NULL,
    `source_video` VARCHAR(255) NULL,
    `complete_time` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_note` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `project_id` BIGINT NOT NULL,
    `name` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,
    `describe` VARCHAR(255) NULL,
    `text_value` VARCHAR(255) NULL,
    `shortcuts` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_note_attr` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `project_id` BIGINT NOT NULL,
    `notes_id` BIGINT NOT NULL,
    `text` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_scene` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NULL,
    `link_url` VARCHAR(255) NULL,
    `icon` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL,
    `remarks` VARCHAR(255) NULL,
    `update_time` DATETIME(3) NOT NULL,
    `notes` LONGTEXT NULL,
    `config` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_tag` (
    `id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `tag` VARCHAR(30) NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_time` DATETIME(0) NULL,
    `create_id` BIGINT NOT NULL,
    `update_id` BIGINT NULL,

    INDEX `idx_project_id`(`tag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_user` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `project_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_vr_config` (
    `id` BIGINT NOT NULL,
    `value` TEXT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_vr_config_0902` (
    `id` BIGINT NOT NULL,
    `capturedepth` INTEGER NOT NULL,
    `capturergb` INTEGER NOT NULL,
    `capturebbox` INTEGER NOT NULL,
    `decalsize` DECIMAL(32, 2) NOT NULL,
    `positionchangeunits` INTEGER NOT NULL DEFAULT 0,
    `rotationchangeunits` INTEGER NOT NULL,
    `changepercent` INTEGER NOT NULL,
    `changefrequency` INTEGER NOT NULL,
    `randomcols` VARCHAR(1024) NOT NULL,
    `trays` INTEGER NOT NULL,
    `randomtrays` INTEGER NOT NULL,
    `bagtype` INTEGER NOT NULL DEFAULT 0,
    `decalpercent` INTEGER NOT NULL,
    `trayscalefactor` DECIMAL(32, 2) NOT NULL,
    `project_id` BIGINT NOT NULL,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rect_data` (
    `id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `image_id` BIGINT NOT NULL,
    `image_batch_relation_id` BIGINT NULL,
    `batch_id` BIGINT NULL,
    `x` INTEGER NOT NULL,
    `y` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `type` BOOLEAN NOT NULL DEFAULT false,
    `create_id` BIGINT NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `update_id` BIGINT NULL,
    `update_time` DATETIME(0) NULL,

    INDEX `idx_image_id`(`image_id`),
    INDEX `idx_project_id`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NULL,
    `parent_id` BIGINT NOT NULL,
    `order_num` INTEGER NOT NULL,
    `remarks` VARCHAR(255) NULL,
    `create_id` BIGINT NOT NULL,
    `status` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `tag` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_category` (
    `Id` BIGINT NOT NULL AUTO_INCREMENT,
    `CreateTime` DATETIME(3) NOT NULL,
    `Name` VARCHAR(255) NULL,
    `Remarks` VARCHAR(255) NULL,
    `IsDeleted` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_fun_api` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL,
    `role_id` BIGINT NOT NULL,
    `fun_api_id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL,
    `role_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `category_id` BIGINT NOT NULL,
    `business_id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `swagger_config` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `prefix` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `url` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT '2021-10-20 09:54:22.930',
    `CreateTime` DATETIME(3) NOT NULL DEFAULT '2022-03-14 19:08:53.941',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_config` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `code` VARCHAR(255) NULL,
    `val` LONGTEXT NULL,
    `remarks` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `Id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL,
    `no` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `create_id` BIGINT NOT NULL,
    `remarks` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL,
    `trade_name` VARCHAR(255) NULL,
    `team_size` VARCHAR(255) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_invite_code` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL,
    `team_id` BIGINT NOT NULL,
    `category` BIGINT NULL,
    `code` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL,
    `team_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `train` (
    `id` BIGINT NOT NULL,
    `train_project_name` VARCHAR(45) NOT NULL,
    `algorithm_name` VARCHAR(45) NOT NULL,
    `create_time` DATETIME(0) NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `create_id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `train_config` (
    `id` BIGINT NOT NULL,
    `model_version_id` BIGINT NOT NULL,
    `epochs` INTEGER NULL,
    `batch_size` INTEGER NULL,
    `imgsz` INTEGER NULL,
    `resume` INTEGER NULL,
    `adam` INTEGER NULL,
    `lr0` VARCHAR(45) NULL,
    `lrf` VARCHAR(45) NULL,
    `momentum` VARCHAR(45) NULL,
    `weight_decay` VARCHAR(45) NULL,
    `warmup_epochs` VARCHAR(45) NULL,
    `warmup_momentum` VARCHAR(45) NULL,
    `warmup_bias_lr` VARCHAR(45) NULL,
    `hsv_h` VARCHAR(45) NULL,
    `hsv_s` VARCHAR(45) NULL,
    `hsv_v` VARCHAR(45) NULL,
    `degrees` VARCHAR(45) NULL,
    `translate` VARCHAR(45) NULL,
    `scale` VARCHAR(45) NULL,
    `shear` VARCHAR(45) NULL,
    `perspective` VARCHAR(45) NULL,
    `flipud` VARCHAR(45) NULL,
    `fliplr` VARCHAR(45) NULL,
    `data_record_name` VARCHAR(1024) NULL,
    `data_record_ids` TEXT NULL,
    `create_time` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `account` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `tel_num` VARCHAR(255) NULL,
    `true_name` VARCHAR(255) NULL,
    `nick_name` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_copy1` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `account` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `tel_num` VARCHAR(255) NULL,
    `true_name` VARCHAR(255) NULL,
    `nick_name` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_code` (
    `Id` BIGINT NOT NULL AUTO_INCREMENT,
    `CreateTime` DATETIME(3) NOT NULL,
    `Category` INTEGER NOT NULL,
    `Account` VARCHAR(255) NULL,
    `Code` VARCHAR(255) NULL,
    `UseTime` DATETIME(3) NULL,
    `Content` VARCHAR(255) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
