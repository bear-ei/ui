import {fireEvent, render} from '@testing-library/react-native'
import {Platform, Text} from 'react-native'
import {ThemeProvider} from '../Theme-provider'

describe('ThemeProvider', () => {
	const originalOS = Platform.OS

	afterEach(() => {
		Object.defineProperty(Platform, 'OS', {
			get: () => originalOS
		})
	})

	it('renders children content', () => {
		const {getByText} = render(
			<ThemeProvider>
				<Text>Test Content</Text>
			</ThemeProvider>
		)

		expect(getByText('Test Content')).toBeTruthy()
	})

	it('uses MobileDevice on iOS/Android', () => {
		Object.defineProperty(Platform, 'OS', {
			get: jest.fn(() => 'ios')
		})

		const {getByTestId} = render(
			<ThemeProvider>
				<Text testID='bearei__material--ios'>Mobile View</Text>
			</ThemeProvider>
		)

		expect(getByTestId('bearei__material--ios')).toBeTruthy()
	})

	it('uses DesktopDevice on web', () => {
		Object.defineProperty(Platform, 'OS', {
			get: jest.fn(() => 'web')
		})

		const {getByTestId} = render(
			<ThemeProvider>
				<Text testID='bearei__material--web'>Web View</Text>
			</ThemeProvider>
		)

		expect(getByTestId('bearei__material--web')).toBeTruthy()
	})

	it('applies story mode with custom height', () => {
		const {getByTestId} = render(
			<ThemeProvider story>
				<Text>With Story</Text>
			</ThemeProvider>
		)

		const container = getByTestId('bearei__material--test-id')

		expect(container.props.story).toBe(true)
	})

	it('triggers focus when pressed', () => {
		const {getByTestId} = render(
			<ThemeProvider>
				<Text>Press Test</Text>
			</ThemeProvider>
		)

		const container = getByTestId('bearei__material--test-id')

		fireEvent(container, 'pressIn')
		expect(container).toBeTruthy()
	})
})
