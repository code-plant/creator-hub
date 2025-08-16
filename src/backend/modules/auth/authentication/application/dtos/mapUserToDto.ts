import { User } from "../../domain/models/User";
import { UserDto } from "./UserDto";

export function mapUserToDto(user: User): UserDto {
  return {
    id: user.id.toString(),
    name: user.name?.toInput(),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    tosVersion: user.tosVersion,
    deletedAt: user.deletedAt,
  };
}
