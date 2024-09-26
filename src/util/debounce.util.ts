import {DebouncedFunction} from './util.interface'

export const debounce =
    <T extends (...args: any[]) => any>(func: T) =>
    (delay: number): DebouncedFunction<T> => {
        let timeoutId: ReturnType<typeof setTimeout>

        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId)
            let result!: unknown

            timeoutId = setTimeout(() => (result = func(...args)), delay)

            return result
        }
    }

export const asyncDebounce = <T extends (...args: any[]) => Promise<any>>(func: T) => {
    const timeoutFunc =
        (...args: Parameters<T>) =>
        (resolve: (value: unknown) => void, reject: (reason?: any) => void) =>
        () =>
            func(...args)
                .then(resolve)
                .catch(reject)

    return (delay: number): DebouncedFunction<T> => {
        let timeoutId: ReturnType<typeof setTimeout>

        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId)

            return new Promise(
                (resolve, reject) => (timeoutId = setTimeout(timeoutFunc(...args)(resolve, reject), delay))
            )
        }
    }
}
