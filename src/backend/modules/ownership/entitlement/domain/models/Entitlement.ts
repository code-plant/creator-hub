import { Entity } from "../../../../../framework/Entity";
import { as } from "../../../../../framework/utils/as";
import { ItemId } from "../../../../shared/models/ItemId";
import { UserId } from "../../../../shared/models/UserId";
import { EntitlementId } from "../../../shared/models/EntitlementId";
import { HolderId } from "../../../shared/models/HolderId";
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

  public static reconstitute(
    id: string,
    holderId: string,
    itemId: string,
    type: EntitlementType,
    ownerId: string | undefined
  ) {
    return new Entitlement(as(id), as(holderId), as(itemId), type, as(ownerId));
  }
}
