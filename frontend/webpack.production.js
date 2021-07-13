/* global require module __dirname */

// System
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

// Get the environmental info
let site = require("./site.config");
site = site.production;

module.exports = merge(common, {

  // How build should be ouput
  output: {
    path: path.resolve(__dirname, "builds/production"),
    filename: "[name].[contenthash].js",
    publicPath: site.url
  },

  mode: "production",

  // Add-ons
  plugins: [

    // Clean the build directory first
    new CleanWebpackPlugin(),

    // Copy static assets NOT imported to any component - both app and site
    new CopyPlugin({
      patterns: [
        { from: "./src/_static", to: "./" }
      ]
    }),

    // Dynamically create an html file to server bundle
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      url: site.url
    }),

    // Environmental
    new webpack.DefinePlugsssssin({
      "process.env.URL": JSON.stringify(site.url),
      "process.env.URL_API": JSON.stringify(site.urlApi),
      "process.env.SESSION_COOKIE_NAME": JSON.stringify(site.sessionCookieName),
      "process.env.DROPTYPE_ID": JSON.stringify(site.dropTypeId)
    })

  ]

});
