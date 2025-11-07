"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HistoricalChartProps {
  data: Record<string, number>;
}

export default function HistoricalChart({ data }: HistoricalChartProps) {
  const chartData = Object.keys(data).map((region) => ({
    name: region,
    latency: Number(data[region].toFixed(0)),
  }));

  return (
    <div style={{ height: 200, width: "100%" }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Line type="monotone" dataKey="latency" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
