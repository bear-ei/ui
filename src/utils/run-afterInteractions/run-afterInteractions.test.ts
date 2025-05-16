import {InteractionManager} from 'react-native'
import {runAfterInteractions} from './run-afterInteractions.utils'

describe('runAfterInteractions', () => {
	let originalRunAfterInteractions: typeof InteractionManager.runAfterInteractions

	beforeEach(() => {
		originalRunAfterInteractions = InteractionManager.runAfterInteractions

		jest.spyOn(InteractionManager, 'runAfterInteractions').mockImplementation(task => {
			if (typeof task === 'function') {
				task()
			}

			return {
				then: (onfulfilled?: () => any, onrejected?: () => any) =>
					Promise.resolve(onfulfilled?.()),
				done: (...args: any[]) => undefined,
				cancel: () => undefined
			}
		})
	})

	afterEach(() => {
		InteractionManager.runAfterInteractions = originalRunAfterInteractions
		jest.restoreAllMocks()
	})

	it('should execute the function after interactions', () => {
		const mockFunc = jest.fn()
		const wrappedFunc = runAfterInteractions(mockFunc)

		wrappedFunc()

		expect(InteractionManager.runAfterInteractions).toHaveBeenCalledWith(expect.any(Function))

		const callback = (InteractionManager.runAfterInteractions as jest.Mock).mock.calls[0][0]

		callback()

		expect(mockFunc).toHaveBeenCalled()
	})

	it('should not throw an error if no function is provided', () => {
		const wrappedFunc = runAfterInteractions()

		expect(() => wrappedFunc()).not.toThrow()
	})

	it('should execute the function with the correct arguments', () => {
		const mockFunc = jest.fn()
		const wrappedFunc = runAfterInteractions(mockFunc)

		wrappedFunc('arg1', 'arg2')

		expect(InteractionManager.runAfterInteractions).toHaveBeenCalledWith(expect.any(Function))

		const callback = (InteractionManager.runAfterInteractions as jest.Mock).mock.calls[0][0]

		callback()

		expect(mockFunc).toHaveBeenCalledWith('arg1', 'arg2')
	})
})
