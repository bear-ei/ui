import {FlatCompat} from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import perfectionist from 'eslint-plugin-perfectionist'

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
			perfectionist
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
			'perfectionist/sort-objects': ['error', {type: 'alphabetical'}],
			'perfectionist/sort-interfaces': ['error', {type: 'alphabetical'}],
			'perfectionist/sort-object-types': ['error', {type: 'alphabetical'}],
			'perfectionist/sort-jsx-props': ['error', {type: 'alphabetical'}],
			'perfectionist/sort-imports': ['error', {type: 'alphabetical'}],
			'@typescript-eslint/no-unnecessary-condition': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
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
		files: [
			'src/utils/typed-memo/**/*.tsx',
			'src/components/Form/Form.interface.ts',
			'src/components/Virtual-list/Virtual-list.interface.ts'
		],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off'
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
