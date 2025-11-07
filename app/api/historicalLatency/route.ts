import { NextResponse } from "next/server";

// Generate mock latency data for the last 30 days
function generateMockLatencyData() {
  const now = Date.now();
  const data = [];

  // Generate 30 days of hourly data
  for (let i = 0; i < 30 * 24; i++) {
    const timestamp = now - i * 60 * 60 * 1000; // 1 hour interval
    const latency = Math.random() * 200 + 20; // 20–220ms random latency
    data.push({ timestamp, latency });
  }

  return data.reverse(); // chronological order
}

export async function GET() {
  const data = generateMockLatencyData();
  return NextResponse.json({ data });
}
