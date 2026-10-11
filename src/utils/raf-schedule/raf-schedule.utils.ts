export const rafSchedule = <T extends (...args: any[]) => unknown>(func?: T) => {
	let frameId: number | undefined
	let lastArgs: Parameters<T> | undefined

	const cancel = () => {
		if (frameId !== undefined) {
			cancelAnimationFrame(frameId)
		}

		frameId = undefined
		lastArgs = undefined
	}

	return Object.assign(
		(...args: Parameters<T>) => {
			lastArgs = args

			if (frameId !== undefined) {
				return
			}

			frameId = requestAnimationFrame(() => {
				frameId = undefined

				const nextArgs = lastArgs

				lastArgs = undefined

				if (nextArgs) {
					func?.(...nextArgs)
				}
			})
		},
		{cancel}
	)
}
