import { AggregateRoot } from "../../../framework/AggregateRoot";
import { as } from "../../../framework/utils/as";
import { HolderId } from "./HolderId";
import { UserId } from "./UserId";
import { UserRole } from "./UserRole";

export class User extends AggregateRoot<UserId> {
  private constructor(
    id: UserId,
    public readonly role: UserRole,
    public readonly name: string,
    public readonly holderId: HolderId | undefined
  ) {
    super(id);
  }

  public static reconstitute(
    id: string,
    role: UserRole,
    name: string,
    holderId: string | undefined
  ) {
    return new User(as(id), role, name, as(holderId));
  }
}
