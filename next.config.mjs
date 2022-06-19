/** @type {import('next').NextConfig} */
import { withContentlayer } from 'next-contentlayer';

export default withContentlayer({
  reactStrictMode: true,

  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
  },
});
