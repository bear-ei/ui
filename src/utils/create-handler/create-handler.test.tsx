import {debounce} from '../debounce'
import {runAfterInteractions} from '../run-afterInteractions'
import {createStableHandler, createStableHandlerWithState} from './create-handler.utils'

jest.mock('../debounce', () => ({
	debounce: jest.fn()
}))

jest.mock('../run-afterInteractions', () => ({
	runAfterInteractions: jest.fn()
}))

describe('createStableHandlerWithState', () => {
	it('should handle without setState and debounce', () => {
		const handler = jest.fn()

		;(runAfterInteractions as jest.Mock).mockImplementation(fn => fn)

		const stableHandler = createStableHandlerWithState(handler)()({})

		stableHandler('test')
		expect(handler).toHaveBeenCalledWith('test')
		expect(debounce).not.toHaveBeenCalled()
	})

	it('should handle with setState and without debounce', () => {
		const fakeSetState = {value: 1}
		const handlerFactory = jest.fn().mockReturnValue(jest.fn())
		const innerHandler = handlerFactory(fakeSetState)

		;(runAfterInteractions as jest.Mock).mockImplementation(fn => fn)

		const stableHandler = createStableHandlerWithState(handlerFactory)(fakeSetState)({})

		stableHandler('abc')
		expect(handlerFactory).toHaveBeenCalledWith(fakeSetState)
		expect(innerHandler).toHaveBeenCalledWith('abc')
		expect(debounce).not.toHaveBeenCalled()
	})

	it('should apply debounce if debounceMillisecond is set', () => {
		const handler = jest.fn()
		const debounced = jest.fn()

		;(runAfterInteractions as jest.Mock).mockImplementation(fn => fn)
		;(debounce as jest.Mock).mockReturnValue(() => debounced)

		const stableHandler = createStableHandlerWithState(handler)()({debounceMillisecond: 200})

		stableHandler('debounce')
		expect(debounce).toHaveBeenCalled()
		expect(debounced).toHaveBeenCalledWith('debounce')
	})
})

describe('createStableHandler', () => {
	it('should work as a simple wrapper of createStableHandlerWithState', () => {
		const handler = jest.fn()

		;(runAfterInteractions as jest.Mock).mockImplementation(fn => fn)

		const stableHandler = createStableHandler(handler)({})

		stableHandler('x')
		expect(handler).toHaveBeenCalledWith('x')
	})

	it('should also support debounce option in simple wrapper', () => {
		const handler = jest.fn()
		const debounced = jest.fn()

		;(runAfterInteractions as jest.Mock).mockImplementation(fn => fn)
		;(debounce as jest.Mock).mockReturnValue(() => debounced)

		const stableHandler = createStableHandler(handler)({debounceMillisecond: 88})

		stableHandler('y')
		expect(debounce).toHaveBeenCalled()
		expect(debounced).toHaveBeenCalledWith('y')
	})
})
