import type {Updater} from 'use-immer'

export interface UsePendingEventOptions<Evt, E, K extends keyof E> {
	eventKey: K
	func?: (event: Evt) => void
	pendingEvent?: Evt
	setState: Updater<E>
}
