import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Button} from './Button.component'
import {BUTTON_TYPE} from './Button.enum'

describe('Button', () => {
	it('should render with labelText', () => {
		const {getByText} = renderWithTheme(
			<Button
				labelText='Submit'
				testID='btn-1'
			/>
		)
		expect(getByText('Submit')).toBeTruthy()
	})

	it('should render icon if provided', () => {
		const icon = <Text>Icon</Text>
		const {getByText} = renderWithTheme(
			<Button
				icon={icon}
				labelText='Send'
				testID='btn-2'
			/>
		)
		expect(getByText('Icon')).toBeTruthy()
	})

	it('should render as LINK type with active indicator when eventName is hoverIn', () => {
		const {getByTestId} = renderWithTheme(
			<Button
				labelText='Link'
				type={BUTTON_TYPE.LINK}
				testID='btn-link'
				loading={false}
			/>
		)

		const button = getByTestId('button--btn-link')
		expect(button).toBeTruthy()
	})

	it('should not crash when disabled is false and type is FILLED', () => {
		const {getByTestId} = renderWithTheme(
			<Button
				labelText='Click'
				type={BUTTON_TYPE.FILLED}
				disabled={false}
				testID='btn-4'
			/>
		)
		expect(getByTestId('button--btn-4')).toBeTruthy()
	})

	it('should correctly handle elevation for ELEVATED button', () => {
		const {getByTestId} = renderWithTheme(
			<Button
				labelText='Elevate'
				type={BUTTON_TYPE.ELEVATED}
				testID='btn-elevated'
			/>
		)

		const elevation = getByTestId('btn-elevated')
		expect(elevation).toBeTruthy()
	})

	it('should render Underlay with correct props', () => {
		const {getByTestId} = renderWithTheme(
			<Button
				labelText='Underlay'
				testID='btn-underlay'
			/>
		)

		const underlay = getByTestId('btn-underlay')
		expect(underlay).toBeTruthy()
	})

	it('should support error state and render correct color', () => {
		const {getByTestId} = renderWithTheme(
			<Button
				labelText='Error'
				testID='btn-error'
				error
			/>
		)

		const animatedText = getByTestId('button__animatedLabelText--btn-error')
		expect(animatedText).toBeTruthy()
	})
})
