"use client";

import {
  CAT_GRAY_SEAT_POSITION,
  CAT_GRAY_SPAWN_LOCATION,
  CAT_OFF_WHITE_SEAT_POSITION,
  CAT_OFF_WHITE_SPAWN_LOCATION,
  CAT_WHITE_SEAT_POSITION,
  CAT_WHITE_SPAWN_LOCATION,
  CAT_YELLOW_SEAT_POSITION,
  CAT_YELLOW_SPAWN_LOCATION,
} from "@/lib/constants";

interface CatConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
}

export class Cat extends Phaser.GameObjects.Sprite {
  seatPosition!: { x: number; y: number };
  spawnLocation!: { x: number; y: number };

  constructor(config: CatConfig) {
    super(config.scene, config.x, config.y, config.texture);

    if (config.texture === "cat_yellow") {
      this.seatPosition = CAT_YELLOW_SEAT_POSITION;
      this.spawnLocation = CAT_YELLOW_SPAWN_LOCATION;
    } else if (config.texture === "cat_gray") {
      this.seatPosition = CAT_GRAY_SEAT_POSITION;
      this.spawnLocation = CAT_GRAY_SPAWN_LOCATION;
    } else if (config.texture === "cat_white") {
      this.seatPosition = CAT_WHITE_SEAT_POSITION;
      this.spawnLocation = CAT_WHITE_SPAWN_LOCATION;
    } else if (config.texture === "cat_off_white") {
      this.seatPosition = CAT_OFF_WHITE_SEAT_POSITION;
      this.spawnLocation = CAT_OFF_WHITE_SPAWN_LOCATION;
    }

    this.scene.add.existing(this);

    this.setOrigin(0, 0);
    this.setInteractive();
  }
}
