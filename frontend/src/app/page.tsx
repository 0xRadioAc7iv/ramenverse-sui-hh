"use client";

import { Page } from "@/components/Page";
import dynamic from "next/dynamic";

const PhaserScene = dynamic(() => import("./PhaserScene"), { ssr: false });

export default function Home() {
  return (
    <Page back={false}>
      <PhaserScene />
    </Page>
  );
}
