import { PrismaSession } from "../../../../../framework/infrastructure/PrismaSession";
import { I18nString } from "../../../../shared/domain/models/I18nString";
import { UserId } from "../../../../shared/domain/models/UserId";
import { User } from "../models/User";

export interface AuthenticationRepository {
  create(name: I18nString): Promise<User>;
  find(userId: UserId): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByAccount(
    provider: string,
    providerAccountId: string
  ): Promise<User | undefined>;
  save(session: PrismaSession, user: User): Promise<void>;
}
