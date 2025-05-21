export const debounce =
	<T extends (...args: any[]) => unknown>(func?: T) =>
	(delay: number) => {
		let timeoutId: NodeJS.Timeout
		let lastReject: (reason?: unknown) => void

		return (...args: Parameters<T>) => {
			if (timeoutId) {
				clearTimeout(timeoutId)
				lastReject?.(new Error('Debounced call cancelled'))
			}

			return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
				lastReject = reject
				timeoutId = setTimeout(async () => {
					try {
						const result = await func?.(...args)

						resolve(result as Awaited<ReturnType<T>>)
					} catch (error) {
						reject(error)
					}
				}, delay)
			})
		}
	}
