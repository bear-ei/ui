/**
 * Throttle with leading + trailing edges.
 * Fires immediately on first call, and again at the end of the window
 * with the LAST arguments received (so a search box ends on the final query).
 *
 * ⚠️ React usage: memoize per component, or `lastTime` resets every render:
 *   const fn = useMemo(() => throttle(handleSearch)(300), [])
 *   useEffect(() => () => fn.cancel(), [fn])
 *
 * Returns void; `func`'s return value (incl. Promise) is discarded.
 */
export const throttle =
	<T extends (...args: any[]) => unknown>(func: T) =>
	(wait: number) => {
		let lastTime = 0
		let timeoutId: ReturnType<typeof setTimeout> | undefined
		let lastArgs: Parameters<T> | undefined

		const invoke = () => {
			lastTime = Date.now()
			timeoutId = undefined

			const args = lastArgs

			lastArgs = undefined

			if (args) {
				func(...args)
			}
		}

		const throttledFn = (...args: Parameters<T>) => {
			lastArgs = args

			const now = Date.now()
			const remaining = wait - (now - lastTime)

			if (remaining <= 0) {
				if (timeoutId) {
					clearTimeout(timeoutId)
					timeoutId = undefined
				}

				invoke()

				return
			}

			if (!timeoutId) {
				timeoutId = setTimeout(invoke, remaining)
			}
		}

		throttledFn.cancel = () => {
			if (timeoutId) {
				clearTimeout(timeoutId)
				timeoutId = undefined
			}

			lastArgs = undefined
			lastTime = 0
		}

		return throttledFn
	}
