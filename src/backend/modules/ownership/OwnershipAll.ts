import { SharedAll } from "../../framework/types/SharedAll";
import { EntitlementRepository } from "./entitlement/domain/repositories/EntitlementRepository";

export interface OwnershipAll extends SharedAll {
  entitlementRepository: EntitlementRepository;
}
