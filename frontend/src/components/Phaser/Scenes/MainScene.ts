"use client";

import { Scene } from "phaser";
import { Cat } from "../Objects/Cat";
import { Ramen } from "../Objects/Ramen";
import { RAMEN_AVAILABLE_TABLE_POSITIONS } from "@/lib/constants";

export class MainScene extends Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    // Load your game assets here
    this.add.image(192, 293, "main_floor");

    this.add.image(327, 55, "main_side_seat").setOrigin(0, 0);

    this.add.image(82, 165, "main_table_seat").setOrigin(0, 0);
    this.add.image(212, 165, "main_table_seat").setOrigin(0, 0);

    this.add.image(0, 194, "main_table_top").setOrigin(0, 0);
    this.add.image(0, 330, "main_table_front").setOrigin(0, 0);

    this.add.image(40, 530, "earn_button").setOrigin(0, 0);
    this.add
      .image(160, 520, "add_new_bowl_button")
      .setOrigin(0, 0)
      .setScale(1.1, 1.2);
    this.add.image(280, 530, "shop_button").setOrigin(0, 0);

    // Spawned a Cat here for testing purposes
    new Cat({
      scene: this,
      x: 0,
      y: 0,
      texture: "cat_yellow",
    });

    const MAIN_RAMEN = this.add
      .image(160, 520, "ramen_lvl_1")
      .setScale(1.5, 1.5)
      .setOrigin(0, 0);

    MAIN_RAMEN.setInteractive();

    MAIN_RAMEN.on("pointerdown", () => {
      this.spawnNewRamen();
    });
  }

  create() {
    this.add.text(55, 500, "Earn", {
      color: "#86FFF8",
      strokeThickness: 0.65,
      resolution: 2,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        stroke: true,
        fill: true,
      },
    });
    this.add.text(160, 490, "Add Bowl", {
      color: "#86FFF8",
      strokeThickness: 0.65,
      resolution: 2,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        stroke: true,
        fill: true,
      },
    });
    this.add.text(295, 500, "Shop", {
      color: "#86FFF8",
      strokeThickness: 0.65,
      resolution: 2,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        stroke: true,
        fill: true,
      },
    });
  }

  private spawnNewRamen(): void {
    let availablePosition = this.isPositionAvailable();

    if (availablePosition) {
      const newRamen = new Ramen({
        scene: this,
        x: availablePosition.x,
        y: availablePosition.y,
        texture: "ramen_lvl_1",
        level: 1,
        tablePosition: availablePosition.tablePosition,
      });
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
}
