import { UserId } from "../../modules/shared/domain/models/UserId";
import { UserInfo } from "./UserInfo";

export type Auth =
  | AnonymousAuth
  | BeforeTosAuth
  | BeforeMfaAuth
  | AuthenticatedAuth;

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
  userInfo: UserInfo;
}
