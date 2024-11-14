"use client";

import { Scene } from "phaser";

export class LoadingScene extends Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
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

    this.load.image("main_floor", "/main_floor.png");
    this.load.image("main_side_seat", "/main_side_seat.png");
    this.load.image("main_table_seat", "/main_table_seat.png");
    this.load.image("main_table_top", "/main_table_top.png");
    this.load.image("main_table_front", "/main_table_front.png");

    this.load.image("earn_button", "/main_action_buttons.png");
    this.load.image("add_new_bowl_button", "/main_action_buttons.png");
    this.load.image("shop_button", "/main_action_buttons.png");

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
      y: "+=20", // move up and down by 10 pixels
      duration: 2000, // 2 seconds for a complete up and down motion
      ease: "Sine.easeInOut", // smooth easing for floating effect
      repeat: -1, // repeat forever
      yoyo: true, // move back and forth
    });

    this.tweens.add({
      targets: CLOUD_LEFT,
      y: "-=20", // move up and down by 10 pixels
      duration: 2000, // 2 seconds for a complete up and down motion
      ease: "Sine.easeInOut", // smooth easing for floating effect
      repeat: -1, // repeat forever
      yoyo: true, // move back and forth
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

    this.time.delayedCall(4000, () => {
      this.scene.start("MainScene");
    });
  }
}
