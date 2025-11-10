# 🌐 Latency Topology Visualizer

A real-time interactive **network latency visualization dashboard** built with **Next.js, React, and Globe.gl**, designed to visually represent region-to-region connectivity and latency trends across global cloud providers (AWS, GCP, Azure).  
This project demonstrates strong engineering, visualization, and data interaction skills — combining creative UI with real-time data simulation.

---

### 🔗 **Live Demo**
🌍 [View the Hosted App on Netlify](https://latency-topology-visualizer-varun.netlify.app/)

---

## 🚀 Overview

The **Latency Topology Visualizer** provides a 3D **global network visualization** integrated with a **real-time latency dashboard**.  
It simulates cloud region interconnections (Asia, US, EU) and displays live latency updates, historical trends, and exchange pair interactions.

It offers reviewers an immersive experience of **how latency changes across regions and over time**, bridging 3D visualization with live chart analytics.

---

## ✨ Key Features

- 🌎 **Interactive 3D Globe** using `globe.gl`
- 📡 **Real-time Latency Simulation** between cloud regions (AWS, GCP, Azure)
- ⚙️ **Region & Exchange Pair Filters** – toggle visibility of regions and specific exchange connections
- ⏱️ **Historical Latency Trends** – view past performance data across:
  - 1 Hour  
  - 24 Hours  
  - 7 Days  
  - 30 Days  
- 📊 **Dynamic Time-Series Chart** using `Recharts`
- 📈 **Statistics Summary** – view min, max, and average latency for the selected range
- 💻 **Responsive Design** for all screen sizes
- ☁️ **Deployed on Netlify** for instant global access

---

## 🧩 Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Framework** | [Next.js (React, TypeScript)](https://nextjs.org/) |
| **3D Visualization** | [Globe.gl](https://github.com/vasturiano/globe.gl) |
| **Charts** | [Recharts](https://recharts.org/en-US/) |
| **Styling** | Tailwind CSS + Custom CSS |
| **Hosting** | Netlify |
| **Data Simulation** | In-memory random latency generation |

---

## 🏗️ System Architecture

1. **Globe Visualization (`Globe.tsx`)**
   - Displays real-time animated arcs between regions.
   - Highlights region-based latency visually.

2. **Latency Dashboard (`LatencyDashboard.tsx`)**
   - Handles region and exchange pair toggles.
   - Simulates live latency data updates every 5 seconds.
   - Integrates time range filters (1h, 24h, 7d, 30d).

3. **Historical Chart (`HistoricalChart.tsx`)**
   - Renders latency trends over the selected time range using `Recharts`.
   - Dynamically updates X-axis and Y-axis scaling based on time filter.

4. **Cloud Regions (`cloudRegions.ts`)**
   - Stores metadata for cloud providers and their coordinates on the globe.

5. **Main Page (`page.tsx`)**
   - Integrates the 3D globe and dashboard components into a unified experience.

---

## 🛠️ Installation & Setup

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/GnyanVarun/Latency-Topology-Visualizer.git

# Navigate into the project directory
cd Latency-Topology-Visualizer

# Install dependencies
npm install

# Run the development server
npm run dev

# Visit the app in your browser
http://localhost:3000
```

## 🌐 Deployment

The project is live on Netlify, accessible here:
🔗 <a href = "https://latency-topology-visualizer-varun.netlify.app/">Latency Topology Visualizer (Live Demo)</a>

## 🧠 Learnings and Experience
<ul>
  <li>Structuring scalable Next.js applications.</li>
  <li>Integrating React components with API routes.</li>
  <li>Visualizing asynchronous data dynamically.</li>
  <li>Handling build and deployment processes through Netlify and Firebase.</li>
  <li>Understanding real-time feedback loops and UI responsiveness.</li>
</ul>

## 🧾 License
This project is open-source and available under the MIT License.
