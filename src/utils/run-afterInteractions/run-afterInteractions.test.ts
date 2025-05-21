import {InteractionManager} from 'react-native'
import {runAfterInteractions} from './run-afterInteractions.utils'

jest.mock('react-native', () => ({
	InteractionManager: {
		runAfterInteractions: jest.fn()
	}
}))

describe('runAfterInteractions', () => {
	it('should call InteractionManager.runAfterInteractions with the provided function', () => {
		const fn = jest.fn()
		const mockResult = {then: jest.fn(), done: jest.fn(), cancel: jest.fn()}
		;(InteractionManager.runAfterInteractions as jest.Mock).mockReturnValue(mockResult)

		const wrapped = runAfterInteractions(fn)
		const result = wrapped(1, 2, 3)

		expect(InteractionManager.runAfterInteractions).toHaveBeenCalledTimes(1)

		const calledFn = (InteractionManager.runAfterInteractions as jest.Mock).mock.calls[0][0]

		calledFn()

		expect(fn).toHaveBeenCalledWith(1, 2, 3)
		expect(result).toBe(mockResult)
	})

	it('should work when no function is provided', () => {
		const mockResult = {then: jest.fn(), done: jest.fn(), cancel: jest.fn()}
		;(InteractionManager.runAfterInteractions as jest.Mock).mockReturnValue(mockResult)

		const wrapped = runAfterInteractions()
		const result = wrapped('a', 'b')

		expect(InteractionManager.runAfterInteractions).toHaveBeenCalledTimes(1)

		const calledFn = (InteractionManager.runAfterInteractions as jest.Mock).mock.calls[0][0]

		expect(() => calledFn()).not.toThrow()
		expect(result).toBe(mockResult)
	})
})
