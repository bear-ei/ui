import type {StorybookConfig} from '@storybook/react-native-web-vite'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-docs'],
	framework: {
		name: '@storybook/react-native-web-vite',
		options: {
			pluginReactOptions: {
				jsxRuntime: 'automatic',
				jsxImportSource: 'nativewind',
				babel: {plugins: ['react-native-worklets/plugin']}
			},
			pluginBabelOptions: {}
		}
	}
}
export default config
