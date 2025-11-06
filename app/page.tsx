import LatencyDashboard from "./components/LatencyDashboard";
import LatencyGlobe from "./components/LatencyGlobe";

export default function Home() {
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
      {/* 🌍 Globe background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <LatencyGlobe />
      </div>

      {/* 🧭 Dashboard overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <LatencyDashboard />
      </div>
    </main>
  );
}
