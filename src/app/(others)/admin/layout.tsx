import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { getCookiesFromHeaders } from "../../../backend/lib/getCookiesFromHeaders";
import { getSession } from "../../../backend/lib/session/getSession";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const header = await headers();
  const session = await getSession(
    getCookiesFromHeaders(header)?.SESSION_ID,
    header
  );
  if (session?.auth.type === "anonymous") {
    redirect("/login");
  }
  return <div>{children}</div>;
}
