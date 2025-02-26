import { NextResponse } from "next/server";

export function GET() {
  const data = {
    "name" : "Manik"
  }
  return NextResponse.json(data);
}