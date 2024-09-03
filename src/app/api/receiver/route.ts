import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    receiver: process.env.RECEIVING_ADDRESS,
  });
}
