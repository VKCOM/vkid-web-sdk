import { swc } from 'rollup-plugin-swc3';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import renameNodeModules from 'rollup-plugin-rename-node-modules';
import { version } from './package.json';

const extensions = ['.js', '.ts'];
const isProduction = process.env.NODE_ENV === 'production';
const entry = 'src/index.ts';
const external = [
  'crypto-js/enc-base64',
  'crypto-js/sha256',
]

const plugins = [
  resolve({
    extensions,
    browser: true,
  }),
  renameNodeModules('lib', false),
  commonjs(),
  replace({
    exclude: 'node_modules/**',
    values: {
      'env.VERSION': JSON.stringify(version),
      'env.PRODUCTION': isProduction,
    },
    preventAssignment: true,
  }),
];

const esm = {
  input: {
    index: entry,
  },
  external,
  plugins: [
    ...plugins,
    swc({ exclude: '', jsc: { target: "esnext" } }),
  ],
  output: {
    dir: 'dist-sdk/esm',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src'
  }
};

const cjs = {
  input: {
    index: entry,
  },
  external,
  plugins: [
    ...plugins,
    swc()
  ],
  output: {
    dir: 'dist-sdk/cjs',
    format: 'cjs',
    preserveModules: true,
    preserveModulesRoot: 'src'
  }
};

const umd = {
  input: {
    index: entry,
  },
  plugins: [
    ...plugins,
    swc({ minify: false })
  ],
  output: {
    dir: 'dist-sdk/umd',
    format: 'umd',
    name: 'VKIDSDK',
  }
}

export default [esm, cjs, umd];
