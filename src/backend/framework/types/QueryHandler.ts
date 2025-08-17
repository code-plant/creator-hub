import { HandlerContext } from "./HandlerContext";

export interface QueryHandler<T, R> {
  handle: (context: HandlerContext, query: T) => Promise<R>;
}
