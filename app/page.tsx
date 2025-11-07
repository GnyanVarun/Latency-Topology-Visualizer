"use client";

import React, { useEffect, useState } from "react";
import LatencyDashboard from "./components/LatencyDashboard";
import LatencyGlobe from "./components/LatencyGlobe";
import { fetchAllLatencies } from "./fetchLatency"; // make sure path is correct

export default function Home() {
  const [activeRegions, setActiveRegions] = useState<string[]>([
    "AWS",
    "GCP",
    "Azure",
  ]);
  const [latencyData, setLatencyData] = useState<Record<string, number>>({
    AWS: 0,
    GCP: 0,
    Azure: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    async function updateLatencies() {
      try {
        const latencies = await fetchAllLatencies();
        if (!mounted) return;
        setLatencyData(latencies);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch latencies:", err);
      }
    }

    // initial fetch
    updateLatencies();

    // interval refresh
    const interval = setInterval(updateLatencies, 5000); // every 5s
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <main
      style={{
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 🌍 Globe */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <LatencyGlobe activeRegions={activeRegions} latencyData={latencyData} />
      </div>

      {/* 🧭 Dashboard */}
      <div style={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}>
        <LatencyDashboard
          latencyData={latencyData}
          loading={loading}
          onRegionChange={setActiveRegions}
        />
      </div>
    </main>
  );
}
