module.exports = {
    presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
    plugins: [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        '@babel/plugin-proposal-export-namespace-from',
        'react-native-worklets/plugin'
    ]
}
