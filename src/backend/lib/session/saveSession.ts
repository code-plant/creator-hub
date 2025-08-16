import { RedisClient } from "../../framework/infrastructure/redis/redis";
import { Session } from "./Session";

export async function saveSession(session: Session, redis: RedisClient) {
  await redis.setEx(
    `session:${session.id}`,
    session.expiresAfterNumber / 1000,
    JSON.stringify(session)
  );
}
