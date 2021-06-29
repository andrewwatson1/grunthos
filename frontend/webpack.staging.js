/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

// Get the site config
const site = require("./site.config");

module.exports = merge(common, {

  // How build should be ouput
  output: {
    path: path.resolve(__dirname, `builds/staging`),
    filename: "[name].[contenthash].js",
    publicPath: site.staging.url
  },

  // As it would be
  mode: "production",

  // Add-ons
  plugins: [

    // Clean the build directory first
    new CleanWebpackPlugin(),

    // Copy static assets NOT imported to any component
    new CopyPlugin({
      patterns: [
        { from: `./src/_static`, to: "./" }
      ]
    }),

    // Dynamically create an html file to serve bundle
    new HtmlWebPackPlugin({
      template: `./src/index.html`,
      url: siteConfig.staging.url
    }),

    // Environmental
    new webpack.DefinePlugin({
      "process.env.URL": JSON.stringify(site.staging.url),
      "process.env.URL_API": JSON.stringify(site.staging.urlApi),
      "process.env.SESSION_COOKIE_NAME": JSON.stringify(site.staging.sessionCookieName),
    })

  ]

});
