import { HandlerContext } from "../../../../../../framework/types/HandlerContext";
import { QueryHandler } from "../../../../../../framework/types/QueryHandler";
import { as } from "../../../../../../framework/utils/as";
import { AuthAll } from "../../../../AuthAll";
import { AuthenticationRepository } from "../../../domain/repositories/AuthenticationRepository";
import { GetUserInput, GetUserOutput } from "../GetUser";

export class GetUserHandler
  implements QueryHandler<GetUserInput, GetUserOutput>
{
  private readonly authenticationRepository: AuthenticationRepository;

  constructor({
    authenticationRepository,
  }: Pick<AuthAll, "authenticationRepository">) {
    this.authenticationRepository = authenticationRepository;
  }

  async handle(
    _context: HandlerContext,
    query: GetUserInput
  ): Promise<GetUserOutput> {
    const user = await this.authenticationRepository.find(as(query.id));
    return { user };
  }
}
