import { HolderId } from "../../modules/shared/models/HolderId";
import { UserId } from "../../modules/shared/models/UserId";
import { UserRole } from "../../modules/shared/models/UserRole";

export interface UserInfo {
  id: UserId;
  role: UserRole;
  name: string;
  holderId: HolderId;
}
