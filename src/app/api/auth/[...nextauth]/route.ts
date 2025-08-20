import NextAuth from "next-auth";
import { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";
import { validate } from "uuid";
import { guessLocaleFromHeaders } from "../../../../backend/framework/infrastructure/guessLocaleFromHeaders";
import { HandlerContext } from "../../../../backend/framework/types/HandlerContext";
import { as } from "../../../../backend/framework/utils/as";
import { userIdFromAuth } from "../../../../backend/lib/auth/userIdFromAuth";
import { container } from "../../../../backend/lib/container";
import { getCookiesFromHeaders } from "../../../../backend/lib/getCookiesFromHeaders";
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
  return await container.session.unitOfWork(async (session) => {
    const request = await getSession(
      getCookiesFromHeaders(req.headers)?.SESSION_ID,
      req.headers,
      container.redis
    );
    const ctx: HandlerContext = { session, request };

    const adapter: Required<Adapter> = {
      createUser: async () => {
        return adapterUser(
          await container.authenticationDomainService.createUser(
            guessLocaleFromHeaders(req.headers)
          )
        );
      },

      getUser: async (id) => {
        const { user } = await container.getUserHandler.handle(ctx, { id });
        return adapterUser(user);
      },

      getUserByEmail: async (email) => {
        if (email.endsWith(FAKE_EMAIL_SUFFIX)) {
          const id = email.slice(0, -FAKE_EMAIL_SUFFIX.length);
          if (!validate(id)) {
            return null;
          }
          const { user } = await container.getUserHandler.handle(ctx, { id });
          return adapterUser(user);
        }

        const { user } = await container.getUserByEmailHandler.handle(ctx, {
          email,
        });
        return adapterUser(user);
      },

      getUserByAccount: async ({ provider, providerAccountId }) => {
        const { user } = await container.getUserByAccountHandler.handle(ctx, {
          provider,
          providerAccountId,
        });
        return adapterUser(user);
      },

      updateUser: async ({ id, email, emailVerified }) => {
        if (email && emailVerified) {
          return adapterUser(
            await container.authenticationDomainService.updateEmailAsVerified(
              session,
              as(id),
              email,
              emailVerified
            )
          );
        } else {
          const { user } = await container.getUserHandler.handle(ctx, { id });
          return unwrapNonNullable(adapterUser(user));
        }
      },

      deleteUser: async (id) => {
        const { success } = await container.deleteUserHandler.handle(ctx, {
          id,
        });
        if (!success) {
          // TODO: log error
          const { user } = await container.getUserHandler.handle(ctx, { id });
          return unwrapNonNullable(adapterUser(user));
        }
        return undefined;
      },

      linkAccount: async ({
        provider,
        providerAccountId,
        userId,
      }: AdapterAccount) => {
        return adapterUser(
          await container.authenticationApplicationService.linkAccount(
            session,
            userId,
            provider,
            providerAccountId
          )
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
  });
}

export { handler as GET, handler as POST };
