export default ({ config }) => {
  // Read the environment variable set via cross-env (defaults to 'dev' if not set)
  const environment = process.env.EXPO_APP_ENV || 'dev';

  // Define common settings
  const commonSettings = {
    name: "RamdasiBana@Pune",
    slug: "RamdasiBana@Pune",
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
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
      package: "com.ramdasibana",  // Add your unique Android package name here
    },
    web: {
      favicon: "./assets/favicon.png",  // Set your favicon path
    },
  };

  // Define environment-specific settings
  const envConfig = {
    dev: {
      extra: {
        apiUrl: "https://upasana-app-gdm2p.ondigitalocean.app",  // Dev environment URL
        environment: "dev",
      },
    },
    prod: {
      extra: {
        apiUrl: "https://upasana-app-gdm2p.ondigitalocean.app",  // Prod environment URL
        environment: "prod",
      },
    },
  };

  // Safely merge the environment config with common settings
  const environmentConfig = envConfig[environment] || {};

  // Return the config with environment-specific URLs and other settings
  return {
    ...commonSettings,
    extra: {
      ...commonSettings.extra,  // Ensure common settings are added
      ...environmentConfig.extra,  // Merge environment-specific extra settings
      eas: {
        projectId: "3aec5053-2364-467a-ad8a-b74a955a311a",  // Add your EAS project ID here
      },
    },
  };
};
