import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },

  serverExternalPackages: ["@aws-sdk/client-s3", "sharp"],

  transpilePackages: [
    "@ecom/lib",
    "@ecom/config",
    "@ecom/types",
    "@ecom/prisma",
    "@ecom/trpc",
    "@ecom/features",
    "@ecom/ui",
  ],

  async rewrites() {
    const apiUrl =
      process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
