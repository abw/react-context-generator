import babel from '@rollup/plugin-babel'
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import pkg from './package.json' assert { type: 'json' }
// const pkg = require("./package.json");


export default [
  {
    input: "src/Generator.jsx",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
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