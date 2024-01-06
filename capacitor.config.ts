import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SimBridge',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  webDir: 'www',
  server: {
    androidScheme: 'http'
  }
};

export default config;
