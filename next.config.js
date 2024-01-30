/** @type {import('next').NextConfig} */

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const nextConfig = {
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com', 'daisyui.com'],
  },
  webpack: function (config) {
    config.plugins.push(new LodashModuleReplacementPlugin({}));
    return config;
  },
};

module.exports = nextConfig;
