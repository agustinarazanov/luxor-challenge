import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "imgproxy.cryptojobslist.com",
                port: "",
                pathname: "/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
