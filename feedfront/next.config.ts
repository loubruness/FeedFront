import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_BACK_ADDRESS: `${process.env.NEXT_PUBLIC_BACK_ADDRESS}`,
  },
};

export default nextConfig;