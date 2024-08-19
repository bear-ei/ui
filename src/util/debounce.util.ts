import {DebouncedFunction} from './util.interface'

export const debounce =
    <T extends (...args: any[]) => any>(func: T) =>
    (delay: number): DebouncedFunction<T> => {
        let timeoutId: ReturnType<typeof setTimeout>

        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId)

            timeoutId = setTimeout(() => {
                func(...args)
            }, delay)
        }
    }
