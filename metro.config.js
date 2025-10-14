const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')
const {withNativeWind} = require('nativewind/metro')
const path = require('path')
const withStorybook = require('@storybook/react-native/metro/withStorybook')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname)
const config = {
        transformer: {
                babelTransformerPath: require.resolve('react-native-svg-transformer/react-native')
        },
        resolver: {
                assetExts: assetExts.filter(ext => ext !== 'svg'),
                sourceExts: [...sourceExts, 'svg']
        }
}

const finalConfig = mergeConfig(defaultConfig, config)
const withStorybookConfig = withStorybook(finalConfig, {
        enabled: true,
        configPath: path.resolve(__dirname, './.storybook')
})

module.exports = withNativeWind(withStorybookConfig, {input: './global.css'})
