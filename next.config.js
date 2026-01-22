/** @type {import('next').NextConfig} */
const nextConfig = {
  // To powinno zablokować dopisywanie /pl do plików statycznych
  skipTrailingSlashRedirect: true,
  distDir: '.next',
  
  images: {
    unoptimized: true, // Ważne dla lokalnych plików w fazie dev
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "medusa-server-testing.up.railway.app" },
    ],
  },
}

module.exports = nextConfig