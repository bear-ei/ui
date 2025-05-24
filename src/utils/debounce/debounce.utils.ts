export const debounce = <T extends (...args: any[]) => unknown>(func?: T) => {
	const createDebouncedExecutor =
		(
			resolve: (value: Awaited<ReturnType<T>> | PromiseLike<Awaited<ReturnType<T>>>) => void,
			reject: (reason?: unknown) => void
		) =>
		(...args: Parameters<T>) =>
		async () => {
			try {
				const result = await func?.(...args)

				resolve(result as Awaited<ReturnType<T>>)
			} catch (error) {
				reject(error)
			}
		}

	return (delay: number) => {
		let timeoutId: NodeJS.Timeout
		let lastReject: (reason?: unknown) => void

		return (...args: Parameters<T>) => {
			if (timeoutId) {
				clearTimeout(timeoutId)
				lastReject?.(new Error('Debounced call cancelled'))
			}

			return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
				lastReject = reject
				timeoutId = setTimeout(createDebouncedExecutor(resolve, reject)(...args), delay)
			})
		}
	}
}
