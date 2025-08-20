import { Entity } from "../../../../../framework/Entity";
import { as } from "../../../../../framework/utils/as";
import { UserAuthenticationMethodId } from "./UserAuthenticationMethodId";
import { UserAuthenticationStepData } from "./UserAuthenticationStepData";
import { UserAuthenticationStepId } from "./UserAuthenticationStepId";

export class UserAuthenticationStep extends Entity<UserAuthenticationStepId> {
  private constructor(
    id: UserAuthenticationStepId,
    public readonly methodId: UserAuthenticationMethodId,
    public readonly createdAt: Date,
    private _updatedAt: Date,
    private _order: number,
    private _data: UserAuthenticationStepData
  ) {
    super(id);
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get order(): number {
    return this._order;
  }

  get data(): UserAuthenticationStepData {
    return this._data;
  }

  // TODO:

  static reconstitute(
    id: string,
    methodId: string,
    createdAt: Date,
    updatedAt: Date,
    order: number,
    data: UserAuthenticationStepData
  ) {
    return new UserAuthenticationStep(
      as(id),
      as(methodId),
      createdAt,
      updatedAt,
      order,
      data
    );
  }
}
