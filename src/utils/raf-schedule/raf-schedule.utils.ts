/**
 * Schedule `callback` to run once on the next animation frame.
 * Multiple calls within the same frame are coalesced — only the LAST args run.
 *
 * Execution order inside the rAF callback is load-bearing:
 *   1. Reset frameId first → lets `callback` schedule another frame (recursive use).
 *   2. Snapshot lastArgs before clearing → survives re-entrant calls.
 *   3. Call after clearing → a re-entrant `callback` re-populates lastArgs correctly.
 * Reordering these steps causes silent dropped calls.
 *
 * React usage: memoize per component (the closure holds frameId / lastArgs):
 *   const fn = useMemo(() => rafSchedule(handler), [])
 *   useEffect(() => () => fn.cancel(), [fn])
 *
 * Returns void; `callback`'s return value (incl. Promise) is discarded.
 */
export const rafSchedule = <T extends (...args: any[]) => unknown>(callback: T) => {
	let frameId: number | undefined
	let lastArgs: Parameters<T> | undefined

	const cancel = () => {
		if (frameId !== undefined) {
			cancelAnimationFrame(frameId)
		}

		frameId = undefined
		lastArgs = undefined
	}

	const rafCallback = (...args: Parameters<T>) => {
		lastArgs = args

		if (frameId !== undefined) {
			return
		}

		frameId = requestAnimationFrame(() => {
			frameId = undefined

			const nextArgs = lastArgs

			lastArgs = undefined

			if (nextArgs) {
				callback(...nextArgs)
			}
		})
	}

	rafCallback.cancel = cancel

	return rafCallback
}
