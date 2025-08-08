import { Logger } from "../../application/services/Logger";

export class StdoutLogger implements Logger {
  private log(
    level: string,
    message: string,
    meta?: Record<string, unknown>
  ): void {
    console.log(JSON.stringify({ level, message, meta }));
  }

  verbose(message: string, meta?: Record<string, unknown>): void {
    this.log("verbose", message, meta);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.log("warn", message, meta);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.log("error", message, meta);
  }
}
