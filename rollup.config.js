import babel from '@rollup/plugin-babel'
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' }

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        exports: 'named',
        plugins: [terser()]
      },
      {
        file: pkg.module,
        format: "esm",
        exports: 'named',
        sourcemap: true,
        plugins: [terser()]
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx'],
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react'],
        babelHelpers: 'bundled',
      }),
      resolve(),
      commonjs(),
    ]
  }
];
