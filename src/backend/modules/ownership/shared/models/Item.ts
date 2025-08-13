import { AggregateRoot } from "../../../../framework/AggregateRoot";
import { as } from "../../../../framework/utils/as";
import { ItemId } from "../../../shared/models/ItemId";
import { ProductId } from "../../../shared/models/ProductId";
import { UserId } from "../../../shared/models/UserId";

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

  public static reconstitute(
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
