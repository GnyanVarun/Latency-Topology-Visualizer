export const metadata = {
  title: "Latency Topology Visualizer",
  description: "Visualizing crypto latency",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
