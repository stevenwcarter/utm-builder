import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), eslint(), viteTsconfigPaths(), svgrPlugin()],
  };
});
