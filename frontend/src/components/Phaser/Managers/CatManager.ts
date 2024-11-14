import {
  CAT_COLORS,
  CAT_GRAY_SPAWN_LOCATION,
  CAT_OFF_WHITE_SPAWN_LOCATION,
  CAT_OUTSIDE_SPAWN_LOCATION,
  CAT_WHITE_SPAWN_LOCATION,
  CAT_YELLOW_SPAWN_LOCATION,
} from "@/lib/constants";
import { Cat } from "../Objects/Cat";

interface CatManagerConfig {
  scene: Phaser.Scene;
  maxCats: number;
  spawnInterval: number;
}

export class CatManager {
  private scene: Phaser.Scene;
  private maxCats: number;
  private spawnInterval: number;
  private cats: Cat[] = [];
  private spawnTimer?: Phaser.Time.TimerEvent;
  private currentCatIndex: number = 0;

  constructor(config: CatManagerConfig) {
    this.scene = config.scene;
    this.maxCats = config.maxCats;
    this.spawnInterval = config.spawnInterval;
  }

  start() {
    this.spawnTimer = this.scene.time.addEvent({
      delay: this.spawnInterval,
      callback: this.spawnCat,
      callbackScope: this,
      loop: true,
    });
  }

  stop() {
    if (this.spawnTimer) {
      this.spawnTimer.remove();
    }
  }

  spawnCat() {
    if (this.cats.length < this.maxCats) {
      const catTexture = CAT_COLORS[this.currentCatIndex];

      if (catTexture === "cat_gray") {
        const cat = new Cat({
          scene: this.scene,
          x: CAT_GRAY_SPAWN_LOCATION.x,
          y: CAT_GRAY_SPAWN_LOCATION.y,
          texture: catTexture,
        });

        this.cats.push(cat);
        this.moveCat(cat);
      } else if (catTexture === "cat_white") {
        const cat = new Cat({
          scene: this.scene,
          x: CAT_WHITE_SPAWN_LOCATION.x,
          y: CAT_WHITE_SPAWN_LOCATION.y,
          texture: catTexture,
        });

        this.cats.push(cat);
        this.moveCat(cat);
      } else if (catTexture === "cat_off_white") {
        const cat = new Cat({
          scene: this.scene,
          x: CAT_OFF_WHITE_SPAWN_LOCATION.x,
          y: CAT_OFF_WHITE_SPAWN_LOCATION.y,
          texture: catTexture,
        });

        this.cats.push(cat);
        this.moveCat(cat);
      } else {
        const cat = new Cat({
          scene: this.scene,
          x: CAT_YELLOW_SPAWN_LOCATION.x,
          y: CAT_YELLOW_SPAWN_LOCATION.y,
          texture: catTexture,
        });

        this.cats.push(cat);
        this.moveCat(cat);
      }

      // Update the index to the next cat type, looping back to the start if needed
      this.currentCatIndex = (this.currentCatIndex + 1) % CAT_COLORS.length;
    }
  }

  moveCat(cat: Cat) {
    this.scene.tweens.add({
      targets: cat,
      x: cat.seatPosition.x,
      y: cat.seatPosition.y,
      duration: 2500,
      ease: "sine.inout",
      onComplete: () => {
        this.scene.time.delayedCall(6000, () => {
          this.goBackToSpawn(cat);
        });
      },
    });
  }

  removeCat(cat: Cat) {
    this.cats = this.cats.filter((c) => c !== cat);
    cat.destroy();
  }

  goBackToSpawn(cat: Cat) {
    this.scene.tweens.add({
      targets: cat,
      x: cat.spawnLocation.x,
      y: cat.spawnLocation.y,
      duration: 2500,
      ease: "sine.inout",
      onComplete: () => {
        this.removeCat(cat);
      },
    });
  }

  private getRandomCat() {
    const randomIndex = Phaser.Math.Between(0, CAT_COLORS.length - 1);
    return CAT_COLORS[randomIndex];
  }
}
