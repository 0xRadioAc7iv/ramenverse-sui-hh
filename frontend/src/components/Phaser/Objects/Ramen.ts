// TODO: Add sparkling effect on Ramen Merging

import { RAMEN_AVAILABLE_TABLE_POSITIONS } from "@/lib/constants";

interface RamenConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  level: number;
  tablePosition: number;
}

export class Ramen extends Phaser.GameObjects.Sprite {
  private ramenLevel: number;
  private tablePosition: number;
  private defaultPositionX: number;
  private defaultPositionY: number;

  constructor(config: RamenConfig) {
    super(config.scene, config.x, config.y, config.texture);

    this.defaultPositionX = config.x;
    this.defaultPositionY = config.y;
    this.ramenLevel = config.level;
    this.tablePosition = config.tablePosition;

    this.setScale(0.5, 0.5);
    this.scene.add.existing(this);

    this.setOrigin(0, 0);
    this.setInteractive();
    this.scene.input.setDraggable(this);

    this.scene.input.on(
      "drag",
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Image,
        dragX: number,
        dragY: number
      ) => {
        // Makes sure only the current ramen instance is dragged
        if (gameObject === this) {
          this.x = dragX;
          this.y = dragY;
        }
      }
    );

    this.scene.input.on(
      "dragend",
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Image,
        _dragX: number,
        _dragY: number
      ) => {
        if (gameObject === this) {
          const collidedRamen = this.checkCollision();
          const newLevel = this.ramenLevel + 1;

          if (collidedRamen && this.ramenLevel === collidedRamen.ramenLevel) {
            const newRamen = new Ramen({
              scene: this.scene,
              x: collidedRamen.defaultPositionX,
              y: collidedRamen.defaultPositionY,
              texture: `ramen_lvl_${newLevel}`,
              level: newLevel,
              tablePosition: collidedRamen.tablePosition,
            });
            this.showUpgradeEffect(newRamen);

            RAMEN_AVAILABLE_TABLE_POSITIONS[this.tablePosition].available =
              true;

            this.destroy();
            collidedRamen.destroy();

            // const maxLevelReached = this.scene.registry.get(
            //   "maxRamenLevelReached"
            // );
            // const currentMainRamenLevel = this.scene.registry.get(
            //   "currentMainRamenLevel"
            // );

            // if (newLevel > maxLevelReached) {
            //   // this.showLevelUpModal(newLevel);
            //   this.scene.registry.set(
            //     "maxRamenLevelReached",
            //     maxLevelReached + 1
            //   );
            //   this.scene.registry.set(
            //     "currentMainRamenLevel",
            //     currentMainRamenLevel + 1
            //   );
            // }
          } else {
            this.x = this.defaultPositionX;
            this.y = this.defaultPositionY;
          }
        }
      }
    );
  }

  private checkCollision(): Ramen | null {
    const allRamens = this.scene.children.list.filter(
      (obj) => obj instanceof Ramen && obj !== this
    ) as Ramen[];

    for (const ramen of allRamens) {
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.getBounds(),
          ramen.getBounds()
        )
      ) {
        return ramen;
      }
    }
    return null;
  }

  private showUpgradeEffect(targetRamen: Ramen) {
    const effect = this.scene.add
      .image(targetRamen.x, targetRamen.y, "effect_ramen_upgrade")
      .setOrigin(0, 0);

    this.scene.tweens.add({
      targets: effect,
      scale: 1.5,
      duration: 200,
      yoyo: true,
      ease: "Power2",
    });

    // Scale up the ramen
    this.scene.tweens.add({
      targets: targetRamen,
      scale: 0.7,
      duration: 200,
      yoyo: true,
      ease: "Power2",
    });

    this.scene.time.delayedCall(440, () => {
      effect.destroy();
    });
  }

  // private showLevelUpModal(newLevel: number) {
  //   const levelUpModal = this.scene.add
  //     .image(192, 293, `ramen_upgrade_modal_lvl_${newLevel}`)
  //     .setScale(0.5)
  //     .setDepth(10);

  //   this.scene.time.delayedCall(1500, () => {
  //     levelUpModal.destroy();
  //   });
  // }
}
