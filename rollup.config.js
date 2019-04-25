import babel from 'rollup-plugin-babel'
import pkg from './package.json'

let external = Object.keys(pkg.dependencies)
let plugins = [babel({ exclude: 'node_modules/**' })]

export default {
	input: './src/index.js',
	output: [
		{
			name: pkg.name,
			file: pkg.main,
			format: 'umd',
			sourcemap: true
		},
		{
			name: pkg.name,
			file: pkg.module,
			format: 'esm',
			sourcemap: true
		}
	],
	external,
	plugins
}
