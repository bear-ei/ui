import {fireEvent, render} from '@testing-library/react-native'
import React from 'react'
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

		const {toJSON} = render(
			<ThemeProvider>
				<Text>Mobile View</Text>
			</ThemeProvider>
		)

		expect(toJSON()).toMatchSnapshot()
	})

	it('uses DesktopDevice on web', () => {
		Object.defineProperty(Platform, 'OS', {
			get: jest.fn(() => 'web')
		})

		const {toJSON} = render(
			<ThemeProvider>
				<Text>Web View</Text>
			</ThemeProvider>
		)

		expect(toJSON()).toMatchSnapshot()
	})

	it('applies story mode with custom height', () => {
		const {getByTestId} = render(
			<ThemeProvider story>
				<Text>With Story</Text>
			</ThemeProvider>
		)

		const container = getByTestId(/^bearei__material--/)

		expect(container.props.story).toBe(true)
	})

	it('triggers focus when pressed', () => {
		const {getByTestId} = render(
			<ThemeProvider>
				<Text>Press Test</Text>
			</ThemeProvider>
		)

		const container = getByTestId(/^bearei__material--/)

		fireEvent(container, 'pressIn')
		expect(container).toBeTruthy()
	})
})
