// All in one place
/* global module */
module.exports = {

  // Unique, name of site folder
  id: "grunthos",

  // Dev environment
  dev: {
    url: "http://localhost:8080",
    urlApi: "http://localhost:5903",
    sessionCookieName: "grunthosUserDev",
    dropTypeId: "c1fc9100-c167-44d6-9f67-1d344189deda"
  },

  // Staging environment
  staging: {
    url: "https://staging.snowcrash.com",
    urlApi: "https://api.snowcrash.com",
    sessionCookieName: "grunthosUserStaging",
    dropTypeId: "ee5cf6ac-2798-4d9e-b982-48c9819b6361"
  },

  // Production
  production: {
    url: "https://snowcrash.com",
    urlApi: "https://api.snowcrash.com",
    sessionCookieName: "grunthosUser",
    dropTypeId: "ee5cf6ac-2798-4d9e-b982-48c9819b6361"
  }

};