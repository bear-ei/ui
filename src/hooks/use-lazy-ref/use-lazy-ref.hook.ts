import {useRef} from 'react'

export const useLazyRef = <T>(callback: () => T) => {
	const lazyRef = useRef<T>(undefined)

	lazyRef.current ??= callback()

	return lazyRef
}
