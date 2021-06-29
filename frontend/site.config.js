// All in one place
/* global module */
module.exports = {

  // Unique, name of site folder
  id: "grunthos",

  // Dev environment
  dev: {
    url: "http://localhost:8080",
    urlApi: "http://localhost:5903",
    sessionCookieName: "grunthosUserDev"
  },

  // Staging environment
  staging: {
    url: "https://staging.snowcrash.com",
    urlApi: "https://api.snowcrash.com",
    sessionCookieName: "grunthosUserStaging"
  },

  // Production
  production: {
    url: "https://snowcrash.com",
    urlApi: "https://api.snowcrash.com",
    sessionCookieName: "grunthosUser"
  }

};