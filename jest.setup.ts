// import {NativeModules} from 'react-native'

// NativeModules.SettingsManager = NativeModules.SettingsManager || {
// 	settings: {
// 		AppleLocale: 'en_US',
// 		AppleLanguages: ['en']
// 	},
// 	getConstants: () => ({
// 		settings: {
// 			AppleLocale: 'en_US',
// 			AppleLanguages: ['en']
// 		}
// 	})
// }

// NativeModules.I18nManager = NativeModules.I18nManager || {
// 	isRTL: false
// }

jest.mock('nanoid')
jest.mock('react', () => {
	const actualReact = jest.requireActual('react')

	return {
		...actualReact,
		useId: () => 'test-id'
	}
})
