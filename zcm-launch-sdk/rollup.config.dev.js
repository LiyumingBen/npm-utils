import commonjs from 'rollup-plugin-commonjs'
import json from '@rollup/plugin-json'
import babel from 'rollup-plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'umd',
		sourcemap: false,
		name: 'secret'
	},
	plugins: [
		commonjs(),
		json(),
		babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
		nodeResolve()
	]
}
