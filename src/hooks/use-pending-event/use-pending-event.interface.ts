import type {Updater} from 'use-immer'

export interface UsePendingEventOptions<PendingEvent, State> {
	pendingEvent?: PendingEvent
	setState?: Updater<State>
}
