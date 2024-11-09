import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Root } from "@/components/Root/Root";
import { I18nProvider } from "@/core/i18n/provider";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";
import "@mysten/dapp-kit/dist/index.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Ramenverse",
  description: "Your application description goes here",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <I18nProvider>
            <Root>{children}</Root>
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
