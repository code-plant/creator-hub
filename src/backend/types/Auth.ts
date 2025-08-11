import { User } from "../modules/shared/models/User";
import { UserId } from "../modules/shared/models/UserId";

export type Auth = AnonymousAuth | BeforeTosAuth | AuthenticatedAuth;

export interface AnonymousAuth {
  type: "anonymous";
}

export interface BeforeTosAuth {
  type: "beforeTos";
  userId: UserId;
}

export interface BeforeMfaAuth {
  type: "beforeMfa";
  userId: UserId;
}

export interface AuthenticatedAuth {
  type: "authenticated";
  user: User;
}
