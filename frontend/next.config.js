/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/pfms",
  env: {
    backend: "http://localhost:8000",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
