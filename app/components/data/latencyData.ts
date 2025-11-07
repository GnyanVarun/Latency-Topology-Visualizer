// app/components/data/latencyData.ts
import { cloudRegions } from "./cloudRegions";

export interface LatencyLink {
  from: string;
  to: string;
  latency: number; // in milliseconds
  color: string;
}

function findRegion(name: string) {
  return cloudRegions.find((r) => r.name === name)!;
}

// Simulated latencies between cloud providers and continents
export const latencyLinks: LatencyLink[] = [
  {
    from: "AWS US East (N. Virginia)",
    to: "Azure East US",
    latency: 20,
    color: "orange",
  },
  {
    from: "AWS US West (Oregon)",
    to: "GCP US Central (Iowa)",
    latency: 35,
    color: "lightgreen",
  },
  {
    from: "GCP Asia East (Taiwan)",
    to: "Azure Southeast Asia (Singapore)",
    latency: 45,
    color: "skyblue",
  },
  {
    from: "AWS Europe (Ireland)",
    to: "Azure West Europe (Netherlands)",
    latency: 25,
    color: "orange",
  },
  {
    from: "AWS Asia Pacific (Singapore)",
    to: "GCP Asia South (Mumbai)",
    latency: 65,
    color: "lightgreen",
  },
  {
    from: "AWS South America (São Paulo)",
    to: "Azure West US 2",
    latency: 110,
    color: "skyblue",
  },
  {
    from: "Azure Japan East (Tokyo)",
    to: "GCP Asia East (Taiwan)",
    latency: 30,
    color: "skyblue",
  },
];

// Convert region names to lat/lng coordinates for the globe arcs
export const globeArcs = latencyLinks.map((link) => {
  const fromRegion = findRegion(link.from);
  const toRegion = findRegion(link.to);
  return {
    ...link,
    startLat: fromRegion.lat,
    startLng: fromRegion.lng,
    endLat: toRegion.lat,
    endLng: toRegion.lng,
  };
});
