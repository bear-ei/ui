import {Token} from '@bearei/material-token'
import {renderHook} from '@testing-library/react-hooks'
import {SharedValue} from 'react-native-reanimated'
import {useAnimatedTiming} from './use-animated-timing.hook'

type TimingArgs = [number, Record<string, any>, ((finished: boolean) => void)?]

const mockWithTiming = jest.fn((_toValue, _config, callback) => {
	if (callback) {
		callback(true)
	}

	return 'timing-animation'
})

const mockWithRepeat = jest.fn((_animation, _numberOfReps, _reverse) => {
	return 'repeated-timing-animation'
})

const mockRunOnJS = jest.fn(callback => callback)

jest.mock('react-native-reanimated', () => ({
	Easing: {
		bezier: jest.fn(() => jest.fn(v => v))
	},
	withTiming: jest.fn().mockImplementation((...args: TimingArgs) => mockWithTiming(...args)),
	withRepeat: jest.fn().mockImplementation((...args: TimingArgs) => mockWithRepeat(...args)),
	runOnJS: jest.fn().mockImplementation(cb => mockRunOnJS(cb))
}))

const mockToken = {
	animated: jest.fn().mockImplementation(() => () => ({
		bezier: {x0: 0.2, y0: 0, x1: 0, y1: 1},
		duration: 250
	}))
} as unknown as Token

describe('useAnimatedTiming', () => {
	it('should animate shared value with callback', () => {
		const callback = jest.fn()
		const sharedValue = {value: 0} as SharedValue<number>
		const {result} = renderHook(() => useAnimatedTiming({token: mockToken}))
		const animate = result.current({callback})

		animate(sharedValue)(1)
		expect(sharedValue.value).toBe('timing-animation')
		expect(mockWithTiming).toHaveBeenCalled()
		expect(callback).toHaveBeenCalledWith(true)
	})

	it('should use repeat when repeat is defined', () => {
		const sharedValue = {value: 0} as SharedValue<number>
		const {result} = renderHook(() => useAnimatedTiming({token: mockToken}))
		const animate = result.current({repeat: 2})

		animate(sharedValue)(1)
		expect(sharedValue.value).toBe('repeated-timing-animation')
		expect(mockWithRepeat).toHaveBeenCalledWith('timing-animation', 2)
	})
})
