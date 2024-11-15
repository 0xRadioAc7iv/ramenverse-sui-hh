import { Scene } from "phaser";

export class EarnScene extends Scene {
  private gemsText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "EarnScene" });
  }

  preload() {}

  create() {
    const gems_amount = this.registry.get("gems");

    this.add.image(192, 293, "main_floor").setScale(0.5, 0.5);

    this.add.image(75, 80, "earn_title").setScale(0.6, 0.6);

    this.add.image(190, 25, "main_current_gem_amount_bg").setScale(0.6, 0.5);
    this.add.image(230, 23, "gem").setScale(0.5, 0.5);

    this.gemsText = this.add.text(134, 10, gems_amount, {
      fontSize: "26px",
      color: "#000",
      stroke: "#fff",
      strokeThickness: 1,
      resolution: 2,
    });

    const PROTOCOL_BUTTON_1 = this.add
      .image(192, 200, "earn_protocol_1")
      .setScale(0.5, 0.5);
    this.add.image(192, 380, "earn_protocol_2").setScale(0.5, 0.5);

    PROTOCOL_BUTTON_1.setInteractive().on("pointerdown", () => {
      this.scene.launch("StakingScene");
      this.scene.bringToTop("StakingScene");
    });

    this.add
      .image(25, 544, "active_earn_button")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    const PLAY_BUTTON = this.add
      .image(150, 554, "play_button")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    PLAY_BUTTON.setInteractive().on("pointerdown", () => {
      this.scene.stop("EarnScene");
      this.scene.bringToTop("MainScene");
    });

    const SHOP_BUTTON = this.add
      .image(280, 554, "inactive_shop_button")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    SHOP_BUTTON.setInteractive().on("pointerdown", () => {
      this.scene.launch("ShopScene");
      this.scene.bringToTop("ShopScene");
    });
  }
}
