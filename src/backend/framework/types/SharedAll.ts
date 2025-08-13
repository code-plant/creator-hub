import { PrismaClient } from "@prisma/client";
import { PrismaSession } from "../infrastructure/PrismaSession";

export type SharedAll = {
  prisma: PrismaClient;
  session: PrismaSession;
};
