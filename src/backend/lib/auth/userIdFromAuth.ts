import { UserId } from "../../modules/shared/domain/models/UserId";
import { Auth } from "../types/Auth";

export function userIdFromAuth(
  auth: Auth | null | undefined
): UserId | undefined {
  switch (auth?.type) {
    case "anonymous":
      return undefined;
    case "beforeTos":
    case "beforeMfa":
      return auth.userId;
    case "authenticated":
      return auth.userInfo.id;
  }
}
