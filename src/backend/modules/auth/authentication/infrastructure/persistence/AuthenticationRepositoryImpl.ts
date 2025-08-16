import { User as PrismaUser } from "@prisma/client";
import { optional } from "../../../../../../common/utils/optional";
import { PrismaSession } from "../../../../../framework/infrastructure/PrismaSession";
import { SharedAll } from "../../../../../framework/types/SharedAll";
import { I18nString } from "../../../../shared/domain/models/I18nString";
import { UserId } from "../../../../shared/domain/models/UserId";
import { User } from "../../domain/models/User";
import { AuthenticationRepository } from "../../domain/repositories/AuthenticationRepository";

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  private readonly session: PrismaSession;

  constructor({ session }: Pick<SharedAll, "session">) {
    this.session = session;
  }

  async create(name: I18nString): Promise<User> {
    const user = await this.session.db.user.create({
      data: {
        nameI18n: name.toDBText(),
        role: "user",
        tosVersion: 0,
        holder: { create: { type: "user" } },
      },
    });

    return AuthenticationRepositoryImpl.fromPrismaUser(user);
  }

  async find(userId: UserId): Promise<User | null> {
    const user = await this.session.db.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return null;
    }

    return AuthenticationRepositoryImpl.fromPrismaUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const emailRc = await this.session.db.userEmailRc.findUnique({
      where: { email },
      select: { user: true },
    });
    if (!emailRc) {
      return null;
    }

    return AuthenticationRepositoryImpl.fromPrismaUser(emailRc.user);
  }

  async findByAccount(
    provider: string,
    providerAccountId: string
  ): Promise<User | null> {
    const oauth2AccountRc =
      await this.session.db.userOauth2AccountRc.findUnique({
        where: { provider_providerAccountId: { provider, providerAccountId } },
        select: { user: true },
      });
    if (!oauth2AccountRc) {
      return null;
    }

    return AuthenticationRepositoryImpl.fromPrismaUser(oauth2AccountRc.user);
  }

  static fromPrismaUser(user: PrismaUser): User {
    return User.reconstitute(
      user.id,
      optional(I18nString.fromDBTextUnchecked, user.nameI18n) ?? undefined,
      user.createdAt,
      user.updatedAt,
      user.tosVersion,
      user.deletedAt ?? undefined
    );
  }
}
