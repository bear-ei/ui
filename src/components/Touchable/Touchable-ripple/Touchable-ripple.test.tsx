import React from 'react'
import {renderWithTheme} from '../../../../__test__'
import {TouchableRipple} from './Touchable-ripple.component'

jest.useFakeTimers()

describe('TouchableRipple', () => {
	const defaultLayout = {width: 100, height: 60, x: 0, y: 0}

	it('should render centered ripple when centered=true', () => {
		const {getByTestId} = renderWithTheme(
			<TouchableRipple
				centered
				containerLayout={defaultLayout}
				indexKey='ripple-1'
				testID='ripple-1'
			/>
		)

		expect(getByTestId('ripple-1')).toBeTruthy()
	})

	it('should use touchableLocation when centered=false', () => {
		const {getByTestId} = renderWithTheme(
			<TouchableRipple
				containerLayout={defaultLayout}
				centered={false}
				indexKey='ripple-2'
				touchableLocation={{locationX: 20, locationY: 30}}
				testID='ripple-2'
			/>
		)

		expect(getByTestId('ripple-2')).toBeTruthy()
	})

	it('should calculate diameter greater than container size', () => {
		const {getByTestId} = renderWithTheme(
			<TouchableRipple
				containerLayout={defaultLayout}
				touchableLocation={{locationX: 0, locationY: 0}}
				indexKey='ripple-3'
				testID='ripple-3'
			/>
		)

		const ripple = getByTestId('ripple-3')
		expect(ripple.props.size).toBeGreaterThan(defaultLayout.width)
	})

	it('should call onAnimateFinished with correct indexKey', () => {
		const mockCallback = jest.fn()

		renderWithTheme(
			<TouchableRipple
				containerLayout={defaultLayout}
				indexKey='ripple-4'
				onAnimateFinished={mockCallback}
				testID='ripple-4'
			/>
		)

		jest.runAllTimers()
		expect(mockCallback).toHaveBeenCalledWith('ripple-4')
	})
})
