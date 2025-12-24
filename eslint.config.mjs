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
                        '@typescript-eslint': typescriptEslint
                },
                languageOptions: {
                        parser: tsParser,
                        ecmaVersion: 6,
                        sourceType: 'module',
                        parserOptions: {
                                project: ['./tsconfig.json'],
                                tsconfigRootDir: __dirname,
                                ecmaFeatures: {
                                        jsx: true,
                                        modules: true
                                }
                        }
                },
                rules: {
                        '@typescript-eslint/no-empty-object-type': 'error',
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
                        ],
                        '@typescript-eslint/naming-convention': [
                                'error',
                                {
                                        selector: 'variable',
                                        format: ['PascalCase', 'camelCase'],
                                        prefix: ['is', 'IS_'],
                                        types: ['boolean']
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
