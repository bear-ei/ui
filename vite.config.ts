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

const externals = ['react', 'react-dom', 'react-native', 'react/jsx-runtime']
const config = defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, './src/index.ts'),
			fileName: 'index',
			name: 'Material',
			formats: ['es', 'cjs']
		},
		rollupOptions: {
			external: id => externals.includes(id) || externals.some(pkg => id.startsWith(pkg + '/'))
		}
	},
	plugins: [
		dts({
			include: ['src'],
			exclude: ['**/*.stories.*', '**/App.tsx', '**/App.style.tsx']
		}),
		react({babel: {plugins: babelPlugins}}),
		reactNativeWeb({babelPlugins}),
		svgr({
			include: '**/*.svg',
			svgrOptions: {exportType: 'default', ref: true, svgo: false, titleProp: true}
		}),
		visualizer({open: true})
	]
})

export default config
