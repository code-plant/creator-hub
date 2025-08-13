import { IdType } from "./types/IdType";

export abstract class Entity<Id extends IdType<string>> {
  protected constructor(public readonly id: Id) {}
}
