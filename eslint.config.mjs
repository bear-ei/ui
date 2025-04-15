import {FlatCompat} from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [
	...compat.extends(
		'@react-native',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:react/jsx-runtime',
		'plugin:storybook/recommended'
	),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint
		},
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 6,
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
					modules: true
				}
			}
		},
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/no-explicit-any': ['error', {ignoreRestArgs: true}],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			]
		},
		ignores: ['storybook.requires.ts']
	},
	{
		ignores: ['**/metro.config.js', '**/storybook.requires.ts']
	}
]
