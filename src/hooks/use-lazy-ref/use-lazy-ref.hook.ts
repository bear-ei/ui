import {useRef} from 'react'

/**
 * Lazily initialize a ref on first access.
 *
 * ⚠️ `initializer` must return a non-nullish value — if it returns `null` /
 * `undefined`, `??=` will re-invoke it on every render.
 */
export const useLazyRef = <T>(initializer: () => T) => {
	const lazyRef = useRef<T>(undefined)

	lazyRef.current ??= initializer()

	return lazyRef
}
