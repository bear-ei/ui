import {PluginItem} from '@babel/core'
import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
import {Plugin, defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

const reactNativeWeb = (options: {babelPlugins: PluginItem[]}): Plugin => {
    const plugin: Plugin = {
        name: 'vite:react-native-web',
        enforce: 'pre',
        config(_userConfig, env) {
            return {
                plugins: [
                    react({
                        babel: {
                            plugins: options.babelPlugins
                        }
                    })
                ],
                define: {
                    // reanimated support
                    'global.__x': {},
                    _frameTimestamp: undefined,
                    _WORKLET: false,
                    __DEV__: `${env.mode === 'development'}`,
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || env.mode)
                },
                optimizeDeps: {
                    include: ['react-native-reanimated'],
                    esbuildOptions: {
                        jsx: 'transform',
                        resolveExtensions: [
                            '.web.js',
                            '.web.ts',
                            '.web.tsx',
                            '.js',
                            '.jsx',
                            '.json',
                            '.ts',
                            '.tsx',
                            '.mjs'
                        ],
                        loader: {
                            '.js': 'jsx'
                        }
                    }
                },
                resolve: {
                    extensions: ['.web.js', '.web.ts', '.web.tsx', '.js', '.jsx', '.json', '.ts', '.tsx', '.mjs'],
                    alias: {'react-native': 'react-native-web'}
                }
            }
        }
    }

    return plugin
}

const babelPlugins = [
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    '@babel/plugin-transform-class-properties',
    'react-native-reanimated/plugin'
]

const config = defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
            fileName: 'index',
            name: 'Material'
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react-native',
                'react-native-macos',
                /\.(stories)\..+$/,
                /App\.(style|tsx)$/
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-native': 'ReactNative'
                }
            }
        }
    },
    plugins: [
        dts({include: ['src'], exclude: ['**/*.stories.*', '**/App.tsx', '**/App.style.tsx']}),
        react({babel: {plugins: babelPlugins}}),
        reactNativeWeb({babelPlugins}),
        svgr({include: '**/*.svg', svgrOptions: {exportType: 'default', ref: true, svgo: false, titleProp: true}})
    ]
})

export default config
