import {act, renderHook} from '@testing-library/react-hooks'
import {waitFor} from '@testing-library/react-native'
import {EVENT_NAME} from '../../components'
import {useInteractionStateEvent} from '../use-interaction-state-event'

const createEvent = (type: string = 'pressIn') => ({nativeEvent: {}, type}) as any

describe('useInteractionStateEvent', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it('should return expected handlers', () => {
		const {result} = renderHook(() => useInteractionStateEvent({onStateEventChange: jest.fn()}))

		expect(result.current).toHaveProperty('onPressIn')
		expect(result.current).toHaveProperty('onPress')
		expect(result.current).toHaveProperty('onHoverIn')
		expect(result.current).toHaveProperty('onBlur')
		expect(result.current).toHaveProperty('mobileDevice')
	})

	it('should trigger onStateEventChange with correct event name and state', async () => {
		const onStateEventChange = jest.fn(() => () => () => {})
		const {result} = renderHook(() => useInteractionStateEvent({onStateEventChange}))
		const pressEvent = createEvent('pressIn')

		await act(async () => {
			result.current.onPressIn?.(pressEvent)
		})

		await waitFor(() =>
			expect(onStateEventChange).toHaveBeenCalledWith({
				eventName: EVENT_NAME.PRESS_IN
			})
		)
	})

	it('should skip events if disabled and not layout', async () => {
		const onStateEventChange = jest.fn(() => () => () => {})
		const {result} = renderHook(() => useInteractionStateEvent({onStateEventChange, disabled: true}))

		await act(async () => {
			result.current.onPressIn?.(createEvent())
		})

		await waitFor(() => expect(onStateEventChange).not.toHaveBeenCalled())
	})

	it('should allow layout events even when disabled', async () => {
		const onStateEventChange = jest.fn(() => () => () => {})
		const {result} = renderHook(() => useInteractionStateEvent({onStateEventChange, disabled: true}))

		await act(async () => {
			result.current.onLayout?.({nativeEvent: {layout: {}}} as any)
		})

		await waitFor(() =>
			expect(onStateEventChange).toHaveBeenCalledWith({
				eventName: EVENT_NAME.LAYOUT
			})
		)
	})

	it('should fallback to default states based on mobile or desktop', async () => {
		const onStateEventChange = jest.fn(() => () => () => {})
		const {result} = renderHook(() => useInteractionStateEvent({onStateEventChange}))

		await act(async () => {
			result.current.onPress?.(createEvent())
			result.current.onPressOut?.(createEvent())
		})

		await waitFor(() => {
			expect(onStateEventChange).toHaveBeenCalledWith(
				expect.objectContaining({eventName: EVENT_NAME.PRESS})
			)

			expect(onStateEventChange).toHaveBeenCalledWith(
				expect.objectContaining({eventName: EVENT_NAME.PRESS_OUT})
			)
		})
	})
})
