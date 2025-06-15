export const throttle = <T extends (...args: any[]) => unknown>(func?: T) => {
	let lastTime = 0

	return (wait: number) =>
		(...args: Parameters<T>) => {
			const now = Date.now()

			if (now - lastTime >= wait) {
				lastTime = now

				func?.(...args)
			}
		}
}
