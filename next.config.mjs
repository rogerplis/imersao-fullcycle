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
        ],
      },
    }
export default nextConfig;
