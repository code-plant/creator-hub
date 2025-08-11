import { Auth } from "./Auth";

export interface RequestContext {
  ipAddress: string;
  auth: Auth;
}
