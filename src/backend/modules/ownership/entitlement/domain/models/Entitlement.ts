import { Entity } from "../../../../../framework/Entity";
import { as } from "../../../../../framework/utils/as";
import { HolderId } from "../../../../shared/domain/models/HolderId";
import { ItemId } from "../../../../shared/domain/models/ItemId";
import { UserId } from "../../../../shared/domain/models/UserId";
import { EntitlementId } from "../../../shared/domain/models/EntitlementId";
import { EntitlementType } from "./EntitlementType";

export class Entitlement extends Entity<EntitlementId> {
  private constructor(
    id: EntitlementId,
    public readonly holderId: HolderId,
    public readonly itemId: ItemId,
    public readonly type: EntitlementType,
    public readonly ownerId: UserId | undefined
  ) {
    super(id);
    if (type === "owned" && ownerId !== undefined) {
      throw new Error("Owner must be undefined for owned entitlements");
    } else if (type !== "owned" && ownerId === undefined) {
      throw new Error("Owner must be defined for non-owned entitlements");
    }
  }

  static reconstitute(
    id: string,
    holderId: string,
    itemId: string,
    type: EntitlementType,
    ownerId: string | undefined
  ) {
    return new Entitlement(as(id), as(holderId), as(itemId), type, as(ownerId));
  }
}
