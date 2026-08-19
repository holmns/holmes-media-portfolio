import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Testing on a phone means hitting the dev server over the LAN rather than
     localhost, and Next blocks cross-origin requests for dev assets by default -
     which silently withholds the client chunks, so the page renders but never
     hydrates. Dev only; the production build ignores this. Update the address if
     the router hands this machine a different lease. */
  allowedDevOrigins: ["192.168.31.169"],
};

export default nextConfig;
