"use client";

import React, { useEffect, useRef } from "react";
import { cloudRegions, CloudRegion } from "./data/cloudRegions";
import { exchangeServers, ExchangeServer } from "./data/exchangeServers";

interface LatencyGlobeProps {
  activeRegions: string[];
  latencyData: Record<string, number>;
}

export default function LatencyGlobe({ activeRegions, latencyData }: LatencyGlobeProps) {
  const globeContainerRef = useRef<HTMLDivElement | null>(null);
  const globeInstanceRef = useRef<any>(null);

  // 🌍 Initialize globe
  useEffect(() => {
    if (typeof window === "undefined" || !globeContainerRef.current) return;
    let mounted = true;

    import("globe.gl").then((mod) => {
      if (!mounted || !globeContainerRef.current) return;

      const Globe = mod.default;
      const globe = new Globe(globeContainerRef.current);

      // 🟦 Prepare cloud region points
      const cloudPoints = cloudRegions.map((r: CloudRegion) => ({
        name: `${r.name} (${r.provider})`,
        lat: r.lat,
        lng: r.lng,
        color:
          r.provider === "AWS"
            ? "orange"
            : r.provider === "GCP"
            ? "limegreen"
            : "deepskyblue",
      }));

      // 🟢 Prepare exchange server points
      const exchangePoints = exchangeServers.map((e: ExchangeServer) => ({
        name: `${e.name} (${e.location})`,
        lat: e.lat,
        lng: e.lng,
        color:
          e.provider === "AWS"
            ? "gold"
            : e.provider === "GCP"
            ? "cyan"
            : "violet",
      }));

      const allPoints = [...cloudPoints, ...exchangePoints];

      globe
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
        .showAtmosphere(true)
        .atmosphereColor("lightskyblue")
        .atmosphereAltitude(0.25)
        .pointOfView({ lat: 20, lng: 0, altitude: 2.2 })
        .pointsData(allPoints)
        .pointColor((d: any) => d.color)
        .pointAltitude(0.05)
        .pointLabel((d: any) => d.name);

      globeInstanceRef.current = globe;
    });

    return () => {
      mounted = false;
      if (globeContainerRef.current) globeContainerRef.current.innerHTML = "";
      globeInstanceRef.current = null;
    };
  }, []);

  // 🔁 Animated latency arcs (pulsing)
  useEffect(() => {
    const globe = globeInstanceRef.current;
    if (!globe || typeof globe.arcsData !== "function") return;

    const arcs: any[] = [];

    exchangeServers.forEach((ex) => {
      // Filter for same provider or nearby 2 cloud regions
      const nearbyRegions = cloudRegions
        .filter((r) => r.provider === ex.provider)
        .slice(0, 2);

      nearbyRegions.forEach((r) => {
        const latency = latencyData[r.provider] ?? 100;
        const color =
          latency < 70
            ? ["limegreen", "limegreen"]
            : latency < 100
            ? ["yellow", "orange"]
            : ["red", "darkred"];

        arcs.push({
          startLat: ex.lat,
          startLng: ex.lng,
          endLat: r.lat,
          endLng: r.lng,
          color,
        });
      });
    });

    globe
      .arcsData(arcs)
      .arcColor((d: any) => d.color)
      .arcAltitude(0.25)
      .arcStroke(0.8)
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(3000); // ⏳ Faster pulsing arcs
  }, [activeRegions, latencyData]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "black",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      {/* 🌐 Globe */}
      <div ref={globeContainerRef} style={{ width: "100%", height: "100%" }} />

      {/* 🧭 Legend Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "10px 14px",
          borderRadius: "8px",
          color: "white",
          fontSize: "0.9rem",
          lineHeight: "1.4",
        }}
      >
        <strong style={{ fontSize: "1rem" }}>Legend</strong>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
          <span>
            <span style={{ color: "orange" }}>●</span> AWS Cloud Region
          </span>
          <span>
            <span style={{ color: "limegreen" }}>●</span> GCP Cloud Region
          </span>
          <span>
            <span style={{ color: "deepskyblue" }}>●</span> Azure Cloud Region
          </span>
          <span>
            <span style={{ color: "gold" }}>●</span> AWS Exchange Server
          </span>
          <span>
            <span style={{ color: "cyan" }}>●</span> GCP Exchange Server
          </span>
          <span>
            <span style={{ color: "violet" }}>●</span> Azure Exchange Server
          </span>
        </div>
      </div>
    </div>
  );
}
