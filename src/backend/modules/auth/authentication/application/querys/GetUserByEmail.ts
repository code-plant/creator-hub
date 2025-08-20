import { UserDto } from "../dtos/UserDto";

export interface GetUserByEmailInput {
  email: string;
}

export interface GetUserByEmailOutput {
  user: UserDto | undefined;
}
