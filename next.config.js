/** @type {import('next').NextConfig} */

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
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

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
