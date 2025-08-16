import { LazyMessage } from "./LazyMessage";

export function evalLazyMessage(message: LazyMessage): string;
export function evalLazyMessage(message: LazyMessage | null): string | null;
export function evalLazyMessage(
  message: LazyMessage | undefined
): string | undefined;
export function evalLazyMessage(
  message: LazyMessage | null | undefined
): string | null | undefined;
export function evalLazyMessage(
  message: LazyMessage | null | undefined
): string | null | undefined {
  if (typeof message === "function") {
    return message();
  }
  return message;
}
