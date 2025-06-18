export const debounceAsync = <T extends (...args: any[]) => unknown>(func?: T) => {
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
		let lastResolve: (value?: Awaited<ReturnType<T>>) => void

		return (...args: Parameters<T>) => {
			if (timeoutId) {
				clearTimeout(timeoutId)
				lastResolve?.(undefined)
			}

			return new Promise<Awaited<ReturnType<T>> | undefined>((resolve, reject) => {
				lastResolve = resolve
				timeoutId = setTimeout(createDebouncedExecutor(resolve, reject)(...args), delay)
			})
		}
	}
}

export const debounce =
	<T extends (...args: any[]) => unknown>(func?: T) =>
	(delay: number) => {
		let timeoutId: NodeJS.Timeout

		return (...args: Parameters<T>) => {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}

			timeoutId = setTimeout(() => func?.(...args), delay)
		}
	}
