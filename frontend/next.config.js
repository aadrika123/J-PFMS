/** @type {import('next').NextConfig} */
module.exports = {
    basePath: '/pfms',
    env: {
      backend: 'http://localhost:8000',
    },
     async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
          permanent: true,
        },
      ]
    },
  }

