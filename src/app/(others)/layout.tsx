import { ModeContextProvider } from "@-ft/mode-next";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";

import "../global.css";

export default async function ActualRootLayout({
  children,
}: PropsWithChildren) {
  const theme = (await cookies()).get("THEME");

  return (
    <html
      lang="en"
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
