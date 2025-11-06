"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type LatencyData = {
  timestamp: string;
  region: string;
  latency: number;
};

export interface LatencyChartProps {
  activeRegions: string[];
}

export default function LatencyChart({ activeRegions }: LatencyChartProps) {
  const [data, setData] = useState<LatencyData[]>([]);

  const regions = ["pingAsia", "pingUS", "pingEU"];

  const fetchLatency = async () => {
    try {
      const results = await Promise.all(
        regions.map(async (region) => {
          const res = await fetch(`/api/${region}`);
          const json = await res.json();
          return json;
        })
      );

      const timestamp = new Date().toLocaleTimeString();
      const formattedData = results.map((r) => ({
        timestamp,
        region: r.region,
        latency: r.latency,
      }));

      setData((prev) => [...prev.slice(-20), ...formattedData]);
    } catch (err) {
      console.error("Error fetching latency data:", err);
    }
  };

  useEffect(() => {
    fetchLatency();
    const interval = setInterval(fetchLatency, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter only the regions currently active
  const filteredData = data.filter((item) =>
    activeRegions.includes(item.region)
  );

  // Group by timestamp for chart rendering
  const groupedData = Object.values(
    filteredData.reduce((acc: Record<string, any>, { timestamp, region, latency }) => {
      if (!acc[timestamp]) acc[timestamp] = { timestamp };
      acc[timestamp][region] = latency;
      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={groupedData}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        {activeRegions.includes("Asia") && (
          <Line type="monotone" dataKey="Asia" stroke="#4ade80" dot={false} />
        )}
        {activeRegions.includes("US") && (
          <Line type="monotone" dataKey="US" stroke="#facc15" dot={false} />
        )}
        {activeRegions.includes("EU") && (
          <Line type="monotone" dataKey="EU" stroke="#60a5fa" dot={false} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
