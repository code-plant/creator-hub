import { PrismaSession } from "../infrastructure/PrismaSession";

export interface QueryHandler<T, R> {
  handle: (session: PrismaSession, query: T) => Promise<R>;
}
