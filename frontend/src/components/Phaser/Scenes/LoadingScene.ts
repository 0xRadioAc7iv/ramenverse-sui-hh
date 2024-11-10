"use client";

import { Scene } from "phaser";

export class LoadingScene extends Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    this.load.image("loading_bg", "/loading_bg.png");

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
    this.add.image(192, 293, "loading_bg");

    // this.time.delayedCall(1000, () => {
    // this.scene.start("MainScene");
    // });

    this.scene.start("MainScene");
  }
}
