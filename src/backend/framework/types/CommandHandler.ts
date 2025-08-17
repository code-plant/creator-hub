import { HandlerContext } from "./HandlerContext";

export interface CommandHandler<T, R> {
  handle: (context: HandlerContext, command: T) => Promise<R>;
}
