import { AggregateRoot } from "../../../../../framework/AggregateRoot";
import { as } from "../../../../../framework/utils/as";
import { ItemId } from "../../../../shared/domain/models/ItemId";
import { ProductId } from "../../../../shared/domain/models/ProductId";
import { UserId } from "../../../../shared/domain/models/UserId";

export class Item extends AggregateRoot<ItemId> {
  private constructor(
    id: ItemId,
    public readonly ownerId: UserId,
    public readonly productId: ProductId,
    private quantity: number,
    private willExpireAt: Date,
    private expiredAt: Date | undefined
  ) {
    super(id);
  }

  static reconstitute(
    id: string,
    ownerId: string,
    productId: string,
    quantity: number,
    willExpireAt: Date,
    expiredAt: Date | undefined
  ) {
    return new Item(
      as(id),
      as(ownerId),
      as(productId),
      quantity,
      willExpireAt,
      expiredAt
    );
  }
}
