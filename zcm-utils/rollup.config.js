import commonjs from 'rollup-plugin-commonjs' // 将非ES6语法的包转为ES6可用
import { terser } from 'rollup-plugin-terser' // js 的压缩优化
import babel from 'rollup-plugin-babel' // ES6转ES5
import { nodeResolve } from '@rollup/plugin-node-resolve' //帮助寻找node_modules里的包
import json from '@rollup/plugin-json' // 允许 Rollup 从 JSON 文件中导入数据
import pkg from './package.json'

export default {
	input: 'src/index.js',
	output: {
		file: pkg.main,
		format: 'umd',
		name: 'zcmSecret',
		globals: {
			'qs': "qs",
		}
	},
	external: ['qs'], //不打包
	plugins: [
		nodeResolve(),
		commonjs(),
		json(), // commonjs 之后
		babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
		terser({
			safari10: true
		})
	],
	onwarn: (warning) => {
		// should intercept ... but doesn't in some rollup versions
		if (warning.code === 'THIS_IS_UNDEFINED') {
			return
		}
		// console.warn everything else
		console.warn(warning.message)
	}
}
