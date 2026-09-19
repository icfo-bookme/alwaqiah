const nextConfig = {
  async redirects() {
    return [
      {
        source: '/payment',
        destination: '/faqs',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1' },
      { protocol: 'https', hostname: 'freecvbd.com' },
      { protocol: 'https', hostname: 'admin.bookme.com.bd' },
      { protocol: 'https', hostname: 'bookme.com.bd' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'alwaqiah.bookme.com.bd' },
    ],
  },
};

export default nextConfig;
  