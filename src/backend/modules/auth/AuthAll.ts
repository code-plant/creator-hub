import { SharedAll } from "../../framework/types/SharedAll";
import { GetUserHandler } from "./authentication/application/querys/handlers/GetUserHandler";
import { AuthenticationRepository } from "./authentication/domain/repositories/AuthenticationRepository";
import { AuthenticationDomainService } from "./authentication/domain/services/AuthenticationDomainService";
import { UserEmailRcRepository } from "./shared/domain/repositories/UserEmailRcRepository";

export interface AuthAll extends SharedAll {
  authenticationDomainService: AuthenticationDomainService;
  authenticationRepository: AuthenticationRepository;
  userEmailRcRepository: UserEmailRcRepository;
  getUserHandler: GetUserHandler;
}
