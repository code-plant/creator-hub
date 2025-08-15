import { unwrapNonNullable } from "../../common/utils/unwrapNonNullable";

export function env(key: string): string {
  return unwrapNonNullable(process.env[key]);
}
