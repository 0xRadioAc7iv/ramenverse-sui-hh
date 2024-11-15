"use client";

import { Scene } from "phaser";

export class LoadingScene extends Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    // Loading Assets for the Loading Screen
    this.load.image("loading_bg", "/loading_background.png");
    this.load.image("loading_title", "/loading_title_2.png");
    this.load.image("loading_cloud_right", "/loading_cloud_right.png");
    this.load.image("loading_cloud_left", "/loading_cloud_left.png");
    this.load.image("loading_loading_button", "/loading_loading_button.png");
    this.load.image(
      "loading_ramen_left_to_right",
      "/loading_ramen_left_to_right.png"
    );
    this.load.image(
      "loading_ramen_right_to_left",
      "/loading_ramen_right_to_left.png"
    );

    // Loading Assets for the Main Screen
    this.load.image("main_floor", "/main_floor.png");
    this.load.image("main_side_seat", "/main_side_seat.png");
    this.load.image("main_table_seat", "/main_table_seat.png");
    this.load.image("main_cats_table", "/main_cats_table.png");
    this.load.image("main_ramen_table", "/main_ramen_table.png");

    this.load.image("add_bowl_button", "/main_add_bowl_button.png");

    this.load.image(
      "main_ramen_bowl_bg",
      "/main_main_ramen_bowl_background.png"
    );
    this.load.image(
      "main_current_gem_amount_bg",
      "/main_current_gem_amount_background.png"
    );

    this.load.image("ramen_lvl_1", "/main_ramen_level_1.png");
    this.load.image("ramen_lvl_2", "/main_ramen_level_2.png");
    this.load.image("ramen_lvl_3", "/main_ramen_level_3.png");
    this.load.image("ramen_lvl_4", "/main_ramen_level_4.png");
    this.load.image("ramen_lvl_5", "/main_ramen_level_5.png");
    this.load.image("ramen_lvl_6", "/main_ramen_level_6.png");
    this.load.image("ramen_lvl_7", "/main_ramen_level_7.png");
    this.load.image("ramen_lvl_8", "/main_ramen_level_8.png");

    this.load.image("effect_ramen_upgrade", "/effect_ramen_upgrade.png");

    this.load.image("cat_gray", "/cats/cat_gray.png");
    this.load.image("cat_off_white", "/cats/cat_off_white.png");
    this.load.image("cat_white", "/cats/cat_white.png");
    this.load.image("cat_yellow", "/cats/cat_yellow.png");
    this.load.image("cat_small_cute_cat", "/main_cute_small_cat.png");

    this.load.image(
      "ramen_upgrade_modal_lvl_2",
      "/main_ramen_upgrade_modal_lvl_2.png"
    );
    this.load.image(
      "ramen_upgrade_modal_lvl_3",
      "/main_ramen_upgrade_modal_lvl_3.png"
    );
    this.load.image(
      "ramen_upgrade_modal_lvl_4",
      "/main_ramen_upgrade_modal_lvl_4.png"
    );
    this.load.image(
      "ramen_upgrade_modal_lvl_5",
      "/main_ramen_upgrade_modal_lvl_5.png"
    );
    this.load.image(
      "ramen_upgrade_modal_lvl_6",
      "/main_ramen_upgrade_modal_lvl_6.png"
    );
    this.load.image(
      "ramen_upgrade_modal_lvl_7",
      "/main_ramen_upgrade_modal_lvl_7.png"
    );
    this.load.image(
      "ramen_upgrade_modal_lvl_8",
      "/main_ramen_upgrade_modal_lvl_8.png"
    );

    // Loading Assets for the Shop Screen
    this.load.image("shop_title", "/shop_title.png");
    this.load.image("active_shop_button", "/shop_active_shop_button.png");
    this.load.image("shop_theme_yellow", "/shop_theme_yellow.png");
    this.load.image("shop_theme_red", "/shop_theme_red.png");

    // Loading Assets for the Earn/Stake Screen
    this.load.image("earn_title", "/earn_title.png");
    this.load.image("active_earn_button", "/earn_active_earn_button.png");
    this.load.image("earn_protocol_1", "/earn_protocol_1.png");
    this.load.image("earn_protocol_2", "/earn_protocol_2.png");
    this.load.image("staking_button", "/stake_staking_button.png");

    // Loading Common Assets
    this.load.image("inactive_earn_button", "/common_inactive_earn_button.png");
    this.load.image("inactive_shop_button", "/common_inactive_shop_button.png");
    this.load.image("play_button", "/common_play_button.png");
    this.load.image("gem", "/common_gem.png");

    // Global Variables
    this.registry.set("currentMainRamenLevel", 1);
    this.registry.set("maxRamenLevelReached", 1);
    this.registry.set("gems", 10000);
  }

  create() {
    this.add.image(192, 293, "loading_bg").setScale(0.5, 0.5);

    const CLOUD_RIGHT = this.add
      .image(375, 42, "loading_cloud_right")
      .setScale(0.5, 0.5);

    this.add.image(192, 100, "loading_title").setScale(0.5, 0.5);

    const CLOUD_LEFT = this.add
      .image(100, 160, "loading_cloud_left")
      .setScale(0.5, 0.5);

    this.add.image(192, 530, "loading_loading_button").setScale(0.5, 0.5);

    const RAMEN_LEFT_TO_RIGHT = this.add
      .image(-50, 360, "loading_ramen_left_to_right")
      .setScale(0.45, 0.45);

    const RAMEN_RIGHT_TO_LEFT = this.add
      .image(450, 240, "loading_ramen_right_to_left")
      .setScale(0.45, 0.45);

    this.tweens.add({
      targets: CLOUD_RIGHT,
      y: "+=20",
      duration: 1200,
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: CLOUD_LEFT,
      y: "-=20",
      duration: 1200,
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });

    // Moves Ramens from Left to Right
    this.tweens.add({
      targets: RAMEN_LEFT_TO_RIGHT,
      x: 300,
      y: 400,
      duration: 5000,
      ease: "Linear",
    });

    // Moves Ramens from Right to Left
    this.tweens.add({
      targets: RAMEN_RIGHT_TO_LEFT,
      x: 100,
      y: 300,
      duration: 5000,
      ease: "Linear",
    });

    // this.scene.start("MainScene");

    this.time.delayedCall(4000, () => {
      this.scene.start("MainScene");
    });
  }
}
