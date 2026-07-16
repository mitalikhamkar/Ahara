const path = require('path');

module.exports = {
  style: {
    postcss: {
      mode: 'file',
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    port: process.env.PORT || 3000,
  },
};
