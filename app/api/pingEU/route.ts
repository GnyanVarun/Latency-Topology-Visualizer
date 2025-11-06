import { NextResponse } from "next/server";

export async function GET() {
  const latency = Math.floor(Math.random() * 100) + 20;
  const data = {
    region: "EU",
    latency,
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(data);
}
