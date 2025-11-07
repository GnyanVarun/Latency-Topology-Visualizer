import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //output: 'export', // 👈 enables static export (creates /out)
  images: {
    unoptimized: true, // required for static hosting like Firebase
  },
};

export default nextConfig;
