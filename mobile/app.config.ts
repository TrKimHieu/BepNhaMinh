import type { ConfigContext, ExpoConfig } from 'expo/config';

/**
 * app.json bị thay bằng file này để cấu hình theo biến môi trường.
 *
 * CẢNH BÁO: EXPO_PUBLIC_* bị nhúng vào bundle LÚC BUILD.
 * Đổi URL API thì phải build lại app (hoặc EAS Update), không chỉ sửa .env.
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Bếp Nhà Mình',
  slug: 'bep-nha-minh',
  version: '0.1.0',
  orientation: 'portrait',
  scheme: 'bepnhaminh',
  userInterfaceStyle: 'light',

  icon: './assets/images/logo.png',

  ios: {
    supportsTablet: false,
    bundleIdentifier: 'app.bepnhaminh',
  },
  android: {
    package: 'app.bepnhaminh',
    icon: './assets/images/logo.png',
  },
  web: {
    favicon: './assets/images/logo.png',
  },

  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://bepnhaminh-api.onrender.com/api/v1',
  },
});
