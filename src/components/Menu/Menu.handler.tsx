import type {TextInputKeyPressEvent} from 'react-native'
import type {Updater} from 'use-immer'

import {arrayEqual} from '../../utils'
import {POPOVER_TYPE} from '../Popover'

import type {
	HandleMenuKeyDownEventOptions,
	HandleMenuKeyDownOptions,
	MenuState,
	UpdateMenuVisibleOptions
} from './Menu.interface'

const handleMenuActiveKeys = (key: string, activeKeys: string[] = []) => {
	if (activeKeys.findIndex(item => item === key) !== -1) {
		return activeKeys.filter(item => item !== key)
	}

	return [...activeKeys, key]
}

export const handleMenuKeyDown = ({
	activeKey,
	activeKeys,
	data,
	multiple,
	onActive,
	onActives,
	onFocusKey
}: HandleMenuKeyDownOptions) => {
	const handleMenuKeyCode = (setState: Updater<MenuState>) => (keyCode?: string) =>
		setState(draft => {
			const currentFocusedIndex = draft.focusedIndex ?? -1
			const lastIndex = (data?.length ?? 0) - 1
			const focusData =
				typeof currentFocusedIndex === 'number' && currentFocusedIndex !== -1 ?
					data?.[currentFocusedIndex]
				:	undefined

			switch (true) {
				case keyCode?.startsWith('ArrowUp'): {
					const nextFocusedIndex = currentFocusedIndex - 1 < 0 ? lastIndex : currentFocusedIndex - 1

					draft.focusedIndex = nextFocusedIndex

					if (onFocusKey) {
						draft.pendingFocusKeyEvent = data?.[nextFocusedIndex]?.indexKey
					}

					break
				}

				case keyCode?.startsWith('ArrowDown'): {
					const nextFocusedIndex = currentFocusedIndex + 1 > lastIndex ? 0 : currentFocusedIndex + 1

					draft.focusedIndex = nextFocusedIndex

					if (onFocusKey) {
						draft.pendingFocusKeyEvent = data?.[nextFocusedIndex]?.indexKey
					}

					break
				}

				case keyCode?.startsWith('Enter'):
					if (!focusData || typeof draft.focusedIndex !== 'number') {
						break
					}

					if (onActives && multiple) {
						draft.pendingActivesEvent = handleMenuActiveKeys(focusData.indexKey, activeKeys)

						break
					}

					if (onActive) {
						draft.pendingActiveEvent = focusData.indexKey === activeKey ? undefined : focusData.indexKey
					}

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
	(options: HandleMenuKeyDownEventOptions) =>
	(setState: Updater<MenuState>) =>
	(event: React.KeyboardEvent | TextInputKeyPressEvent) => {
		const key = event.nativeEvent.key

		if (['ArrowUp', 'ArrowDown'].includes(key)) {
			event.preventDefault()
		}

		// Ignore key-repeat events (holding Enter / ArrowUp / ArrowDown down).
		// `nativeEvent.repeat` is a DOM standard property available on RNW's
		// KeyboardEvent. RN's TextInputKeyPressEvent doesn't have `repeat`,
		// so native falls through to the `draft.keyCode` dedupe below.
		const isKeyRepeat =
			'nativeEvent' in event &&
			'repeat' in event.nativeEvent &&
			(event.nativeEvent as {repeat?: boolean}).repeat === true

		if (isKeyRepeat) {
			return
		}

		handleMenuKeyDown(options)(setState)(key)
	}

export const updateMenuVisible =
	({onVisible, type}: UpdateMenuVisibleOptions) =>
	(setState: Updater<MenuState>) =>
	(value?: boolean) => {
		if (typeof value === 'undefined') {
			return
		}

		setState(draft => {
			if (!value) {
				draft.focusedIndex = undefined

				if (type === POPOVER_TYPE.CONTEXT_MENU) {
					draft.activeKey = undefined
				}
			}

			if (draft.visible !== value && onVisible) {
				draft.pendingVisibleEvent = value
			}

			draft.visible = value
		})
	}

export const updateMenuActive =
	(setState: Updater<MenuState>) => (onActive?: (value?: string) => void) => (value?: string) => {
		if (typeof value === 'undefined') {
			return
		}

		setState(draft => {
			if (draft.activeKey !== value && onActive) {
				draft.pendingActiveEvent = value
			}

			draft.activeKey = value
		})
	}

export const updateMenuActives =
	(setState: Updater<MenuState>) => (onActives?: (values?: string[]) => void) => (values?: string[]) => {
		if (typeof values === 'undefined') {
			return
		}

		setState(draft => {
			const isArrayEqual = arrayEqual([...(draft.activeKeys ?? [])], values)

			if (!isArrayEqual && onActives) {
				draft.pendingActivesEvent = values
			}

			draft.activeKeys = values
		})
	}
