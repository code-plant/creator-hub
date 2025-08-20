import { Entity } from "../../../../../framework/Entity";
import { as } from "../../../../../framework/utils/as";
import { userIdFromAuth } from "../../../../../lib/auth/userIdFromAuth";
import { Session } from "../../../../../lib/session/Session";
import { I18nString } from "../../../../shared/domain/models/I18nString";
import { UserId } from "../../../../shared/domain/models/UserId";
import { InsufficientPermissionError } from "../../../shared/application/errors/InsufficientPermissionError";
import { UserEvent } from "../events/UserEvent";

export class User extends Entity<UserId> {
  public readonly events: UserEvent[];

  private constructor(
    id: UserId,
    private _name: I18nString | undefined,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public tosVersion: number,
    private _deletedAt: Date | undefined
  ) {
    super(id);
    this.events = [];
  }

  get name(): I18nString | undefined {
    return this._name;
  }

  set name(name: I18nString) {
    if (this._deletedAt) {
      throw new Error("User is deleted");
    }
    this._name = name;
    this.events.push({
      type: "user.name.changed",
      userId: this.id,
      name: name.toInput(),
      occurredAt: new Date(),
    });
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }

  delete(request: Session | undefined) {
    if (userIdFromAuth(request?.auth) !== this.id) {
      throw new InsufficientPermissionError("User is not the current user");
    }
    const now = new Date();
    this._deletedAt = now;
    this._name = undefined;
    this.events.push({
      type: "user.deleted",
      userId: this.id,
      occurredAt: now,
    });
  }

  static reconstitute(
    id: string,
    name: I18nString | undefined,
    createdAt: Date,
    updatedAt: Date,
    tosVersion: number,
    deletedAt: Date | undefined
  ) {
    return new User(as(id), name, createdAt, updatedAt, tosVersion, deletedAt);
  }
}
