import {asyncDebounce, debounce} from './debounce.utils'

describe('debounce', () => {
	it('should not throw an error when func is undefined', () => {
		const debouncedFunc = debounce()(100)
		expect(() => debouncedFunc()).not.toThrow()
	})

	it('should execute the function after the delay', done => {
		const mockFunc = jest.fn()
		const debouncedFunc = debounce(mockFunc)(100)

		debouncedFunc()

		setTimeout(() => {
			expect(mockFunc).toHaveBeenCalled()
			done()
		}, 150)
	})

	it('should clear the previous timeout', done => {
		const mockFunc = jest.fn()
		const debouncedFunc = debounce(mockFunc)(100)

		debouncedFunc()
		debouncedFunc()

		setTimeout(() => {
			expect(mockFunc).toHaveBeenCalledTimes(1)
			done()
		}, 150)
	})
})

describe('asyncDebounce', () => {
	it('should not throw an error when func is undefined', done => {
		const asyncDebouncedFunc = asyncDebounce()(100)

		expect(() => asyncDebouncedFunc()).not.toThrow()
		done()
	})

	it('should execute the async function after the delay', done => {
		const mockAsyncFunc = jest.fn(() => Promise.resolve())
		const asyncDebouncedFunc = asyncDebounce(mockAsyncFunc)(100)

		asyncDebouncedFunc()

		setTimeout(() => {
			expect(mockAsyncFunc).toHaveBeenCalled()
			done()
		}, 150)
	})

	it('should clear the previous timeout', done => {
		const mockAsyncFunc = jest.fn(() => Promise.resolve())
		const asyncDebouncedFunc = asyncDebounce(mockAsyncFunc)(100)

		asyncDebouncedFunc()
		asyncDebouncedFunc()

		setTimeout(() => {
			expect(mockAsyncFunc).toHaveBeenCalledTimes(1)
			done()
		}, 150)
	})
})
