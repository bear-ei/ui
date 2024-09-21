/** @type{import("@storybook/react-webpack5").StorybookConfig} */
module.exports = {
    stories: ['../src/component/**/*.stories.?(ts|tsx|js|jsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-react-native-web'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },
    docs: {
        autodocs: true
    },
    webpackFinal: config => {
        // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
        const fileLoaderRule = config.module.rules.find(rule => rule.test?.test('.svg'))

        fileLoaderRule.exclude = /\.svg$/

        config.module.rules.push({
            test: /\.svg$/,
            enforce: 'pre',
            loader: require.resolve('@svgr/webpack')
        })

        return config
    }
}
