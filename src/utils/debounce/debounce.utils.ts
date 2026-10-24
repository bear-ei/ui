export const debounce = <T extends (...args: any[]) => unknown>(callback: T, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout> | number | undefined

	const cancel = () => {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId)
			timeoutId = undefined
		}
	}

	const debouncedCallback = (...args: Parameters<T>) => {
		cancel()

		timeoutId = setTimeout(() => {
			timeoutId = undefined
			callback(...args)
		}, delay)
	}

	debouncedCallback.cancel = cancel

	return debouncedCallback
}
