"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  time: number;
  AWS: number;
  GCP: number;
  Azure: number;
  pairs?: Record<string, number>;
}

interface HistoricalChartProps {
  history: DataPoint[];
  selectedRegions: string[];
  selectedPairs: string[];
  timeRange?: "1h" | "24h" | "7d" | "30d";
}

// 🔹 Format X-axis labels dynamically
function formatTimeLabel(time: number, range: string): string {
  const date = new Date(time);

  switch (range) {
    case "1h":
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    case "24h":
      return date.toLocaleTimeString([], { hour: "2-digit" });
    case "7d":
      return date.toLocaleDateString([], { weekday: "short" });
    case "30d":
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    default:
      return date.toLocaleTimeString();
  }
}

// 🔹 Group data points for larger time ranges
function aggregateData(history: DataPoint[], range: string): DataPoint[] {
  if (range === "1h") return history; // fine-grained already

  const bucketSize =
    range === "24h"
      ? 10 * 60 * 1000 // 10 min buckets
      : range === "7d"
      ? 60 * 60 * 1000 // 1 hr buckets
      : 24 * 60 * 60 * 1000; // 1 day buckets

  const buckets: Record<number, DataPoint[]> = {};

  for (const point of history) {
    const bucketKey = Math.floor(point.time / bucketSize) * bucketSize;
    if (!buckets[bucketKey]) buckets[bucketKey] = [];
    buckets[bucketKey].push(point);
  }

  const aggregated = Object.entries(buckets).map(([time, points]) => {
    const avg = (key: keyof DataPoint) =>
      points.reduce((sum, p) => sum + (p[key] as number), 0) / points.length;

    // average pair latencies if present
    const pairKeys = Object.keys(points[0].pairs || {});
    const pairs: Record<string, number> = {};
    for (const k of pairKeys) {
      pairs[k] =
        points.reduce((sum, p) => sum + (p.pairs?.[k] || 0), 0) / points.length;
    }

    return {
      time: Number(time),
      AWS: avg("AWS"),
      GCP: avg("GCP"),
      Azure: avg("Azure"),
      pairs,
    };
  });

  return aggregated.sort((a, b) => a.time - b.time);
}

export default function HistoricalChart({
  history,
  selectedRegions,
  selectedPairs,
  timeRange = "1h",
}: HistoricalChartProps) {
  const chartData = useMemo(() => aggregateData(history, timeRange), [history, timeRange]);

  return (
    <div style={{ height: 250, width: "100%" }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            stroke="#ccc"
            tickFormatter={(t) => formatTimeLabel(t as number, timeRange)}
            minTickGap={20}
          />
          <YAxis stroke="#ccc" domain={["auto", "auto"]} />
          <Tooltip
            labelFormatter={(label) =>
              new Date(label as number).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
                month: "short",
                day: "numeric",
              })
            }
          />
          <Legend />
          {/* Regions */}
          {selectedRegions.includes("AWS") && (
            <Line type="monotone" dataKey="AWS" stroke="#ff7300" dot={false} strokeWidth={2} />
          )}
          {selectedRegions.includes("GCP") && (
            <Line type="monotone" dataKey="GCP" stroke="#82ca9d" dot={false} strokeWidth={2} />
          )}
          {selectedRegions.includes("Azure") && (
            <Line type="monotone" dataKey="Azure" stroke="#8884d8" dot={false} strokeWidth={2} />
          )}
          {/* Exchange pairs */}
          {selectedPairs.map((pair, idx) => (
            <Line
              key={pair}
              type="monotone"
              dataKey={`pairs.${pair}`}
              stroke={["#00e5ff", "#ff4081", "#ffeb3b", "#8bc34a"][idx % 4]}
              dot={false}
              strokeDasharray="4 2"
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
