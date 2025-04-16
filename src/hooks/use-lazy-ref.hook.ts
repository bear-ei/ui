import {useRef} from 'react'

export const useLazyRef = <T>(callback: () => T) => {
	const lazyRef = useRef<T>()

	lazyRef.current ??= callback()

	return lazyRef
}
