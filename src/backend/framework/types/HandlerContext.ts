import { Session } from "../../lib/session/Session";
import { PrismaSession } from "../infrastructure/PrismaSession";

export interface HandlerContext {
  session: PrismaSession;
  request: Session | undefined;
}
