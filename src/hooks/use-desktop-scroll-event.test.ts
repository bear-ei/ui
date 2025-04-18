import {act, renderHook} from '@testing-library/react-hooks'
import {Platform} from 'react-native'
import {useDesktopScrollEvent} from './use-desktop-scroll-event.hook'

jest.useFakeTimers()

describe('useDesktopScrollEvent', () => {
	let originalPlatform: 'ios' | 'android' | 'windows' | 'macos' | 'web'

	beforeAll(() => {
		originalPlatform = Platform.OS
	})

	afterEach(() => {
		jest.clearAllTimers()
		jest.clearAllMocks()
	})

	afterAll(() => {
		Platform.OS = originalPlatform
	})

	it('should call onScroll immediately', () => {
		Platform.OS = 'macos'

		const onScroll = jest.fn()
		const {result} = renderHook(() => useDesktopScrollEvent({onScroll}))
		const fakeEvent = {nativeEvent: {}} as any

		act(() => {
			result.current.onScroll?.(fakeEvent)
		})

		expect(onScroll).toHaveBeenCalledTimes(1)
	})

	it('should call onMomentumScrollEnd after 150ms', () => {
		Platform.OS = 'web'

		const onScroll = jest.fn()
		const onMomentumScrollEnd = jest.fn()
		const {result} = renderHook(() => useDesktopScrollEvent({onScroll, onMomentumScrollEnd}))
		const fakeEvent = {nativeEvent: {}} as any

		act(() => {
			result.current.onScroll?.(fakeEvent)
			jest.advanceTimersByTime(149)
		})

		expect(onMomentumScrollEnd).not.toHaveBeenCalled()

		act(() => {
			jest.advanceTimersByTime(1)
		})

		expect(onMomentumScrollEnd).toHaveBeenCalledTimes(1)
	})

	it('should clear timer on unmount', () => {
		Platform.OS = 'windows'

		const onScroll = jest.fn()
		const clearSpy = jest.spyOn(global, 'clearTimeout')
		const {unmount, result} = renderHook(() =>
			useDesktopScrollEvent({onScroll, onMomentumScrollEnd: jest.fn()})
		)

		act(() => {
			result.current.onScroll?.({nativeEvent: {}} as any)
		})

		unmount()

		expect(clearSpy).toHaveBeenCalled()
	})
})
