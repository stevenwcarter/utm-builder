import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

const rawPlugin = function rawPlugin(options) {
  return {
    name: 'vite-raw-plugin',
    transform(code, id) {
      if (options.fileRegex.test(id)) {
        const json = JSON.stringify(code)
          .replace(/\u2028/g, '\\u2028')
          .replace(/\u2029/g, '\\u2029');

        return {
          code: `export default ${json}`,
        };
      }
    },
  };
};

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      rawPlugin({
        fileRegex: /\.csv$/,
      }),
      react(),
      eslint(),
      viteTsconfigPaths(),
      svgrPlugin(),
    ],
  };
});
