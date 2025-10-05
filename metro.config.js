const {getDefaultConfig} = require('expo/metro-config')
const {withNativeWind} = require('nativewind/metro')
const path = require('path')
const withStorybook = require('@storybook/react-native/metro/withStorybook')
const config = withStorybook(getDefaultConfig(__dirname), {
        enabled: true,
        configPath: path.resolve(__dirname, './.rnstorybook')
})

module.exports = withNativeWind(config, {input: './global.css'})
