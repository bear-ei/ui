import type {StorybookConfig} from '@storybook/react-native-web-vite'

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-docs'],
	framework: {
		name: '@storybook/react-native-web-vite',
		options: {
			pluginReactOptions: {
				jsxRuntime: 'automatic',
				jsxImportSource: 'nativewind',
				babel: {
					presets: ['nativewind/babel'],
					plugins: [
						['@babel/plugin-proposal-decorators', {legacy: true}],
						['@babel/plugin-proposal-class-properties', {loose: true}],
						'@babel/plugin-proposal-export-namespace-from',
						'react-native-worklets/plugin'
					]
				}
			}
		}
	}
}

export default config
