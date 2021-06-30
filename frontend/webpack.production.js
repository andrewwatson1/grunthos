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
    path: path.resolve(__dirname, `builds/production`),
    filename: "[name].[contenthash].js",
    publicPath: site.production.url
  },

  mode: "production",

  // Add-ons
  plugins: [

    // Clean the build directory first
    new CleanWebpackPlugin(),

    // Copy static assets NOT imported to any component - both app and site
    new CopyPlugin({
      patterns: [
        { from: `./src/_static`, to: "./" }
      ]
    }),

    // Dynamically create an html file to server bundle
    new HtmlWebPackPlugin({
      template: `./src/index.html`,
      url: site.production.url
    }),

    // Environmental
    new webpack.DefinePlugsssssin({
      "process.env.URL": JSON.stringify(site.production.url),
      "process.env.URL_API": JSON.stringify(site.production.urlApi),
      "process.env.SESSION_COOKIE_NAME": JSON.stringify(site.production.sessionCookieName),
      "process.env.DROPTYPE_ID": JSON.stringify(site.production.dropTypeId)
    })

  ]

});
