import { PrismaClient } from "@prisma/client";
import { PrismaSession } from "../infrastructure/PrismaSession";
import { RedisClient } from "../infrastructure/redis/redis";

export type SharedAll = {
  prisma: PrismaClient;
  session: PrismaSession;
  redis: RedisClient;
};
