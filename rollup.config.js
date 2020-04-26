import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: './src/index.ts',
  output: {
    file: `./dist/${pkg.name}.js`,
    format: 'iife',
  },
  plugins: [typescript()],
}
