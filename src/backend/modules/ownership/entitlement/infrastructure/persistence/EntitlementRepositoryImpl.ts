import { PrismaClient } from "@prisma/client";
import { Connection } from "../../../../../framework/types/Connection";
import { SharedAll } from "../../../../../framework/types/SharedAll";
import { ItemId } from "../../../../shared/domain/models/ItemId";
import { UserId } from "../../../../shared/domain/models/UserId";
import { EntitlementId } from "../../../shared/domain/models/EntitlementId";
import { Entitlement } from "../../domain/models/Entitlement";
import { EntitlementRepository } from "../../domain/repositories/EntitlementRepository";

export class EntitlementRepositoryImpl implements EntitlementRepository {
  private readonly prisma: PrismaClient;

  constructor({ prisma }: Pick<SharedAll, "prisma">) {
    this.prisma = prisma;
  }

  async findById(id: EntitlementId): Promise<Entitlement | null> {
    throw new Error("Not implemented");
  }

  findByItemId(userId: UserId, itemId: ItemId): Promise<Entitlement[] | null> {
    throw new Error("Not implemented");
  }

  find(id: EntitlementId): Promise<Entitlement | null> {
    throw new Error("Not implemented");
  }

  paginate(
    userId: UserId,
    cursor: string | undefined,
    limit: number,
    desc?: boolean
  ): Promise<Connection<Entitlement>> {
    throw new Error("Not implemented");
  }

  delete(id: EntitlementId): Promise<void> {
    throw new Error("Not implemented");
  }

  save(entitlement: Entitlement): Promise<void> {
    throw new Error("Not implemented");
  }
}
