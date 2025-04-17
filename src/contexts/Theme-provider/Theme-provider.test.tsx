import {Token} from '@bearei/material-token'
import {render} from '@testing-library/react-native'
import React from 'react'
import {Text} from 'react-native'
import {DENSITY} from '../../components'
import {ThemeProvider} from './Theme-provider.context'

describe('ThemeProvider', () => {
	it('renders children correctly', () => {
		const {getByText} = render(
			<ThemeProvider>
				<Text>Test Content</Text>
			</ThemeProvider>
		)
		expect(getByText('Test Content')).toBeTruthy()
	})

	it('passes the correct platform branch (Mobile/Desktop)', () => {
		const {toJSON} = render(
			<ThemeProvider>
				<Text>Test</Text>
			</ThemeProvider>
		)
		expect(toJSON()).toMatchSnapshot()
	})

	it('applies density and token if provided', () => {
		const mockToken = {
			colors: {},
			typography: {},
			shape: {},
			overlay: {},
			state: {},
			elevation: {},
			motion: {},
			icon: {}
		}
		const {getByTestId} = render(
			<ThemeProvider
				density={DENSITY.STANDARD}
				token={mockToken as unknown as Token}
			>
				<Text>Hello</Text>
			</ThemeProvider>
		)

		expect(getByTestId(/^bearei__material--/)).toBeTruthy()
	})

	it('supports story mode and adjusts height', () => {
		const {toJSON} = render(
			<ThemeProvider story>
				<Text>Story Mode</Text>
			</ThemeProvider>
		)
		expect(toJSON()).toMatchSnapshot()
	})
})
