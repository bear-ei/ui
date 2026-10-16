import {useEffect, useRef} from 'react'
import type {UsePendingEventOptions} from './use-pending-event.interface'

/**
 * Consume a "pending event" stored in state, on the next commit.
 *
 * Solves the "state stores a function" anti-pattern:
 *   - state stores DATA (`pendingEvent: Evt`) instead of a closure
 *   - the handler (`func`) is read from the latest props via a ref
 *   - the state slot is cleared immediately after consumption
 *
 * @example
 *   usePendingEvent({
 *       func: onEndReached,
 *       eventKey: 'pendingEndReached',
 *       pendingEvent: pendingEndReached,
 *       setState
 *   })
 *
 * Why not put `func` in deps: it changes identity every render; the
 * effect would re-fire and re-consume the same event indefinitely.
 * The latest-ref pattern decouples handler identity from the effect.
 */
export const usePendingEvent = <Evt, E, K extends keyof E>({
	eventKey,
	func,
	pendingEvent,
	setState
}: UsePendingEventOptions<Evt, E, K>) => {
	const funcRef = useRef(func)

	// Latest-ref pattern: must write during render (not in an effect) so that
	// the consumption effect below always sees the freshest `func`, avoiding
	// stale-closure bugs from the previous render's props.
	funcRef.current = func

	useEffect(() => {
		if (pendingEvent === undefined) {
			return
		}

		setState(draft => {
			;(draft as Record<K, undefined>)[eventKey] = undefined
		})

		funcRef.current?.(pendingEvent)
	}, [pendingEvent, setState, eventKey])
}
