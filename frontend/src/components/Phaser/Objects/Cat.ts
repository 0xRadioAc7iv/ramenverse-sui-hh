"use client";

interface CatConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
}

export class Cat extends Phaser.GameObjects.Sprite {
  constructor(config: CatConfig) {
    super(config.scene, config.x, config.y, config.texture);

    this.scene.add.existing(this);

    this.setOrigin(0, 0);
    this.setInteractive();
  }
}
