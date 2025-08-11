import { container } from "../container";
import { RequestContext } from "../types/RequestContext";

export interface Context {
  container: typeof container;
  requestContext: RequestContext;
}
