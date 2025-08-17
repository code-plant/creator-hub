import { CommandHandler } from "../../framework/types/CommandHandler";
import { QueryHandler } from "../../framework/types/QueryHandler";
import { SharedAll } from "../../framework/types/SharedAll";
import {
  DeleteUserInput,
  DeleteUserOutput,
} from "./authentication/application/commands/DeleteUser";
import {
  GetUserInput,
  GetUserOutput,
} from "./authentication/application/querys/GetUser";
import { AuthenticationRepository } from "./authentication/domain/repositories/AuthenticationRepository";
import { AuthenticationDomainService } from "./authentication/domain/services/AuthenticationDomainService";
import { UserEmailRcRepository } from "./shared/domain/repositories/UserEmailRcRepository";

export interface AuthAll extends SharedAll {
  authenticationDomainService: AuthenticationDomainService;
  authenticationRepository: AuthenticationRepository;
  userEmailRcRepository: UserEmailRcRepository;
  getUserHandler: QueryHandler<GetUserInput, GetUserOutput>;
  deleteUserHandler: CommandHandler<DeleteUserInput, DeleteUserOutput>;
}
