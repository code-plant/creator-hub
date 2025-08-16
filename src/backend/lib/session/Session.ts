import { Auth } from "../types/Auth";

export interface Session {
  id: string;
  auth: Auth;
  previousIpAddress: string;
  createdAt: Date;
  expireOnIpChange: boolean;
  expiresAfterNumber: number;
  lastUsedAtNumber: number;
}
