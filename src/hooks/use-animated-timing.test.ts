import {renderHook} from '@testing-library/react-hooks'
import type {SharedValue} from 'react-native-reanimated'
import {useAnimatedTiming} from './use-animated-timing.hook'

describe('useAnimatedTiming', () => {
	const mockSharedValue = {value: 0}

	const mockToken = {
		animated: () => () => ({
			bezier: {x0: 0, y0: 0, x1: 1, y1: 1},
			duration: 300
		})
	}

	it('skips animation if toValue equals current value', () => {
		mockSharedValue.value = 100
		const {result} = renderHook(() => useAnimatedTiming({token: mockToken as any}))

		result.current()(mockSharedValue as SharedValue<number>)(100)

		expect(mockSharedValue.value).toBe(100)
	})

	it('updates sharedValue when toValue changes', () => {
		mockSharedValue.value = 0
		const {result} = renderHook(() => useAnimatedTiming({token: mockToken as any}))

		result.current()(mockSharedValue as SharedValue<number>)(200)

		expect(mockSharedValue.value).not.toBe(0)
		expect(mockSharedValue.value).toBeDefined()
	})
})
