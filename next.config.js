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
