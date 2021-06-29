/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

// Get the site config
const site = require("./site.config");

module.exports = merge(common, {

  // How build should be ouput:
  output: {
    path: path.resolve(__dirname, `builds/dev`),
    filename: "[name].[contenthash].js",
    publicPath: site.dev.url
  },

  // Disables packaging
  mode: "development",

  // Better debugging
  devtool: "source-map",

  // Dev server
  devServer: {

    // Push updates
    hot: true,

    // Where we are served from
    publicPath: site.dev.url

  },

  // Add-ons
  plugins: [

    // Copy static assets NOT imported to any component
    new CopyPlugin({
      patterns: [
        { from: `./src/_static`, to: "./" }
      ]
    }),

    // Dynamically create an html file to serve bundle
    new HtmlWebPackPlugin({
      template: `./src/index.html`,
      url: site.dev.url
    }),

    // Environmental
    new webpack.DefinePlugin({
      "process.env.URL": JSON.stringify(site.dev.url),
      "process.env.URL_API": JSON.stringify(site.dev.urlApi),
      "process.env.SESSION_COOKIE_NAME": JSON.stringify(site.dev.sessionCookieName)
    })
  ]

});
