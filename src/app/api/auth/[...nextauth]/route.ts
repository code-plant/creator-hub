import NextAuth from "next-auth";
import { env } from "../../../../backend/utils/env";

// TODO: fix this

function handler(req: Request) {
  const handler = NextAuth({
    providers: [],
    secret: env("NEXTAUTH_SECRET"),
  });

  console.log({ req });

  return handler(req);
}

export { handler as GET, handler as POST };
