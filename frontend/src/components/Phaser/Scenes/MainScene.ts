"use client";

import { Scene } from "phaser";
import { Ramen } from "../Objects/Ramen";
import { RAMEN_AVAILABLE_TABLE_POSITIONS } from "@/lib/constants";
import { CatManager } from "../Managers/CatManager";

export class MainScene extends Scene {
  private catManager: CatManager;
  private currentMainRamenLevel = 1;
  private gemsText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "MainScene" });

    this.catManager = new CatManager({
      scene: this,
      maxCats: 4,
      spawnInterval: 3000,
    });
  }

  preload() {}

  create() {
    this.catManager.start();

    const gems_amount = this.registry.get("gems");

    this.add.image(192, 293, "main_floor").setScale(0.5, 0.5);

    this.add.image(190, 25, "main_current_gem_amount_bg").setScale(0.6, 0.5);
    this.add.image(230, 23, "gem").setScale(0.5, 0.5);

    this.gemsText = this.add.text(134, 10, gems_amount, {
      fontSize: "26px",
      color: "#000",
      stroke: "#fff",
      strokeThickness: 1,
      resolution: 2,
    });

    this.add
      .image(327, 55, "main_side_seat")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);
    this.add
      .image(300, 100, "cat_small_cute_cat")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);
    this.add.image(82, 165, "main_table_seat").setOrigin(0, 0);
    this.add.image(212, 165, "main_table_seat").setOrigin(0, 0);

    this.add
      .image(-10, 194, "main_cats_table")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);
    this.add
      .image(0, 260, "main_ramen_table")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    this.add
      .image(160, 460, "main_ramen_bowl_bg")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    const EARN_BUTTON = this.add
      .image(25, 554, "inactive_earn_button")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    EARN_BUTTON.setInteractive().on("pointerdown", () => {
      this.scene.launch("EarnScene");
      this.scene.bringToTop("EarnScene");
    });

    this.add
      .image(130, 544, "add_bowl_button")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    const SHOP_BUTTON = this.add
      .image(280, 554, "inactive_shop_button")
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    SHOP_BUTTON.setInteractive().on("pointerdown", () => {
      this.scene.launch("ShopScene");
      this.scene.bringToTop("ShopScene");
    });

    // Ramen bowls for Cats - Temporary
    this.add.image(30, 55, "ramen_lvl_4").setScale(0.7, 0.7).setScale(0.4, 0.4);
    this.add
      .image(252, 220, "ramen_lvl_5")
      .setScale(0.85, 0.85)
      .setScale(0.4, 0.4);
    this.add
      .image(120, 216, "ramen_lvl_3")
      .setScale(0.85, 0.85)
      .setScale(0.4, 0.4);
    this.add
      .image(280, 40, "ramen_lvl_6")
      .setScale(0.7, 0.7)
      .setScale(0.4, 0.4);

    const MAIN_RAMEN = this.add
      .image(162, 462, `ramen_lvl_${this.currentMainRamenLevel}`)
      .setOrigin(0, 0)
      .setScale(0.5, 0.5);

    MAIN_RAMEN.setInteractive();

    MAIN_RAMEN.on("pointerdown", () => {
      const gems = this.registry.get("gems");
      this.registry.set("gems", gems - 100);

      this.updateGemsText();

      this.spawnNewRamen();
    });
  }

  private spawnNewRamen(): void {
    let availablePosition = this.isPositionAvailable();

    if (availablePosition) {
      const newRamen = new Ramen({
        scene: this,
        x: availablePosition.x,
        y: availablePosition.y,
        texture: `ramen_lvl_${this.currentMainRamenLevel}`,
        level: this.currentMainRamenLevel,
        tablePosition: availablePosition.tablePosition,
      });

      newRamen.setScale(0.5, 0.5);
    }
  }

  private isPositionAvailable(): {
    x: number;
    y: number;
    tablePosition: number;
  } | null {
    for (let i = 0; i < RAMEN_AVAILABLE_TABLE_POSITIONS.length; i++) {
      let currentRamen = RAMEN_AVAILABLE_TABLE_POSITIONS[i];
      if (currentRamen.available) {
        RAMEN_AVAILABLE_TABLE_POSITIONS[i].available = false;
        return {
          x: currentRamen.x,
          y: currentRamen.y,
          tablePosition: i,
        };
      }
    }

    return null;
  }

  private updateGemsText() {
    const currentGems = this.registry.get("gems");
    this.gemsText.setText(currentGems);
  }
}
