import {Platform} from 'react-native'
import {useInteractionStateEvent} from './use-interaction-state-event.hook'

describe('useInteractionStateEvent', () => {
	const originalPlatform = Platform.OS

	afterEach(() => {
		Platform.OS = originalPlatform
	})

	it('should call onStateEventChange with correct arguments', () => {
		Platform.OS = 'ios'

		const onStateEventChange = jest
			.fn()
			.mockImplementation(() => jest.fn().mockImplementation(() => jest.fn().mockImplementation()))

		const {onBlur, onFocus, onPress} = useInteractionStateEvent({
			disabled: false,
			onBlur: jest.fn(),
			onFocus: jest.fn(),
			onPress: jest.fn(),
			onStateEventChange
		})

		const event = {nativeEvent: {}} as any

		onBlur(event)
		onFocus(event)
		onPress(event)
		expect(onStateEventChange).toHaveBeenCalledWith({eventName: 'blur'})
		expect(onStateEventChange).toHaveBeenCalledWith({eventName: 'focus'})
		expect(onStateEventChange).toHaveBeenCalledWith({eventName: 'press'})

		const stateHandler = onStateEventChange.mock.results[0].value
		const eventHandler = stateHandler('enabled')

		eventHandler(event)
		expect(onStateEventChange).toHaveBeenCalledTimes(3)
	})

	it('should not call onStateEventChange when it is not provided', () => {
		Platform.OS = 'ios'
		const {onBlur, onFocus, onPress} = useInteractionStateEvent({
			disabled: false,
			onBlur: jest.fn(),
			onFocus: jest.fn(),
			onPress: jest.fn()
		})

		const event = {nativeEvent: {}} as any

		onBlur(event)
		onFocus(event)
		onPress(event)
		expect(true).toBe(true)
	})

	it('should not call onStateEventChange when disabled (except for layout)', () => {
		Platform.OS = 'ios'

		const onStateEventChange = jest
			.fn()
			.mockImplementation(() => jest.fn().mockImplementation(() => jest.fn().mockImplementation()))

		const {onBlur, onFocus, onLayout} = useInteractionStateEvent({
			disabled: true,
			onBlur: jest.fn(),
			onFocus: jest.fn(),
			onLayout: jest.fn(),
			onStateEventChange
		})

		const event = {nativeEvent: {}} as any

		onBlur(event)
		onFocus(event)
		onLayout(event)
		expect(onStateEventChange).toHaveBeenCalledTimes(1)
		expect(onStateEventChange).toHaveBeenCalledWith({eventName: 'layout'})
	})
})
