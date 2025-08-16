import { AuthAll } from "../../../AuthAll";
import { AuthenticationApplicationService } from "../../application/services/AuthenticationApplicationService";
import { User } from "../../domain/models/User";
import { AuthenticationRepository } from "../../domain/repositories/AuthenticationRepository";

export class AuthenticationApplicationServiceImpl
  implements AuthenticationApplicationService
{
  private readonly authenticationRepository: AuthenticationRepository;

  constructor({
    authenticationRepository,
  }: Pick<AuthAll, "authenticationRepository">) {
    this.authenticationRepository = authenticationRepository;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.authenticationRepository.findByEmail(email);
  }

  async getUserByAccount(
    provider: string,
    providerAccountId: string
  ): Promise<User | null> {
    return await this.authenticationRepository.findByAccount(
      provider,
      providerAccountId
    );
  }
}
