module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-transform-class-static-block',
        'transform-inline-environment-variables',
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        ['babel-plugin-react-docgen-typescript', {exclude: 'node_modules'}],
        'react-native-reanimated/plugin'
    ]
}
