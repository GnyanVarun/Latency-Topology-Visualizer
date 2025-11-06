"use client";

import React, { useEffect, useState } from "react";
import LatencyChart from "./LatencyChart";
import LatencyGlobe from "./LatencyGlobe";


type LatencyData = {
  region: string;
  latency: number;
  timestamp: string;
};

export default function LatencyDashboard() {
  const [data, setData] = useState<LatencyData[]>([]);
  const [activeRegions, setActiveRegions] = useState<string[]>(["Asia", "US", "EU"]);
  const regions = ["pingAsia", "pingUS", "pingEU"];
  <LatencyGlobe activeRegions={activeRegions} />

  const fetchLatency = async () => {
    try {
      const results = await Promise.all(
        regions.map(async (region) => {
          const res = await fetch(`/api/${region}`);
          return res.json();
        })
      );
      setData(results);
    } catch (err) {
      console.error("Error fetching latency:", err);
    }
  };

  useEffect(() => {
    fetchLatency();
    const interval = setInterval(fetchLatency, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRegionToggle = (region: string) => {
    setActiveRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const filteredData = data.filter((item) => activeRegions.includes(item.region));

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        🌐 Real-time Latency Dashboard
      </h1>

      {/* Region Filters */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
        {["Asia", "US", "EU"].map((region) => (
          <label key={region} style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={activeRegions.includes(region)}
              onChange={() => handleRegionToggle(region)}
              style={{ marginRight: "8px" }}
            />
            {region}
          </label>
        ))}
      </div>

      {/* Chart Section */}
      <div style={{ marginBottom: "2rem" }}>
        <LatencyChart activeRegions={activeRegions} />
      </div>

      {/* Table Section */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid gray", textAlign: "left", padding: "10px" }}>Region</th>
            <th style={{ borderBottom: "1px solid gray", textAlign: "left", padding: "10px" }}>Latency (ms)</th>
            <th style={{ borderBottom: "1px solid gray", textAlign: "left", padding: "10px" }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.region}>
              <td style={{ padding: "10px" }}>{item.region}</td>
              <td
                style={{
                  padding: "10px",
                  color:
                    item.latency < 80
                      ? "lightgreen"
                      : item.latency < 120
                      ? "yellow"
                      : "red",
                }}
              >
                {item.latency}
              </td>
              <td style={{ padding: "10px" }}>
                {new Date(item.timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
