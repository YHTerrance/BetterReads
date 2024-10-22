/** @type {import('next').NextConfig} */
// https://covers.openlibrary.org/b/id/9002334-L.jpg
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '**',
        },
      ],
    },
};

export default nextConfig;
