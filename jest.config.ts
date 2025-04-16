import type {Config} from 'jest'
import {defaults} from 'jest-config'

const config: Config = {
	preset: 'react-native',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
		'^.+\\.svg$': 'jest-transform-stub'
	},
	transformIgnorePatterns: ['node_modules/(?!(react-native|@react-native|react-native-reanimated|@bearei)/)'],
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'\\.svg$': 'jest-transform-stub'
	}
}

export default config
