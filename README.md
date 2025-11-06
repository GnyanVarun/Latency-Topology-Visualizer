# 🌐 Latency Topology Visualizer

A real-time interactive **network latency visualization dashboard** built with **Next.js, React, and Globe.gl**, designed to visually represent region-to-region connectivity and latency patterns across the world.  
This project was built with deep dedication and attention to both engineering excellence and creative presentation.

### 🔗 **Live Demo**
🌍 [View the Hosted App on Netlify](https://latency-topology-visualizer-varun.netlify.app/)

---

## 🚀 Overview

The **Latency Topology Visualizer** provides a 3D global visualization of different geographical regions (Asia, US, and EU) and their interconnections.  
Each region lights up dynamically based on the simulated latency and active connections.

It allows users and reviewers to visually experience **real-time data flow between regions**, demonstrating how latency visualization and global topology tracking can be implemented using modern front-end technologies.

---

## ✨ Key Features

- 🌎 **3D Interactive Globe** using `globe.gl`
- 🛰️ **Real-time Arc Animations** showing network latency paths
- 📊 **Dynamic Table & Chart** for latency and connection data
- ⚙️ **API Endpoints** (`/api/pingAsia`, `/api/pingUS`, `/api/pingEU`) for simulated latency metrics
- 📱 **Responsive UI** that scales perfectly across devices
- ⚡ **Deployed on Netlify** for seamless public access
- 🧠 **Built with pure dedication**, integrating React, TypeScript, and Next.js seamlessly

---

## 🧩 Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend Framework** | [Next.js 14+ (React)](https://nextjs.org/) |
| **3D Visualization** | [Globe.gl](https://github.com/vasturiano/globe.gl) |
| **Charts** | [Recharts](https://recharts.org/en-US/) |
| **Styling** | Tailwind CSS |
| **Language** | TypeScript |
| **Hosting** | Netlify |
| **APIs** | Next.js API Routes (Serverless Functions) |

---

## 🏗️ System Architecture

1. **Frontend** — Next.js pages and components render the UI, chart, and globe visualization.
2. **API Layer** — Next.js serverless routes simulate latency data.
3. **Visualization** — The `LatencyGlobe.tsx` component handles 3D rendering and animated arcs.
4. **Data Flow** — API endpoints send latency data → Dashboard renders charts/tables → Globe visualizes region connectivity.
5. **Deployment** — The app is statically built and hosted on **Netlify** for free public access.

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
