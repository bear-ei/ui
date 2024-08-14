import {useRef} from 'react'

export const useLazyRef = <T>(callback: () => T) => {
    const lazyRef = useRef<T>()

    !lazyRef.current && (lazyRef.current = callback())

    return lazyRef
}
