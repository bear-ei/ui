import type {Updater} from 'use-immer'
import type {ListData} from '../List'
import type {HandleMenuKeyDownOptions, MenuState} from './Menu.interface'

const handleMenuActiveKeys =
	(activeKeys = [] as string[]) =>
	(key: string) => {
		if (activeKeys.findIndex(item => item === key) !== -1) {
			return activeKeys?.filter(item => item !== key)
		}

		return [...activeKeys, key]
	}

export const handleMenuKeyDown = ({
	data,
	multiple,
	onActives,
	onActive,
	activeKeys,
	activeKey
}: HandleMenuKeyDownOptions) => {
	const nextActivesEvent = (indexKey: string) => () => onActives?.(handleMenuActiveKeys(activeKeys)(indexKey))
	const nextActiveEvent = (indexKey: string) => () => onActive?.(indexKey === activeKey ? undefined : indexKey)
	const handleMenuKeyCode = (setState: Updater<MenuState>) => (keyCode?: string) =>
		setState(draft => {
			const currentFocusedIndex = draft.focusedIndex ?? -1
			const lastIndex = (data?.length ?? 0) - 1
			const focusData =
				currentFocusedIndex && currentFocusedIndex !== -1 ?
					data?.[currentFocusedIndex]
				:	undefined

			switch (true) {
				case keyCode?.startsWith('ArrowUp'):
					draft.focusedIndex =
						currentFocusedIndex - 1 < 0 ? lastIndex : currentFocusedIndex - 1
					break

				case keyCode?.startsWith('ArrowDown'):
					draft.focusedIndex =
						currentFocusedIndex + 1 > lastIndex ? 0 : currentFocusedIndex + 1

					break

				case keyCode?.startsWith('Enter') && draft.keyCode !== keyCode:
					if (!focusData || typeof draft.focusedIndex !== 'number') {
						return
					}

					if (multiple) {
						draft.nextActivesEvent = nextActivesEvent(focusData.indexKey)
					} else {
						draft.nextActiveEvent = nextActiveEvent(focusData.indexKey)
					}

					draft.keyCode = keyCode
					break

				default:
					break
			}
		})

	return (setState: Updater<MenuState>) => (keyCode?: string) => {
		if (!data) {
			return
		}

		handleMenuKeyCode(setState)(keyCode)
	}
}

export const handleMenuKeyDownEvent =
	(data?: ListData[]) => (setState: Updater<MenuState>) => (event: React.KeyboardEvent) => {
		const {code} = event

		if (['ArrowUp', 'ArrowDown'].includes(code)) {
			event.preventDefault()
		}

		handleMenuKeyDown({data})(setState)(code)
	}

export const updateMenuVisibility =
	(setState: Updater<MenuState>) => (onVisible?: (value?: boolean) => void) => (value?: boolean) => {
		const nextVisibilityEvent = () => onVisible?.(value)

		if (typeof value === 'undefined') {
			return
		}

		setState(draft => {
			if (!value) {
				draft.activeKey = undefined
				draft.focusedIndex = undefined
			}

			draft.nextVisibilityEvent = nextVisibilityEvent
			draft.visible = value
		})
	}

export const updateMenuActive =
	(setState: Updater<MenuState>) => (onActive?: (value?: string) => void) => (value?: string) => {
		const nextActiveEvent = () => onActive?.(value)

		if (typeof value === 'undefined') {
			return
		}

		setState(draft => {
			draft.activeKey = value
			draft.nextActiveEvent = nextActiveEvent
		})
	}

export const updateMenuActives =
	(setState: Updater<MenuState>) => (onActives?: (values?: string[]) => void) => (values?: string[]) => {
		const nextActiveEvents = () => onActives?.(values)

		if (typeof values === 'undefined') {
			return
		}

		setState(draft => {
			draft.activeKeys = values
			draft.nextActiveEvent = nextActiveEvents
		})
	}

export const updateMenuVisible = (setState: Updater<MenuState>) => (visible: boolean) => {
	setState(draft => {
		draft.visible = visible
	})
}

export const clearMenuEvent = (setState: Updater<MenuState>) => (eventName: 'active' | 'actives' | 'visibility') => {
	const event = {
		active: () =>
			setState(draft => {
				draft.nextActiveEvent = undefined
			}),
		actives: () =>
			setState(draft => {
				draft.nextActivesEvent = undefined
			}),
		visibility: () =>
			setState(draft => {
				draft.nextVisibilityEvent = undefined
			})
	}

	event[eventName]?.()
}
