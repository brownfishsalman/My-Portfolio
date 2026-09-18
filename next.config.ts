import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" }],
  },
  // next dev otherwise writes AGENTS.md / CLAUDE.md into the repo on every start.
  agentRules: false,
};

export default nextConfig;
