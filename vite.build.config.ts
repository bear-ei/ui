import {resolve} from 'node:path'
import {visualizer} from 'rollup-plugin-visualizer'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import {rnw} from 'vite-plugin-rnw'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

const externals = [
        '@bearei/theme-token',
        'class-validator',
        'clsx',
        'immer',
        'lucide-react-native',
        'mitt',
        'nativewind',
        'react-dom',
        'react-native-css-interop',
        'react-native-gesture-handler',
        'react-native-reanimated',
        'react-native-svg',
        'react-native-worklets',
        'react-native',
        'react',
        'use-immer'
]

const config = defineConfig({
        build: {
                lib: {
                        entry: resolve(__dirname, './src/index.ts'),
                        fileName: 'index.mjs',
                        formats: ['es'],
                        name: 'BeareiUI'
                },
                rollupOptions: {
                        external: id => externals.includes(id) || externals.some(pkg => id.startsWith(pkg + '/')),
                        output: {
                                chunkFileNames: 'chunks/[name].[hash].mjs',
                                entryFileNames: '[name].mjs',
                                preserveModules: true,
                                preserveModulesRoot: resolve(__dirname, './src'),

                                assetFileNames: assetInfo => {
                                        if (assetInfo.names?.some(n => n.endsWith('.css'))) {
                                                return 'styles/index.css'
                                        }

                                        return 'assets/[name].[ext]'
                                }
                        }
                },
                commonjsOptions: {transformMixedEsModules: true}
        },
        plugins: [
                tsconfigPaths(),
                dts({
                        copyDtsFiles: true,
                        entryRoot: resolve(__dirname, './src'),
                        exclude: ['**/*.stories.*', '**/App.tsx', '**/App.style.tsx', '**/*.test.tsx', '**/*.test.ts'],
                        insertTypesEntry: true,
                        outDir: resolve(__dirname, 'dist'),
                        tsconfigPath: './tsconfig.json'
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
                svgr({
                        include: '**/*.svg',
                        svgrOptions: {exportType: 'default', ref: true, svgo: false, titleProp: true}
                }),
                visualizer({open: false})
        ]
})

export default config
