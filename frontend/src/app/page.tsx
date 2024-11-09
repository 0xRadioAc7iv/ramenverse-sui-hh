"use client";

import { Page } from "@/components/Page";
import PhaserScene from "./PhaserScene";

export default function Home() {
  return (
    <Page back={false}>
      <PhaserScene />
    </Page>
  );
}
