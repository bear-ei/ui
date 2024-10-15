export const debounce =
    <T extends (...args: any[]) => unknown>(func: T) =>
    (delay: number) => {
        let timeoutId: NodeJS.Timeout

        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId)

            let result!: unknown

            timeoutId = setTimeout(() => (result = func(...args)), delay)

            return result
        }
    }

export const asyncDebounce = <T extends (...args: any[]) => Promise<unknown>>(func: T) => {
    const timeoutFunc =
        (...args: Parameters<T>) =>
        (resolve: (value: unknown) => void, reject: (reason?: unknown) => void) =>
        () =>
            func(...args)
                .then(resolve)
                .catch(reject)

    return (delay: number) => {
        let timeoutId: NodeJS.Timeout

        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId)

            return new Promise(
                (resolve, reject) => (timeoutId = setTimeout(timeoutFunc(...args)(resolve, reject), delay))
            )
        }
    }
}
