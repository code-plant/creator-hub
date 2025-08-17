import { CommandHandler } from "../../../../../../framework/types/CommandHandler";
import { HandlerContext } from "../../../../../../framework/types/HandlerContext";
import { as } from "../../../../../../framework/utils/as";
import { AuthAll } from "../../../../AuthAll";
import { InsufficientPermissionError } from "../../../../shared/application/errors/InsufficientPermissionError";
import { AuthenticationRepository } from "../../../domain/repositories/AuthenticationRepository";
import { DeleteUserInput, DeleteUserOutput } from "../DeleteUser";

export class DeleteUserHandler
  implements CommandHandler<DeleteUserInput, DeleteUserOutput>
{
  private readonly authenticationRepository: AuthenticationRepository;

  constructor({
    authenticationRepository,
  }: Pick<AuthAll, "authenticationRepository">) {
    this.authenticationRepository = authenticationRepository;
  }

  async handle(
    { session, request }: HandlerContext,
    command: DeleteUserInput
  ): Promise<DeleteUserOutput> {
    const user = await this.authenticationRepository.find(as(command.id));
    if (!user) {
      throw new Error("User not found");
    }
    try {
      user.delete(request);
    } catch (error) {
      if (error instanceof InsufficientPermissionError) {
        return { success: false };
      }
      throw error;
    }
    await this.authenticationRepository.save(session, user);
    return { success: true };
  }
}
