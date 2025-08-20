import { AuthAll } from "../../../AuthAll";
import { AuthenticationRepository } from "../../domain/repositories/AuthenticationRepository";
import { AuthenticationApplicationService } from "./interfaces/AuthenticationApplicationService";

export class AuthenticationApplicationServiceImpl
  implements AuthenticationApplicationService
{
  private readonly authenticationRepository: AuthenticationRepository;

  constructor({
    authenticationRepository,
  }: Pick<AuthAll, "authenticationRepository">) {
    this.authenticationRepository = authenticationRepository;
  }
}
