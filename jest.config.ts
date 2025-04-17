import type {Config} from 'jest'
import {defaults} from 'jest-config'
import {createDefaultEsmPreset} from 'ts-jest'

const preset = createDefaultEsmPreset({
	tsconfig: './tsconfig.jest.json'
})

const config: Config = {
	...preset,
	preset: 'react-native',
	testEnvironment: 'node',
	roots: ['<rootDir>'],
	testMatch: ['**/*.test.ts', '**/*.test.tsx'],
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{ts,tsx}',
		'!**/__test__/**',
		'!**/.ondevice/**',
		'!**/.storybook/**',
		'!**/*.config.ts',
		'!**/*.d.ts',
		'!**/*.stories.tsx',
		'!**/index.ts',
		'!**/App.tsx',
		'!**/App.*.tsx',
		'!**/node_modules/**'
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
	},
	transformIgnorePatterns: ['node_modules/(?!(react-native|@react-native|react-native-reanimated|@bearei)/)'],
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'\\.svg$': '<rootDir>/__mocks__/Svg-mock.tsx'
	}
}

export default config
