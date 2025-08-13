import { PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from "@prisma/client/runtime/library";
import { Awaitable } from "../../../common/utils/Awaitable";
import { SharedAll } from "../types/SharedAll";

export type TransactionPrisma = Omit<PrismaClient, ITXClientDenyList>;

export interface TransactionOption {
  timeout?: number;
}

export interface PrismaSession {
  transaction: <T>(
    func: (session: PrismaSession) => Awaitable<T>,
    option?: TransactionOption
  ) => Promise<T>;

  db: TransactionPrisma;
}

export class TransactionSession implements PrismaSession {
  constructor(public readonly db: TransactionPrisma) {}

  async transaction<T>(
    func: (session: PrismaSession) => Awaitable<T>
  ): Promise<T> {
    return await func(this);
  }
}

export class DefaultSession implements PrismaSession {
  public db: PrismaClient;

  constructor({ prisma }: Pick<SharedAll, "prisma">) {
    this.db = prisma;
  }

  async transaction<T>(
    func: (session: PrismaSession) => Awaitable<T>,
    { timeout }: TransactionOption = {}
  ): Promise<T> {
    const result = await this.db.$transaction(
      async (tx) => {
        const ts = new TransactionSession(tx);
        return await func(ts);
      },
      { timeout }
    );

    return result;
  }
}
