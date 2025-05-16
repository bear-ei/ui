export interface RunAfterInteractionsResult {
	then: (onfulfilled?: () => unknown, onrejected?: () => unknown) => Promise<unknown>
	done: (...args: any[]) => unknown
	cancel: () => void
}
