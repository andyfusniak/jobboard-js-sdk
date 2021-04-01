import json from '@rollup/plugin-json';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import nodePolyfills from 'rollup-plugin-node-polyfills';

export default [
  {
    input: 'lib/index.js',
    treeshake: false,
    external: [
      'node-fetch'
    ],
    output: [
      {
        file: pkg.browser,
        format: 'umd',
        name: 'JobBoardClient',
        sourcemap: true
      },
      {
        file: 'dist/index.umd.min.js',
        format: 'umd',
        name: 'JobBoardClient',
        sourcemap: false,
        plugins: [terser()]
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        globals: {
          'node-fetch': 'fetch'
        },
      }
    ],
    plugins: [
      replace({
        preventAssignment: true,
        '__JOBBOARD_VERSION__': pkg.version
      }),
      // nodePolyfills(),
      // nodeResolve(),
      json()
    ]
  }
];