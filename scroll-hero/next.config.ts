/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This creates the "out" folder for GitHub
  images: {
    unoptimized: true, // Necessary for static export
  },
};

export default nextConfig;