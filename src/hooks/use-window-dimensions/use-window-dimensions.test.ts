import {act, renderHook} from '@testing-library/react-hooks'
import {waitFor} from '@testing-library/react-native'
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
		jest.useFakeTimers()
		jest.clearAllMocks()
		jest.spyOn(Dimensions, 'get').mockReturnValue(mockInitialDimensions as any)
		jest.spyOn(Dimensions, 'addEventListener').mockImplementation((_, listener) => {
			mockListener.mockImplementation(listener)

			return {
				remove: removeMock
			} as any
		})
	})

	afterEach(() => {
		jest.clearAllTimers()
	})

	it('should return initial dimensions on mount', async () => {
		const {result} = renderHook(() => useWindowDimensions())

		await waitFor(() => expect(result.current).toEqual(mockInitialDimensions))
	})

	it('should update dimensions when window changes', async () => {
		const {result} = renderHook(() => useWindowDimensions())
		const newDimensions = {
			window: {
				width: 375,
				height: 812,
				scale: 3,
				fontScale: 2
			}
		}

		await act(async () => {
			mockListener(newDimensions)
		})

		await waitFor(() => expect(result.current).toEqual(newDimensions.window))
	})

	it('should remove event listener on unmount', async () => {
		const {unmount} = renderHook(() => useWindowDimensions())

		unmount()
		await waitFor(() => expect(removeMock).toHaveBeenCalled())
	})
})
