import { PrismaClient, UserEmailRc as PrismaUserEmailRc } from "@prisma/client";
import { PrismaSession } from "../../../../../framework/infrastructure/PrismaSession";
import { SharedAll } from "../../../../../framework/types/SharedAll";
import { UserEmailRc } from "../../domain/models/UserEmailRc";
import { UserEmailRcRepository } from "../../domain/repositories/UserEmailRcRepository";

export class UserEmailRcRepositoryImpl implements UserEmailRcRepository {
  private readonly prisma: PrismaClient;

  constructor({ prisma }: Pick<SharedAll, "prisma">) {
    this.prisma = prisma;
  }

  async get(email: string): Promise<UserEmailRc | null> {
    const userEmailRc = await this.prisma.userEmailRc.findUnique({
      where: { email },
    });
    if (!userEmailRc) {
      return null;
    }
    return UserEmailRcRepositoryImpl.fromPrismaUserEmailRc(userEmailRc);
  }

  async save(session: PrismaSession, userEmailRc: UserEmailRc): Promise<void> {
    await session.db.userEmailRc.update({
      where: { id: userEmailRc.id },
      data: { verifiedAt: userEmailRc.verifiedAt ?? null },
    });
  }

  static fromPrismaUserEmailRc(userEmailRc: PrismaUserEmailRc): UserEmailRc {
    return UserEmailRc.reconstitute(
      userEmailRc.id,
      userEmailRc.email,
      userEmailRc.verifiedAt ?? undefined,
      userEmailRc.userId,
      userEmailRc.createdAt,
      userEmailRc.updatedAt
    );
  }
}
