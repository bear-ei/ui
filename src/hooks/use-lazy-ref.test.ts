import {renderHook} from '@testing-library/react-hooks'
import {useLazyRef} from './use-lazy-ref.hook'

describe('useLazyRef', () => {
	it('calls the callback only once and returns a ref', () => {
		const factory = jest.fn(() => ({value: 123}))
		const {result, rerender} = renderHook(() => useLazyRef(factory))

		expect(result.current.current).toEqual({value: 123})
		expect(factory).toHaveBeenCalledTimes(1)
		rerender()
		expect(factory).toHaveBeenCalledTimes(1)
		expect(result.current.current).toEqual({value: 123})
	})

	it('can return primitive value', () => {
		const {result} = renderHook(() => useLazyRef(() => 42))

		expect(result.current.current).toBe(42)
	})

	it('can return undefined if callback returns it', () => {
		const {result} = renderHook(() => useLazyRef(() => undefined))

		expect(result.current.current).toBeUndefined()
	})
})
