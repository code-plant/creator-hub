import { AggregateRoot } from "../../../framework/AggregateRoot";
import { as } from "../../../framework/utils/as";
import { UserId } from "./UserId";

export class User extends AggregateRoot<UserId> {
  private constructor(id: UserId, public readonly name: string) {
    super(id);
  }

  public static reconstitute(id: string, name: string) {
    return new User(as(id), name);
  }
}
