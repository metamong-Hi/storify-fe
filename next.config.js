/** @type {import('next').NextConfig} */

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
  openAnalyzer: true,
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com', 'daisyui.com'],
  },
  webpack: function (config) {
    config.plugins.push(new LodashModuleReplacementPlugin({}));
    return config;
  },
};

module.exports = {
  withBundleAnalyzer,
  nextConfig,
};
