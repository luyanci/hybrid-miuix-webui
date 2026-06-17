export class AppError extends Error {
  message: string;
  code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = "AppError";
    this.message = message;
    this.code = code;
  }
}

export function getErrorMessage(
  e: unknown,
  fallback = "Unknown error",
): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  return fallback;
}