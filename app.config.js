// app.config.js

export default ({ config }) => {
  const environment = process.env.APP_ENV || 'development';

  // Define common settings
  const commonSettings = {
    name: "PrahladApp",
    slug: "PrahladApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",  // Set your icon path
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",  // Set your splash image path
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",  // Set your adaptive icon foreground image path
        backgroundColor: "#ffffff",
      },
      permissions: [
        "INTERNET",                // Allow network access
        "ACCESS_NETWORK_STATE"      // Allow checking network state
      ],
    },
    web: {
      favicon: "./assets/favicon.png",  // Set your favicon path
    },
  };

  // Define environment-specific settings
  const envConfig = {
    dev: {
      extra: {
        apiUrl: "http://192.168.1.9:5000",
        environment: "dev",
      },
    },
    prod: {
      extra: {
        apiUrl: "https://api.prahladapp.com",
        environment: "prd",
      },
    },
  };

  // Merge common settings with environment-specific settings
  return {
    ...commonSettings,
    ...envConfig[environment],
  };
};
