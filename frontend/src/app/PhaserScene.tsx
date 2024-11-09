import React, { useEffect, useRef } from "react";
import { Game, Scene, Types } from "phaser";

class LoadingScene extends Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  preload() {
    // Load your game assets here
    this.load.image("loading_bg", "/loading_bg.png");
    this.load.image("main_bg", "/main_bg.png");
  }

  create() {
    // Set up your loading scene here
    this.add.image(192, 293, "loading_bg");

    // Switch to MainScene after 3 seconds
    this.time.delayedCall(3000, () => {
      this.scene.start("MainScene");
    });
  }
}

class MainScene extends Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    // Load your game assets here
    this.add.image(192, 293, "main_bg");
  }

  create() {
    // Set up your game scene here
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
