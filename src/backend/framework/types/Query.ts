import { QueryBase } from "./QueryBase";

export interface Query<K extends string, T> extends QueryBase {
  type: K;
  data: T;
}
