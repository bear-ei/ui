import {InteractionManager} from 'react-native'
import {runAfterInteractions} from './run-afterInteractions.utils'

jest.mock('react-native', () => ({
	InteractionManager: {
		runAfterInteractions: jest.fn(callback => {
			callback()
			return {cancel: jest.fn()}
		})
	}
}))

describe('runAfterInteractions', () => {
	it('calls the function after interactions', () => {
		const mockFn = jest.fn()
		const wrapped = runAfterInteractions(mockFn)

		wrapped('arg1', 2)

		expect(mockFn).toHaveBeenCalledTimes(1)
		expect(mockFn).toHaveBeenCalledWith('arg1', 2)
	})

	it('returns a cancellable interaction handle', () => {
		const mockHandle = {cancel: jest.fn()}
		;(InteractionManager.runAfterInteractions as jest.Mock).mockImplementationOnce(cb => {
			cb()
			return mockHandle
		})

		const result = runAfterInteractions(() => {})()

		expect(result).toBe(mockHandle)
	})

	it('does not throw when function is undefined', () => {
		expect(() => {
			runAfterInteractions()(123)
		}).not.toThrow()
	})
})
