import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),

      // Root paths
      '@assets': `${path.resolve(__dirname, './src/assets/')}`,
      '@contexts': `${path.resolve(__dirname, './src/contexts/')}`,
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@api': `${path.resolve(__dirname, './src/api/')}`,
      '@hooks': `${path.resolve(__dirname, './src/hooks/')}`,
      '@screens': `${path.resolve(__dirname, './src/screens/')}`,
      '@utils': `${path.resolve(__dirname, './src/utils/')}`,

      //Screens paths
      '@Category': `${path.resolve(__dirname, './src/screens/Category/')}`,
      '@ContentItem': `${path.resolve(
        __dirname,
        './src/screens/ContentItem/'
      )}`,
      '@ContentItemDetail': `${path.resolve(
        __dirname,
        './src/screens/ContentItemDetail/'
      )}`,
      '@Dashboard': `${path.resolve(__dirname, './src/screens/Dashboard/')}`,
      '@SignIn': `${path.resolve(__dirname, './src/screens/SignIn/')}`,
      '@SignUp': `${path.resolve(__dirname, './src/screens/SignUp/')}`,
      '@Topic': `${path.resolve(__dirname, './src/screens/Topic/')}`,
    },
  },
});
