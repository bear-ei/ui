import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
import {visualizer} from 'rollup-plugin-visualizer'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import reactNativeWeb from 'vite-plugin-react-native-web'
import svgr from 'vite-plugin-svgr'

const babelPlugins = [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        ['@babel/plugin-proposal-private-methods', {loose: true}],
        ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
        'react-native-reanimated/plugin'
]

const externals = [
        'react',
        'react-dom',
        'react-native',
        'react-native-reanimated',
        '@bearei/element-token',
        '@material-symbols/svg-400',
        'class-validator',
        'immer',
        'mitt',
        'nanoid',
        'react-native-svg',
        'use-immer'
]

const config = defineConfig({
        build: {
                lib: {
                        entry: resolve(__dirname, './src/index.ts'),
                        fileName: 'index.mjs',
                        name: 'BeareiElement',
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
                react({babel: {plugins: babelPlugins}}),
                reactNativeWeb({babelPlugins}),
                svgr({
                        include: '**/*.svg',
                        svgrOptions: {
                                exportType: 'default',
                                ref: true,
                                svgo: false,
                                titleProp: true
                        }
                }),
                visualizer({open: false})
        ]
})

export default config
