import { AggregateRoot } from "../../../../framework/AggregateRoot";
import { as } from "../../../../framework/utils/as";
import { HolderId } from "../../../shared/models/HolderId";
import { MerchantId } from "../../../shared/models/MerchantId";
import { UserId } from "../../../shared/models/UserId";

export class Holder extends AggregateRoot<HolderId> {
  private constructor(
    id: HolderId,
    public readonly name: string,
    public readonly userId: UserId | undefined,
    public readonly merchantId: MerchantId | undefined
  ) {
    super(id);
    if (userId && merchantId) {
      throw new Error("Holder cannot be both a user and a merchant");
    } else if (!userId && !merchantId) {
      throw new Error("Holder must be either a user or a merchant");
    }
  }

  public static reconstitute(
    id: string,
    name: string,
    userId: string | undefined,
    merchantId: string | undefined
  ) {
    return new Holder(as(id), name, as(userId), as(merchantId));
  }
}
