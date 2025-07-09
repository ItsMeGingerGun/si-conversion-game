const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  }
};
