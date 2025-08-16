import NextAuth from "next-auth";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { validate } from "uuid";
import { guessLocaleFromHeaders } from "../../../../backend/framework/infrastructure/guessLocaleFromHeaders";
import { as } from "../../../../backend/framework/utils/as";
import { userIdFromAuth } from "../../../../backend/lib/auth/userIdFromAuth";
import { container } from "../../../../backend/lib/container";
import { getSession } from "../../../../backend/lib/session/getSession";
import { UserDto } from "../../../../backend/modules/auth/authentication/application/dtos/UserDto";
import { env } from "../../../../backend/utils/env";
import { unwrapNonNullable } from "../../../../common/utils/unwrapNonNullable";
import { FAKE_EMAIL_SUFFIX, fakeEmail } from "../../../_lib/auth/fakeEmail";

const fakeDate = new Date("1970-01-01T00:00:00Z");

function adapterUser(user: UserDto): AdapterUser;
function adapterUser(user?: UserDto | null): AdapterUser | null;
function adapterUser(user?: UserDto | null): AdapterUser | null {
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    email: fakeEmail(user.id),
    emailVerified: fakeDate,
  };
}

async function handler(
  req: Request,
  context: Record<"params", Promise<Record<"nextauth", string[]>>>
) {
  const adapter: Required<Adapter> = {
    createUser: async () => {
      return adapterUser(
        await container.authenticationDomainService.createUser(
          guessLocaleFromHeaders(req.headers)
        )
      );
    },

    getUser: async (id) => {
      const { user } = await container.getUserHandler.handle(
        container.session,
        { id }
      );
      return adapterUser(user);
    },

    getUserByEmail: async (email) => {
      if (email.endsWith(FAKE_EMAIL_SUFFIX)) {
        const id = email.slice(0, -FAKE_EMAIL_SUFFIX.length);
        if (!validate(id)) {
          return null;
        }
        return adapterUser(
          await container.authenticationApplicationService.getUser(as(id))
        );
      }

      return adapterUser(
        await container.authenticationApplicationService.getUserByEmail(email)
      );
    },

    getUserByAccount: async ({ provider, providerAccountId }) => {
      return adapterUser(
        await container.authenticationApplicationService.getUserByAccount(
          provider,
          providerAccountId
        )
      );
    },

    updateUser: async ({ id, email, emailVerified }) => {
      if (email && emailVerified) {
        return adapterUser(
          await container.authenticationDomainService.updateEmailAsVerified(
            as(id),
            email,
            emailVerified
          )
        );
      } else {
        return unwrapNonNullable(
          adapterUser(
            await container.authenticationApplicationService.getUser(as(id))
          )
        );
      }
    },

    deleteUser: async (id) => {
      return adapterUser(
        await container.authenticationDomainService.deleteUser(as(id))
      );
    },

    getSessionAndUser: async (sessionToken) => {
      const session = await getSession(
        sessionToken,
        req.headers,
        container.redis
      );
      if (!session) {
        return null;
      }

      const userId = userIdFromAuth(session.auth);
      if (!userId) {
        return null;
      }

      return {
        session: {
          sessionToken,
          userId,
          expires: new Date(
            session.lastUsedAtNumber + session.expiresAfterNumber
          ),
        },
        user: {
          id: userId,
          email: fakeEmail(userId),
          emailVerified: fakeDate,
        },
      };
    },
  };

  const handler = NextAuth({
    providers: [],
    secret: env("NEXTAUTH_SECRET"),
    adapter,
  });

  return await handler(req, context);
}

export { handler as GET, handler as POST };
