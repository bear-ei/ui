import {renderHook} from '@testing-library/react-hooks'
import {useLazyRef} from './use-lazy-ref.hook'

describe('useLazyRef', () => {
	it('should call the callback and initialize ref value on first invocation', () => {
		const mockCallback = jest.fn(() => 'initialValues')
		const {result} = renderHook(() => useLazyRef(mockCallback))

		expect(mockCallback).toHaveBeenCalledTimes(1)
		expect(result.current.current).toBe('initialValues')
	})

	it('should not call the callback again on subsequent invocations', () => {
		const mockCallback = jest.fn(() => 'initialValues')
		const {rerender} = renderHook(() => useLazyRef(mockCallback))

		rerender()
		rerender()
		expect(mockCallback).toHaveBeenCalledTimes(1)
	})

	it('should correctly infer and maintain the type of the ref value', () => {
		const mockCallback = jest.fn(() => 42)
		const {result} = renderHook(() => useLazyRef<number>(mockCallback))

		expect(typeof result.current.current).toBe('number')
		expect(result.current.current).toBe(42)
	})

	it('should throw an error if the callback throws', () => {
		const mockCallback = jest.fn(() => {
			throw new Error('Callback error')
		})

		const {result} = renderHook(() => useLazyRef(mockCallback))

		expect(result.error).toBeDefined()
		expect(result?.error?.message).toBe('Callback error')
	})
})
