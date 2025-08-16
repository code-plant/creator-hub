import { Entity } from "../../../../../framework/Entity";
import { as } from "../../../../../framework/utils/as";
import { UserId } from "../../../../shared/domain/models/UserId";
import { UserEmailRcId } from "./UserEmailRcId";

export class UserEmailRc extends Entity<UserEmailRcId> {
  private constructor(
    id: UserEmailRcId,
    public readonly email: string,
    public verifiedAt: Date | undefined,
    public readonly userId: UserId,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    super(id);
  }

  public static reconstitute(
    id: string,
    email: string,
    verifiedAt: Date | undefined,
    userId: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new UserEmailRc(
      as(id),
      email,
      verifiedAt,
      as(userId),
      createdAt,
      updatedAt
    );
  }
}
