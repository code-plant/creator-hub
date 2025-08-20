import { HandlerContext } from "../../../../../../framework/types/HandlerContext";
import { QueryHandler } from "../../../../../../framework/types/QueryHandler";
import { AuthAll } from "../../../../AuthAll";
import { AuthenticationRepository } from "../../../domain/repositories/AuthenticationRepository";
import {
  GetUserByAccountInput,
  GetUserByAccountOutput,
} from "../GetUserByAccount";

export class GetUserByAccountHandler
  implements QueryHandler<GetUserByAccountInput, GetUserByAccountOutput>
{
  private readonly authenticationRepository: AuthenticationRepository;

  constructor({
    authenticationRepository,
  }: Pick<AuthAll, "authenticationRepository">) {
    this.authenticationRepository = authenticationRepository;
  }

  async handle(
    _context: HandlerContext,
    { provider, providerAccountId }: GetUserByAccountInput
  ): Promise<GetUserByAccountOutput> {
    const user = await this.authenticationRepository.findByAccount(
      provider,
      providerAccountId
    );
    return { user };
  }
}
