// app/components/types.ts

// Defines the valid time ranges for historical latency data
export type RangeKey = "1h" | "24h" | "7d" | "30d";

/**
 * HistoricalDataPoint
 * Represents one latency snapshot at a specific time.
 * Optional keys (AWS, GCP, Azure) allow for flexible extension later.
 */
export interface HistoricalDataPoint {
  time: number | string;
  AWS?: number;
  GCP?: number;
  Azure?: number;
  [key: string]: number | string | undefined;
}
