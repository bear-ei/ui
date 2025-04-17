import {renderHook} from '@testing-library/react-hooks'
import {Dimensions} from 'react-native'
import {useWindowDimensions} from './use-window-dimensions.hook'

jest.mock('react-native', () => ({
	Dimensions: {
		get: jest.fn(),
		addEventListener: jest.fn()
	}
}))

const mockRemove = jest.fn()

describe('useWindowDimensions', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.useFakeTimers()
		;(Dimensions.get as jest.Mock).mockReturnValue({
			width: 375,
			height: 812,
			scale: 3,
			fontScale: 2
		})
		;(Dimensions.addEventListener as jest.Mock).mockImplementation((_, handler) => {
			return {remove: mockRemove}
		})
	})

	it('initializes with Dimensions.get', () => {
		const {result} = renderHook(() => useWindowDimensions())
		expect(result.current).toEqual({
			width: 375,
			height: 812,
			scale: 3,
			fontScale: 2
		})
	})

	it('adds and removes Dimensions listener', () => {
		const {unmount} = renderHook(() => useWindowDimensions())
		expect(Dimensions.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))

		unmount()
		expect(mockRemove).toHaveBeenCalled()
	})
})
