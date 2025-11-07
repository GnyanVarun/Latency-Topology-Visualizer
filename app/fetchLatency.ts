// app/utils/fetchLatency.ts
export type Provider = "AWS" | "GCP" | "Azure";

interface LatencyResult {
  provider: Provider;
  latency: number; // in milliseconds
}

const endpoints: Record<Provider, string> = {
  AWS: "https://dynamodb.us-west-2.amazonaws.com", // Oregon
  GCP: "https://storage.googleapis.com", // Google Cloud Storage
  Azure: "https://azure.microsoft.com", // Azure site (CDN front)
};

export async function fetchLatency(provider: Provider): Promise<LatencyResult> {
  const start = performance.now();
  try {
    await fetch(endpoints[provider], { method: "HEAD", mode: "no-cors" });
  } catch {
    // no-cors requests don’t give a response, but timing still works
  }
  const latency = performance.now() - start;
  return { provider, latency };
}

export async function fetchAllLatencies(): Promise<Record<Provider, number>> {
  const results = await Promise.all(
    (Object.keys(endpoints) as Provider[]).map(fetchLatency)
  );
  const latencyMap: Record<Provider, number> = {
    AWS: 0,
    GCP: 0,
    Azure: 0,
  };
  results.forEach((r) => (latencyMap[r.provider] = Math.round(r.latency)));
  return latencyMap;
}
