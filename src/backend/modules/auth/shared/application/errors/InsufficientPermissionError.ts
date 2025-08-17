export class InsufficientPermissionError extends Error {
  constructor(message: string) {
    super(message);
  }
}
