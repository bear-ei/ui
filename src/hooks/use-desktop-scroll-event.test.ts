import {act, renderHook} from '@testing-library/react-hooks'
import {Platform} from 'react-native'
import {useDesktopScrollEvent} from './use-desktop-scroll-event.hook'

jest.useFakeTimers()

const mockPlatform = (os: string) => {
	Object.defineProperty(Platform, 'OS', {
		get: () => os
	})
}

describe('useDesktopScrollEvent', () => {
	const createEvent = () => ({
		nativeEvent: {
			contentOffset: {x: 0, y: 0}
		}
	})

	beforeEach(() => {
		jest.clearAllTimers()
	})

	it('returns native handlers on non-desktop platforms', () => {
		mockPlatform('ios')

		const onScroll = jest.fn()
		const onMomentumScrollEnd = jest.fn()
		const {result} = renderHook(() => useDesktopScrollEvent({onScroll, onMomentumScrollEnd}))

		expect(result.current.onScroll).toBe(onScroll)
		expect(result.current.onMomentumScrollEnd).toBe(onMomentumScrollEnd)
	})

	it('wraps scroll event and delays momentum event on desktop platforms', () => {
		mockPlatform('web')

		const onScroll = jest.fn()
		const onMomentumScrollEnd = jest.fn()
		const event = createEvent()
		const {result} = renderHook(() => useDesktopScrollEvent({onScroll, onMomentumScrollEnd}))

		act(() => {
			result.current.onScroll?.(event as any)
		})

		expect(onScroll).toHaveBeenCalledWith(event)
		expect(onMomentumScrollEnd).not.toHaveBeenCalled()
		act(() => {
			jest.advanceTimersByTime(150)
		})

		expect(onMomentumScrollEnd).toHaveBeenCalledWith(event)
	})

	it('clears timeout on unmount', () => {
		mockPlatform('web')

		const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
		const {unmount, result} = renderHook(() =>
			useDesktopScrollEvent({
				onScroll: jest.fn(),
				onMomentumScrollEnd: jest.fn()
			})
		)

		act(() => {
			result.current.onScroll?.({nativeEvent: {}} as any)
		})

		unmount()
		expect(clearTimeoutSpy).toHaveBeenCalled()
		clearTimeoutSpy.mockRestore()
	})
})
