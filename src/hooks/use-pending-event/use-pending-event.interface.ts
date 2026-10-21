export interface UsePendingEventOptions<Evt, E, K extends keyof E> {
	eventKey: K
	pendingEvent?: Evt
}
