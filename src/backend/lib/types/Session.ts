import { Auth } from "./Auth";

export interface Session {
  id: string;
  auth: Auth;
  previousIpAddress: string;
  createdAt: Date;
  expireOnIpChange: boolean;
}
