import { Connection } from "../../../../../framework/types/Connection";
import { ItemId } from "../../../../shared/models/ItemId";
import { UserId } from "../../../../shared/models/UserId";
import { EntitlementId } from "../../../shared/models/EntitlementId";
import { Entitlement } from "../models/Entitlement";

export interface EntitlementRepository {
  find(id: EntitlementId): Promise<Entitlement | null>;
  findByItemId(userId: UserId, itemId: ItemId): Promise<Entitlement[] | null>;
  paginate(
    userId: UserId,
    cursor: string | undefined,
    limit: number,
    desc?: boolean
  ): Promise<Connection<Entitlement>>;
  save(entitlement: Entitlement): Promise<void>;
  delete(id: EntitlementId): Promise<void>;
}
