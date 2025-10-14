import {resolve} from 'node:path'
import {visualizer} from 'rollup-plugin-visualizer'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import {rnw} from 'vite-plugin-rnw'

const externals = ['react-dom', 'react-native-reanimated', 'react-native', 'react']
const config = defineConfig({
        build: {
                lib: {
                        entry: resolve(__dirname, './src/index.ts'),
                        fileName: 'index.mjs',
                        name: 'BeareiUI',
                        formats: ['es']
                },
                rollupOptions: {
                        external: id => externals.includes(id) || externals.some(pkg => id.startsWith(pkg + '/')),
                        output: {
                                chunkFileNames: 'chunks/[name].[hash].mjs',
                                entryFileNames: '[name].mjs',
                                preserveModules: true,
                                preserveModulesRoot: resolve(__dirname, 'src')
                        }
                },
                commonjsOptions: {transformMixedEsModules: true}
        },
        plugins: [
                dts({
                        copyDtsFiles: true,
                        entryRoot: resolve(__dirname, 'src'),
                        exclude: ['**/*.stories.*', '**/App.tsx', '**/App.style.tsx', '**/*.test.tsx', '**/*.test.ts'],
                        insertTypesEntry: true,
                        outDir: resolve(__dirname, 'dist'),
                        tsconfigPath: './tsconfig.app.json'
                }),
                rnw({
                        jsxRuntime: 'automatic',
                        jsxImportSource: 'nativewind',
                        babel: {
                                presets: ['nativewind/babel'],
                                plugins: [
                                        ['@babel/plugin-proposal-decorators', {legacy: true}],
                                        ['@babel/plugin-proposal-class-properties', {loose: true}],
                                        '@babel/plugin-proposal-export-namespace-from',
                                        'react-native-worklets/plugin'
                                ]
                        }
                }),
                visualizer({open: false})
        ]
})

export default config
