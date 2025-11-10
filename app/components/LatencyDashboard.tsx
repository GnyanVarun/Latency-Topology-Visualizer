"use client";

import React, { useEffect, useState, useMemo } from "react";
import HistoricalChart from "./HistoricalChart";

interface LatencyDashboardProps {
  onRegionChange?: (regions: string[]) => void;
  onLatencyChange?: (data: Record<string, number>) => void;
}

type RangeKey = "1h" | "24h" | "7d" | "30d";

interface DataPoint {
  time: number; // epoch ms
  AWS: number;
  GCP: number;
  Azure: number;
  pairs?: Record<string, number>;
}

export default function LatencyDashboard({
  onRegionChange,
  onLatencyChange,
}: LatencyDashboardProps) {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "AWS",
    "GCP",
    "Azure",
  ]);
  const [selectedPairs, setSelectedPairs] = useState<string[]>([]);
  const exchangePairs = ["OKX-AWS", "Binance-GCP", "Bybit-Azure", "Deribit-AWS"];

  const [latencyData, setLatencyData] = useState<Record<string, number>>({
    AWS: 80,
    GCP: 95,
    Azure: 100,
  });

  const [history, setHistory] = useState<DataPoint[]>([]);
  const [timeRange, setTimeRange] = useState<RangeKey>("1h");

  // 🔹 Simulate live latency updates every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyData((prev) => {
        const updated = {
          AWS: Math.max(40, Math.round(prev.AWS + (Math.random() - 0.5) * 20)),
          GCP: Math.max(40, Math.round(prev.GCP + (Math.random() - 0.5) * 20)),
          Azure: Math.max(40, Math.round(prev.Azure + (Math.random() - 0.5) * 20)),
        };
        onLatencyChange?.(updated);
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [onLatencyChange]);

  // 🔹 Append new data to history
  useEffect(() => {
    const now = Date.now();
    const pairs: Record<string, number> = {
      "OKX-AWS": Math.round(latencyData.AWS + Math.random() * 50),
      "Binance-GCP": Math.round(latencyData.GCP + Math.random() * 50),
      "Bybit-Azure": Math.round(latencyData.Azure + Math.random() * 50),
      "Deribit-AWS": Math.round(latencyData.AWS + Math.random() * 40),
    };

    const newPoint: DataPoint = {
      time: now,
      AWS: latencyData.AWS,
      GCP: latencyData.GCP,
      Azure: latencyData.Azure,
      pairs,
    };

    setHistory((prev) => {
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      const filtered = prev.filter((p) => now - p.time < thirtyDays);
      return [...filtered, newPoint];
    });
  }, [latencyData]);

  // 🔹 Filter based on time range
  const filteredHistory = useMemo(() => {
    if (!history.length) return [];

    const now = Date.now();
    const ranges: Record<RangeKey, number> = {
      "1h": 1 * 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
    };

    const cutoff = now - ranges[timeRange];
    const filtered = history.filter((p) => p.time >= cutoff);

    // ✅ Always return a fresh copy so React sees it as new
    return [...filtered];
  }, [history, timeRange]);

  // 🔹 Notify parent when region changes
  useEffect(() => {
    onRegionChange?.(selectedRegions);
  }, [selectedRegions, onRegionChange]);

  const toggleRegion = (region: string) =>
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );

  const togglePair = (pair: string) =>
    setSelectedPairs((prev) =>
      prev.includes(pair) ? prev.filter((p) => p !== pair) : [...prev, pair]
    );

  return (
    <div
      style={{
        padding: "1rem",
        color: "white",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: "1rem",
        width: "360px",
        margin: "1rem",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>
        ☁️ Cloud Latency Dashboard
      </h2>

      {/* Region toggles */}
      {Object.entries(latencyData).map(([region, value]) => (
        <div
          key={region}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <button
            onClick={() => toggleRegion(region)}
            style={{
              padding: "0.35rem 0.9rem",
              border: "none",
              borderRadius: "0.5rem",
              backgroundColor: selectedRegions.includes(region)
                ? "limegreen"
                : "gray",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            {region}
          </button>
          <span>{Number(value).toFixed(0)} ms</span>
        </div>
      ))}

      {/* Exchange pairs */}
      <div style={{ marginTop: "0.8rem" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "0.4rem" }}>Exchange Pairs</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {exchangePairs.map((pair) => (
            <button
              key={pair}
              onClick={() => togglePair(pair)}
              style={{
                padding: "0.3rem 0.6rem",
                border: "none",
                borderRadius: "0.5rem",
                backgroundColor: selectedPairs.includes(pair)
                  ? "#2196f3"
                  : "#555",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {pair}
            </button>
          ))}
        </div>
      </div>

      {/* Time range buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {(["1h", "24h", "7d", "30d"] as RangeKey[]).map((r) => (
          <button
            key={r}
            onClick={() => setTimeRange(r)}
            style={{
              flex: 1,
              padding: "0.4rem 0.5rem",
              borderRadius: 8,
              border: "none",
              backgroundColor: timeRange === r ? "#4caf50" : "#444",
              color: "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Historical Chart */}
      <div style={{ marginTop: 14 }}>
        {/* 🔹 Added `key` to force chart update on range change */}
        <HistoricalChart
          key={timeRange}
          history={filteredHistory}
          selectedRegions={selectedRegions}
          selectedPairs={selectedPairs}
        />
      </div>
    </div>
  );
}
