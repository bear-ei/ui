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

const externals = ['react', 'react-dom', 'react-native', 'styled-components', 'react-native-reanimated']
const config = defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, './src/index.ts'),
			fileName: format => (format === 'es' ? 'index.mjs' : 'index.cjs'),
			name: 'BeareiElement',
			formats: ['es', 'cjs']
		},
		rollupOptions: {
			external: id => externals.includes(id) || externals.some(pkg => id.startsWith(pkg + '/'))
		},
		commonjsOptions: {transformMixedEsModules: true}
	},
	plugins: [
		dts({
			tsconfigPath: './tsconfig.app.json',
			insertTypesEntry: true,
			outDir: 'dist',
			include: ['src'],
			exclude: ['**/*.stories.*', '**/App.tsx', '**/App.style.tsx', '**/*.test.tsx', '**/*.test.ts']
		}),
		react({babel: {plugins: babelPlugins}}),
		reactNativeWeb({babelPlugins}),
		svgr({
			include: '**/*.svg',
			svgrOptions: {exportType: 'default', ref: true, svgo: false, titleProp: true}
		}),
		visualizer({open: false})
	]
})

export default config
