import {useCallback, useRef} from 'react'

export const useMergeRefs = <T>(refs: (React.Ref<T> | undefined)[]) => {
	const refsRef = useRef(refs)

	refsRef.current = refs

	return useCallback((value: T) => {
		refsRef.current.forEach(ref => {
			if (typeof ref === 'function') {
				ref(value)

				return
			}

			if (ref) {
				ref.current = value
			}
		})
	}, [])
}
