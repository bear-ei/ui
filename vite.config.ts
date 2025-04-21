import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
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
		dts({
			include: ['src'],
			exclude: ['**/*.stories.*', '**/App.tsx', '**/App.style.tsx']
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
		})
	]
})

export default config
