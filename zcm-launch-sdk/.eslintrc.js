module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	rules: {
		'no-console':
			process.env.NODE_ENV === 'production'
				? ['warn', { allow: ['warn', 'error'] }]
				: 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
	}
};
