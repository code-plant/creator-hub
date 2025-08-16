import { CommandBase } from "./CommandBase";

export interface Command<K extends string, T> extends CommandBase {
  type: K;
  data: T;
}
