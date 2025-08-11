import { ModeContextProvider } from "@-ft/mode-next";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import { Locale } from "../../backend/modules/shared/models/Locale";

import "../global.css";

interface ActualRootLayoutProps extends PropsWithChildren {
  params: Promise<Record<"locale", Locale>>;
}

export default async function ActualRootLayout({
  children,
  params,
}: ActualRootLayoutProps) {
  const [{ locale }, cookie] = await Promise.all([params, cookies()]);
  const theme = cookie.get("THEME");

  return (
    <html
      lang={locale}
      className={theme?.value === "dark" ? "dark" : undefined}
      suppressHydrationWarning
    >
      <head>
        <script src="/mode.js" />
        <title>Creator Hub</title>
      </head>
      <body>
        <ModeContextProvider
          variableName="__theme_mode"
          ssrInitialMode={theme?.value ?? "system"}
        >
          {children}
        </ModeContextProvider>
      </body>
    </html>
  );
}
