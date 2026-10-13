export const debounce =
	<T extends (...args: any[]) => unknown>(func: T) =>
	(delay: number) => {
		let timeoutId: ReturnType<typeof setTimeout> | number | undefined

		const cancel = () => {
			if (timeoutId) {
				clearTimeout(timeoutId)
				timeoutId = undefined
			}
		}

		const debouncedFn = (...args: Parameters<T>) => {
			cancel()

			timeoutId = setTimeout(() => {
				timeoutId = undefined
				func(...args)
			}, delay)
		}

		debouncedFn.cancel = cancel

		return debouncedFn
	}
