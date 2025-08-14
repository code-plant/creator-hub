import { UserId } from "../../modules/shared/models/UserId";
import { UserInfo } from "./UserInfo";

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
  userInfo: UserInfo;
}
