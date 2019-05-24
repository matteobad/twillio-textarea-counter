import pkg from './package.json';

const external = Object.keys(pkg.dependencies);
const plugins = [];

export default {
  input: './src/twillio-textarea-counter.js',
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
    },
    {
      name: pkg.name,
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external,
  plugins,
};
