import {asyncDebounce, debounce} from './debounce.utils'

beforeEach(() => {
	jest.useFakeTimers()
	jest.setTimeout(10000)
	jest.clearAllTimers()
})

describe('debounce (sync)', () => {
	it('should only call the last invocation', () => {
		const fn = jest.fn()
		const debounced = debounce(fn)(300)

		debounced('a')
		debounced('b')
		debounced('c')

		expect(fn).not.toHaveBeenCalled()

		jest.runAllTimers()

		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveBeenCalledWith('c')
	})

	it('should return undefined immediately', () => {
		const fn = jest.fn().mockReturnValue('value')
		const debounced = debounce(fn)(100)

		const result = debounced('test')

		expect(result).toBeUndefined()

		jest.runAllTimers()
		expect(fn).toHaveBeenCalledWith('test')
	})

	it('should handle undefined function gracefully', () => {
		const debounced = debounce()(150)

		expect(() => {
			debounced('noop')
			jest.runAllTimers()
		}).not.toThrow()
	})
})

describe('asyncDebounce', () => {
	it('should call async function after delay and resolve', async () => {
		const fn = jest.fn().mockResolvedValue('done')
		const debounced = asyncDebounce(fn)(200)

		const promise = debounced('test')
		jest.runAllTimers()

		await expect(promise).resolves.toBe('done')
		expect(fn).toHaveBeenCalledWith('test')
	})

	it('should only call the last async function', async () => {
		const fn = jest.fn().mockResolvedValue('result')
		const debounced = asyncDebounce(fn)(300)

		const _first = debounced('a')
		const second = debounced('b')

		jest.runAllTimers()

		// ❌ Don't await first – it's never called
		await expect(second).resolves.toBe('result')
		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveBeenCalledWith('b')
	})

	it('should reject when async function throws', async () => {
		const fn = jest.fn().mockRejectedValue(new Error('fail'))
		const debounced = asyncDebounce(fn)(100)

		const promise = debounced('error')
		jest.runAllTimers()

		await expect(promise).rejects.toThrow('fail')
	})

	it('should resolve undefined if function not provided', async () => {
		const debounced = asyncDebounce()(150)

		const promise = debounced('noop')
		jest.runAllTimers()

		await expect(promise).resolves.toBeUndefined()
	})
})
