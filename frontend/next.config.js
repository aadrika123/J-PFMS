/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/pfms",
  env: {
    // backend: "http://localhost:8000",
    backend: "http://jharkhandegov.com:8000",
    img_base: "http://localhost:2001/public/pdfs/"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aadrikainfomedia.com',
        pathname: '/dms/upload/**',
      },
    ],
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
