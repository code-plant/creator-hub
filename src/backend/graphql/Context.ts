import { container } from "../lib/container";
import { Session } from "../lib/session/Session";

export interface Context {
  container: typeof container;
  session: Session;
}
