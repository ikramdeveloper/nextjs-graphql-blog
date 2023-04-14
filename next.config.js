/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
  images: {
    domains: ["www.cloudinary.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
