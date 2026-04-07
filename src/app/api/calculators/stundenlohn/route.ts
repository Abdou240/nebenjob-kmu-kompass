import { NextRequest } from "next/server";
import { computeStundenlohn } from "@/services/stundenlohn.service";
import { successResponse, validationErrorResponse, errorResponse } from "@/lib/api/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = computeStundenlohn(body);

    if ("error" in result) {
      return validationErrorResponse(result.error.error!);
    }

    return successResponse(result.data);
  } catch {
    return errorResponse("Ungültige Anfrage.", 400);
  }
}
