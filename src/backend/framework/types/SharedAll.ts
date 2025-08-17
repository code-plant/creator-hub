import { PrismaClient } from "@prisma/client";
import { DefaultPrismaSession } from "../infrastructure/PrismaSession";
import { RedisClient } from "../infrastructure/redis/redis";

export type SharedAll = {
  prisma: PrismaClient;
  session: DefaultPrismaSession;
  redis: RedisClient;
};
