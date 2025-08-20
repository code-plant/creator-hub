import { DILifetime, DIRegistration, fromClass } from "di-typed";
import { authenticationCommandHandlerRegistrations } from "./authentication/application/commands/handlers/authenticationCommandHandlerRegistrations";
import { authenticationQueryHandlerRegistrations } from "./authentication/application/querys/handlers/authenticationQueryHandlerRegistrations";
import { AuthenticationApplicationServiceImpl } from "./authentication/application/services/AuthenticationApplicationServiceImpl";
import { AuthenticationDomainService } from "./authentication/domain/services/AuthenticationDomainService";
import { AuthenticationRepositoryImpl } from "./authentication/infrastructure/persistence/AuthenticationRepositoryImpl";
import { UserEmailRcRepositoryImpl } from "./shared/infrastructure/persistent/UserEmailRcRepositoryImpl";

export const authAllRegistrations = {
  authenticationDomainService: fromClass(AuthenticationDomainService),
  authenticationApplicationService: fromClass(
    AuthenticationApplicationServiceImpl
  ),
  authenticationRepository: fromClass(AuthenticationRepositoryImpl),
  userEmailRcRepository: fromClass(UserEmailRcRepositoryImpl),
  ...authenticationQueryHandlerRegistrations,
  ...authenticationCommandHandlerRegistrations,
} as const satisfies Partial<
  Record<
    string,
    DIRegistration<unknown, Partial<Record<string, unknown>>, DILifetime>
  >
>;
