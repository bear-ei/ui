import type {StorybookConfig} from '@storybook/react-native-web-vite'

const config: StorybookConfig = {
        stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
        addons: ['@storybook/addon-docs'],
        framework: {
                name: '@storybook/react-native-web-vite',
                options: {
                        pluginReactOptions: {
                                jsxRuntime: 'automatic',
                                jsxImportSource: 'nativewind',
                                babel: {presets: ['nativewind/babel']}
                        }
                }
        }
}
export default config
