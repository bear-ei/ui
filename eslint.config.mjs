import {FlatCompat} from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import importPlugin from 'eslint-plugin-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

const configs = [
	...compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/strict',
		'plugin:prettier/recommended',
		'plugin:storybook/recommended',
		'@react-native'
	),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint,
			import: importPlugin
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
					alwaysTryTypes: true
				},
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx']
				}
			}
		},
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: __dirname,
				ecmaFeatures: {jsx: true, modules: true}
			}
		},
		rules: {
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					pathGroups: [{pattern: '@/**', group: 'internal', position: 'after'}],
					'newlines-between': 'always',
					alphabetize: {order: 'asc', caseInsensitive: true}
				}
			],
			'import/newline-after-import': 'error',
			'@typescript-eslint/no-unnecessary-condition': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/no-explicit-any': ['error', {ignoreRestArgs: true}],
			'@typescript-eslint/no-extraneous-class': 'off',
			'@typescript-eslint/no-shadow': ['warn'],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_'}
			],
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'variable',
					format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
					prefix: ['is', 'IS_'],
					types: ['boolean'],
					filter: {
						regex: '^(next|pending)',
						match: false
					}
				}
			]
		}
	},
	{
		ignores: [
			'.prettierrc.js',
			'.rnstorybook/**.ts',
			'.rnstorybook/**.tsx',
			'.storybook/**.ts',
			'.storybook/**.tsx',
			'**/**.config.js',
			'**/**.config.mjs',
			'**/**.config.ts',
			'**/**.test.ts',
			'**/**.test.tsx',
			'forge.env.d.ts',
			'index.js',
			'node_modules'
		]
	}
]

export default configs
