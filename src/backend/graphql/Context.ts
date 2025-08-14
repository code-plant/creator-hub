import { container } from "../lib/container";
import { RequestContext } from "../lib/types/RequestContext";

export interface Context {
  container: typeof container;
  requestContext: RequestContext;
}
