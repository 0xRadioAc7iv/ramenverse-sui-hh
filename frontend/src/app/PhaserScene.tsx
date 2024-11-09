"use client";

import React, { useEffect, useRef } from "react";
import { Game, Scene, Types } from "phaser";

const RAMEN_AVAILABLE_TABLE_POSITIONS = [
  {
    x: 20,
    y: 300,
    available: true,
  },
  {
    x: 110,
    y: 300,
    available: true,
  },
  {
    x: 200,
    y: 300,
    available: true,
  },
  {
    x: 290,
    y: 300,
    available: true,
  },
];

class LoadingScene extends Scene {
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
    this.load.image("ramen_lvl_2", "/main_ramen_level_2.png");
  }

  create() {
    this.add.image(192, 293, "loading_bg");

    // this.time.delayedCall(1000, () => {
    // this.scene.start("MainScene");
    // });

    this.scene.start("MainScene");
  }
}

class MainScene extends Scene {
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

    const MAIN_RAMEN = this.add.image(160, 520, "ramen_lvl_2").setOrigin(0, 0);

    MAIN_RAMEN.setInteractive();

    MAIN_RAMEN.on("pointerdown", () => {
      this.spawnNewRamen();
    });

    this.input.on(
      "drag",
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Image,
        dragX: number,
        dragY: number
      ) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );
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
      const newRamen = this.add
        .image(availablePosition.x, availablePosition.y, "ramen_lvl_2")
        .setOrigin(0, 0);

      newRamen.setInteractive();
      this.input.setDraggable(newRamen);
    }
  }

  private isPositionAvailable(): { x: number; y: number } | null {
    for (let i = 0; i < RAMEN_AVAILABLE_TABLE_POSITIONS.length; i++) {
      let currentRamen = RAMEN_AVAILABLE_TABLE_POSITIONS[i];
      if (currentRamen.available) {
        RAMEN_AVAILABLE_TABLE_POSITIONS[i].available = false;
        return {
          x: currentRamen.x,
          y: currentRamen.y,
        };
      }
    }

    return null;
  }
}

const PhaserComponent: React.FC = () => {
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    const config: Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 384,
      height: 587,
      physics: {
        default: "arcade",
        arcade: {
          gravity: {
            y: 300,
            x: 0,
          },
        },
      },
      scene: [LoadingScene, MainScene],
    };

    gameRef.current = new Game(config);

    return () => {
      gameRef.current?.destroy(true);
    };
  }, []);

  return <div id="game" />;
};

export default PhaserComponent;
