import React from 'react'
import {renderWithTheme} from '../../../../__test__'
import {SkeletonElement} from './Skeleton-element.component'

describe('SkeletonElement', () => {
	it('should render with default testID', () => {
		const {getByTestId} = renderWithTheme(<SkeletonElement />)
		const element = getByTestId('skeletonElement--test-id')

		expect(element).toBeTruthy()
	})

	it('should render with custom testID', () => {
		const {getByTestId} = renderWithTheme(<SkeletonElement testID='custom-id' />)

		expect(getByTestId('custom-id')).toBeTruthy()
	})

	it('should accept size prop (number)', () => {
		const {getByTestId} = renderWithTheme(
			<SkeletonElement
				testID='sized'
				size={40}
			/>
		)
		const element = getByTestId('sized')

		expect(element.props.size).toBe(40)
	})

	it('should accept size prop (object)', () => {
		const sizeObj = {width: 100, height: 20}
		const {getByTestId} = renderWithTheme(
			<SkeletonElement
				testID='sized-obj'
				size={sizeObj}
			/>
		)
		const element = getByTestId('sized-obj')

		expect(element.props.size).toEqual(sizeObj)
	})
})
