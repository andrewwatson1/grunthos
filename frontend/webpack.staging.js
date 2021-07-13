/* global require module __dirname */

const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

// Get the environmental info
let site = require("./site.config");
site = site.staging;

module.exports = merge(common, {

  // How build should be ouput
  output: {
    path: path.resolve(__dirname, "builds/staging"),
    filename: "[name].[contenthash].js",
    publicPath: site.url
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
        { from: "./src/_static", to: "./" }
      ]
    }),

    // Dynamically create an html file to serve bundle
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      url: site.url
    }),

    // Environmental
    new webpack.DefinePlugin({
      "process.env.URL": JSON.stringify(site.url),
      "process.env.URL_API": JSON.stringify(site.urlApi),
      "process.env.SESSION_COOKIE_NAME": JSON.stringify(site.sessionCookieName),
      "process.env.DROPTYPE_ID": JSON.stringify(site.dropTypeId)
    })

  ]

});
