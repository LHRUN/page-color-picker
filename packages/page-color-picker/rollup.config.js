import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: './index.ts',
    output: {
      dir: 'dist',
      format: 'esm'
    },
    plugins: [
      nodeResolve({
        extensions: ['.js', '.ts'],
        modulesOnly: true
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.ts']
      }),
      terser()
    ]
  },
  {
    input: './index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
]
