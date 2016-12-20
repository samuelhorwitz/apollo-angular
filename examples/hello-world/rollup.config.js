import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'dist/app/main.js',
  dest: 'dist/public/bundle.js', // output a single application bundle
  sourceMap: true,
  format: 'iife',
  plugins: [
    nodeResolve({ jsnext: true, module: true, browser: true }),
    commonjs({
      include: [
        'node_modules/rxjs/**',
        'node_modules/graphql-tag/**',
        'node_modules/graphql-anywhere/**',
        'node_modules/lodash/**',
        'node_modules/core-js/**',
        'node_modules/zone.js/**'
      ],
      namedExports: {
        'node_modules/lodash/lodash.js': [
          'omit',
          'assign',
          'isFunction',
          /*'mapValues',
          'isString',
          'isNumber',
          'isUndefined',
          'isNull',
          'isObject',
          'isEqual',
          'countBy',
          'identity',
          'uniq',
          'cloneDeep',
          'pick',
          'forOwn',
          'flatten'*/
        ],
        'node_modules/graphql-tag/printer.js': [
          'print'
        ]
      }
    }),
    uglify(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
