import { User } from "../shared/domain/models/User";
import { UserId } from "../shared/domain/models/UserId";

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
