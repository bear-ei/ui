const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')
const withStorybook = require('@storybook/react-native/metro/withStorybook')
const path = require('path')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname)
const {assetExts, sourceExts} = defaultConfig.resolver
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

module.exports = withStorybook(finalConfig, {
	enabled: true,
	configPath: path.resolve(__dirname, './.storybook')
})
