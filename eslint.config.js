// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// https://docs.expo.dev/guides/using-eslint/
const {defineConfig} = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
        expoConfig,
        {
                ignores: ['dist/*']
        }
])
