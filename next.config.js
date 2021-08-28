require("dotenv").config({ path: `${process.env.ENVIRONMENT}` });

module.exports = {
  reactStrictMode: true,
  env: {
    apiKey: "AIzaSyAZx1s1bsMESqA49HfUd259-6dummrqjfs",
    authDomain: "localizations-987a7.firebaseapp.com",
    databaseURL: "https://localizations-987a7-default-rtdb.firebaseio.com",
    projectId: "localizations-987a7",
    storageBucket: "localizations-987a7.appspot.com",
    messagingSenderId: "642731250265",
    appId: "1:642731250265:web:4e310677de6bfffe52d748",
    measurementId: "G-6P2CG0TN2S",
  },
};
