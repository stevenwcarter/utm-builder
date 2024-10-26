import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// @ts-expect-error See https://github.com/gxmari007/vite-plugin-eslint/issues/79
import eslint from 'vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { codecovVitePlugin } from '@codecov/vite-plugin';

const rawPlugin = function rawPlugin(options: any) {
  return {
    name: 'vite-raw-plugin',
    transform(code: any, id: any) {
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
      codecovVitePlugin({
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
        bundleName: 'utm-builder',
        uploadToken: process.env.CODECOV_TOKEN,
      }),
    ],
  };
});
