import {debounce} from '../debounce'
import {runAfterInteractions} from '../run-afterInteractions'
import {createDeferredHandler, createDeferredHandlerWithState} from './create-handler.utils'

jest.mock('../debounce', () => ({
	debounce: jest.fn()
}))

jest.mock('../run-afterInteractions', () => ({
	runAfterInteractions: jest.fn()
}))

describe('createDeferredHandlerWithState', () => {
	it('should handle without setState and debounce', () => {
		const handler = jest.fn()

		;(runAfterInteractions as jest.Mock).mockImplementation(fn => fn)

		const stableHandler = createDeferredHandlerWithState(handler)()({})

		stableHandler('test')
		expect(handler).toHaveBeenCalledWith('test')
		expect(debounce).not.toHaveBeenCalled()
	})

	it('should handle with setState and without debounce', () => {
		const fakeSetState = {value: 1}
		const handlerFactory = jest.fn().mockReturnValue(jest.fn())
		const innerHandler = handlerFactory(fakeSetState)

		;(runAfterInteractions as jest.Mock).mockImplementation(fn => fn)

		const stableHandler = createDeferredHandlerWithState(handlerFactory)(fakeSetState)({})

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

		const stableHandler = createDeferredHandlerWithState(handler)()({debounceMillisecond: 200})

		stableHandler('debounce')
		expect(debounce).toHaveBeenCalled()
		expect(debounced).toHaveBeenCalledWith('debounce')
	})
})

describe('createDeferredHandler', () => {
	it('should work as a simple wrapper of createDeferredHandlerWithState', () => {
		const handler = jest.fn()

		;(runAfterInteractions as jest.Mock).mockImplementation(fn => fn)

		const stableHandler = createDeferredHandler(handler)({})

		stableHandler('x')
		expect(handler).toHaveBeenCalledWith('x')
	})

	it('should also support debounce option in simple wrapper', () => {
		const handler = jest.fn()
		const debounced = jest.fn()

		;(runAfterInteractions as jest.Mock).mockImplementation(fn => fn)
		;(debounce as jest.Mock).mockReturnValue(() => debounced)

		const stableHandler = createDeferredHandler(handler)({debounceMillisecond: 88})

		stableHandler('y')
		expect(debounce).toHaveBeenCalled()
		expect(debounced).toHaveBeenCalledWith('y')
	})
})
