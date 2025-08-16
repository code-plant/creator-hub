import { I18nStringDto } from "../../../../shared/application/dtos/I18nStringDto";

export interface UserDto {
  id: string;
  name: I18nStringDto | undefined;
  createdAt: Date;
  updatedAt: Date;
  tosVersion: number;
  deletedAt: Date | undefined;
}
