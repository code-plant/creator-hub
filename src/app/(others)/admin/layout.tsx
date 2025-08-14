import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { createRequestContext } from "../../../backend/lib/createRequestContext";
import { getSession } from "../../../backend/lib/session/getSession";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const requestContext = await createRequestContext(
    (
      await getSession(
        (await cookies()).get("SESSION_ID")?.value,
        (await headers()).get("x-forwarded-for") ?? ""
      )
    )?.auth ?? {
      type: "anonymous",
    },
    await headers()
  );
  if (requestContext.auth.type === "anonymous") {
    redirect("/login");
  }
  return <div>{children}</div>;
}
