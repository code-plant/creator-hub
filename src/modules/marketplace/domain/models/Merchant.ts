import { AggregateRoot } from "../../../../framework/AggregateRoot";

export class Merchant extends AggregateRoot {
  private constructor(id: string) {
    super(id);
  }
}
