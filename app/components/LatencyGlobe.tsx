"use client";

import React, { useEffect, useRef } from "react";

interface LatencyGlobeProps {
  activeRegions?: string[];
}

type RegionKey = "Asia" | "US" | "EU";

const NORMALIZE: Record<string, RegionKey> = {
  Asia: "Asia",
  US: "US",
  EU: "EU",
  pingAsia: "Asia",
  pingUS: "US",
  pingEU: "EU",
};

export default function LatencyGlobe({
  activeRegions = ["Asia", "US", "EU"],
}: LatencyGlobeProps) {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const globeInstanceRef = useRef<any | null>(null);

  const regions: Record<RegionKey, { lat: number; lng: number }> = {
    Asia: { lat: 1.3521, lng: 103.8198 }, // Singapore
    US: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    EU: { lat: 52.52, lng: 13.405 }, // Berlin
  };

  const normalizeList = (list: string[]) =>
    Array.from(
      new Set(list.map((r) => NORMALIZE[r] || (r as RegionKey)))
    ).filter(Boolean) as RegionKey[];

  // --- Initialize Globe ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!globeRef.current) return;

    let mounted = true;

    import("globe.gl").then((mod) => {
      if (!mounted || !globeRef.current) return;

      const Globe = mod.default;
      const globe = new Globe(globeRef.current);

      globe
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
        .showAtmosphere(true)
        .atmosphereColor("lightskyblue")
        .atmosphereAltitude(0.25)
        .pointOfView({ lat: 20, lng: 0, altitude: 2.3 })
        .pointAltitude(0.05)
        .pointLabel((d: any) => d.name);

      // --- Initial Points ---
      const exchanges = (Object.keys(regions) as RegionKey[]).map((name) => ({
        name,
        lat: regions[name].lat,
        lng: regions[name].lng,
        color:
          name === "Asia" ? "orange" : name === "US" ? "lightgreen" : "skyblue",
      }));

      globe.pointsData(exchanges).pointColor((d: any) => d.color);

      // --- Animated Arcs (always render at least once) ---
      const arcs = [
        { start: "Asia", end: "US", color: ["orange", "lightgreen"] },
        { start: "US", end: "EU", color: ["lightgreen", "skyblue"] },
        { start: "EU", end: "Asia", color: ["skyblue", "orange"] },
      ].map((a) => ({
        startLat: regions[a.start as RegionKey].lat,
        startLng: regions[a.start as RegionKey].lng,
        endLat: regions[a.end as RegionKey].lat,
        endLng: regions[a.end as RegionKey].lng,
        color: a.color,
      }));

      globe
        .arcsData(arcs)
        .arcColor((d: any) => d.color)
        .arcAltitude(0.3)
        .arcStroke(0.7)
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(4000); // 4s looping animation

      globeInstanceRef.current = globe;
    });

    return () => {
      mounted = false;
      if (globeRef.current) globeRef.current.innerHTML = "";
      globeInstanceRef.current = null;
    };
  }, []);

  // --- Update arcs dynamically when activeRegions changes ---
  useEffect(() => {
    const globe = globeInstanceRef.current;
    if (!globe) return;

    const active = normalizeList(activeRegions || []);

    // Build points for visible regions
    const points = (Object.keys(regions) as RegionKey[])
      .map((name) => ({
        name,
        lat: regions[name].lat,
        lng: regions[name].lng,
        color:
          name === "Asia" ? "orange" : name === "US" ? "lightgreen" : "skyblue",
        visible: active.includes(name),
      }))
      .filter((p) => p.visible);

    globe.pointsData(points);

    // Build arcs between active regions only
    const allArcs = [
      { start: "Asia", end: "US", color: ["orange", "lightgreen"] },
      { start: "US", end: "EU", color: ["lightgreen", "skyblue"] },
      { start: "EU", end: "Asia", color: ["skyblue", "orange"] },
    ] as { start: RegionKey; end: RegionKey; color: string[] }[];

    const visibleArcs = allArcs
      .filter((a) => active.includes(a.start) && active.includes(a.end))
      .map((a) => ({
        startLat: regions[a.start].lat,
        startLng: regions[a.start].lng,
        endLat: regions[a.end].lat,
        endLng: regions[a.end].lng,
        color: a.color,
      }));

    // ✅ ensure arcs visible again after re-renders
    globe
      .arcsData(visibleArcs)
      .arcColor((d: any) => d.color)
      .arcAltitude(0.3)
      .arcStroke(0.7)
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(4000);
  }, [activeRegions]);

  return (
    <div
      ref={globeRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 480,
        background: "black",
      }}
    />
  );
}
