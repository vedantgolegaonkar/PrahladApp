export default ({ config }) => {
  const environment = process.env.APP_ENV || "dev";

  const envConfig = {
    dev: {
      apiUrl: "https://upasana-app-gdm2p.ondigitalocean.app",
      environment: "dev",
    },
    prod: {
      apiUrl: "https://upasana-app-gdm2p.ondigitalocean.app",
      environment: "prod",
    },
  };

  return {
    ...config,
    extra: {
      ...config.extra,
      eas: {
        projectId: "3aec5053-2364-467a-ad8a-b74a955a311a",  // Add your EAS project ID here
      },
      ...envConfig[environment],
    },
    version: "1.0.0",
    android: {
      ...config.android,
      package: "com.upasana.app",
    },
  };
};
