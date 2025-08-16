import { PrismaSession } from "../../../../../framework/infrastructure/PrismaSession";
import { UserEmailRc } from "../models/UserEmailRc";

export interface UserEmailRcRepository {
  get(email: string): Promise<UserEmailRc | null>;
  save(session: PrismaSession, userEmailRc: UserEmailRc): Promise<void>;
}
