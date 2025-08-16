import { User } from "../../domain/models/User";

export interface AuthenticationApplicationService {
  getUserByEmail(email: string): Promise<User | null>;

  getUserByAccount(
    provider: string,
    providerAccountId: string
  ): Promise<User | null>;
}
