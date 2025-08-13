import { Entity } from "./Entity";
import { IdType } from "./types/IdType";

export abstract class AggregateRoot<
  Id extends IdType<string>
> extends Entity<Id> {
  protected constructor(id: Id) {
    super(id);
  }
}
