import {act, renderHook} from '@testing-library/react-hooks'
import {waitFor} from '@testing-library/react-native'
import {Platform} from 'react-native'
import {useDesktopScrollEvent} from '../use-desktop-scroll-event'

describe('useDesktopScrollEvent', () => {
	const mockEvent = {nativeEvent: {contentOffset: {y: 100}}} as any

	beforeEach(() => {
		jest.useFakeTimers()
	})

	afterEach(() => {
		Object.defineProperty(Platform, 'OS', {value: 'ios'})
		jest.clearAllTimers()
	})

	it('should call onScroll immediately', async () => {
		const onScroll = jest.fn()
		const {result} = renderHook(() => useDesktopScrollEvent({onScroll}))

		await act(async () => {
			result.current.onScroll?.(mockEvent)
		})

		await waitFor(() => expect(onScroll).toHaveBeenCalledWith(mockEvent))
	})

	it('should call onMomentumScrollEnd after 150ms delay', async () => {
		Object.defineProperty(Platform, 'OS', {value: 'web'})

		const onScroll = jest.fn()
		const onMomentumScrollEnd = jest.fn()
		const {result} = renderHook(() => useDesktopScrollEvent({onScroll, onMomentumScrollEnd}))

		await act(async () => {
			result.current.onScroll?.(mockEvent)
		})

		await waitFor(() => expect(onScroll).toHaveBeenCalled())
		await act(async () => {
			jest.advanceTimersByTime(150)
		})

		await waitFor(() => expect(onMomentumScrollEnd).toHaveBeenCalledWith(mockEvent))
	})

	it('should debounce multiple scroll events', async () => {
		Object.defineProperty(Platform, 'OS', {value: 'web'})

		const onMomentumScrollEnd = jest.fn()
		const {result} = renderHook(() => useDesktopScrollEvent({onMomentumScrollEnd}))

		await act(async () => {
			result.current.onScroll?.(mockEvent)
			result.current.onScroll?.(mockEvent)
		})

		await waitFor(() => expect(onMomentumScrollEnd).not.toHaveBeenCalled())
		await act(async () => {
			jest.advanceTimersByTime(150)
		})

		await waitFor(() => expect(onMomentumScrollEnd).toHaveBeenCalledTimes(1))
	})

	it('should return native onScroll handler for non-desktop platforms', () => {
		const originalPlatform = Platform.OS

		Object.defineProperty(Platform, 'OS', {value: 'android'})

		const onScroll = jest.fn()
		const {result} = renderHook(() => useDesktopScrollEvent({onScroll}))

		expect(result.current.onScroll).toBe(onScroll)

		Object.defineProperty(Platform, 'OS', {value: originalPlatform})
	})
})
