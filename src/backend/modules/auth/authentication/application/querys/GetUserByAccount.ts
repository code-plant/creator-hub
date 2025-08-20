import { UserDto } from "../dtos/UserDto";

export interface GetUserByAccountInput {
  provider: string;
  providerAccountId: string;
}

export interface GetUserByAccountOutput {
  user: UserDto | undefined;
}
