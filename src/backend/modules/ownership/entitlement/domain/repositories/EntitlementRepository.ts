import { Connection } from "../../../../../framework/types/Connection";
import { ItemId } from "../../../../shared/domain/models/ItemId";
import { UserId } from "../../../../shared/domain/models/UserId";
import { EntitlementId } from "../../../shared/domain/models/EntitlementId";
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
