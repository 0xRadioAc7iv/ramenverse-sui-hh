"use client";

import { Game, Types } from "phaser";
import { useEffect } from "react";
import { useRef } from "react";
import { LoadingScene } from "./Scenes/LoadingScene";
import { MainScene } from "./Scenes/MainScene";
import { ShopScene } from "./Scenes/ShopScene";
import { EarnScene } from "./Scenes/EarnScene";

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
      scene: [LoadingScene, MainScene, ShopScene, EarnScene],
    };

    gameRef.current = new Game(config);

    return () => {
      gameRef.current?.destroy(true);
    };
  }, []);

  return <div id="game" />;
};

export default PhaserComponent;
