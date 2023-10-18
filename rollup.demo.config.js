import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { version } from './package.json';
import { swc } from 'rollup-plugin-swc3';
import styles from 'rollup-plugin-styles';
import html from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import watchAssets from 'rollup-plugin-watch-assets';

const extensions = ['.js', '.ts'];
const isProduction = process.env.NODE_ENV === 'production';
const entry = 'demo/index.ts';

const plugins = [
  styles({
    mode: 'extract'
  }),
  resolve({
    extensions,
    browser: true,
  }),
  commonjs(),
  replace({
    exclude: 'node_modules/**',
    values: {
      'env.VERSION': JSON.stringify(version),
      'env.PRODUCTION': isProduction,
    },
    preventAssignment: true,
  }),
  swc({
    minify: isProduction
  }),
  html({
    template: 'demo/index.html',
    target: 'index.html'
  }),
];

if (!isProduction) {
  const devPlugins = [
    serve({
      open: true,
      contentBase: ['dist-demo'],
      port: 80
    }),
    livereload(),
    watchAssets({
      assets: ['demo/index.html']
    }),
  ];
  plugins.push(...devPlugins);
}

export default [{
  input: {
    index: entry,
  },
  output: {
    dir: 'dist-demo',
    format: 'cjs'
  },
  plugins
}];
