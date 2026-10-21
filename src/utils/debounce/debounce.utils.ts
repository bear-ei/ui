export const debounce = <T extends (...args: any[]) => unknown>(func: T, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout> | number | undefined

	const cancel = () => {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId)
			timeoutId = undefined
		}
	}

	const debouncedFunc = (...args: Parameters<T>) => {
		cancel()

		timeoutId = setTimeout(() => {
			timeoutId = undefined
			func(...args)
		}, delay)
	}

	debouncedFunc.cancel = cancel

	return debouncedFunc
}
