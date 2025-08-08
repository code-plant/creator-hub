import { ModeContextProvider } from "@-ft/mode-next";
import { cookies } from "next/headers";

import "./global.css";

export default async function GlobalNotFound() {
  const theme = (await cookies()).get("THEME");

  return (
    <html
      lang="en"
      className={theme?.value === "dark" ? "dark" : undefined}
      suppressHydrationWarning
    >
      <head>
        <script src="/mode.js" />
        <title>Creator Hub - Not Found</title>
      </head>
      <body>
        <ModeContextProvider
          variableName="__theme_mode"
          ssrInitialMode={theme?.value ?? "system"}
        >
          <h1>Global Not Found</h1>
        </ModeContextProvider>
      </body>
    </html>
  );
}
