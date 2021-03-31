import json from '@rollup/plugin-json';
import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: 'lib/index.js',
    treeshake: false,
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
      }
    ],
    plugins: [
      replace({
        preventAssignment: true,
        '__JOBBOARD_VERSION__': pkg.version
      }),
      json()
    ]
  }
];