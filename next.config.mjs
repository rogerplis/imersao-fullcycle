/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dqbqmkbmf/image/upload/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 's3-sa-east-1.amazonaws.com',
            port: '',
            pathname: '/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 'http2.mlstatic.com',
            port: '',
            pathname: '/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 'example.com',
            port: '',
            pathname: '/**',
            search: '',
          },
        ],
      },
    }
export default nextConfig;
