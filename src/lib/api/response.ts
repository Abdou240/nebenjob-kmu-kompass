import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiError = {
  ok: false;
  error: string;
  details?: Record<string, string[]>;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>({ ok: true, data }, { status });
}

export function errorResponse(message: string, status = 400, details?: Record<string, string[]>) {
  return NextResponse.json<ApiError>({ ok: false, error: message, details }, { status });
}

export function validationErrorResponse(error: ZodError) {
  const fieldErrors = error.flatten().fieldErrors;
  const details: Record<string, string[]> = {};
  for (const [key, messages] of Object.entries(fieldErrors)) {
    if (messages) details[key] = messages;
  }
  return errorResponse("Ungültige Eingabe.", 422, details);
}
