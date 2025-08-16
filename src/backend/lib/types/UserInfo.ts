import { HolderId } from "../../modules/shared/domain/models/HolderId";
import { UserId } from "../../modules/shared/domain/models/UserId";
import { UserRole } from "../../modules/shared/domain/models/UserRole";

export interface UserInfo {
  id: UserId;
  role: UserRole;
  name: string;
  holderId: HolderId;
}
