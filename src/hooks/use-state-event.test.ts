import {act, renderHook} from '@testing-library/react-hooks'
import {Platform} from 'react-native'
import {useStateEvent} from './use-state-event.hook'

describe('useStateEvent', () => {
	const originalOS = Platform.OS

	afterEach(() => {
		Object.defineProperty(Platform, 'OS', {
			get: () => originalOS
		})
	})

	const createMockEvent = () => ({nativeEvent: {}})

	it('calls onStateEventChange and callback for pressIn', () => {
		const onPressIn = jest.fn()
		const onStateEventChange = jest.fn(() => () => jest.fn())

		const {result} = renderHook(() => useStateEvent({onPressIn, onStateEventChange}))

		act(() => {
			result.current.onPressIn(createMockEvent() as any)
		})

		expect(onPressIn).toHaveBeenCalled()
		expect(onStateEventChange).toHaveBeenCalledWith({eventName: 'pressIn'})
	})

	it('respects disabled = true and ignores events (except layout)', () => {
		const onPress = jest.fn()
		const onLayout = jest.fn()
		const onStateEventChange = jest.fn(() => () => jest.fn())

		const {result} = renderHook(() =>
			useStateEvent({disabled: true, onPress, onLayout, onStateEventChange})
		)

		act(() => {
			result.current.onPress?.(createMockEvent() as any)
		})
		expect(onPress).not.toHaveBeenCalled()

		act(() => {
			result.current.onLayout?.(createMockEvent() as any)
		})

		expect(onLayout).toHaveBeenCalled()
		expect(onStateEventChange).toHaveBeenCalledWith({eventName: 'layout'})
	})

	it('handles focus and blur events', () => {
		const onFocus = jest.fn()
		const onBlur = jest.fn()
		const onStateEventChange = jest.fn(() => () => jest.fn())

		const {result} = renderHook(() => useStateEvent({onFocus, onBlur, onStateEventChange}))

		act(() => result.current.onFocus(createMockEvent() as any))
		act(() => result.current.onBlur(createMockEvent() as any))

		expect(onFocus).toHaveBeenCalled()
		expect(onBlur).toHaveBeenCalled()
	})

	it('sets mobileDevice to true on iOS', () => {
		const originalOS = Platform.OS
		Object.defineProperty(Platform, 'OS', {get: () => 'ios'})

		const {result} = renderHook(() => useStateEvent({}))
		expect(result.current.mobileDevice).toBe(true)

		Object.defineProperty(Platform, 'OS', {get: () => originalOS})
	})
})
