import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {Underlay} from './Underlay.component'

describe('Underlay', () => {
	it('should render container and hover layer with provided testID', () => {
		const {getByTestId} = renderWithTheme(
			<Underlay
				shape='FULL'
				testID='hover-test'
			/>
		)

		expect(getByTestId('underlay--hover-test')).toBeTruthy()
		expect(getByTestId('underlay__animatedHoverLayer--hover-test')).toBeTruthy()
	})

	it('should render active layer when active is true and activeColor is set', () => {
		const {getByTestId} = renderWithTheme(
			<Underlay
				shape='FULL'
				testID='active-test'
				active
				activeColor='#ff0000'
			/>
		)

		expect(getByTestId('underlay__animatedActiveLayer--active-test')).toBeTruthy()
	})

	it('should not render active layer when activeColor is missing', () => {
		const {queryByTestId} = renderWithTheme(
			<Underlay
				shape='FULL'
				testID='no-active-color'
				active
			/>
		)

		expect(queryByTestId('underlay__animatedActiveLayer--no-active-color')).toBeNull()
	})

	it('should pass shape and underlayColor props to hover layer', () => {
		const {getByTestId} = renderWithTheme(
			<Underlay
				shape='EXTRA_SMALL'
				testID='color-shape'
				underlayColor='#abcdef'
			/>
		)

		const hoverLayer = getByTestId('underlay__animatedHoverLayer--color-shape')
		expect(hoverLayer.props.shape).toBe('EXTRA_SMALL')
		expect(hoverLayer.props.underlayColor).toBe('#abcdef')
	})

	it('should use activeShape if provided, fallback to shape if not', () => {
		const {getByTestId} = renderWithTheme(
			<Underlay
				shape='FULL'
				activeShape='EXTRA_SMALL'
				active
				activeColor='#00ff00'
				testID='shape-test'
			/>
		)

		const activeLayer = getByTestId('underlay__animatedActiveLayer--shape-test')
		expect(activeLayer.props.shape).toBe('EXTRA_SMALL')
	})
})
