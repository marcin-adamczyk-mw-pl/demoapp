import { Platform } from 'react-native';

export const BASE_URL = `http://${Platform.select({
  ios: 'localhost',
  android: '10.0.2.2',
})}:3000`;
