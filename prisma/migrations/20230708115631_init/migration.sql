-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "accesscode" TEXT NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userBase" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "country" INTEGER NOT NULL DEFAULT 1,
    "store" INTEGER NOT NULL DEFAULT 0,
    "team_id" INTEGER NOT NULL DEFAULT 0,
    "total_play" INTEGER NOT NULL DEFAULT 0,
    "daily_play" INTEGER NOT NULL DEFAULT 0,
    "day_play" INTEGER NOT NULL DEFAULT 0,
    "mileage" INTEGER NOT NULL DEFAULT 0,
    "asset_version" INTEGER NOT NULL DEFAULT 0,
    "last_played_date" INTEGER NOT NULL DEFAULT 0,
    "mytitle_id" INTEGER NOT NULL DEFAULT 0,
    "mytitle_efffect_id" INTEGER NOT NULL DEFAULT 0,
    "sticker_id" INTEGER NOT NULL DEFAULT 0,
    "sticker_effect_id" INTEGER NOT NULL DEFAULT 0,
    "papercup_id" INTEGER NOT NULL DEFAULT 0,
    "tachometer_id" INTEGER NOT NULL DEFAULT 0,
    "aura_id" INTEGER NOT NULL DEFAULT 0,
    "aura_color_id" INTEGER NOT NULL DEFAULT 0,
    "aura_line_id" INTEGER NOT NULL DEFAULT 0,
    "bgm_id" INTEGER NOT NULL DEFAULT 0,
    "keyholder_id" INTEGER NOT NULL DEFAULT 0,
    "start_menu_bg_id" INTEGER NOT NULL DEFAULT 0,
    "use_car_id" INTEGER NOT NULL DEFAULT 0,
    "use_style_car_id" INTEGER NOT NULL DEFAULT 0,
    "bothwin_count" INTEGER NOT NULL DEFAULT 0,
    "bothwin_score" INTEGER NOT NULL DEFAULT 0,
    "subcard_count" INTEGER NOT NULL DEFAULT 0,
    "vs_history" INTEGER NOT NULL DEFAULT 0,
    "stamp_key_assign_0" INTEGER NOT NULL DEFAULT 0,
    "stamp_key_assign_1" INTEGER NOT NULL DEFAULT 1,
    "stamp_key_assign_2" INTEGER NOT NULL DEFAULT 2,
    "stamp_key_assign_3" INTEGER NOT NULL DEFAULT 3,
    "name_change_category" INTEGER NOT NULL DEFAULT 0,
    "factory_disp" INTEGER NOT NULL DEFAULT 0,
    "create_date" INTEGER NOT NULL DEFAULT 0,
    "cash" INTEGER NOT NULL DEFAULT 0,
    "dressup_point" INTEGER NOT NULL DEFAULT 0,
    "avatar_point" INTEGER NOT NULL DEFAULT 0,
    "total_cash" INTEGER NOT NULL DEFAULT 0,
    "store_name" TEXT NOT NULL DEFAULT 'Bayshore',
    "have_car_cnt" INTEGER NOT NULL DEFAULT 0,
    "use_ticket" INTEGER NOT NULL DEFAULT 0,
    "mode_rank_data_dbid" INTEGER NOT NULL,
    "fulltune_count" INTEGER NOT NULL DEFAULT 0,
    "total_car_parts_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "userBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modeRank" (
    "id" SERIAL NOT NULL,
    "story_rank_exp" INTEGER NOT NULL DEFAULT 0,
    "story_rank" INTEGER NOT NULL DEFAULT 1,
    "time_trial_rank_exp" INTEGER NOT NULL DEFAULT 0,
    "time_trial_rank" INTEGER NOT NULL DEFAULT 1,
    "online_battle_rank_exp" INTEGER NOT NULL DEFAULT 500,
    "online_battle_rank" INTEGER NOT NULL DEFAULT 1,
    "store_battle_rank_exp" INTEGER NOT NULL DEFAULT 0,
    "store_battle_rank" INTEGER NOT NULL DEFAULT 1,
    "theory_exp" INTEGER NOT NULL DEFAULT 0,
    "theory_rank" INTEGER NOT NULL DEFAULT 1,
    "pride_group_id" INTEGER NOT NULL DEFAULT 1,
    "pride_point" INTEGER NOT NULL DEFAULT 0,
    "grade_exp" INTEGER NOT NULL DEFAULT 0,
    "grade" INTEGER NOT NULL DEFAULT 1,
    "grade_reward_dist" INTEGER NOT NULL DEFAULT 1,
    "story_rank_reward_dist" INTEGER NOT NULL DEFAULT 0,
    "time_trial_rank_reward_dist" INTEGER NOT NULL DEFAULT 0,
    "online_battle_rank_reward_dist" INTEGER NOT NULL DEFAULT 0,
    "store_battle_rank_reward_dist" INTEGER NOT NULL DEFAULT 0,
    "theory_rank_reward_dist" INTEGER NOT NULL DEFAULT 0,
    "max_attained_online_battle_rank" INTEGER NOT NULL DEFAULT 1,
    "max_attained_pride_point" INTEGER NOT NULL DEFAULT 0,
    "is_last_max" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "modeRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "id" SERIAL NOT NULL,
    "sex" INTEGER NOT NULL DEFAULT 0,
    "face" INTEGER NOT NULL DEFAULT 0,
    "eye" INTEGER NOT NULL DEFAULT 0,
    "mouth" INTEGER NOT NULL DEFAULT 0,
    "hair" INTEGER NOT NULL DEFAULT 0,
    "glasses" INTEGER NOT NULL DEFAULT 0,
    "face_accessory" INTEGER NOT NULL DEFAULT 0,
    "body" INTEGER NOT NULL DEFAULT 0,
    "body_accessory" INTEGER NOT NULL DEFAULT 0,
    "behind" INTEGER NOT NULL DEFAULT 0,
    "bg" INTEGER NOT NULL DEFAULT 0,
    "effect" INTEGER NOT NULL DEFAULT 0,
    "special" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL,
    "style_car_id" INTEGER NOT NULL,
    "color" INTEGER NOT NULL,
    "bureau" INTEGER NOT NULL,
    "kana" INTEGER NOT NULL,
    "s_no" INTEGER NOT NULL,
    "l_no" INTEGER NOT NULL,
    "car_flag" INTEGER NOT NULL,
    "tune_point" INTEGER NOT NULL,
    "tune_level" INTEGER NOT NULL DEFAULT 16,
    "tune_parts" INTEGER NOT NULL DEFAULT 131068,
    "infinity_tune" INTEGER NOT NULL DEFAULT 0,
    "online_vs_win" INTEGER NOT NULL DEFAULT 0,
    "pickup_seq" INTEGER NOT NULL DEFAULT 0,
    "purchase_seq" INTEGER NOT NULL DEFAULT 0,
    "color_stock_list" TEXT NOT NULL,
    "color_stock_new_list" TEXT NOT NULL,
    "parts_stock_list" TEXT NOT NULL,
    "parts_stock_new_list" TEXT NOT NULL,
    "parts_set_equip_list" TEXT NOT NULL,
    "use_count" INTEGER NOT NULL DEFAULT 0,
    "story_use_count" INTEGER NOT NULL DEFAULT 0,
    "timetrial_use_count" INTEGER NOT NULL DEFAULT 0,
    "vs_use_count" INTEGER NOT NULL DEFAULT 0,
    "net_vs_use_count" INTEGER NOT NULL DEFAULT 0,
    "theory_use_count" INTEGER NOT NULL DEFAULT 0,
    "car_mileage" INTEGER NOT NULL DEFAULT 0,
    "parts_list" INTEGER[],
    "equip_parts_count" INTEGER NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "story_type" INTEGER NOT NULL,
    "chapter" INTEGER NOT NULL,
    "loop_count" INTEGER NOT NULL,

    CONSTRAINT "story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storyCourse" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "storyCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storyEpisode" (
    "id" SERIAL NOT NULL,
    "story_id" INTEGER NOT NULL,
    "episode" INTEGER NOT NULL,
    "play_status" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "play_count" INTEGER NOT NULL,
    "clear_count" INTEGER NOT NULL,
    "play_score" INTEGER NOT NULL,

    CONSTRAINT "storyEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "mytitle_list" TEXT,
    "mytitle_new_list" TEXT,
    "avatar_face_list" TEXT NOT NULL,
    "avatar_face_new_list" TEXT NOT NULL,
    "avatar_eye_list" TEXT NOT NULL,
    "avatar_eye_new_list" TEXT NOT NULL,
    "avatar_hair_list" TEXT NOT NULL,
    "avatar_hair_new_list" TEXT NOT NULL,
    "avatar_body_list" TEXT NOT NULL,
    "avatar_body_new_list" TEXT NOT NULL,
    "avatar_mouth_list" TEXT NOT NULL,
    "avatar_mouth_new_list" TEXT NOT NULL,
    "avatar_glasses_list" TEXT NOT NULL,
    "avatar_glasses_new_list" TEXT NOT NULL,
    "avatar_face_accessory_list" TEXT NOT NULL,
    "avatar_face_accessory_new_list" TEXT NOT NULL,
    "avatar_body_accessory_list" TEXT NOT NULL,
    "avatar_body_accessory_new_list" TEXT NOT NULL,
    "avatar_behind_list" TEXT NOT NULL,
    "avatar_behind_new_list" TEXT NOT NULL,
    "avatar_bg_list" TEXT NOT NULL,
    "avatar_bg_new_list" TEXT NOT NULL,
    "avatar_effect_list" TEXT NOT NULL,
    "avatar_effect_new_list" TEXT NOT NULL,
    "avatar_special_list" TEXT NOT NULL,
    "avatar_special_new_list" TEXT NOT NULL,
    "stamp_list" TEXT,
    "stamp_new_list" TEXT,
    "keyholder_list" TEXT,
    "keyholder_new_list" TEXT,
    "papercup_list" TEXT,
    "papercup_new_list" TEXT,
    "tachometer_list" TEXT,
    "tachometer_new_list" TEXT,
    "aura_list" TEXT,
    "aura_new_list" TEXT,
    "aura_color_list" TEXT,
    "aura_color_new_list" TEXT,
    "aura_line_list" TEXT,
    "aura_line_new_list" TEXT,
    "bgm_list" TEXT,
    "bgm_new_list" TEXT,
    "dx_color_list" TEXT,
    "dx_color_new_list" TEXT,
    "start_menu_bg_list" TEXT,
    "start_menu_bg_new_list" TEXT,
    "under_neon_list" TEXT,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mission" (
    "id" SERIAL NOT NULL,
    "mission_id" INTEGER NOT NULL DEFAULT 0,
    "achieve_flag" INTEGER NOT NULL DEFAULT 0,
    "received_flag" INTEGER NOT NULL DEFAULT 0,
    "update_dt" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toppatuEvent" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL DEFAULT 0,
    "count1" INTEGER NOT NULL DEFAULT 0,
    "count2" INTEGER NOT NULL DEFAULT 0,
    "count3" INTEGER NOT NULL DEFAULT 0,
    "accept_flag" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "toppatuEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL DEFAULT 0,
    "active_event_id" INTEGER NOT NULL DEFAULT 0,
    "dialog_show_date" INTEGER NOT NULL DEFAULT 0,
    "show_start_dialog_flag" INTEGER NOT NULL DEFAULT 1,
    "show_progress_dialog_flag" INTEGER NOT NULL DEFAULT 1,
    "show_end_dialog_flag" INTEGER NOT NULL DEFAULT 1,
    "end_event_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loginBonus" (
    "id" SERIAL NOT NULL,
    "gacha_id" INTEGER NOT NULL DEFAULT 0,
    "gacha_item_id" INTEGER NOT NULL DEFAULT 0,
    "category" INTEGER NOT NULL DEFAULT 0,
    "type" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "loginBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frozen" (
    "id" SERIAL NOT NULL,
    "frozen_status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "frozen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penalty" (
    "id" SERIAL NOT NULL,
    "penalty_flag" INTEGER NOT NULL DEFAULT 0,
    "penalty_2_level" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "penalty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config" (
    "id" SERIAL NOT NULL,
    "steering_intensity" INTEGER NOT NULL DEFAULT 4,
    "transmission_type" INTEGER NOT NULL DEFAULT 0,
    "default_viewpoint" INTEGER NOT NULL DEFAULT 1,
    "favorite_bgm" INTEGER NOT NULL DEFAULT 0,
    "bgm_volume" INTEGER NOT NULL DEFAULT 7,
    "se_volume" INTEGER NOT NULL DEFAULT 7,
    "master_volume" INTEGER NOT NULL DEFAULT 7,
    "store_battle_policy" INTEGER NOT NULL DEFAULT 0,
    "battle_onomatope_display" INTEGER NOT NULL DEFAULT 1,
    "cornering_guide" INTEGER NOT NULL DEFAULT 1,
    "minimap" INTEGER NOT NULL DEFAULT 2,
    "line_guide" INTEGER NOT NULL DEFAULT 1,
    "ghost" INTEGER NOT NULL DEFAULT 0,
    "race_exit" INTEGER NOT NULL DEFAULT 1,
    "result_skip" INTEGER NOT NULL DEFAULT 0,
    "stamp_select_skip" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "ticket_cnt" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stampEvent" (
    "id" SERIAL NOT NULL,
    "m_stamp_event_id" INTEGER NOT NULL,
    "stamp_masu" INTEGER NOT NULL DEFAULT 0,
    "daily_bonus" INTEGER NOT NULL DEFAULT 0,
    "weekly_bonus" INTEGER NOT NULL DEFAULT 0,
    "total_bonus" INTEGER NOT NULL DEFAULT 0,
    "day_total_bonus" INTEGER NOT NULL DEFAULT 0,
    "store_battle_bonus" INTEGER NOT NULL DEFAULT 0,
    "story_bonus" INTEGER NOT NULL DEFAULT 0,
    "online_battle_bonus" INTEGER NOT NULL DEFAULT 0,
    "timetrial_bonus" INTEGER NOT NULL DEFAULT 0,
    "fasteststreetlegaltheory_bonus" INTEGER NOT NULL DEFAULT 0,
    "collaboration_bonus" INTEGER NOT NULL DEFAULT 0,
    "add_bonus_daily_flag_1" INTEGER NOT NULL DEFAULT 0,
    "add_bonus_daily_flag_2" INTEGER NOT NULL DEFAULT 0,
    "add_bonus_daily_flag_3" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "stampEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_accesscode_key" ON "user"("accesscode");

-- CreateIndex
CREATE UNIQUE INDEX "userBase_mode_rank_data_dbid_key" ON "userBase"("mode_rank_data_dbid");

-- AddForeignKey
ALTER TABLE "userBase" ADD CONSTRAINT "userBase_mode_rank_data_dbid_fkey" FOREIGN KEY ("mode_rank_data_dbid") REFERENCES "modeRank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story" ADD CONSTRAINT "story_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storyCourse" ADD CONSTRAINT "storyCourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storyEpisode" ADD CONSTRAINT "storyEpisode_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
