"use client";

import React, { useEffect, useRef } from "react";
import { cloudRegions, CloudRegion } from "./data/cloudRegions";

interface LatencyGlobeProps {
  activeRegions: string[];
  latencyData: Record<string, number>;
}

export default function LatencyGlobe({
  activeRegions,
  latencyData,
}: LatencyGlobeProps) {
  const globeContainerRef = useRef<HTMLDivElement | null>(null);
  const globeInstanceRef = useRef<any>(null);

  // 🟢 Initialize the globe once
  useEffect(() => {
    if (typeof window === "undefined" || !globeContainerRef.current) return;
    let mounted = true;

    import("globe.gl").then((mod) => {
      if (!mounted || !globeContainerRef.current) return;
      const Globe = mod.default;
      const globe = new Globe(globeContainerRef.current);

      // Map cloudRegions -> globe points
      const points = cloudRegions.map((region: CloudRegion) => ({
        name: region.name,
        lat: region.lat,
        lng: region.lng,
        color: region.color,
      }));

      globe
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
        .showAtmosphere(true)
        .atmosphereColor("lightskyblue")
        .atmosphereAltitude(0.25)
        .pointOfView({ lat: 20, lng: 0, altitude: 2.2 })
        .pointsData(points)
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

  // 🔁 Update arcs dynamically when activeRegions or latencyData change
  useEffect(() => {
    const globe = globeInstanceRef.current;
    if (!globe || typeof globe.arcsData !== "function") return;

    // Filter active region objects with strong typing
    const activeRegionObjects: CloudRegion[] = cloudRegions.filter(
      (r: CloudRegion) => activeRegions.includes(r.provider)
    );

    // Build arcs between every pair of active regions
    const arcs = [] as Array<{
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
      color: string[] | string;
    }>;

    for (let i = 0; i < activeRegionObjects.length; i++) {
      for (let j = i + 1; j < activeRegionObjects.length; j++) {
        const a = activeRegionObjects[i];
        const b = activeRegionObjects[j];

        const latencyA = latencyData[a.provider] ?? 100;
        const latencyB = latencyData[b.provider] ?? 100;
        const avgLatency = (latencyA + latencyB) / 2;

        const color =
          avgLatency < 70
            ? ["limegreen", "limegreen"]
            : avgLatency < 100
            ? ["yellow", "orange"]
            : ["red", "darkred"];

        arcs.push({
          startLat: a.lat,
          startLng: a.lng,
          endLat: b.lat,
          endLng: b.lng,
          color,
        });
      }
    }

    // Apply arcs and animation styles
    globe
      .arcsData(arcs)
      .arcColor((d: any) => d.color)
      .arcAltitude(0.3)
      .arcStroke(0.8)
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(4000);
  }, [activeRegions, latencyData]);

  return (
    <div
      ref={globeContainerRef}
      style={{
        width: "100%",
        height: "100%",
        background: "black",
      }}
    />
  );
}
