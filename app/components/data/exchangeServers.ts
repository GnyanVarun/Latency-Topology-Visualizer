export interface ExchangeServer {
    name: string;
    location: string;
    lat: number;
    lng: number;
    provider: "AWS" | "GCP" | "Azure";
    color: string;
    size: number;
  }
  
  export const exchangeServers: ExchangeServer[] = [
    { name: "Binance", location: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, provider: "AWS", color: "gold", size: 0.5 },
    { name: "OKX", location: "Singapore", lat: 1.3521, lng: 103.8198, provider: "Azure", color: "deepskyblue", size: 0.5 },
    { name: "Bybit", location: "Amsterdam, Netherlands", lat: 52.3676, lng: 4.9041, provider: "GCP", color: "violet", size: 0.5 },
    { name: "Deribit", location: "Zurich, Switzerland", lat: 47.3769, lng: 8.5417, provider: "AWS", color: "limegreen", size: 0.5 },
  ];
  