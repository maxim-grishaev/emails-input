import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss-modules'
import autoprefixer from 'autoprefixer'
import pkg from './package.json'

export default {
  input: './src/index.ts',
  output: {
    file: `./dist/${pkg.name}.js`,
    format: 'iife',
  },
  plugins: [typescript(), postcss({
      modules: {
        plugins: [autoprefixer()],
      },
      plugins: [autoprefixer()],
      writeDefinitions: true,
  })],
}
