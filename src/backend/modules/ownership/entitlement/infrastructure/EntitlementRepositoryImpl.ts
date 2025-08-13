import { PrismaClient } from "@prisma/client";
import { SharedAll } from "../../../../framework/types/SharedAll";
import { EntitlementId } from "../../shared/models/EntitlementId";
import { Entitlement } from "../domain/models/Entitlement";
import { EntitlementRepository } from "../domain/repositories/EntitlementRepository";

export class EntitlementRepositoryImpl implements EntitlementRepository {
  private readonly prisma: PrismaClient;

  constructor({ prisma }: Pick<SharedAll, "prisma">) {
    this.prisma = prisma;
  }

  async findById(id: EntitlementId): Promise<Entitlement | null> {
    //
  }
}
