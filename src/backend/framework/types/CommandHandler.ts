import { PrismaSession } from "../infrastructure/PrismaSession";

export interface CommandHandler<T, R> {
  handle: (session: PrismaSession, command: T) => Promise<R>;
}
