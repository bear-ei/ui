module.exports = {
        root: true,
        extends: ['@react-native', 'plugin:storybook/recommended'],
        rules: {
                '@typescript-eslint/no-unused-vars': [
                        'error',
                        {
                                argsIgnorePattern: '^_',
                                varsIgnorePattern: '^_',
                                caughtErrorsIgnorePattern: '^_'
                        }
                ]
        }
}
