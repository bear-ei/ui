import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {Elevation} from './Elevation.component'
import {ELEVATION} from './Elevation.enum'

describe('Elevation', () => {
	it('should render container and shadow with correct testID', () => {
		const {getByTestId} = renderWithTheme(
			<Elevation
				level={ELEVATION.LEVEL_3}
				testID='test-shadow'
				shape='FULL'
			/>
		)

		expect(getByTestId('elevation--test-shadow')).toBeTruthy()
		expect(getByTestId('elevation__animatedShadow--test-shadow')).toBeTruthy()
	})

	it('should use `level` over `defaultLevel` when both are provided', () => {
		const {getByTestId} = renderWithTheme(
			<Elevation
				level={ELEVATION.LEVEL_5}
				defaultLevel={ELEVATION.LEVEL_1}
				testID='prior-test'
				shape='FULL'
			/>
		)

		const shadow = getByTestId('elevation__animatedShadow--prior-test')
		expect(shadow.props.level).toBe(ELEVATION.LEVEL_5)
	})

	it('should fallback to `defaultLevel` if `level` is undefined', () => {
		const {getByTestId} = renderWithTheme(
			<Elevation
				defaultLevel={ELEVATION.LEVEL_2}
				testID='fallback-test'
				shape='FULL'
			/>
		)

		const shadow = getByTestId('elevation__animatedShadow--fallback-test')
		expect(shadow.props.level).toBe(ELEVATION.LEVEL_2)
	})

	it('should apply shape prop to shadow component', () => {
		const {getByTestId} = renderWithTheme(
			<Elevation
				level={ELEVATION.LEVEL_1}
				testID='shape-test'
				shape='EXTRA_SMALL'
			/>
		)

		const shadow = getByTestId('elevation__animatedShadow--shape-test')
		expect(shadow.props.shape).toBe('EXTRA_SMALL')
	})
})
