import {resolve} from 'node:path'
import {visualizer} from 'rollup-plugin-visualizer'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import {rnw} from 'vite-plugin-rnw'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

const externals = ['react-dom', 'react-native-reanimated', 'react-native', 'react']
const config = defineConfig({
        build: {
                lib: {
                        entry: resolve(__dirname, './index.ts'),
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
                                preserveModulesRoot: resolve(__dirname, '.')
                        }
                },
                commonjsOptions: {transformMixedEsModules: true}
        },
        plugins: [
                tsconfigPaths(),
                dts({
                        copyDtsFiles: true,
                        entryRoot: resolve(__dirname, '.'),
                        include: ['components', 'constants', 'contexts', 'hooks', 'index.ts', 'global.css', 'utils'],
                        exclude: ['**/*.stories.*', '**/App.tsx', '**/App.style.tsx', '**/*.test.tsx', '**/*.test.ts'],
                        insertTypesEntry: true,
                        outDir: resolve(__dirname, 'dist'),
                        tsconfigPath: './tsconfig.json'
                }),
                rnw(),
                svgr({
                        include: '**/*.svg',
                        svgrOptions: {exportType: 'default', ref: true, svgo: false, titleProp: true}
                }),
                visualizer({open: false})
        ]
})

export default config
