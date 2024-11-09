"use client";

import { Page } from "@/components/Page";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("../components/Phaser/PhaserComponent"), {
  ssr: false,
});

export default function Home() {
  return (
    <Page back={false}>
      <Game />
    </Page>
  );
}
