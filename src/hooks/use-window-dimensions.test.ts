import {act, renderHook} from '@testing-library/react-hooks'
import {Dimensions} from 'react-native'
import {useWindowDimensions} from './use-window-dimensions.hook'

describe('useWindowDimensions', () => {
	const mockInitialDimensions = {
		width: 375,
		height: 812,
		scale: 3,
		fontScale: 2
	}

	let mockListener = jest.fn()
	let removeMock = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
		jest.spyOn(Dimensions, 'get').mockReturnValue(mockInitialDimensions as any)
		jest.spyOn(Dimensions, 'addEventListener').mockImplementation((_, listener) => {
			mockListener.mockImplementation(listener)

			return {
				remove: removeMock
			} as any
		})
	})

	it('should return initial dimensions on mount', () => {
		const {result} = renderHook(() => useWindowDimensions())

		expect(result.current).toEqual(mockInitialDimensions)
	})

	it('should update dimensions when window changes', () => {
		const {result} = renderHook(() => useWindowDimensions())

		const newDimensions = {
			window: {
				width: 375,
				height: 812,
				scale: 3,
				fontScale: 2
			}
		}

		act(() => {
			mockListener(newDimensions)
		})

		expect(result.current).toEqual(newDimensions.window)
	})

	it('should remove event listener on unmount', () => {
		const {unmount} = renderHook(() => useWindowDimensions())

		unmount()

		expect(removeMock).toHaveBeenCalled()
	})
})
