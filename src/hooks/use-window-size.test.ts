import {WINDOW_SIZE} from '@bearei/material-token'
import {renderHook} from '@testing-library/react-hooks'
import * as useWindowDimensionsModule from './use-window-dimensions.hook'
import {useWindowSize} from './use-window-size.hook'

describe('useWindowSize', () => {
	const mockUseWindowDimensions = (width: number) => {
		jest.spyOn(useWindowDimensionsModule, 'useWindowDimensions').mockReturnValue({
			width,
			height: 800,
			scale: 2,
			fontScale: 1
		})
	}

	it.each([
		[0, WINDOW_SIZE.COMPACT],
		[599, WINDOW_SIZE.COMPACT],
		[600, WINDOW_SIZE.MEDIUM],
		[839, WINDOW_SIZE.MEDIUM],
		[840, WINDOW_SIZE.EXPANDED],
		[1199, WINDOW_SIZE.EXPANDED],
		[1200, WINDOW_SIZE.LARGE],
		[1599, WINDOW_SIZE.LARGE],
		[1600, WINDOW_SIZE.EXTRA_LARGE],
		[3000, WINDOW_SIZE.EXTRA_LARGE]
	])('width %i maps to windowSize %s', (width, expected) => {
		mockUseWindowDimensions(width)

		const {result} = renderHook(() => useWindowSize())

		expect(result.current.windowSize).toBe(expected)
		expect(result.current.width).toBe(width)
	})

	it('returns full scaledSize structure', () => {
		mockUseWindowDimensions(800)

		const {result} = renderHook(() => useWindowSize())

		expect(result.current).toEqual({
			width: 800,
			height: 800,
			scale: 2,
			fontScale: 1,
			windowSize: WINDOW_SIZE.MEDIUM
		})
	})
})
