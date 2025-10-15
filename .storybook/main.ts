import type {StorybookConfig} from '@storybook/react-native-web-vite'
import unfonts from 'unplugin-fonts/vite'
import {HtmlTagDescriptor, mergeConfig, UserConfig} from 'vite'

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
        },
        async viteFinal(config: UserConfig): Promise<UserConfig> {
                return mergeConfig(config, {
                        plugins: [
                                unfonts({
                                        custom: {
                                                families: [
                                                        {
                                                                name: 'MaterialIcons-Regular',
                                                                local: 'MaterialIcons-Regular',
                                                                src: [
                                                                        './node_modules/@react-native-vector-icons/material-icons/fonts/MaterialIcons.ttf'
                                                                ],
                                                                transform(font) {
                                                                        font.display = 'swap'

                                                                        return font
                                                                }
                                                        }
                                                ],
                                                linkFilter(tags: HtmlTagDescriptor[]) {
                                                        return tags.map(tag => {
                                                                const isFontLink =
                                                                        tag.tag === 'link' &&
                                                                        tag.attrs?.rel === 'preload' &&
                                                                        tag.attrs?.as === 'font'

                                                                if (isFontLink) {
                                                                        return {
                                                                                ...tag,
                                                                                attrs: {
                                                                                        ...tag.attrs,
                                                                                        crossorigin: 'anonymous'
                                                                                }
                                                                        }
                                                                }

                                                                return tag
                                                        })
                                                }
                                        }
                                })
                        ]
                })
        }
}

export default config
