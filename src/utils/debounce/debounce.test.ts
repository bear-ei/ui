import {debounce} from './debounce.utils'

describe('debounce (promise version, sync and async)', () => {
	beforeEach(() => {
		jest.useFakeTimers()
		jest.clearAllMocks()
	})

	afterEach(() => {
		jest.clearAllTimers()
	})

	it('should call the function after the delay and resolve result (sync)', async () => {
		const fn = jest.fn((x: number) => x * 2)
		const debounced = debounce(fn)(100)
		const promise = debounced(5)
		jest.advanceTimersByTime(100)
		await expect(promise).resolves.toBe(10)
		expect(fn).toHaveBeenCalledWith(5)
	})

	it('should call the function after the delay and resolve result (async)', async () => {
		const fn = jest.fn(async (x: number) => x * 3)
		const debounced = debounce(fn)(50)
		const promise = debounced(7)
		jest.advanceTimersByTime(50)
		await Promise.resolve() // flush microtasks
		await expect(promise).resolves.toBe(21)
		expect(fn).toHaveBeenCalledWith(7)
	})

	it('should only call the last invocation and previous promises reject', async () => {
		const fn = jest.fn((x: number) => x * 2)
		const debounced = debounce(fn)(200)
		const p1 = debounced(1)
		const p2 = debounced(2)
		const p3 = debounced(3)

		jest.advanceTimersByTime(200)

		await expect(p1).rejects.toThrow('Debounced call cancelled')
		await expect(p2).rejects.toThrow('Debounced call cancelled')
		await expect(p3).resolves.toBe(6)

		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveBeenCalledWith(3)
	})

	it('should reject if the function throws (sync)', async () => {
		const fn = jest.fn(() => {
			throw new Error('fail')
		})
		const debounced = debounce(fn)(100)
		const promise = debounced()

		jest.advanceTimersByTime(100)

		await expect(promise).rejects.toThrow('fail')
	})

	it('should reject if the function throws (async)', async () => {
		const fn = jest.fn(async () => {
			throw new Error('async fail')
		})

		const debounced = debounce(fn)(100)
		const promise = debounced()

		jest.advanceTimersByTime(100)

		await Promise.resolve()
		await expect(promise).rejects.toThrow('async fail')
	})

	it('should resolve undefined if no func is passed', async () => {
		const debounced = debounce()(50)
		const promise = debounced('x')

		jest.advanceTimersByTime(50)

		await expect(promise).resolves.toBeUndefined()
	})
})
