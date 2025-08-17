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
  addBeforeCommit: (func: () => Awaitable<void>) => Promise<void>;
}

export interface DefaultPrismaSession extends PrismaSession {
  unitOfWork: <T>(func: (session: PrismaSession) => Awaitable<T>) => Promise<T>;
}

export class TransactionSession implements PrismaSession {
  constructor(
    public readonly db: TransactionPrisma,
    private readonly beforeCommit: (() => Awaitable<void>)[]
  ) {}

  addBeforeCommit(func: () => Awaitable<void>) {
    this.beforeCommit.push(func);
    return Promise.resolve();
  }

  async transaction<T>(
    func: (session: PrismaSession) => Awaitable<T>
  ): Promise<T> {
    return await func(this);
  }
}

export class NonTransactionSession implements PrismaSession {
  constructor(public readonly db: PrismaClient) {}

  async addBeforeCommit(func: () => Awaitable<void>) {
    await func();
  }

  async transaction<T>(
    func: (session: PrismaSession) => Awaitable<T>,
    { timeout }: TransactionOption = {}
  ): Promise<T> {
    const result = await this.db.$transaction(
      async (tx) => {
        const beforeCommit: (() => Awaitable<void>)[] = [];
        const result = await func(new TransactionSession(tx, beforeCommit));
        for (const func of beforeCommit) {
          await func();
        }
        return result;
      },
      { timeout }
    );

    return result;
  }
}

export class DefaultSession implements DefaultPrismaSession {
  private readonly _db: PrismaClient;

  constructor({ prisma }: Pick<SharedAll, "prisma">) {
    this._db = prisma;
  }

  addBeforeCommit(_func: () => Awaitable<void>): Promise<void> {
    throw new Error(
      "DefaultSession is used directly. Use unitOfWork or transaction instead."
    );
  }

  get db(): never {
    throw new Error(
      "DefaultSession is used directly. Use unitOfWork or transaction instead."
    );
  }

  async transaction<T>(
    func: (session: PrismaSession) => Awaitable<T>,
    { timeout }: TransactionOption = {}
  ): Promise<T> {
    const result = await this._db.$transaction(
      async (tx) => {
        const beforeCommit: (() => Awaitable<void>)[] = [];
        const result = await func(new TransactionSession(tx, beforeCommit));
        for (const func of beforeCommit) {
          await func();
        }
        return result;
      },
      { timeout }
    );

    return result;
  }

  async unitOfWork<T>(
    func: (session: PrismaSession) => Awaitable<T>
  ): Promise<T> {
    return await func(new NonTransactionSession(this._db));
  }
}
