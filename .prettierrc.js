module.exports = {
	arrowParens: 'avoid',
	bracketSpacing: false,
	experimentalTernaries: true,
	jsxSingleQuote: true,
	printWidth: 120,
	semi: false,
	singleAttributePerLine: true,
	singleQuote: true,
	tabWidth: 4,
	trailingComma: 'none',
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	tailwindAttributes: ['className']
}
