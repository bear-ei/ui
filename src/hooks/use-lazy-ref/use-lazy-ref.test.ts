import {renderHook} from '@testing-library/react-hooks'
import {useLazyRef} from './use-lazy-ref.hook'

describe('useLazyRef', () => {
	it('should call callback only once', () => {
		const callback = jest.fn(() => 'initial value')
		const {result, rerender} = renderHook(() => useLazyRef(callback))

		expect(result.current.current).toBe('initial value')
		expect(callback).toHaveBeenCalledTimes(1)

		rerender()

		expect(result.current.current).toBe('initial value')
		expect(callback).toHaveBeenCalledTimes(1)
	})

	it('should return consistent ref across renders', () => {
		const callback = () => ({count: 0})
		const {result, rerender} = renderHook(() => useLazyRef(callback))
		const original = result.current

		rerender()
		expect(result.current).toBe(original)
	})

	it('should not call callback if ref already has a value', () => {
		const callback = jest.fn(() => 123)
		const {result, rerender} = renderHook(() => useLazyRef(callback))

		expect(result.current.current).toBe(123)
		expect(callback).toHaveBeenCalledTimes(1)

		result.current.current = 999
		rerender()

		expect(result.current.current).toBe(999)
		expect(callback).toHaveBeenCalledTimes(1)
	})
})
