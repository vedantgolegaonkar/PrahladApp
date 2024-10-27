export default ({ config }) => {
  const environment = process.env.APP_ENV || "dev"; // Use "dev" as default if APP_ENV is not set

  // Define environment-specific settings
  const envConfig = {
    dev: {
      apiUrl: "http://192.168.1.9:5000",
      environment: "dev",
    },
    prod: {
      apiUrl: "https://upasana-app-gdm2p.ondigitalocean.app",
      environment: "prod",
    },
  };

  // Merge common settings with environment-specific settings
  return {
    ...config,
    extra: {
      ...config.extra, // Keep existing extra settings
      ...envConfig[environment], // Merge environment-specific settings
    },
    version: "1.0.0", // Specify your app version
    android: {
      ...config.android,
      package: "com.upasana.app", // Set your unique package name here
    },
    cli: {
      appVersionSource: "config", // Ensure the source is set to "config"
    },
  };
};
