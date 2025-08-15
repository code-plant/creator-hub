import { RedisClient } from "../../framework/infrastructure/redis/redis";
import { Session } from "./Session";

export async function saveSession(session: Session, redis: RedisClient) {
  await redis.setEx(`session:${session.id}`, 86400, JSON.stringify(session));
}
