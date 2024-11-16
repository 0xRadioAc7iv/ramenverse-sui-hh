"use client";

import { Page } from "@/components/Page";
import { ConnectButton } from "@mysten/dapp-kit";

export default function Home() {
  return (
    <Page back={false}>
      <ConnectButton />
    </Page>
  );
}
