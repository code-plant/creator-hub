import { UserDto } from "../dtos/UserDto";

export interface GetUserInput {
  id: string;
}

export interface GetUserOutput {
  user: UserDto | null;
}
