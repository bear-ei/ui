module.exports = function (api) {
        api.cache(true)

        return {
                presets: [['babel-preset-expo', {jsxImportSource: 'nativewind'}], 'nativewind/babel'],
                plugins: [
                        ['@babel/plugin-proposal-decorators', {legacy: true}],
                        ['@babel/plugin-proposal-class-properties', {loose: true}],
                        '@babel/plugin-proposal-export-namespace-from',
                        'react-native-worklets/plugin'
                ]
        }
}
