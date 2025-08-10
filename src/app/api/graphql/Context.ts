import { RequestContext } from "../../../types/RequestContext";
import { container } from "../container";

export interface Context {
  container: typeof container;
  requestContext: RequestContext;
}
