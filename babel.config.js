module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        '@babel/plugin-proposal-decorators',
        '@babel/plugin-proposal-export-namespace-from',
        'react-native-reanimated/plugin',
        'transform-inline-environment-variables',
        ['babel-plugin-react-docgen-typescript', {exclude: 'node_modules'}]
    ]
}
