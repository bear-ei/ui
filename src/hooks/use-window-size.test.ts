import {WINDOW_SIZE} from '@bearei/material-token'
import {renderHook} from '@testing-library/react-hooks'
import {useWindowDimensions} from './use-window-dimensions.hook'
import {useWindowSize} from './use-window-size.hook'

jest.mock('./use-window-dimensions.hook', () => ({
	useWindowDimensions: jest.fn()
}))

describe('useWindowSize', () => {
	it('should return COMPACT for width < 600', () => {
		;(useWindowDimensions as jest.Mock).mockReturnValue({width: 599})

		const {result} = renderHook(() => useWindowSize())

		expect(result.current.windowSize).toBe(WINDOW_SIZE.COMPACT)
	})

	it('should return MEDIUM for 600 <= width < 840', () => {
		;(useWindowDimensions as jest.Mock).mockReturnValue({width: 700})

		const {result} = renderHook(() => useWindowSize())

		expect(result.current.windowSize).toBe(WINDOW_SIZE.MEDIUM)
	})

	it('should return EXPANDED for 840 <= width < 1200', () => {
		;(useWindowDimensions as jest.Mock).mockReturnValue({width: 1000})

		const {result} = renderHook(() => useWindowSize())

		expect(result.current.windowSize).toBe(WINDOW_SIZE.EXPANDED)
	})

	it('should return LARGE for 1200 <= width < 1600', () => {
		;(useWindowDimensions as jest.Mock).mockReturnValue({width: 1400})

		const {result} = renderHook(() => useWindowSize())

		expect(result.current.windowSize).toBe(WINDOW_SIZE.LARGE)
	})

	it('should return EXTRA_LARGE for width >= 1600', () => {
		;(useWindowDimensions as jest.Mock).mockReturnValue({width: 1600})

		const {result} = renderHook(() => useWindowSize())

		expect(result.current.windowSize).toBe(WINDOW_SIZE.EXTRA_LARGE)
	})

	it('should return MEDIUM as default if width does not match any case', () => {
		;(useWindowDimensions as jest.Mock).mockReturnValue({width: -1})

		const {result} = renderHook(() => useWindowSize())

		expect(result.current.windowSize).toBe(WINDOW_SIZE.MEDIUM)
	})
})
