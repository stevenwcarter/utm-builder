import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        // setupFiles: ['./setupVitest.ts'],
        coverage: {
          reporter: ['text', 'html', 'cobertura', 'lcov', 'json-summary'],
          exclude: [
            '**/[.]**',
            '**/*.cjs',
            '*.config.ts',
            'coverage/**',
            'cypress/**',
            'dist/**',
            '**/*.d.ts',
            '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
            '**/*.js',
            '**/*.jsx',
            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
            '**/*.mjs',
            '**/node_modules/**',
            'packages/*/test?(s)/**',
            'reportWebVitals.ts',
            'service*.ts',
            'src/@dndtypes/**',
            'src/main.tsx',
            'src/stories/**',
            'src/types/**',
            'stories/**',
            'test?(-*).?(c|m)[jt]s?(x)',
            '**/__tests__/**',
            'test?(s)/**',
            '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
            '**/virtual:*',
            '**/vitest.{workspace,projects}.[jt]s?(on)',
            '**/\x00*',
            '**/__x00__*',
          ],
        },
      },
    }),
  ),
);
