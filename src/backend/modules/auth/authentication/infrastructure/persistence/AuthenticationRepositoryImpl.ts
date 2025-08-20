import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { optional } from "../../../../../../common/utils/optional";
import { PrismaSession } from "../../../../../framework/infrastructure/PrismaSession";
import { SharedAll } from "../../../../../framework/types/SharedAll";
import { I18nString } from "../../../../shared/domain/models/I18nString";
import { UserId } from "../../../../shared/domain/models/UserId";
import { User } from "../../domain/models/User";
import { AuthenticationRepository } from "../../domain/repositories/AuthenticationRepository";

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  private readonly prisma: PrismaClient;

  constructor({ prisma }: Pick<SharedAll, "prisma">) {
    this.prisma = prisma;
  }

  async create(name: I18nString): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        nameI18n: name.toDBText(),
        role: "user",
        tosVersion: 0,
        holder: { create: { type: "user" } },
      },
    });

    return AuthenticationRepositoryImpl.fromPrismaUser(user);
  }

  async find(userId: UserId): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return undefined;
    }

    return AuthenticationRepositoryImpl.fromPrismaUser(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const emailRc = await this.prisma.userEmailRc.findUnique({
      where: { email },
      select: { user: true },
    });
    if (!emailRc) {
      return undefined;
    }

    return AuthenticationRepositoryImpl.fromPrismaUser(emailRc.user);
  }

  async findByAccount(
    provider: string,
    providerAccountId: string
  ): Promise<User | undefined> {
    const oauth2AccountRc = await this.prisma.userOauth2AccountRc.findUnique({
      where: { provider_providerAccountId: { provider, providerAccountId } },
      select: { user: true },
    });
    if (!oauth2AccountRc) {
      return undefined;
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

  async save(session: PrismaSession, user: User): Promise<void> {
    user.events.length = 0;
    await session.db.user.update({
      where: { id: user.id },
      data: {
        tosVersion: user.tosVersion,
        deletedAt: user.deletedAt ?? null,
        nameI18n: user.name?.toDBText() ?? null,
      },
    });
  }
}
