/* eslint-disable */

// Get the site config
const site = require("./site.config");

// Webpack config
module.exports = {

  // Each prop is an entry point and creates it's own file on build
  entry: {
    "app": `./src/app.js`
  },

  // Tasks
  module: {

    // For every file webpack looks at, run all these
    rules: [

      // Is it a Javascript file?
      {
        test: /\.js$/i,
        include: /src/,
        use: [
          // 1 -> Let babel do it's thing
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react"
              ]
            }
          }

        ]
      }

    ]

  }

};
