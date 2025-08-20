import { HandlerContext } from "../../../../../../framework/types/HandlerContext";
import { QueryHandler } from "../../../../../../framework/types/QueryHandler";
import { AuthAll } from "../../../../AuthAll";
import { AuthenticationRepository } from "../../../domain/repositories/AuthenticationRepository";
import { GetUserByEmailInput, GetUserByEmailOutput } from "../GetUserByEmail";

export class GetUserByEmailHandler
  implements QueryHandler<GetUserByEmailInput, GetUserByEmailOutput>
{
  private readonly authenticationRepository: AuthenticationRepository;

  constructor({
    authenticationRepository,
  }: Pick<AuthAll, "authenticationRepository">) {
    this.authenticationRepository = authenticationRepository;
  }

  async handle(
    _context: HandlerContext,
    { email }: GetUserByEmailInput
  ): Promise<GetUserByEmailOutput> {
    const user = await this.authenticationRepository.findByEmail(email);
    return { user };
  }
}
