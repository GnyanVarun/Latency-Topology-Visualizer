"use client";

import React, { useState, useEffect } from "react";
import HistoricalChart from "./HistoricalChart";

interface LatencyDashboardProps {
  latencyData: Record<string, number>;
  loading?: boolean;
  onRegionChange?: (regions: string[]) => void;
}

export default function LatencyDashboard({
  latencyData,
  loading = false,
  onRegionChange,
}: LatencyDashboardProps) {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "AWS",
    "GCP",
    "Azure",
  ]);

  // 🔔 Notify parent when selected regions change
  useEffect(() => {
    onRegionChange?.(selectedRegions);
  }, [selectedRegions, onRegionChange]);

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  return (
    <div
      style={{
        padding: "1rem",
        color: "white",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: "1rem",
        width: "320px",
        margin: "1rem",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        ☁️ Cloud Latency Dashboard
      </h2>

      {loading ? (
        <p style={{ color: "lightgray" }}>Loading latency data...</p>
      ) : (
        Object.entries(latencyData).map(([region, value]) => (
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
                padding: "0.4rem 1rem",
                border: "none",
                borderRadius: "0.5rem",
                backgroundColor: selectedRegions.includes(region)
                  ? "limegreen"
                  : "gray",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.2s ease",
              }}
            >
              {region}
            </button>
            <span>{value ? `${value.toFixed(0)} ms` : "--"}</span>
          </div>
        ))
      )}

      <div style={{ marginTop: "1rem" }}>
        <HistoricalChart data={latencyData} />
      </div>
    </div>
  );
}
