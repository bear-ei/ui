export const useMergeRefs =
    <T>(refs: (React.Ref<T> | undefined)[]) =>
    (value: T) =>
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(value)

                return
            }

            ;(ref as React.RefObject<T | null>).current = value
        })
