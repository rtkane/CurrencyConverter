import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/CurrencyConverter",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;
