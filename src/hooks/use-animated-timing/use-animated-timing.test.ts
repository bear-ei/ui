import type {Token} from '@bearei/element-token'
import {renderHook} from '@testing-library/react-native'
import {SharedValue} from 'react-native-reanimated'
import {createAnimatedTiming} from './use-animated-timing.handler'
import {useAnimatedTiming} from './use-animated-timing.hook'

describe('useAnimatedTiming', () => {
	const mockToken = {
		animated: () => () => ({
			bezier: {x0: 0.4, y0: 0.0, x1: 0.2, y1: 1.0},
			duration: 300
		})
	} as Token

	it('returns a valid timing function', () => {
		const toValue = 1
		const callback = jest.fn()
		const animatedTiming = createAnimatedTiming({
			bezier: {x0: 0.4, y0: 0.0, x1: 0.2, y1: 1.0},
			duration: 500,
			easing: 'EMPHASIZED'
		})

		const animation = animatedTiming(callback)(toValue)

		expect(typeof animation).toBe('number')
	})

	it('supports repeat', () => {
		const animatedTiming = createAnimatedTiming({
			bezier: {x0: 0.4, y0: 0.0, x1: 0.2, y1: 1.0},
			duration: 500,
			repeat: 3
		})

		const animation = animatedTiming()(1)
		expect(animation).toBeDefined()
	})

	it('returns a function that animates SharedValue', () => {
		const {result} = renderHook(() => useAnimatedTiming({token: mockToken as any}))
		const sharedValue = {value: 0} as SharedValue<number>

		result.current()({sharedValue})(1)
		expect(sharedValue.value).toBeDefined()
	})
})
