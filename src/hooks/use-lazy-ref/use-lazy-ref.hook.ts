import {useRef} from 'react'

/**
 * Lazily initialize a ref on first access.
 *
 * ⚠️ `callback` must return a non-nullish value — if it returns `null` /
 * `undefined`, `??=` will re-invoke it on every render.
 */
export const useLazyRef = <T>(callback: () => T) => {
	const lazyRef = useRef<T>(undefined)

	lazyRef.current ??= callback()

	return lazyRef
}
