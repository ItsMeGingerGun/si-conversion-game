const path = require('path');

module.exports = {
   async headers() {
    return [
      {
        source: '/.well-known/farcaster.json',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        source: '/api/frame',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Farcaster-Frame-Version', value: 'vNext' },
        ],
      },
        {
        source: '/frame.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
    
};
