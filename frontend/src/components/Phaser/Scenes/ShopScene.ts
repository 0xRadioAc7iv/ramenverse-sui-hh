import { Scene } from "phaser";

export class ShopScene extends Scene {
  constructor() {
    super({ key: "ShopScene" });
  }

  preload() {}

  create() {
    this.add.image(192, 293, "main_floor").setScale(0.5, 0.5);

    this.add.image(75, 80, "shop_title").setScale(0.6, 0.6);

    this.add.image(190, 25, "main_current_gem_amount_bg").setScale(0.6, 0.5);
    this.add.image(230, 23, "gem").setScale(0.5, 0.5);

    this.add.image(192, 215, "shop_theme_yellow").setScale(0.5, 0.5);
    this.add.image(192, 415, "shop_theme_red").setScale(0.5, 0.5);

    const EARN_BUTTON = this.add
      .image(25, 554, "inactive_earn_button")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    EARN_BUTTON.setInteractive().on("pointerdown", () => {
      this.scene.stop("ShopScene");
      this.scene.bringToTop("EarnScene");
    });

    const PLAY_BUTTON = this.add
      .image(150, 554, "play_button")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    PLAY_BUTTON.setInteractive().on("pointerdown", () => {
      this.scene.stop("ShopScene");
      this.scene.bringToTop("MainScene");
    });

    this.add
      .image(280, 544, "active_shop_button")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);
  }
}
