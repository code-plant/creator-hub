import { AggregateRoot } from "../../../framework/AggregateRoot";
import { UserId } from "./UserId";

export class User extends AggregateRoot {
  private constructor(id: UserId, public readonly name: string) {
    super(id);
  }

  public static reconstitute(id: UserId, name: string) {
    return new User(id, name);
  }
}
