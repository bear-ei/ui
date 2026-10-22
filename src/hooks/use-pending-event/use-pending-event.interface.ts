import type {Updater} from 'use-immer'

export interface UsePendingEventOptions<Evt, E> {
	pendingEvent?: Evt
	setState?: Updater<E>
}
