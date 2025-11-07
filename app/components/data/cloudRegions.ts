// app/components/data/cloudRegions.ts

export interface CloudRegion {
  name: string;
  provider: "AWS" | "GCP" | "Azure";
  lat: number;
  lng: number;
  color: string;
  size: number;
}

export const cloudRegions: CloudRegion[] = [
  // -------- AWS Regions --------
  { name: "AWS US East (N. Virginia)", provider: "AWS", lat: 38.9586, lng: -77.3570, color: "orange", size: 0.3 },
  { name: "AWS US West (Oregon)", provider: "AWS", lat: 45.5231, lng: -122.6765, color: "orange", size: 0.3 },
  { name: "AWS Europe (Ireland)", provider: "AWS", lat: 53.4129, lng: -8.2439, color: "orange", size: 0.3 },
  { name: "AWS Asia Pacific (Singapore)", provider: "AWS", lat: 1.3521, lng: 103.8198, color: "orange", size: 0.3 },
  { name: "AWS Asia Pacific (Tokyo)", provider: "AWS", lat: 35.6528, lng: 139.8395, color: "orange", size: 0.3 },
  { name: "AWS South America (São Paulo)", provider: "AWS", lat: -23.5505, lng: -46.6333, color: "orange", size: 0.3 },

  // -------- GCP Regions --------
  { name: "GCP US Central (Iowa)", provider: "GCP", lat: 41.8780, lng: -93.0977, color: "lightgreen", size: 0.3 },
  { name: "GCP Europe West (Belgium)", provider: "GCP", lat: 50.5039, lng: 4.4699, color: "lightgreen", size: 0.3 },
  { name: "GCP Asia East (Taiwan)", provider: "GCP", lat: 25.0330, lng: 121.5654, color: "lightgreen", size: 0.3 },
  { name: "GCP Asia South (Mumbai)", provider: "GCP", lat: 19.0760, lng: 72.8777, color: "lightgreen", size: 0.3 },
  { name: "GCP Australia Southeast (Sydney)", provider: "GCP", lat: -33.8688, lng: 151.2093, color: "lightgreen", size: 0.3 },
  { name: "GCP South America East (São Paulo)", provider: "GCP", lat: -23.5505, lng: -46.6333, color: "lightgreen", size: 0.3 },

  // -------- Azure Regions --------
  { name: "Azure East US", provider: "Azure", lat: 37.4316, lng: -78.6569, color: "skyblue", size: 0.3 },
  { name: "Azure West US 2", provider: "Azure", lat: 47.6062, lng: -122.3321, color: "skyblue", size: 0.3 },
  { name: "Azure North Europe (Ireland)", provider: "Azure", lat: 53.1424, lng: -7.6921, color: "skyblue", size: 0.3 },
  { name: "Azure West Europe (Netherlands)", provider: "Azure", lat: 52.1326, lng: 5.2913, color: "skyblue", size: 0.3 },
  { name: "Azure Southeast Asia (Singapore)", provider: "Azure", lat: 1.3521, lng: 103.8198, color: "skyblue", size: 0.3 },
  { name: "Azure Japan East (Tokyo)", provider: "Azure", lat: 35.6762, lng: 139.6503, color: "skyblue", size: 0.3 },
];
