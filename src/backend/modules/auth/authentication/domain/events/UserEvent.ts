import { EventBase } from "../../../../../framework/types/EventBase";
import { I18nStringInput } from "../../../../shared/domain/models/I18nStringInput";
import { UserId } from "../../../../shared/domain/models/UserId";

export interface UserDeletedEvent extends EventBase {
  type: "user.deleted";
  userId: UserId;
}

export interface UserNameChangedEvent extends EventBase {
  type: "user.name.changed";
  userId: UserId;
  name: I18nStringInput;
}

export type UserEvent = UserDeletedEvent | UserNameChangedEvent;
