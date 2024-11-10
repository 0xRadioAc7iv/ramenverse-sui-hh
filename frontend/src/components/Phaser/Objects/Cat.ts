"use client";

interface CatConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
}

export class Cat extends Phaser.GameObjects.Sprite {
  seatPositionX!: number;
  seatPositionY!: number;

  constructor(config: CatConfig) {
    super(config.scene, config.x, config.y, config.texture);

    if (config.texture === "cat_yellow") {
      this.seatPositionX = 50;
      this.seatPositionY = 20;
    } else if (config.texture === "cat_gray") {
      this.seatPositionX = 212;
      this.seatPositionY = 119;
    } else if (config.texture === "cat_white") {
      this.seatPositionX = 72;
      this.seatPositionY = 132;
    } else if (config.texture === "cat_off_white") {
      this.seatPositionX = 300;
      this.seatPositionY = 10;
    }

    this.scene.add.existing(this);

    this.setOrigin(0, 0);
    this.setInteractive();
  }
}
